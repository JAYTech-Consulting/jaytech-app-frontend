import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ResumeService, Resume } from '../../../services/resume.service';
import { Auth } from '../../../services/auth';
import { ToastService } from '../../../shared/components/toast-container/toast.service';

@Component({
    selector: 'app-resume-list',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './resume-list.html',
    styleUrl: './resume-list.css',
})
export class ResumeList implements OnInit {
    resumes: Resume[] = [];
    isLoading = true;
    currentUser: any;

    constructor(
        private resumeService: ResumeService,
        private auth: Auth,
        private toast: ToastService
    ) {
        this.currentUser = this.auth.currentUser();
    }

    ngOnInit() {
        this.loadResumes();
    }

    loadResumes() {
        if (!this.currentUser) return;

        this.isLoading = true;
        this.resumeService.getResumes(this.currentUser.email).subscribe({
            next: (data) => {
                this.resumes = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error loading resumes', err);
                this.toast.error('Failed to load resumes');
                this.isLoading = false;
            }
        });
    }

    setDefault(id: string) {
        if (!this.currentUser) return;

        this.resumeService.setDefaultResume(this.currentUser.email, id).subscribe({
            next: () => {
                this.toast.success('Default resume updated');
                this.loadResumes();
            },
            error: () => {
                this.toast.error('Failed to update default resume');
            }
        });
    }

    deleteResume(id: string) {
        if (!confirm('Are you sure you want to delete this resume?')) {
            return;
        }

        this.resumeService.deleteResume(id).subscribe({
            next: () => {
                this.toast.success('Resume deleted successfully');
                this.loadResumes();
            },
            error: () => {
                this.toast.error('Failed to delete resume');
            }
        });
    }
}
