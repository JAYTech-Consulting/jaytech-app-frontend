import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { JobPostService, JobStatus } from '../../../services/job-post.service';
import { Label } from '../../../shared/components/label/label';
import { InputComponent } from '../../../shared/components/input/input';
import { Button } from '../../../shared/components/button/button';
import { Card } from '../../../shared/components/card/card';
import { CardContent } from '../../../shared/components/card-content/card-content';
import { ToastService } from '../../../shared/components/toast-container/toast.service';

@Component({
    selector: 'app-job-post-form',
    imports: [
        ReactiveFormsModule,
        CommonModule,
        RouterLink,
        Label,
        InputComponent,
        Button,
        Card,
        CardContent,
    ],
    templateUrl: './job-post-form.html',
    styleUrl: './job-post-form.css',
})
export class JobPostForm implements OnInit {
    jobForm: FormGroup;
    isSubmitting = false;
    isEditMode = false;
    jobId: string | null = null;

    employmentTypes = [
        'Full-time',
        'Part-time',
        'Contract',
        'Freelance',
        'Internship',
    ];

    constructor(
        private fb: FormBuilder,
        private jobService: JobPostService,
        private router: Router,
        private route: ActivatedRoute,
        private toast: ToastService
    ) {
        this.jobForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', [Validators.required, Validators.minLength(50)]],
            requirements: ['', Validators.required],
            location: ['', Validators.required],
            salaryRange: ['', Validators.required],
            employmentType: ['', Validators.required],
        });
    }

    ngOnInit() {
        this.jobId = this.route.snapshot.paramMap.get('id');
        if (this.jobId) {
            this.isEditMode = true;
            this.loadJob(this.jobId);
        }
    }

    loadJob(id: string) {
        this.jobService.getJob(id).subscribe({
            next: (job) => {
                if (job) {
                    this.jobForm.patchValue({
                        title: job.title,
                        description: job.description,
                        requirements: job.requirements,
                        location: job.location,
                        salaryRange: job.salaryRange,
                        employmentType: job.employmentType,
                    });
                } else {
                    this.toast.error('Job not found');
                    this.router.navigate(['/recruiter/jobs']);
                }
            },
            error: () => {
                this.toast.error('Error loading job details');
                this.router.navigate(['/recruiter/jobs']);
            },
        });
    }

    onSubmit() {
        if (this.jobForm.invalid) {
            this.jobForm.markAllAsTouched();
            return;
        }

        this.isSubmitting = true;
        const formValue = this.jobForm.value;

        if (this.isEditMode && this.jobId) {
            this.jobService.updateJob(this.jobId, formValue).subscribe({
                next: () => {
                    this.isSubmitting = false;
                    this.toast.success('Job updated successfully');
                    this.router.navigate(['/recruiter/jobs']);
                },
                error: () => {
                    this.isSubmitting = false;
                    this.toast.error('Failed to update job');
                },
            });
        } else {
            const newJob = {
                ...formValue,
                status: 'under_review' as JobStatus,
            };

            this.jobService.createJob(newJob).subscribe({
                next: () => {
                    this.isSubmitting = false;
                    this.toast.success('Job created successfully');
                    this.router.navigate(['/recruiter/jobs']);
                },
                error: () => {
                    this.isSubmitting = false;
                    this.toast.error('Failed to create job');
                },
            });
        }
    }

    get f() {
        return this.jobForm.controls;
    }
}
