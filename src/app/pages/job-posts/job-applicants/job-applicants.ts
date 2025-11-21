import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JobPostService, JobApplication, JobApplicationStatus } from '../../../services/job-post.service';
import { Card } from '../../../shared/components/card/card';
import { CardContent } from '../../../shared/components/card-content/card-content';
import { ToastService } from '../../../shared/components/toast-container/toast.service';

@Component({
    selector: 'app-job-applicants',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        Card,
        CardContent,
    ],
    templateUrl: './job-applicants.html',
    styleUrl: './job-applicants.css',
})
export class JobApplicants implements OnInit {
    applicants: JobApplication[] = [];
    isLoading = true;
    jobTitle: string = '';
    jobId: string | null = null;

    statusOptions: JobApplicationStatus[] = ['pending', 'shortlisted', 'offered', 'rejected'];

    constructor(
        private route: ActivatedRoute,
        private jobService: JobPostService,
        private toast: ToastService
    ) { }

    ngOnInit() {
        this.jobId = this.route.snapshot.paramMap.get('id');
        if (this.jobId) {
            this.loadData(this.jobId);
        }
    }

    loadData(jobId: string) {
        this.isLoading = true;

        // Load job details for title
        this.jobService.getJob(jobId).subscribe(job => {
            if (job) {
                this.jobTitle = job.title;
            }
        });

        // Load applicants
        this.jobService.getJobApplications(jobId).subscribe({
            next: (data) => {
                this.applicants = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error loading applicants', err);
                this.isLoading = false;
            }
        });
    }

    onStatusChange(applicant: JobApplication, event: Event) {
        const select = event.target as HTMLSelectElement;
        const newStatus = select.value as JobApplicationStatus;

        this.jobService.updateApplicationStatus(applicant.id, newStatus).subscribe({
            next: (updatedApp) => {
                applicant.status = updatedApp.status;
                this.toast.success('Application status updated');
            },
            error: (err) => {
                console.error('Error updating status', err);
                this.toast.error('Failed to update status');
                // Revert the select value
                select.value = applicant.status;
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
