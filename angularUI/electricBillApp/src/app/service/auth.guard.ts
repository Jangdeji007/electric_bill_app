import { CanActivateFn, Router } from '@angular/router';
import { AdminLoginService } from './admin-login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const adminLoginService = inject(AdminLoginService);

  // Get the token and role from localStorage
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (token) {
    const expectedRoles = route.data?.['roles'] || [];
    if (expectedRoles.length === 0 || expectedRoles.includes(userRole)) {
      return true; // Allow access if the role matches
    }
    // Role doesn't match, redirect to unauthorized page or login
    router.navigate(['/unauthorized']);
    return false;
  }

  // If no token, redirect to login
  router.navigate(['/login']);
  return false;
};
