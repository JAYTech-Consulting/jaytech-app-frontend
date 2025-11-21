import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Label } from '../../shared/components/label/label';
import { InputComponent } from '../../shared/components/input/input';
import { Button } from '../../shared/components/button/button';
import { Card } from '../../shared/components/card/card';
import { CardHeader } from '../../shared/components/card-header/card-header';
import { CardTitle } from '../../shared/components/card-title/card-title';
import { CardContent } from '../../shared/components/card-content/card-content';
import { CardDescription } from '../../shared/components/card-description/card-description';
import { Auth } from '../../services/auth';
import { ToastService } from '../../shared/components/toast-container/toast.service';
import { TalentProfileService } from '../../services/talent-profile.service';

@Component({
    selector: 'app-talent-profile',
    imports: [
        ReactiveFormsModule,
        CommonModule,
        RouterLink,
        Label,
        InputComponent,
        Button,
        Card,
        CardHeader,
        CardTitle,
        CardContent,
        CardDescription,
    ],
    templateUrl: './talent-profile.html',
    styleUrl: './talent-profile.css',
})
export class TalentProfile implements OnInit {
    profileForm: FormGroup;
    isSubmitting = false;
    currentUser: any;

    experienceLevels = [
        'Entry Level (0-2 years)',
        'Mid Level (3-5 years)',
        'Senior Level (5-8 years)',
        'Lead/Principal (8+ years)',
        'Executive',
    ];

    employmentTypes = [
        'Full-time',
        'Part-time',
        'Contract',
        'Freelance',
        'Internship',
    ];

    constructor(
        private fb: FormBuilder,
        private auth: Auth,
        private toast: ToastService,
        private talentProfileService: TalentProfileService
    ) {
        this.currentUser = this.auth.getUser();
        this.profileForm = this.fb.group({
            // Personal Information (PII)
            firstName: ['', [Validators.required, Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
            dob: ['', Validators.required],
            address: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5,6}$/)]],
            ssnLast4: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]], // PII - Sensitive

            // Professional Details
            currentTitle: ['', Validators.required],
            yearsOfExperience: ['', [Validators.required, Validators.min(0)]],
            skills: ['', Validators.required], // Comma separated
            linkedInUrl: ['', [Validators.pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)]],
            portfolioUrl: ['', [Validators.pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)]],

            // Job Preferences
            preferredRole: ['', Validators.required],
            expectedSalary: ['', Validators.required],
            employmentType: ['', Validators.required],
            relocation: [false],

            // Resume (Mock)
            resume: [null], // In a real app this would be a file input handling
        });
    }

    ngOnInit() {
        this.loadProfile();
    }

    loadProfile() {
        const user = this.auth.getUser();
        if (user && user.email) {
            this.talentProfileService.getTalentProfile(user.email).subscribe({
                next: (profile) => {
                    if (profile) {
                        this.profileForm.patchValue({
                            firstName: profile.firstName,
                            lastName: profile.lastName,
                            email: profile.email,
                            phone: profile.phone,
                            dob: profile.dob,
                            address: profile.address,
                            city: profile.city,
                            state: profile.state,
                            zipCode: profile.zipCode,
                            linkedInUrl: profile.linkedIn,
                            portfolioUrl: profile.portfolio,
                            skills: profile.skills.join(', '),
                            expectedSalary: profile.expectedSalary,
                            relocation: profile.willingToRelocate
                        });
                    }
                },
                error: (err) => {
                    console.error('Error loading profile', err);
                }
            });
        }
    }
    onSubmit() {
        if (this.profileForm.valid) {
            this.isSubmitting = true;
            const user = this.auth.getUser();

            if (!user || !user.email) {
                this.toast.error('User not authenticated');
                this.isSubmitting = false;
                return;
            }

            const formValue = this.profileForm.value;
            const profileData = {
                userId: user.email,
                firstName: formValue.firstName,
                lastName: formValue.lastName,
                email: formValue.email,
                phone: formValue.phone,
                dob: formValue.dob,
                address: formValue.address,
                city: formValue.city,
                state: formValue.state,
                zipCode: formValue.zipCode,
                linkedIn: formValue.linkedInUrl,
                github: formValue.portfolioUrl, // Using portfolio as github for now
                portfolio: formValue.portfolioUrl,
                skills: formValue.skills.split(',').map((s: string) => s.trim()).filter((s: string) => s),
                experienceLevel: formValue.yearsOfExperience,
                preferredJobTypes: [formValue.employmentType],
                expectedSalary: formValue.expectedSalary,
                availability: 'Immediate',
                willingToRelocate: formValue.relocation,
                bio: '',
                createdAt: new Date(),
                updatedAt: new Date()
            };

            this.talentProfileService.updateTalentProfile(profileData).subscribe({
                next: () => {
                    this.toast.success('Profile updated successfully!');
                    this.isSubmitting = false;
                },
                error: (err) => {
                    // If update fails, try creating
                    this.talentProfileService.createTalentProfile(profileData).subscribe({
                        next: () => {
                            this.toast.success('Profile created successfully!');
                            this.isSubmitting = false;
                        },
                        error: () => {
                            this.toast.error('Failed to save profile');
                            this.isSubmitting = false;
                        }
                    });
                }
            });
        } else {
            // Mark all fields as touched to show validation errors
            Object.keys(this.profileForm.controls).forEach(key => {
                this.profileForm.get(key)?.markAsTouched();
            });
            this.toast.error('Please fill in all required fields correctly.');
        }
    }

    onFileChange(event: any) {
        const file = event.target.files[0];
        if (file) {
            // In a real app, you would upload this file
            console.log('File selected:', file.name);
            this.profileForm.patchValue({ resume: file.name });
            this.toast.success('Resume uploaded successfully!');
        }
    }

    getErrorMessage(fieldName: string): string {
        const control = this.profileForm.get(fieldName);
        if (control?.hasError('required')) {
            return 'This field is required';
        }
        return '';
    }

    get f() {
        return this.profileForm.controls;
    }
}
