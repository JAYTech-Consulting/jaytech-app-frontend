import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { JobPostService, JobPost, JobStatus } from '../../../services/job-post.service';
import { ToastService } from '../../../shared/components/toast-container/toast.service';

@Component({
    selector: 'app-recruiter-jobs',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule],
    templateUrl: './recruiter-jobs.html',
    styleUrl: './recruiter-jobs.css',
})
export class RecruiterJobs implements OnInit {
    isLoading = true;
    jobs: JobPost[] = [];
    recruiterEmail: string = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private jobService: JobPostService,
        private toast: ToastService
    ) { }

    ngOnInit() {
        this.recruiterEmail = this.route.snapshot.paramMap.get('email') || '';
        if (this.recruiterEmail) {
            this.loadJobs();
        }
    }

    loadJobs() {
        this.isLoading = true;
        this.jobService.getJobsByRecruiter(this.recruiterEmail).subscribe({
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

    viewJobApplicants(job: JobPost) {
        this.router.navigate(['/admin/recruiter', this.recruiterEmail, 'job', job.id]);
    }

    updateJobStatus(job: JobPost) {
        this.jobService.updateJob(job.id, { status: job.status }).subscribe({
            next: () => {
                this.toast.success('Job status updated successfully');
            },
            error: () => {
                this.toast.error('Failed to update job status');
                this.loadJobs(); // Reload to revert changes
            }
        });
    }

    getStatusClass(status: string): string {
        switch (status) {
            case 'draft':
                return 'bg-gray-100 text-gray-800';
            case 'under_review':
                return 'bg-yellow-100 text-yellow-800';
            case 'published':
                return 'bg-green-100 text-green-800';
            case 'not_available':
                return 'bg-gray-100 text-gray-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }
}
