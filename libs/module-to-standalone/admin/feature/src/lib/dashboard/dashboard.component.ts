import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [RouterLink],
})
export class DashboardComponent {}
