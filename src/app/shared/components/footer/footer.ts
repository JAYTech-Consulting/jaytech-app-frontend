import { Component } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface FooterLink {
    name: string;
    href: string;
}

interface SocialLink {
    name: string;
    icon: string; // For simplicity, use icon class or SVG string
    href: string;
}

@Component({
    selector: 'app-footer',
    imports: [KeyValuePipe, MatIconModule],
    templateUrl: './footer.html',
    styleUrl: './footer.css',
})
export class Footer {
    currentYear: number = new Date().getFullYear();
    footerLinks: Record<string, FooterLink[]> = {
        Product: [
            { name: 'Features', href: '#features' },
            { name: 'Pricing', href: '#pricing' },
            { name: 'Documentation', href: '#docs' },
            { name: 'API Reference', href: '#api' },
        ],
        Company: [
            { name: 'About Us', href: '#about' },
            { name: 'Careers', href: '#careers' },
            { name: 'Blog', href: '#blog' },
            { name: 'Press Kit', href: '#press' },
        ],
        Resources: [
            { name: 'Community', href: '#community' },
            { name: 'Help Center', href: '#help' },
            { name: 'Partners', href: '#partners' },
            { name: 'Status', href: '#status' },
        ],
        Legal: [
            { name: 'Privacy Policy', href: '#privacy' },
            { name: 'Terms of Service', href: '#terms' },
            { name: 'Cookie Policy', href: '#cookies' },
            { name: 'GDPR', href: '#gdpr' },
        ],
    };

    socialLinks: SocialLink[] = [
        { name: 'GitHub', icon: 'github', href: 'https://github.com' },
        { name: 'Twitter', icon: 'twitter', href: 'https://twitter.com' },
        { name: 'LinkedIn', icon: 'linkedin', href: 'https://linkedin.com' },
        { name: 'Email', icon: 'email', href: 'mailto:hello@modernui.com' },
    ];

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
