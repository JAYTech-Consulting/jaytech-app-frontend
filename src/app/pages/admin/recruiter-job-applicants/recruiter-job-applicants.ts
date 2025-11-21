import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JobPostService, JobPost, JobApplication, JobApplicationStatus } from '../../../services/job-post.service';
import { ToastService } from '../../../shared/components/toast-container/toast.service';

@Component({
    selector: 'app-recruiter-job-applicants',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    templateUrl: './recruiter-job-applicants.html',
    styleUrl: './recruiter-job-applicants.css',
})
export class RecruiterJobApplicants implements OnInit {
    isLoading = true;
    applicants: JobApplication[] = [];
    recruiterEmail: string = '';
    jobId: string = '';
    jobTitle: string = '';

    constructor(
        private route: ActivatedRoute,
        private jobService: JobPostService,
        private toast: ToastService
    ) { }

    ngOnInit() {
        this.recruiterEmail = this.route.snapshot.paramMap.get('email') || '';
        this.jobId = this.route.snapshot.paramMap.get('jobId') || '';

        if (this.jobId) {
            this.loadJobAndApplicants();
        }
    }

    loadJobAndApplicants() {
        this.isLoading = true;

        // Load job details
        this.jobService.getJob(this.jobId).subscribe({
            next: (job) => {
                if (job) {
                    this.jobTitle = job.title;
                }
            }
        });

        // Load all applicants (including submitted ones for admin view)
        this.jobService.getAllApplications().subscribe({
            next: (data) => {
                this.applicants = data.filter(app => app.jobId === this.jobId);
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error loading applicants', err);
                this.isLoading = false;
            }
        });
    }

    updateApplicantStatus(applicant: JobApplication) {
        this.jobService.updateApplicationStatus(applicant.id, applicant.status).subscribe({
            next: () => {
                this.toast.success('Applicant status updated successfully');
            },
            error: () => {
                this.toast.error('Failed to update applicant status');
                this.loadJobAndApplicants(); // Reload to revert changes
            }
        });
    }

    getStatusClass(status: string): string {
        switch (status) {
            case 'submitted':
                return 'bg-blue-100 text-blue-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'shortlisted':
                return 'bg-purple-100 text-purple-800';
            case 'offered':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }
}
