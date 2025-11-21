import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface ContactFormData {
    id?: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: Date;
    status?: 'pending' | 'read' | 'responded';
}

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private mockSubmissions: ContactFormData[] = [];

    constructor() { }

    submitContactForm(data: Omit<ContactFormData, 'id' | 'createdAt' | 'status'>): Observable<{ success: boolean; message: string }> {
        return new Observable(observer => {
            setTimeout(() => {
                const submission: ContactFormData = {
                    id: this.generateId(),
                    ...data,
                    createdAt: new Date(),
                    status: 'pending'
                };

                this.mockSubmissions.push(submission);

                observer.next({
                    success: true,
                    message: 'Thank you for contacting us! We will get back to you soon.'
                });
                observer.complete();
            }, 800);
        });
    }

    getAllSubmissions(): Observable<ContactFormData[]> {
        return of(this.mockSubmissions).pipe(delay(300));
    }

    getSubmissionById(id: string): Observable<ContactFormData | undefined> {
        return of(this.mockSubmissions.find(s => s.id === id)).pipe(delay(300));
    }

    updateSubmissionStatus(id: string, status: 'pending' | 'read' | 'responded'): Observable<boolean> {
        return new Observable(observer => {
            setTimeout(() => {
                const submission = this.mockSubmissions.find(s => s.id === id);
                if (submission) {
                    submission.status = status;
                    observer.next(true);
                } else {
                    observer.next(false);
                }
                observer.complete();
            }, 300);
        });
    }

    private generateId(): string {
        return `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}
