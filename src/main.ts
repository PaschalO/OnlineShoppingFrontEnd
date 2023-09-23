import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
//import { provideRouter } from '@angular/router';
//import routeConfig from './app/routes';
//import {bootstrapApplication, provideProtractorTestingSupport} from "@angular/platform-browser";
//import {AppComponent} from "./app/app.component";


/*
bootstrapApplication(AppModule,
    {
        providers: [
            provideProtractorTestingSupport(),
            provideRouter(routeConfig)
        ]
    }
).catch(err => console.error(err));
*/




platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
