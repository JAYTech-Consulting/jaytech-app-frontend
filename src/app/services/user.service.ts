import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from './auth';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    // Mock recruiter data
    private mockRecruiters: User[] = [
        {
            email: 'recruiter1@jaytech.com',
            name: 'John Recruiter',
            role: 'recruiter'
        },
        {
            email: 'recruiter2@jaytech.com',
            name: 'Sarah Hiring',
            role: 'recruiter'
        },
        {
            email: 'recruiter3@jaytech.com',
            name: 'Mike Talent',
            role: 'recruiter'
        }
    ];

    getRecruiters(): Observable<User[]> {
        return of(this.mockRecruiters).pipe(delay(500));
    }

    getAllUsers(): Observable<User[]> {
        // In a real app, this would fetch all users from the backend
        return of(this.mockRecruiters).pipe(delay(500));
    }
}
