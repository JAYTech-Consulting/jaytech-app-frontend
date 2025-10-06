import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Button } from '../../shared/components/button/button';
import { Label } from '../../shared/components/label/label';
import { InputComponent } from '../../shared/components/input/input';
import { CardContent } from '../../shared/components/card-content/card-content';
import { CardTitle } from '../../shared/components/card-title/card-title';
import { CardDescription } from '../../shared/components/card-description/card-description';
import { Card } from '../../shared/components/card/card';
import { CardHeader } from '../../shared/components/card-header/card-header';
import { Separator } from '../../shared/components/separator/separator';
import { Checkbox } from '../../shared/components/checkbox/checkbox';
import { ToastService } from '../../shared/components/toast-container/toast.service'; // optional, replace if you use another toast-container

@Component({
    selector: 'app-login',
    templateUrl: './login.html',
    styleUrls: ['./login.css'],
    imports: [
        Button,
        ReactiveFormsModule,
        Label,
        CardContent,
        CardTitle,
        CardDescription,
        Card,
        CardHeader,
        RouterLink,
        Separator,
        Checkbox,
        InputComponent,
    ],
})
export class Login {
    form: FormGroup;
    showPassword = false;
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private toast: ToastService, // optional
    ) {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            rememberMe: [false],
        });
    }

    get email() {
        return this.form.get('email');
    }
    get password() {
        return this.form.get('password');
    }

    async onSubmit(): Promise<void> {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.isLoading = true;

        // simulate API
        await new Promise((r) => setTimeout(r, 2000));

        try {
            this.toast?.success?.('Welcome back! Login successful.');
        } catch {
            // fallback
            // eslint-disable-next-line no-console
            console.info('Welcome back! Login successful.');
        }

        this.isLoading = false;
        // this.router.navigateByUrl('/dashboard'); // example
    }

    handleSocialLogin(provider: string) {
        try {
            this.toast.success('login clicked - mockup', { title: `${provider}` });
        } catch {
            // eslint-disable-next-line no-console
            console.info(`${provider} login clicked - mockup`);
        }
    }

    onForgotPassword() {
        try {
            this.toast?.info?.('Password reset clicked - this is a mockup');
        } catch {
            // eslint-disable-next-line no-console
            console.info('Password reset clicked - mockup');
        }
    }
}
