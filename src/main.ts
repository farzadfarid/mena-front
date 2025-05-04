import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideToastr } from 'ngx-toastr';
import { FakeBackendInterceptor } from './app/Core/Interceptores/fake-backend.interceptor';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';

import { TranslateLoader, TranslateService, TranslateStore, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { importProvidersFrom } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LanguageInterceptor } from './app/Core/Interceptores/LanguageInterceptor/language.interceptor';
import { tokenInterceptor } from './app/Core/Interceptores/TokenInterceptor/token.interceptor';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    provideIonicAngular(),
    provideToastr(),
    provideAnimations(),

    provideRouter(routes, withPreloading(PreloadAllModules)),

    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([LanguageInterceptor, tokenInterceptor])
    ),

    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },

    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),

    TranslateService,
    TranslateStore,
    ModalController
  ],
}).catch(err => console.error(err));
