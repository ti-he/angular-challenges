import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-test',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './test.component.html',
})
export default class TestComponent {
  @Input() testId = '';
  @Input() permission = '';
  @Input() user = '';
}
