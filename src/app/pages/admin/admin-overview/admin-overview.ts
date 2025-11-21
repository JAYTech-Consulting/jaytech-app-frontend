import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../services/auth';

@Component({
    selector: 'app-admin-overview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './admin-overview.html',
    styleUrl: './admin-overview.css',
})
export class AdminOverview implements OnInit {
    isLoading = true;
    recruiters: User[] = [];

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadRecruiters();
    }

    loadRecruiters() {
        this.isLoading = true;
        this.userService.getRecruiters().subscribe({
            next: (data) => {
                this.recruiters = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error loading recruiters', err);
                this.isLoading = false;
            }
        });
    }

    viewRecruiterJobs(recruiter: User) {
        this.router.navigate(['/admin/recruiter', recruiter.email]);
    }

    getInitials(name: string): string {
        const names = name.trim().split(' ');
        if (names.length >= 2) {
            return (names[0][0] + names[names.length - 1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    }
}
