import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User } from './auth';

export interface UserProfile {
    userId: string;
    email: string;
    name: string;
    role: 'talent' | 'recruiter' | 'admin';
    phone?: string;
    company?: string; // for recruiters
    profilePicture?: string;
    bio?: string;
    createdAt: Date;
    updatedAt: Date;
}

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

    // Mock user profiles
    private mockProfiles: UserProfile[] = [
        {
            userId: 'talent@example.com',
            email: 'talent@example.com',
            name: 'Sarah Johnson',
            role: 'talent',
            phone: '+1 (555) 123-4567',
            bio: 'Passionate software engineer with expertise in full-stack development.',
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date('2024-01-20')
        },
        {
            userId: 'recruiter1@jaytech.com',
            email: 'recruiter1@jaytech.com',
            name: 'John Recruiter',
            role: 'recruiter',
            phone: '+1 (555) 234-5678',
            company: 'JayTech Consulting',
            bio: 'Experienced technical recruiter specializing in software engineering roles.',
            createdAt: new Date('2024-01-10'),
            updatedAt: new Date('2024-01-18')
        }
    ];

    private profilesSubject = new BehaviorSubject<UserProfile[]>(this.mockProfiles);

    getRecruiters(): Observable<User[]> {
        return of(this.mockRecruiters).pipe(delay(500));
    }

    getAllUsers(): Observable<User[]> {
        // In a real app, this would fetch all users from the backend
        return of(this.mockRecruiters).pipe(delay(500));
    }

    getUserProfile(userId: string): Observable<UserProfile | undefined> {
        return this.profilesSubject.pipe(
            map(profiles => profiles.find(p => p.userId === userId)),
            delay(300)
        );
    }

    updateUserProfile(profile: UserProfile): Observable<UserProfile> {
        return new Observable(observer => {
            setTimeout(() => {
                const index = this.mockProfiles.findIndex(p => p.userId === profile.userId);
                if (index !== -1) {
                    const updatedProfile = {
                        ...profile,
                        updatedAt: new Date()
                    };
                    this.mockProfiles[index] = updatedProfile;
                    this.profilesSubject.next([...this.mockProfiles]);
                    observer.next(updatedProfile);
                } else {
                    // Create new profile if not found
                    const newProfile = {
                        ...profile,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    };
                    this.mockProfiles.push(newProfile);
                    this.profilesSubject.next([...this.mockProfiles]);
                    observer.next(newProfile);
                }
                observer.complete();
            }, 500);
        });
    }

    createUserProfile(profile: Omit<UserProfile, 'createdAt' | 'updatedAt'>): Observable<UserProfile> {
        return new Observable(observer => {
            setTimeout(() => {
                const newProfile: UserProfile = {
                    ...profile,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                this.mockProfiles.push(newProfile);
                this.profilesSubject.next([...this.mockProfiles]);
                observer.next(newProfile);
                observer.complete();
            }, 500);
        });
    }
}
