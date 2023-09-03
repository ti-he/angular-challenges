import { Routes } from '@angular/router';

export const userContactRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (comp) => comp.ContactDashboardComponent
      ),
  },
  {
    path: 'create-contact',
    loadComponent: () =>
      import('./create-contact/create-contact.component').then(
        (comp) => comp.CreateContactComponent
      ),
  },
];
