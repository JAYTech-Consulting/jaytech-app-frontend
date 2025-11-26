import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export type JobStatus = 'draft' | 'under_review' | 'published' | 'not_available' | 'rejected';

export interface JobPost {
    id: string;
    title: string;
    description: string;
    requirements: string;
    location: string;
    salaryRange: string;
    employmentType: string;
    status: JobStatus;
    recruiterEmail: string;
    createdAt: Date;
    updatedAt: Date;
}

@Injectable({
    providedIn: 'root',
})
export class JobPostService {
    // Mock data
    private mockJobs: JobPost[] = [
        {
            id: '1',
            title: 'Senior Frontend Developer',
            description: 'We are looking for an experienced Angular developer...',
            requirements: '5+ years experience, Angular, TypeScript, RxJS',
            location: 'Remote',
            salaryRange: '$120k - $150k',
            employmentType: 'Full-time',
            status: 'published',
            recruiterEmail: 'recruiter1@jaytech.com',
            createdAt: new Date('2023-10-01'),
            updatedAt: new Date('2023-10-02'),
        },
        {
            id: '2',
            title: 'Product Designer',
            description: 'Join our design team to build amazing products...',
            requirements: 'Figma, UI/UX principles, Prototyping',
            location: 'New York, NY',
            salaryRange: '$100k - $130k',
            employmentType: 'Full-time',
            status: 'draft',
            recruiterEmail: 'recruiter2@jaytech.com',
            createdAt: new Date('2023-10-05'),
            updatedAt: new Date('2023-10-05'),
        },
    ];

    private jobsSubject = new BehaviorSubject<JobPost[]>(this.mockJobs);

    constructor() { }

    getJobs(): Observable<JobPost[]> {
        return this.jobsSubject.asObservable().pipe(delay(500)); // Simulate network delay
    }

    getJob(id: string): Observable<JobPost | undefined> {
        return this.getJobs().pipe(
            map((jobs) => jobs.find((j) => j.id === id))
        );
    }

