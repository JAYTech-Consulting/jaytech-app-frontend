import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Footer } from '../../shared/components/footer/footer';
import { ContactService } from '../../services/contact.service';

@Component({
    selector: 'app-contact',
    imports: [
        ReactiveFormsModule,
        Footer
    ],
    templateUrl: './contact.html',
    styleUrl: './contact.css'
})
export class Contact {
    form: FormGroup;
    isSubmitting = false;

    contactInfo = [
        { icon: 'mail', title: 'Email Us', content: 'hr@jay-tech.co.in', description: 'Send us an email anytime' },
        { icon: 'phone', title: 'Call Us', content: '+91 94977 19321', description: 'Mon-Fri from 8am to 6pm' },
        {
            icon: 'map', title: 'Visit Us', content: 'Jay-Tech Consulting, CRA B-10, Karyavattom P.O Trivandrum\n' +
                'Landmark : Near to Backgate, Technopark', description: 'Come say hello at our office'
        },
    ];

    features = [
        { icon: 'clock', text: '24h Response Time' },
        { icon: 'users', text: 'Dedicated Support Team' },
        { icon: 'mail', text: 'Email & On call' },
    ];

    subjects = [
        { value: 'general', label: 'General Inquiry' },
        { value: 'support', label: 'Technical Support' },
        { value: 'partnership', label: 'Partnership' },
        { value: 'feedback', label: 'Feedback' },
    ];

    constructor(
        private fb: FormBuilder,
        private contactService: ContactService
    ) {
        this.form = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            company: [''],
            subject: ['', Validators.required],
            message: ['', Validators.required],
            newsletter: [false],
        });
    }

    async submit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            alert('Please fill in all required fields correctly.');
            return;
        }

        this.isSubmitting = true;

        const formData = {
            name: this.form.value.name,
            email: this.form.value.email,
            subject: this.form.value.subject,
            message: this.form.value.message
        };

        this.contactService.submitContactForm(formData).subscribe({
            next: (response) => {
                alert(response.message);
                this.form.reset();
                this.isSubmitting = false;
            },
            error: (err) => {
                alert('Failed to send message. Please try again.');
                console.error('Error submitting contact form:', err);
                this.isSubmitting = false;
            }
        });
    }
}
