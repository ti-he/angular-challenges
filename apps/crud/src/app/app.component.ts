import { CommonModule } from '@angular/common';

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';

import { todo } from './core/interfaces/todo';
import { TodoService } from './core/todo.service';
import { BehaviorSubject, map, switchMap, take } from 'rxjs';
import { ErrorHandlerService } from './core/error-handling/error-handler.service';
import { ErrorDisplayComponent } from './ui/errorDisplay/error-display.component';
import { TodoItemComponent } from './core/todoItem/todo-item.component';
import { LoadingService } from './core/loading.service';
@Component({
  standalone: true,
  imports: [CommonModule, TodoItemComponent, ErrorDisplayComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  todos$: BehaviorSubject<todo[]> = new BehaviorSubject<todo[]>([]);
  todoService = inject(TodoService);
  loadingService = inject(LoadingService);
  errorHandlerService = inject(ErrorHandlerService);
  @ViewChildren(TodoItemComponent)
  todoItems!: QueryList<TodoItemComponent>;

  ngOnInit(): void {
    this.errorHandlerService.getErrorMessage().subscribe(() => {
      this.loadingService.setIsLoading(false);
    });

    this.loadingService.setIsLoading(true);
    this.todoService.get().subscribe((data) => {
      this.todos$.next(data);
      this.loadingService.setIsLoading(false);
    });
  }

  updateTodo(todoToUpdate: todo, idx: number) {
    this.todoItems.get(idx)?.isLoading.set(true);
    this.todoService
      .update(todoToUpdate)
      .pipe(
        switchMap((updatedTodo) => {
          return this.todos$.pipe(
            take(1),
            map((todos) => {
              const updatedIndex = todos.findIndex(
                (todo) => todo.id === todoToUpdate.id
              );
              if (updatedIndex !== -1) {
                const newTodos = [...todos];
                newTodos[updatedIndex] = updatedTodo;
                return newTodos;
              }
              return todos;
            })
          );
        })
      )
      .subscribe((newTodos) => {
        this.todos$.next(newTodos);
        this.todoItems.get(idx)?.isLoading.set(false);
      });
  }

  deleteTodo(todoToDelete: todo, idx: number) {
    this.todoItems.get(idx)?.isLoading.set(true);
    this.todoService
      .delete(todoToDelete)
      .pipe(
        switchMap(() => this.todos$),
        take(1),
        map((todos) => todos.filter((todo) => todo.id !== todoToDelete.id))
      )
      .subscribe((newTodos) => {
        this.todos$.next(newTodos);
      });
  }
}
