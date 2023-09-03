import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-test',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './test.component.html',
})
export default class TestComponent {
  @Input('testId') testId = '';
  @Input('permission') permission = '';
  @Input('user') user = '';
}
