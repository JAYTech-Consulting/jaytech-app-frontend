import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JobPostService } from '../../../services/job-post.service';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './admin-dashboard.html',
    styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
    pendingJobsCount = 0;
    pendingApplicationsCount = 0;

    constructor(private jobService: JobPostService) { }

    ngOnInit() {
        this.loadCounts();
    }

    loadCounts() {
        this.jobService.getJobsByStatus('under_review').subscribe(jobs => {
            this.pendingJobsCount = jobs.length;
        });

        this.jobService.getApplicationsByStatus('submitted').subscribe(apps => {
            this.pendingApplicationsCount = apps.length;
        });
    }
}
