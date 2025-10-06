import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../shared/components/toast-container/toast.service';
import { Checkbox } from '../../shared/components/checkbox/checkbox';
import { Label } from '../../shared/components/label/label';
import { InputComponent } from '../../shared/components/input/input';
import { CardContent } from '../../shared/components/card-content/card-content';
import { Card } from '../../shared/components/card/card';
import { CardTitle } from '../../shared/components/card-title/card-title';
import { CardHeader } from '../../shared/components/card-header/card-header';
import { CardDescription } from '../../shared/components/card-description/card-description';
import { NgClass } from '@angular/common';
import { Button } from '../../shared/components/button/button';
import { Progress } from '../../shared/components/progress/progress';
import { RouterLink } from '@angular/router';
import { Separator } from '../../shared/components/separator/separator';

@Component({
  selector: 'app-register',
    imports: [
        ReactiveFormsModule,
        Label,
        CardContent,
        Card,
        CardTitle,
        CardHeader,
        CardDescription,
        NgClass,
        Button,
        Progress,
        RouterLink,
        FormsModule,
        Separator
    ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
    currentStep = 1;
    showPassword = false;
    showConfirmPassword = false;
    isLoading = false;
    constructor(  private toast: ToastService, ) {
    }

    formData = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
        newsletter: false,
    };

    getPasswordStrength(password: string) {
        let strength = 0;
        if (!password) return 0;
        if (password.length >= 8) strength += 25;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
        if (/\d/.test(password)) strength += 25;
        if (/[^a-zA-Z\d]/.test(password)) strength += 25;
        return strength;
    }

    get passwordStrength() {
        return this.getPasswordStrength(this.formData.password);
    }

    getStrengthText(strength: number) {
        if (strength === 0) return 'Enter password';
        if (strength <= 25) return 'Weak';
        if (strength <= 50) return 'Fair';
        if (strength <= 75) return 'Good';
        return 'Strong';
    }

    getStrengthColorClass(strength: number) {
        if (strength <= 25) return 'bg-destructive';
        if (strength <= 50) return 'bg-accent';
        if (strength <= 75) return 'bg-secondary';
        return 'bg-primary';
    }

    async handleSubmit(evt?: Event) {
        evt?.preventDefault?.();

        if (this.currentStep === 1) {
            if (!this.formData.name.trim() || !this.formData.email.trim()) {
                alert('Please fill in all required fields'); // replace with toast
                return;
            }
            this.currentStep = 2;
            return;
        }

        // Step 2 validations
        if (this.formData.password !== this.formData.confirmPassword) {
            alert('Passwords do not match'); // replace with toast
            return;
        }
        if (!this.formData.agreeToTerms) {
            alert('Please agree to the terms and conditions'); // replace with toast
            return;
        }

        this.isLoading = true;
        // simulate API
        await new Promise((r) => setTimeout(r, 1500));
        this.isLoading = false;
        alert('Account created successfully!'); // replace with toast
        // optionally reset
        this.currentStep = 1;
        this.formData = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreeToTerms: false,
            newsletter: false,
        };
    }

    goToPreviousStep() {
        this.currentStep = 1;
    }

    handleSocialLogin(provider: string) {
        try {
            this.toast.success('login clicked - mockup', { title: `${provider}` });
        } catch {
            // eslint-disable-next-line no-console
            console.info(`${provider} login clicked - mockup`);
        }
    }

    get passwordRequirements() {
        const pwd = this.formData.password || '';
        return [
            { met: pwd.length >= 8, text: 'At least 8 characters' },
            { met: /[a-z]/.test(pwd) && /[A-Z]/.test(pwd), text: 'Upper & lowercase letters' },
            { met: /\d/.test(pwd), text: 'At least one number' },
            { met: /[^a-zA-Z\d]/.test(pwd), text: 'Special character' },
        ];
    }
}
