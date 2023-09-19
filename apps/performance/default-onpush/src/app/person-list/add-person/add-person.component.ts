import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';

import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    CDFlashingDirective,
  ],
  templateUrl: './add-person.component.html',
  host: {
    class: 'w-full flex flex-col items-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPersonComponent {
  cdr = inject(ChangeDetectorRef);

  @Output() submitted: EventEmitter<string> = new EventEmitter<string>();

  value = '';

  handleKey(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.submitted.emit(this.value);
      this.value = '';
      this.cdr.markForCheck();
    }
  }
}
