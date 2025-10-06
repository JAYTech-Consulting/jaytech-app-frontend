import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Button } from '../button/button';

@Component({
    selector: 'app-navbar',
    imports: [RouterLink, CommonModule, Button],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css',
})
export class Navbar {
    isMenuOpen = false;

    navigation = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about-us', isRoute: true },
        { name: 'Services', href: '/services', isRoute: true },
        { name: 'Contact Us', href: '/contact-us', isRoute: true },
    ];

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    closeMenu() {
        this.isMenuOpen = false;
    }
}
