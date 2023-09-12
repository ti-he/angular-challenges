import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { todo } from '../interfaces/todo';
import { LoadingService } from '../loading.service';
import { LoadingDisplayComponent } from '../../ui/loadingDisplay/loading-display.component';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, LoadingDisplayComponent],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  public loadingService = inject(LoadingService);
  @Input() todo!: todo;
  @Output() public update: EventEmitter<void> = new EventEmitter<void>();
  @Output() public delete: EventEmitter<void> = new EventEmitter<void>();
}
