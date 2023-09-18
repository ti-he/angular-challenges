import { NgFor, NgIf } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LetModule } from '@rx-angular/template/let';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';
import { AppStore } from './app.store';
import { TodoItemComponent } from './todo/todoItem/todo-item.component';

// This is the solution from the blogpost
// https://medium.com/@thomas.laforge/discover-the-power-of-ngrx-component-store-to-create-a-local-component-state-53e3a0af7970
// and from
// https://github.com/tomalaforge/angular-challenges/pull/27

@Component({
  selector: 'app-root',
  providers: [provideComponentStore(AppStore)],
  imports: [
    NgIf,
    NgFor,
    MatProgressSpinnerModule,
    LetModule,
    TodoItemComponent,
  ],
  standalone: true,
  template: `
    <ng-container *rxLet="vm$ as vm">
      <mat-spinner [diameter]="20" color="blue" *ngIf="vm.loading">
      </mat-spinner>
      <ng-container *ngIf="vm.error; else noError">
        Error has occured: {{ vm.error }}
      </ng-container>
      <ng-template #noError>
        <div class="tod-container">
          <app-todo-item
            *ngFor="let todo of vm.todos"
            [todo]="todo"></app-todo-item>
        </div>
      </ng-template>
    </ng-container>
  `,
  styles: [
    `
      .todo-container {
        display: flex;
        flex-direction: column;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private appStore = inject(AppStore);
  vm$ = this.appStore.vm$;
}
