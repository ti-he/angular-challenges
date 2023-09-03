import { IsAuthorizedGuard } from '@angular-challenges/module-to-standalone/admin/shared';
import { inject } from '@angular/core';
import { Route } from '@angular/router';

const isAuthorizedGuardFn = () => inject(IsAuthorizedGuard).canActivate();

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('@angular-challenges/module-to-standalone/home').then(
        (comp) => comp.HomeComponent
      ),
  },
  {
    path: 'admin',
    canActivate: [isAuthorizedGuardFn],
    loadChildren: () =>
      import('@angular-challenges/module-to-standalone/admin/feature').then(
        (comp) => comp.adminRoutes
      ),
  },
  {
    path: 'forbidden',
    loadComponent: () =>
      import('@angular-challenges/module-to-standalone/forbidden').then(
        (comp) => comp.ForbiddenComponent
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('@angular-challenges/module-to-standalone/user/shell').then(
        (comp) => comp.userShellRoutes
      ),
  },
];
