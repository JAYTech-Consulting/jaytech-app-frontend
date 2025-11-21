import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
    email: string;
    name: string;
    role: 'talent' | 'recruiter' | 'admin';
}

@Injectable({
    providedIn: 'root',
})
export class Auth {
    private readonly AUTH_KEY = 'jaytech_auth';
    private readonly USER_KEY = 'jaytech_user';

    // Use signal for reactive auth state
    isAuthenticated = signal<boolean>(false);
    currentUser = signal<User | null>(null);

    constructor(private router: Router) {
        // Check if user is already logged in (from localStorage)
        this.checkAuthState();
    }

    private checkAuthState(): void {
        const authToken = localStorage.getItem(this.AUTH_KEY);
        const userStr = localStorage.getItem(this.USER_KEY);

        if (authToken && userStr) {
            try {
                const user = JSON.parse(userStr);
                this.isAuthenticated.set(true);
                this.currentUser.set(user);
            } catch {
                this.logout();
            }
        }
    }

    login(email: string, password: string, role: string): Promise<{ success: boolean; message?: string }> {
        return new Promise((resolve) => {
            // Simulate API call
            setTimeout(() => {
                // Mock validation - accept any email/password combination
                // For admin, require specific email
                if (role === 'admin' && email !== 'admin@jaytech.com') {
                    resolve({ success: false, message: 'Invalid admin credentials' });
                    return;
                }

                if (email && password && role) {
                    const user: User = {
                        email,
                        name: role === 'admin' ? 'Administrator' : email.split('@')[0], // Extract name from email
                        role: role as 'talent' | 'recruiter' | 'admin',
                    };

                    // Store auth token and user data
                    localStorage.setItem(this.AUTH_KEY, 'mock-auth-token-' + Date.now());
                    localStorage.setItem(this.USER_KEY, JSON.stringify(user));

                    this.isAuthenticated.set(true);
                    this.currentUser.set(user);

                    resolve({ success: true });
                } else {
                    resolve({ success: false, message: 'Invalid credentials' });
                }
            }, 1500);
        });
    }

    register(name: string, email: string, password: string, role: string): Promise<{ success: boolean; message?: string }> {
        return new Promise((resolve) => {
            // Simulate API call
            setTimeout(() => {
                // Mock validation - accept any valid data
                if (name && email && password && role) {
                    const user: User = {
                        email,
                        name,
                        role: role as 'talent' | 'recruiter' | 'admin',
                    };

                    // Store auth token and user data
                    localStorage.setItem(this.AUTH_KEY, 'mock-auth-token-' + Date.now());
                    localStorage.setItem(this.USER_KEY, JSON.stringify(user));

                    this.isAuthenticated.set(true);
                    this.currentUser.set(user);

                    resolve({ success: true });
                } else {
                    resolve({ success: false, message: 'Registration failed' });
                }
            }, 1500);
        });
    }

    logout(): void {
        localStorage.removeItem(this.AUTH_KEY);
        localStorage.removeItem(this.USER_KEY);
        this.isAuthenticated.set(false);
        this.currentUser.set(null);
        this.router.navigate(['/']);
    }

    getAuthToken(): string | null {
        return localStorage.getItem(this.AUTH_KEY);
    }

    getUser(): User | null {
        return this.currentUser();
    }
}
