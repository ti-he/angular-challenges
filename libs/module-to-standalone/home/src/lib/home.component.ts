import { TOKEN } from '@angular-challenges/module-to-standalone/core/providers';
import { AuthorizationService } from '@angular-challenges/module-to-standalone/core/service';
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [AsyncPipe],
})
export class HomeComponent {
  public authorizeService = inject(AuthorizationService);
  public token = inject(TOKEN);
}
