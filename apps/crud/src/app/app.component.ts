import { CommonModule } from '@angular/common';

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';

import { todo } from './todo.interface';
import { TodoService } from './todo.service';
import { BehaviorSubject, map, switchMap, take } from 'rxjs';
import { LoadingOverlayComponent } from './ui/loadingOverlay/loading-overlay.component';
@Component({
  standalone: true,
  imports: [CommonModule, LoadingOverlayComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  todos$: BehaviorSubject<todo[]> = new BehaviorSubject<todo[]>([]);
  todoService = inject(TodoService);
  isLoading = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.todoService.get().subscribe((data) => {
      // call behavior subject with new value
      this.todos$.next(data);
      this.isLoading = false;
    });
  }

  updateTodo(todoToUpdate: todo) {
    this.isLoading = true;
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
        this.isLoading = false;
      });
  }

  deleteTodo(todoToDelete: todo) {
    this.isLoading = true;
    this.todoService
      .delete(todoToDelete)
      .pipe(
        switchMap(() => this.todos$),
        take(1),
        map((todos) => todos.filter((todo) => todo.id !== todoToDelete.id))
      )
      .subscribe((newTodos) => {
        this.todos$.next(newTodos);
        this.isLoading = false;
      });
  }
}
