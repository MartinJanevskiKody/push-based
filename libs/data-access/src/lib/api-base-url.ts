import { InjectionToken } from '@angular/core';

export const DUMMYJSON_BASE_URL = new InjectionToken<string>(
  'DUMMYJSON_BASE_URL',
  {
    providedIn: 'root',
    factory: () => 'https://dummyjson.com',
  },
);
