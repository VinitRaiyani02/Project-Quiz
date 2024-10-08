import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRole } from '../enums/userrole.enum';


export const adminGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let role = sessionStorage.getItem("role");
  let token = sessionStorage.getItem("token");
  if ((Number)(role) == UserRole.Admin && token != null) {
    return true;
  }
  router.navigate([""]);
  return false;
};

export const userGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let role = sessionStorage.getItem("role");
  let token = sessionStorage.getItem("token");
  if ((Number)(role) == UserRole.User && token != null) {
    return true;
  }
  router.navigate([""]);
  return false;
};
