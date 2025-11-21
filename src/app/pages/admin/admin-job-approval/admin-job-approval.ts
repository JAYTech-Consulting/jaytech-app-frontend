import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JobPostService, JobPost } from '../../../services/job-post.service';
import { ToastService } from '../../../shared/components/toast-container/toast.service';

@Component({
    selector: 'app-admin-job-approval',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './admin-job-approval.html',
    styleUrl: './admin-job-approval.css',
})
export class AdminJobApproval implements OnInit {
    jobs: JobPost[] = [];
    isLoading = true;

    constructor(
        private jobService: JobPostService,
        private toast: ToastService
    ) { }

    ngOnInit() {
        this.loadJobs();
    }

    loadJobs() {
        this.isLoading = true;
        this.jobService.getJobsByStatus('under_review').subscribe({
            next: (data) => {
                this.jobs = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error loading jobs', err);
                this.isLoading = false;
            }
        });
    }

    approveJob(job: JobPost) {
        if (confirm(`Are you sure you want to approve "${job.title}"?`)) {
            this.jobService.approveJob(job.id).subscribe({
                next: () => {
                    this.toast.success('Job approved successfully');
                    this.loadJobs();
                },
                error: () => this.toast.error('Failed to approve job')
            });
        }
    }

    rejectJob(job: JobPost) {
        if (confirm(`Are you sure you want to reject "${job.title}"?`)) {
            this.jobService.rejectJob(job.id).subscribe({
                next: () => {
                    this.toast.success('Job rejected');
                    this.loadJobs();
                },
                error: () => this.toast.error('Failed to reject job')
            });
        }
    }
}
