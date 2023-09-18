import { Injectable, inject } from '@angular/core';
import { TodoService } from '../../todo.service';
import { AppStore } from '../../app.store';
import { CallStateComponentStore } from '@tomalaforge/ngrx-callstate-store';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/component-store';
import { Todo } from '../todo.model';
import { randomErrorHttp } from '@angular-challenges/shared/utils';

@Injectable()
export class TodoItemStore extends CallStateComponentStore<{ todo: Todo }> {
  private todoService = inject(TodoService);
  private todosStore = inject(AppStore);

  private readonly todo$ = this.select((state) => state.todo);

  readonly vm$ = this.select(
    {
      todo: this.todo$,
      loading: this.isLoading$,
      error: this.error$,
    },
    { debounce: true }
  );

  readonly updateTodo = this.effect<number>(
    pipe(
      tap(() => this.startLoading()),
      switchMap((id) =>
        randomErrorHttp({
          httpRequest: () => this.todoService.update(id),
        }).pipe(
          tapResponse(
            (todo) => {
              this.stopLoading();
              this.todosStore.updateTodo(todo);
            },
            (error: unknown) => this.handleError(error)
          )
        )
      )
    )
  );

  readonly deleteTodo = this.effect<number>(
    pipe(
      tap(() => this.startLoading()),
      switchMap((id) =>
        randomErrorHttp({
          httpRequest: () => this.todoService.delete(id),
        }).pipe(
          tapResponse(
            () => this.todosStore.deleteTodoState(id),
            (error: unknown) => this.handleError(error)
          )
        )
      )
    )
  );
}
