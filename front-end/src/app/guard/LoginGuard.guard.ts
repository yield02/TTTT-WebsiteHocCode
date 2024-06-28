import type { CanActivateFn, CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable, inject } from '@angular/core';

export const loginGuardGuard: CanMatchFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.isLoginGuard();
};
