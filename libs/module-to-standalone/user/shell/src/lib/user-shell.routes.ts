import { provideToken } from '@angular-challenges/module-to-standalone/core/providers';
import { Route } from '@angular/router';

export const userShellRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./user-shell.component').then((comp) => comp.UserShellComponent),

    providers: [provideToken('user-token')],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('@angular-challenges/module-to-standalone/user/home').then(
            (comp) => comp.UserHomeComponent
          ),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('@angular-challenges/module-to-standalone/user/contact').then(
            (mod) => mod.userContactRoutes
          ),
      },
    ],
  },
];
