import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JobPost, JobPostService } from '../../../services/job-post.service';
import { Button } from '../../../shared/components/button/button';
import { Card } from '../../../shared/components/card/card';
import { CardContent } from '../../../shared/components/card-content/card-content';

@Component({
    selector: 'app-job-post-list',
    imports: [
        CommonModule,
        RouterLink,
        Button,
        Card,
        CardContent,
    ],
    templateUrl: './job-post-list.html',
    styleUrl: './job-post-list.css',
})
export class JobPostList implements OnInit {
    jobs: JobPost[] = [];
    isLoading = true;

    constructor(private jobService: JobPostService) { }

    ngOnInit() {
        this.loadJobs();
    }

    loadJobs() {
        this.isLoading = true;
        this.jobService.getJobs().subscribe({
            next: (data) => {
                this.jobs = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error loading jobs', err);
                this.isLoading = false;
            },
        });
    }

    getStatusClass(status: string): string {
        switch (status) {
            case 'draft':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'under-review':
                return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'not-available':
                return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            case 'rejected':
                return 'bg-red-50 text-red-700 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }

    getStatusLabel(status: string): string {
        return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
}
