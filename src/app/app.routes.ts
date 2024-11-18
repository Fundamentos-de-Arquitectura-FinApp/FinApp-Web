import {Routes} from '@angular/router';
import {isNotAuthenticatedGuard} from './auth/guards/is-not-authenticated.guard';
import {isAuthenticatedGuard} from './auth/guards/is-authenticated.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./auth/routing/auth.routes').then(m => m.AuthRoutingModule),
  },
  {
    path: 'finapp',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./finapp/routing/finapp.routes').then(m => m.FinAppRoutingModule),
  },
  {
    path: '**',
    redirectTo: 'auth'
  },
];


