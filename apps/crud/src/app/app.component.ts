import { CommonModule } from '@angular/common';

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';

import { todo } from './todo.interface';
import { TodoService } from './todo.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  todos$: BehaviorSubject<todo[]> = new BehaviorSubject<todo[]>([]);
  httpService = inject(TodoService);

  ngOnInit(): void {
    this.httpService.getTodos().subscribe((data) => {
      // call behavior subject with new value
      this.todos$.next(data);
    });
  }

  updateTodo(todoToUpdate: todo) {
    this.httpService.updateTodo(todoToUpdate).subscribe((updatedTodo) => {
      const todosValue = this.todos$.getValue();
      const currentIdx = todosValue.findIndex(
        (todo) => todo.id === updatedTodo.id
      );
      todosValue.splice(currentIdx, 1, updatedTodo);
      this.todos$.next(todosValue);
    });
  }
}
