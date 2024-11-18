import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AuthStatusEnum} from '../emun/status-enum';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatusEnum.authenticated) {
    router.navigateByUrl('/finapp');
    return false;
  }
  return true;
};
