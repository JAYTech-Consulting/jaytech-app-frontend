import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface TalentProfile {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    linkedIn?: string;
    github?: string;
    portfolio?: string;
    skills: string[];
    experienceLevel: string;
    preferredJobTypes: string[];
    expectedSalary?: string;
    availability: string;
    willingToRelocate: boolean;
    bio?: string;
    createdAt: Date;
    updatedAt: Date;
}

@Injectable({
    providedIn: 'root'
})
export class TalentProfileService {
    private mockProfiles: TalentProfile[] = [
        {
            userId: 'talent@example.com',
            firstName: 'Sarah',
            lastName: 'Johnson',
            email: 'talent@example.com',
            phone: '5551234567',
            dob: '1995-06-15',
            address: '123 Tech Street',
            city: 'San Francisco',
            state: 'CA',
            zipCode: '94102',
            linkedIn: 'https://linkedin.com/in/sarahjohnson',
            github: 'https://github.com/sarahjohnson',
            portfolio: 'https://sarahjohnson.dev',
            skills: ['JavaScript', 'TypeScript', 'React', 'Angular', 'Node.js', 'Python', 'AWS'],
            experienceLevel: 'Senior Level (5-8 years)',
            preferredJobTypes: ['Full-time', 'Contract'],
            expectedSalary: '$120,000 - $150,000',
            availability: 'Immediate',
            willingToRelocate: true,
            bio: 'Passionate full-stack developer with 6+ years of experience building scalable web applications. Expertise in modern JavaScript frameworks and cloud technologies.',
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date('2024-01-20')
        }
    ];

    private profilesSubject = new BehaviorSubject<TalentProfile[]>(this.mockProfiles);

    constructor() { }

    getTalentProfile(userId: string): Observable<TalentProfile | undefined> {
        return this.profilesSubject.pipe(
            map(profiles => profiles.find(p => p.userId === userId)),
            delay(300)
        );
    }

    createTalentProfile(profile: TalentProfile): Observable<TalentProfile> {
        return new Observable(observer => {
            setTimeout(() => {
                const newProfile = {
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

    updateTalentProfile(profile: TalentProfile): Observable<TalentProfile> {
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
                    observer.error(new Error('Profile not found'));
                }
                observer.complete();
            }, 500);
        });
    }

    deleteTalentProfile(userId: string): Observable<boolean> {
        return new Observable(observer => {
            setTimeout(() => {
                const index = this.mockProfiles.findIndex(p => p.userId === userId);
                if (index !== -1) {
                    this.mockProfiles.splice(index, 1);
                    this.profilesSubject.next([...this.mockProfiles]);
                    observer.next(true);
                } else {
                    observer.next(false);
                }
                observer.complete();
            }, 500);
        });
    }

    getAllTalentProfiles(): Observable<TalentProfile[]> {
        return this.profilesSubject.pipe(delay(300));
    }
}
