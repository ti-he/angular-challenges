import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  host: {
    class: 'flex flex-col p-4 gap-3',
  },
  imports: [RouterOutlet, RouterLink],
})
export class AppComponent {}
