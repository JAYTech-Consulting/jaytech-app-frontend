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
        // Pre-fill form with user data if available
        if (this.currentUser) {
            const nameParts = (this.currentUser.name || '').trim().split(' ');
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';
            
            this.profileForm.patchValue({
                firstName: firstName,
                lastName: lastName,
                email: this.currentUser.email || '',
            });
        }
    }

    onSubmit() {
        if (this.profileForm.invalid) {
            this.profileForm.markAllAsTouched();
            this.toast?.error?.('Please fill in all required fields correctly.');
            return;
        }

        this.isSubmitting = true;
        
        // Simulate API call
        setTimeout(() => {
            this.isSubmitting = false;
            this.toast?.success?.('Talent Profile updated successfully!');
            // Here you would typically save to backend
            console.log('Talent Profile data:', this.profileForm.value);
        }, 1500);
    }

    get f() {
        return this.profileForm.controls;
    }
}
