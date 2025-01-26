import { ApplicationConfig, importProvidersFrom, NgModule, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {  ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { costumeInterceptorInterceptor } from './service/costume-interceptor.interceptor';
import { ModalModule } from 'ngx-bootstrap/modal';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(),LoginComponent,
    NgModule,ReactiveFormsModule, provideHttpClient(withInterceptors([costumeInterceptorInterceptor])), provideAnimationsAsync(),importProvidersFrom(ModalModule.forRoot()),
  ]
};
