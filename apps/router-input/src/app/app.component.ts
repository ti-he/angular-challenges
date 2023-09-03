import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink, RouterModule, ReactiveFormsModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  userName = new FormControl();
  testId = new FormControl();
}
