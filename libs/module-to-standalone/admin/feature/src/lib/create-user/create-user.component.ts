import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-create-user',
  templateUrl: './create-user.component.html',
  standalone: true,
  imports: [RouterLink],
})
export class CreateUserComponent {}
