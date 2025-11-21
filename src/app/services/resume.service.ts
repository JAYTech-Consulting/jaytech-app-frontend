import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, delay } from 'rxjs';

export interface Experience {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
}

export interface Education {
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    current: boolean;
}

export interface Project {
    name: string;
    description: string;
    technologies: string[];
    startDate: string;
    endDate: string;
    current: boolean;
    url?: string;
}

export interface Resume {
    id: string;
    userId: string;
    title: string;
    name: string;
    email: string;
    phone: string;
    summary: string;
    experience: Experience[];
    education: Education[];
    projects: Project[];
    skills: string[];
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
}

@Injectable({
    providedIn: 'root'
})
export class ResumeService {
    private mockResumes: Resume[] = [
        {
            id: '1',
            userId: 'talent@example.com',
            title: 'Full-Stack Software Engineer Resume',
            name: 'Sarah Johnson',
            email: 'talent@example.com',
            phone: '+1 (555) 123-4567',
            summary: 'Results-driven Full-Stack Software Engineer with 6+ years of experience building scalable web applications. Expertise in modern JavaScript frameworks, cloud architecture, and agile development. Proven track record of leading cross-functional teams and delivering high-impact solutions that improve user experience and business outcomes.',
            experience: [
                {
                    company: 'TechVision Solutions',
                    position: 'Senior Full-Stack Engineer',
                    startDate: '2021-03',
                    endDate: '',
                    current: true,
                    description: 'Lead development of enterprise SaaS platform serving 10,000+ users. Architected microservices infrastructure using Node.js and AWS. Mentored team of 5 junior developers and improved code quality through comprehensive code reviews and testing standards.'
                },
                {
                    company: 'Digital Innovations Inc',
                    position: 'Software Engineer',
                    startDate: '2019-06',
                    endDate: '2021-02',
                    current: false,
                    description: 'Developed and maintained customer-facing web applications using React and Angular. Implemented RESTful APIs and optimized database queries, reducing page load times by 40%. Collaborated with UX team to enhance user interface and accessibility.'
                },
                {
                    company: 'StartupLab',
                    position: 'Junior Developer',
                    startDate: '2018-01',
                    endDate: '2019-05',
                    current: false,
                    description: 'Built responsive web applications using modern JavaScript frameworks. Participated in agile development process and contributed to sprint planning and retrospectives. Gained hands-on experience with CI/CD pipelines and automated testing.'
                }
            ],
            education: [
                {
                    institution: 'Massachusetts Institute of Technology',
                    degree: 'Master of Science',
                    field: 'Computer Science',
                    startDate: '2016-09',
                    endDate: '2018-05',
                    current: false
                },
                {
                    institution: 'University of California, Berkeley',
                    degree: 'Bachelor of Science',
                    field: 'Computer Engineering',
                    startDate: '2012-09',
                    endDate: '2016-05',
                    current: false
                }
            ],
            projects: [
                {
                    name: 'E-Commerce Analytics Dashboard',
                    description: 'Built a real-time analytics dashboard for e-commerce platform processing 1M+ daily transactions. Implemented data visualization using D3.js and Chart.js, with backend powered by Node.js and MongoDB. Reduced report generation time from hours to seconds.',
                    technologies: ['React', 'Node.js', 'MongoDB', 'D3.js', 'AWS Lambda', 'Redis'],
                    startDate: '2023-01',
                    endDate: '2023-08',
                    current: false,
                    url: 'https://github.com/sarahjohnson/ecommerce-analytics'
                },
                {
                    name: 'AI-Powered Task Management System',
                    description: 'Developed an intelligent task management application with ML-based priority suggestions and automated scheduling. Integrated OpenAI API for natural language processing. Achieved 95% user satisfaction rate in beta testing.',
                    technologies: ['Angular', 'Python', 'FastAPI', 'PostgreSQL', 'OpenAI API', 'Docker'],
                    startDate: '2022-06',
                    endDate: '2023-12',
                    current: false,
                    url: 'https://taskmaster-ai.demo.com'
                },
                {
                    name: 'Real-Time Collaboration Platform',
                    description: 'Created a collaborative workspace platform with real-time document editing, video conferencing, and team chat. Implemented WebSocket connections for instant updates and WebRTC for peer-to-peer communication.',
                    technologies: ['Vue.js', 'Socket.io', 'WebRTC', 'Express', 'MySQL', 'Kubernetes'],
                    startDate: '2021-09',
                    endDate: '',
                    current: true,
                    url: 'https://collab-space.io'
                }
            ],
            skills: [
                'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue.js', 'Node.js', 'Express',
                'Python', 'Django', 'FastAPI', 'Java', 'Spring Boot',
                'HTML5', 'CSS3', 'SASS', 'Tailwind CSS',
                'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
                'AWS', 'Azure', 'Docker', 'Kubernetes',
                'Git', 'CI/CD', 'Jenkins', 'GitHub Actions',
                'RESTful APIs', 'GraphQL', 'Microservices',
                'Agile', 'Scrum', 'Test-Driven Development'
            ],
            isDefault: true,
            createdAt: new Date('2023-01-15'),
            updatedAt: new Date('2024-01-20')
        }
    ];

    private resumesSubject = new BehaviorSubject<Resume[]>(this.mockResumes);

    constructor() { }

    getResumes(userId: string): Observable<Resume[]> {
        return of(this.mockResumes.filter(r => r.userId === userId)).pipe(delay(500));
    }

    getResume(id: string): Observable<Resume | undefined> {
        return of(this.mockResumes.find(r => r.id === id)).pipe(delay(500));
    }

    createResume(resume: Omit<Resume, 'id' | 'createdAt' | 'updatedAt'>): Observable<Resume> {
        const newResume: Resume = {
            ...resume,
            id: Math.random().toString(36).substring(2, 9),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        this.mockResumes.push(newResume);
        this.resumesSubject.next(this.mockResumes);

        return of(newResume).pipe(delay(500));
    }

    updateResume(id: string, updates: Partial<Omit<Resume, 'id' | 'createdAt'>>): Observable<Resume> {
        const index = this.mockResumes.findIndex(r => r.id === id);

        if (index === -1) {
            throw new Error('Resume not found');
        }

        const updatedResume = {
            ...this.mockResumes[index],
            ...updates,
            updatedAt: new Date()
        };

        this.mockResumes[index] = updatedResume;
        this.resumesSubject.next(this.mockResumes);

        return of(updatedResume).pipe(delay(500));
    }

    deleteResume(id: string): Observable<void> {
        const index = this.mockResumes.findIndex(r => r.id === id);

        if (index !== -1) {
            this.mockResumes.splice(index, 1);
            this.resumesSubject.next(this.mockResumes);
        }

        return of(void 0).pipe(delay(500));
    }

    setDefaultResume(userId: string, id: string): Observable<void> {
        // Unset all defaults for this user
        this.mockResumes.forEach(r => {
            if (r.userId === userId) {
                r.isDefault = false;
            }
        });

        // Set the selected resume as default
        const resume = this.mockResumes.find(r => r.id === id);
        if (resume) {
            resume.isDefault = true;
        }

        this.resumesSubject.next(this.mockResumes);
        return of(void 0).pipe(delay(500));
    }
}
