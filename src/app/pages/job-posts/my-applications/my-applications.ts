import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JobPostService, JobApplication } from '../../../services/job-post.service';
import { Card } from '../../../shared/components/card/card';
import { CardContent } from '../../../shared/components/card-content/card-content';
import { Auth } from '../../../services/auth';

interface ApplicationWithJob extends JobApplication {
    jobTitle: string;
}

@Component({
    selector: 'app-my-applications',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        Card,
        CardContent,
    ],
    templateUrl: './my-applications.html',
    styleUrl: './my-applications.css',
})
export class MyApplications implements OnInit {
    applications: ApplicationWithJob[] = [];
    isLoading = true;

    constructor(
        private jobService: JobPostService,
        private auth: Auth
    ) { }

    ngOnInit() {
        this.loadApplications();
    }

    loadApplications() {
        const user = this.auth.getUser();
        if (!user || !user.email) {
            this.isLoading = false;
            return;
        }

        this.isLoading = true;
        this.jobService.getApplicationsByEmail(user.email).subscribe({
            next: (data) => {
                this.applications = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error loading applications', err);
                this.isLoading = false;
            }
        });
    }

    getStatusClass(status: string): string {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'shortlisted':
                return 'bg-blue-100 text-blue-800';
            case 'offered':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }
}
