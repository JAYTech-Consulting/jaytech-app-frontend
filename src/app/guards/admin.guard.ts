import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

export const adminGuard = () => {
    const auth = inject(Auth);
    const router = inject(Router);

    const user = auth.getUser();
    if (user && user.role === 'admin') {
        return true;
    }

    router.navigate(['/admin/login']);
    return false;
};
