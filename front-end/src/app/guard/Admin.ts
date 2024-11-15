import type { CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const Admin: CanMatchFn = (route, state) => {
    const authService = inject(AuthService);
    return authService.isAdmin();
};
