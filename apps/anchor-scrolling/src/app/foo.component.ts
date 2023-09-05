import { Component } from '@angular/core';
import { NavButtonComponent } from './nav-button.component';

@Component({
  standalone: true,
  imports: [NavButtonComponent],
  selector: 'app-foo',
  templateUrl: './foo.component.html',
})
export class FooComponent {}
