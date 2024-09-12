import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let auth = inject(AuthService);


  let isAdminLogged = auth.isAdminLoggedIn();
  if(isAdminLogged) {
    return true;
  }
  router.navigateByUrl("/signin/admin")
  return false
};

export const adminGuardSignin: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let auth = inject(AuthService);


  let isAdminLogged = auth.isAdminLoggedIn();
  if(!isAdminLogged) {
    return true;
  }
  router.navigateByUrl("/home/admin")
  return false
};
