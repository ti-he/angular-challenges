import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { todo } from '../interfaces/todo';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.compnent.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  @Input() todo!: todo;
  @Output() public update: EventEmitter<void> = new EventEmitter<void>();
  @Output() public delete: EventEmitter<void> = new EventEmitter<void>();
}
