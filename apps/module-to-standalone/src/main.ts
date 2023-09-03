import { provideToken } from '@angular-challenges/module-to-standalone/core/providers';
import { appRoutes } from '@angular-challenges/module-to-standalone/shell';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes /* withDebugTracing() */),
    provideToken('main-shell-token'),
  ],
}).catch((error) => console.error(error));
