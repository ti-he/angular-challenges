import { TOKEN } from '@angular-challenges/module-to-standalone/core/providers';
import { Component, Inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'lib-user-shell',
  standalone: true,
  templateUrl: './user-shell.component.html',
  host: {
    class: 'flex flex-col p-4 gap-3 border border-blue',
  },
  imports: [RouterOutlet, RouterLink],
})
export class UserShellComponent {
  constructor(@Inject(TOKEN) public token: string) {}
}
