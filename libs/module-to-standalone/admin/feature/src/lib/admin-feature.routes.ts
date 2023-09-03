import { Route } from '@angular/router';

export const adminRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (comp) => comp.DashboardComponent
      ),
  },
  {
    path: 'create-user',
    loadComponent: () =>
      import('./create-user/create-user.component').then(
        (comp) => comp.CreateUserComponent
      ),
  },
];
