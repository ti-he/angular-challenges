import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { Todo } from '../todo.model';
import { provideComponentStore } from '@ngrx/component-store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoItemStore } from './todo-item.store';
import { NgIf } from '@angular/common';
import { LetModule } from '@rx-angular/template/let';

@Component({
  standalone: true,
  selector: 'app-todo-item',
  imports: [NgIf, MatProgressSpinnerModule, LetModule],
  providers: [provideComponentStore(TodoItemStore)],
  template: `
    <ng-container *rxLet="vm$ as vm">
      <mat-spinner [diameter]="20" color="blue" *ngIf="vm.loading">
      </mat-spinner>
      {{ vm.todo.title }}
      <button (click)="update(vm.todo.id)">Update</button>
      <button (click)="delete(vm.todo.id)">Delete</button>
      <div class="error" *ngIf="vm.error">
        An error has occured: {{ vm.error }}
      </div>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: flex;
        gap: 3px;
        .error {
          color: red;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  private todoItemStore = inject(TodoItemStore);

  @Input() set todo(todo: Todo) {
    this.todoItemStore.patchState({ todo });
  }

  vm$ = this.todoItemStore.vm$;

  update(todoId: number) {
    this.todoItemStore.updateTodo(todoId);
  }

  delete(todoId: number) {
    this.todoItemStore.deleteTodo(todoId);
  }
}
