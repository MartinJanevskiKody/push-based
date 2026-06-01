import { Route } from '@angular/router';
import { HomePage } from '@push-based/feature-pb-store';
import { ProductsPage } from '@push-based/feature-pb-store';
import { ProductDetails } from '@push-based/feature-pb-store';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'products/:category',
    component: ProductsPage,
  },
  {
    path: 'products/details/:id',
    component: ProductDetails,
  },
];
