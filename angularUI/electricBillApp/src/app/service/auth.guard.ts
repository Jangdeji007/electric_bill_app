import { CanActivateFn, Router } from '@angular/router';
import { AdminLoginService } from './admin-login.service';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {
  const router= inject(Router)
  const token = localStorage.getItem('token');
  if(token)
  {
    return true;
  }
  router.navigate(["login"]);
  return false;

};
