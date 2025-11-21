import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobPostService, JobPost } from '../../../services/job-post.service';
import { Button } from '../../../shared/components/button/button';
import { Card } from '../../../shared/components/card/card';
import { CardContent } from '../../../shared/components/card-content/card-content';
import { ToastService } from '../../../shared/components/toast-container/toast.service';
import { Auth } from '../../../services/auth';

@Component({
    selector: 'app-talent-job-board',
    standalone: true,
    imports: [
        CommonModule,
        Button,
        Card,
        CardContent,
    ],
    templateUrl: './talent-job-board.html',
    styleUrl: './talent-job-board.css',
})
export class TalentJobBoard implements OnInit {
    jobs: JobPost[] = [];
    isLoading = true;
    applyingJobIds: Set<string> = new Set();
    selectedJob: JobPost | null = null;

    constructor(
        private jobService: JobPostService,
        private toast: ToastService,
        private auth: Auth
    ) { }

    ngOnInit() {
        this.loadJobs();
    }

    loadJobs() {
        this.isLoading = true;
        this.jobService.getPublishedJobs().subscribe({
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

    openJobDetails(job: JobPost) {
        this.selectedJob = job;
    }

    closeJobDetails() {
        this.selectedJob = null;
    }

    isApplying(jobId: string): boolean {
        return this.applyingJobIds.has(jobId);
    }

    apply(job: JobPost) {
        const user = this.auth.getUser();
        if (!user) {
            this.toast.error('Please login to apply for jobs');
            return;
        }

        this.applyingJobIds.add(job.id);

        // Mock applicant data from current user
        const applicantData = {
            applicantName: user.name || 'Unknown',
            applicantEmail: user.email || 'unknown@example.com',
            skills: ['Angular', 'TypeScript'], // Mock skills
            experience: '3 years', // Mock experience
            resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' // Mock resume
        };

        this.jobService.applyForJob(job.id, applicantData).subscribe({
            next: () => {
                this.toast.success(`Successfully applied for ${job.title}`);
                this.applyingJobIds.delete(job.id);
                this.closeJobDetails();
            },
            error: (err) => {
                console.error('Error applying for job', err);
                this.toast.error('Failed to apply for job');
                this.applyingJobIds.delete(job.id);
            }
        });
    }
}
