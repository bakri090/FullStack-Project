import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const haveAdminRoleGuard: CanActivateFn = (route, state) => {
let haveAdmin = inject(AuthService).isAdmin();
let router = inject(Router)
if(haveAdmin)
  return true;
else
  return router.createUrlTree(['home']);
};
