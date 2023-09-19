import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule],
  template: `<p>search-input works!</p>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {}
