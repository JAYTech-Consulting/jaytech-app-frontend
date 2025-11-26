import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Footer } from '../../shared/components/footer/footer';
import { Card } from '../../shared/components/card/card';
import { CardHeader } from '../../shared/components/card-header/card-header';
import { CardTitle } from '../../shared/components/card-title/card-title';
import { CardContent } from '../../shared/components/card-content/card-content';
import { CardDescription } from '../../shared/components/card-description/card-description';
import { Button } from '../../shared/components/button/button';
import { Auth } from '../../services/auth';
import { JobPostService } from '../../services/job-post.service';
import { UserService } from '../../services/user.service';
import { ResumeService } from '../../services/resume.service';

@Component({
    selector: 'app-dashboard',
    imports: [
        Footer,
        RouterLink,
        Card,
        CardHeader,
        CardTitle,
        CardContent,
        CardDescription,
        Button
    ],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.css',
})
export class Dashboard {
    currentUser;

    // Admin KPIs
    totalUsers = 0;
    totalJobs = 0;
    totalRecruiters = 0;
    pendingApprovals = 0;

    // Recruiter KPIs
    activeJobs = 0;
    totalApplicants = 0;

    // Talent KPIs
    jobsApplied = 0;
    resumesCreated = 0;
    profileViews = 12; // Mock data

    constructor(
        private auth: Auth,
        private jobService: JobPostService,
        private userService: UserService,
        private resumeService: ResumeService
    ) {
        this.currentUser = this.auth.currentUser;
        this.loadDashboardData();
    }

    loadDashboardData() {
        const user = this.currentUser();
        if (!user) return;

        if (user.role === 'admin') {
            this.userService.getAllUsers().subscribe((users: any[]) => {
                this.totalUsers = users.length;
                this.totalRecruiters = users.filter((u: any) => u.role === 'recruiter').length;
            });
            this.jobService.getAllJobs().subscribe((jobs: any[]) => {
                this.totalJobs = jobs.length;
                this.pendingApprovals = jobs.filter((j: any) => j.status === 'under_review').length;
            });
        } else if (user.role === 'recruiter') {
            this.jobService.getJobsByRecruiter(user.email).subscribe((jobs: any[]) => {
                this.activeJobs = jobs.filter((j: any) => j.status === 'published').length;
            });
            this.jobService.getTotalApplicationsForRecruiter(user.email).subscribe((count: number) => {
                this.totalApplicants = count;
            });
        } else if (user.role === 'talent') {
            this.jobService.getApplicationsByEmail(user.email).subscribe((apps: any[]) => {
                this.jobsApplied = apps.length;
            });
            this.resumeService.getResumes(user.email).subscribe((resumes: any[]) => {
                this.resumesCreated = resumes.length;
            });
        }
    }
}