    createJob(job: Omit<JobPost, 'id' | 'createdAt' | 'updatedAt'>): Observable<JobPost> {
        const newJob: JobPost = {
            ...job,
            id: Math.random().toString(36).substring(2, 9),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const currentJobs = this.jobsSubject.value;
        this.jobsSubject.next([...currentJobs, newJob]);

        return of(newJob).pipe(delay(500));
    }

    updateJob(id: string, updates: Partial<Omit<JobPost, 'id' | 'createdAt'>>): Observable<JobPost> {
        const currentJobs = this.jobsSubject.value;
        const index = currentJobs.findIndex((j) => j.id === id);

        if (index === -1) {
            throw new Error('Job not found');
        }

        const updatedJob = {
            ...currentJobs[index],
            ...updates,
            updatedAt: new Date(),
        };

        const newJobs = [...currentJobs];
        newJobs[index] = updatedJob;
        this.jobsSubject.next(newJobs);

        return of(updatedJob).pipe(delay(500));
    }

    deleteJob(id: string): Observable<boolean> {
        const currentJobs = this.jobsSubject.value;
        const filteredJobs = currentJobs.filter((j) => j.id !== id);
        this.jobsSubject.next(filteredJobs);
        return of(true).pipe(delay(500));
    }

    // Mock Applications
    private mockApplications: JobApplication[] = [
        {
            id: 'a1',
            jobId: '1',
            applicantName: 'John Doe',
            applicantEmail: 'john.doe@example.com',
            appliedDate: new Date('2023-10-03'),
            status: 'pending',
            skills: ['Angular', 'TypeScript', 'HTML', 'CSS'],
            experience: '6 years',
            resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        },
        {
            id: 'a2',
            jobId: '1',
            applicantName: 'Jane Smith',
            applicantEmail: 'jane.smith@example.com',
            appliedDate: new Date('2023-10-04'),
            status: 'shortlisted',
            skills: ['React', 'JavaScript', 'Node.js'],
            experience: '4 years',
            resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        },
        {
            id: 'a3',
            jobId: '2',
            applicantName: 'Alice Johnson',
            applicantEmail: 'alice.j@example.com',
            appliedDate: new Date('2023-10-06'),
            status: 'offered',
            skills: ['Figma', 'Sketch', 'Adobe XD'],
            experience: '5 years',
            resumeUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        }
    ];

    getJobApplications(jobId: string): Observable<JobApplication[]> {
        // Recruiters should not see 'submitted' applications until approved by admin
        return of(this.mockApplications.filter(app => app.jobId === jobId && app.status !== 'submitted')).pipe(delay(500));
    }

    updateApplicationStatus(id: string, status: JobApplicationStatus): Observable<JobApplication> {
        const index = this.mockApplications.findIndex(app => app.id === id);
        if (index === -1) {
            throw new Error('Application not found');
        }

        this.mockApplications[index] = {
            ...this.mockApplications[index],
            status
        };

        return of(this.mockApplications[index]).pipe(delay(500));
    }

    getPublishedJobs(): Observable<JobPost[]> {
        return this.getJobs().pipe(
            map(jobs => jobs.filter(job => job.status === 'published'))
        );
    }

    applyForJob(jobId: string, applicantData: Omit<JobApplication, 'id' | 'status' | 'appliedDate' | 'jobId'>): Observable<JobApplication> {
        const newApplication: JobApplication = {
            ...applicantData,
            id: Math.random().toString(36).substring(2, 9),
            jobId,
            status: 'submitted',
            appliedDate: new Date()
        };

        this.mockApplications.push(newApplication);
        return of(newApplication).pipe(delay(500));
    }

    getApplicationsByEmail(email: string): Observable<(JobApplication & { jobTitle: string })[]> {
        return of(this.mockApplications).pipe(
            delay(500),
            map(apps => {
                return apps
                    .filter(app => app.applicantEmail === email)
                    .map(app => {
                        const job = this.mockJobs.find(j => j.id === app.jobId);
                        return {
                            ...app,
                            jobTitle: job ? job.title : 'Unknown Job'
                        };
                    });
            })
        );
    }

    // Admin Methods

    getJobsByStatus(status: JobStatus): Observable<JobPost[]> {
        return of(this.mockJobs.filter(job => job.status === status)).pipe(delay(500));
    }

    approveJob(id: string): Observable<JobPost> {
        const job = this.mockJobs.find(j => j.id === id);
        if (job) {
            job.status = 'published';
            this.jobsSubject.next(this.mockJobs);
            return of(job).pipe(delay(500));
        }
        throw new Error('Job not found');
    }

    rejectJob(id: string): Observable<JobPost> {
        const job = this.mockJobs.find(j => j.id === id);
        if (job) {
            job.status = 'rejected';
            this.jobsSubject.next(this.mockJobs);
            return of(job).pipe(delay(500));
        }
        throw new Error('Job not found');
    }

    getApplicationsByStatus(status: JobApplicationStatus): Observable<(JobApplication & { jobTitle: string })[]> {
        return of(this.mockApplications).pipe(
            delay(500),
            map(apps => {
                return apps
                    .filter(app => app.status === status)
                    .map(app => {
                        const job = this.mockJobs.find(j => j.id === app.jobId);
                        return {
                            ...app,
                            jobTitle: job ? job.title : 'Unknown Job'
                        };
                    });
            })
        );
    }

    approveApplication(id: string): Observable<JobApplication> {
        const app = this.mockApplications.find(a => a.id === id);
        if (app) {
            app.status = 'pending'; // Move to pending so recruiter can see it
            return of(app).pipe(delay(500));
        }
        throw new Error('Application not found');
    }

    // Admin Overview Methods

    getAllJobs(): Observable<JobPost[]> {
        return of(this.mockJobs).pipe(delay(500));
    }

    getAllApplications(): Observable<(JobApplication & { jobTitle: string })[]> {
        return of(this.mockApplications).pipe(
            delay(500),
            map(apps => {
                return apps.map(app => {
                    const job = this.mockJobs.find(j => j.id === app.jobId);
                    return {
                        ...app,
                        jobTitle: job ? job.title : 'Unknown Job'
                    };
                });
            })
        );
    }

    getJobsByRecruiter(email: string): Observable<JobPost[]> {
        return of(this.mockJobs.filter(job => job.recruiterEmail === email)).pipe(delay(500));
    }

    getTotalApplicationsForRecruiter(email: string): Observable<number> {
        return of(this.mockJobs.filter(job => job.recruiterEmail === email)).pipe(
            map(jobs => {
                const jobIds = jobs.map(j => j.id);
                return this.mockApplications.filter(app => jobIds.includes(app.jobId)).length;
            }),
            delay(500)
        );
    }
}

export type JobApplicationStatus = 'submitted' | 'pending' | 'shortlisted' | 'offered' | 'rejected';

export interface JobApplication {
    id: string;
    jobId: string;
    applicantName: string;
    applicantEmail: string;
    appliedDate: Date;
    status: JobApplicationStatus;
    skills: string[];
    experience: string;
    resumeUrl?: string;
}
