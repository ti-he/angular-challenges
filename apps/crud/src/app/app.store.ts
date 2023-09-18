import { OnStateInit, OnStoreInit, tapResponse } from '@ngrx/component-store';
import { Injectable, inject } from '@angular/core';
import { Todo } from './todo/todo.model';
import { pipe, switchMap, tap } from 'rxjs';
import { TodoService } from './todo.service';
import { CallStateComponentStore } from '@tomalaforge/ngrx-callstate-store';
import { randomErrorHttp } from '@angular-challenges/shared/utils';

@Injectable()
export class AppStore
  extends CallStateComponentStore<{
    todos: Todo[];
  }>
  implements OnStateInit, OnStoreInit
{
  todoService = inject(TodoService);

  private readonly todos$ = this.select((state) => state.todos);

  // selectors
  // viewModel --> combines selectore into a single object to make subscribing easier
  readonly vm$ = this.select(
    {
      todos: this.todos$,
      loading: this.isLoading$,
      error: this.error$,
    },
    { debounce: true }
  );

  // effects
  readonly fetchTodo = this.effect<void>(
    pipe(
      tap(() => this.startLoading()),
      switchMap(() =>
        randomErrorHttp({
          httpRequest: () => this.todoService.getAllTodo(),
        }).pipe(
          tapResponse(
            (todos) => this.stopLoading({ todos }),
            (error: unknown) => this.handleError(error)
          )
        )
      )
    )
  );

  readonly updateTodo = this.effect<Todo>(
    pipe(
      tap(() => this.startLoading()),
      switchMap((todo) =>
        this.todoService.update(todo.id).pipe(
          tapResponse(
            (todo) => {
              console.log(todo);
              this.updateTodos(todo);
            },
            (error: unknown) => this.handleError(error)
          )
        )
      )
    )
  );

  private readonly updateTodos = this.updater((state, todo: Todo) => ({
    ...state,
    callState: 'LOADED',
    // Replace the previous todo with new one inside our todo array
    todos: state.todos.map((t) => (t.id === todo.id ? { ...todo } : t)),
  }));

  readonly deleteTodoState = this.updater((state, todoId: number) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== todoId),
  }));

  ngrxOnStoreInit() {
    this.setState({ todos: [], callState: 'LOADING' });
  }

  ngrxOnStateInit() {
    this.fetchTodo();
  }
}
