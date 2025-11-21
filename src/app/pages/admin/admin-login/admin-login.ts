import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../services/auth';
import { ToastService } from '../../../shared/components/toast-container/toast.service';

@Component({
    selector: 'app-admin-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin-login.html',
    styleUrl: './admin-login.css',
})
export class AdminLogin {
    email = 'admin@jaytech.com';
    password = '';
    isLoading = false;

    constructor(
        private auth: Auth,
        private router: Router,
        private toast: ToastService
    ) { }

    async onSubmit() {
        if (!this.email || !this.password) {
            this.toast.error('Please fill in all fields');
            return;
        }

        this.isLoading = true;
        try {
            const result = await this.auth.login(this.email, this.password, 'admin');
            if (result.success) {
                this.toast.success('Welcome back, Admin!');
                this.router.navigate(['/admin/dashboard']);
            } else {
                this.toast.error(result.message || 'Login failed');
            }
        } catch (error) {
            this.toast.error('An error occurred during login');
        } finally {
            this.isLoading = false;
        }
    }
}
