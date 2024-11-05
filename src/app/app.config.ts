import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { TaskService } from './services/task.service';

export const appConfig: ApplicationConfig = {
  providers: [provideClientHydration(), TaskService, importProvidersFrom(HttpClientModule), provideHttpClient(withFetch())]
};
