import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { appRoutes } from './app.routes';
export const appConfig: ApplicationConfig = {
  // this option is awesome, but rarely used it seems
  providers: [
    provideRouter(appRoutes),
    [
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ],
  ],
};
