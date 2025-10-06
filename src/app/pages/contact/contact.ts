import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Footer } from '../../shared/components/footer/footer';

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
        { icon: 'map', title: 'Visit Us', content: 'Jay-Tech Consulting, CRA B-10, Karyavattom P.O Trivandrum\n' +
                'Landmark : Near to Backgate, Technopark', description: 'Come say hello at our office' },
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

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            name: [''],
            email: [''],
            company: [''],
            subject: [''],
            message: [''],
            newsletter: [false],
        });
    }

    async submit() {
        if (this.form.invalid) return;
        this.isSubmitting = true;

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        alert("Message sent successfully! We'll get back to you within 24 hours.");
        this.form.reset();
        this.isSubmitting = false;
    }
}
