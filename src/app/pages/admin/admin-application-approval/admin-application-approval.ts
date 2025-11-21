import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JobPostService, JobApplication } from '../../../services/job-post.service';
import { ToastService } from '../../../shared/components/toast-container/toast.service';

interface ApplicationWithJob extends JobApplication {
    jobTitle: string;
}

@Component({
    selector: 'app-admin-application-approval',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './admin-application-approval.html',
    styleUrl: './admin-application-approval.css',
})
export class AdminApplicationApproval implements OnInit {
    applications: ApplicationWithJob[] = [];
    isLoading = true;

    constructor(
        private jobService: JobPostService,
        private toast: ToastService
    ) { }

    ngOnInit() {
        this.loadApplications();
    }

    loadApplications() {
        this.isLoading = true;
        this.jobService.getApplicationsByStatus('submitted').subscribe({
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

    approveApplication(app: ApplicationWithJob) {
        if (confirm(`Approve application from ${app.applicantName} for ${app.jobTitle}?`)) {
            this.jobService.approveApplication(app.id).subscribe({
                next: () => {
                    this.toast.success('Application approved successfully');
                    this.loadApplications();
                },
                error: () => this.toast.error('Failed to approve application')
            });
        }
    }
}
