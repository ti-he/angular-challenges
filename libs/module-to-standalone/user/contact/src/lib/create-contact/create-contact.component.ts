import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-create-contact',
  templateUrl: './create-contact.component.html',
  standalone: true,
  imports: [RouterLink],
})
export class CreateContactComponent {}
