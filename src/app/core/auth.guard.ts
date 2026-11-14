// CanActivateFn: Type for functional route guards (decides if navigation is allowed)
// Router: Used to navigate/redirect to other routes (ex: /login)
import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
  route, // "route" contains info about the route being accessed (path, params, data, etc.)
  state, // "state" contains navigation info (mainly state.url = the requested URL)
) => {
  // Get AuthService instance using Angular's inject() (since this is a function guard)
  const auth = inject(AuthService);
  // Get Router instance to redirect user if not logged in
  const router = inject(Router);

  // If user is logged in, allow access to the route
  if (auth.isLoggedIn()) return true;
  // If not logged in, redirect to Login page
  // returnUrl helps bring the user back to the same page after successful login
  router.navigate(['/login'], { queryParams: { returnURL: state.url } });
  return true;
};
