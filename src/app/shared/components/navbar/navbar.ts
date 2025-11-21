import { Component, effect, HostListener, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Button } from '../button/button';
import { Auth } from '../../../services/auth';

@Component({
    selector: 'app-navbar',
    imports: [RouterLink, CommonModule, Button],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css',
})
export class Navbar {
    isMenuOpen = false;
    isProfileMenuOpen = false;

    constructor(
        public auth: Auth,
        private router: Router,
        private cdr: ChangeDetectorRef,
    ) {
        // React to auth state changes
        effect(() => {
            // This will trigger when auth state changes
            const isAuth = this.auth.isAuthenticated();
            // Manually trigger change detection to ensure template updates
            this.cdr.markForCheck();
        });
    }

    get isLoggedIn(): boolean {
        return this.auth.isAuthenticated();
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        // Close profile menu if clicking outside
        if (this.isProfileMenuOpen && !target.closest('.profile-menu-container')) {
            this.closeProfileMenu();
        }
    }

    get navigation() {
        const baseNav = [
            { name: 'Home', href: '/' },
            { name: 'About Us', href: '/about-us', isRoute: true },
            { name: 'Services', href: '/services', isRoute: true },
            { name: 'Contact Us', href: '/contact-us', isRoute: true },
        ];

        // Only show Dashboard in nav if logged in (it's still protected by guard)
        if (this.isLoggedIn) {
            baseNav.splice(3, 0, { name: 'Dashboard', href: '/dashboard', isRoute: true });
            baseNav.splice(4, 0, { name: 'Jobs', href: '/jobs', isRoute: true });
            baseNav.splice(5, 0, { name: 'My Applications', href: '/my-applications', isRoute: true });
            baseNav.splice(6, 0, { name: 'My Resumes', href: '/resumes', isRoute: true });
        }

        return baseNav;
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    closeMenu() {
        this.isMenuOpen = false;
    }

    toggleProfileMenu() {
        this.isProfileMenuOpen = !this.isProfileMenuOpen;
    }

    closeProfileMenu() {
        this.isProfileMenuOpen = false;
    }

    logout() {
        this.auth.logout();
        this.closeProfileMenu();
    }

    goToProfile() {
        this.router.navigate(['/profile']);
        this.closeProfileMenu();
    }

    getUserInitials(): string {
        const user = this.auth.getUser();
        if (!user?.name) return 'U';
        const names = user.name.trim().split(' ');
        if (names.length >= 2) {
            return (names[0][0] + names[names.length - 1][0]).toUpperCase();
        }
        return user.name.substring(0, 2).toUpperCase();
    }
}
