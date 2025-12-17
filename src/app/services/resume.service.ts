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
    linkedin?: string;
    github?: string;
    website?: string;
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
            linkedin: 'https://linkedin.com/in/sarahjohnson',
            github: 'https://github.com/sarahjohnson',
            website: 'https://sarahjohnson.dev',
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
        },
        {
            id: '2',
            userId: 'arunsurakylm@gmail.com',
            title: 'Senior Engineer - Backend Development',
            name: 'ARUN S',
            email: 'arunsurakylm@gmail.com',
            phone: '+91 7907620091',
            linkedin: 'https://www.linkedin.com/in/arunsura/',
            github: '',
            website: '',
            summary: 'Passionate Software Engineer with 5 years of experience in backend development, specializing in Node.js and Azure cloud. Skilled in designing scalable architectures, optimizing cloud-based applications, and implementing robust APIs. Adapt at delivering high-performance solutions that enhance efficiency and drive business growth.',
            experience: [
                {
                    company: 'QBurst',
                    position: 'Senior Engineer (Technical Lead)',
                    startDate: '2022-07',
                    endDate: '',
                    current: true,
                    description: `Leading software engineering projects focusing on scalable backend solutions
• Leading a cross-functional team to deliver enterprise-grade solutions
• Designing and developing scalable backend services in Node.js, capable of handling high-ingress, business-critical requests
• Conducting load testing with JMeter and implementing optimizations that improved system performance by 40%
• Developing data analytics and reporting solutions using Azure Databricks (Unity Catalog) and Apache Superset
• Designing CMS data models and APIs in Strapi, integrating with Next.js for dynamic content management and CDN revalidation
• Integrating solutions with Salesforce Marketing Cloud (Custom Activities) and Azure SSO for secure user authentication
• Implementing unit and integration test cases to ensure code reliability and maintainability
• Overseeing production support activities, including system performance monitoring and optimization
• Collaborating directly with clients and cross-functional teams to understand business needs, streamline IT processes, and deliver efficient, reliable solutions`
                },
                {
                    company: 'TATA Consultancy Services',
                    position: 'Assistant System Engineer',
                    startDate: '2020-11',
                    endDate: '2022-07',
                    current: false,
                    description: `Global IT services and consulting company
• Worked as a NodeJs Developer and handling 3 projects
• Developed services to perform the CRUD operations
• Deployed the developed applications to production
• Optimized code to improve to quality and enhance maintainability
• Worked along with client for understanding the business requirements
• Worked on unit testing and Sonarqube fixes`
                }
            ],
            education: [
                {
                    institution: 'College of Engineering, Chengannur',
                    degree: 'Bachelor of Technology',
                    field: 'Computer Science and Engineering',
                    startDate: '2016-06',
                    endDate: '2020-04',
                    current: false
                },
                {
                    institution: 'Govt. Boys HSS, Kayamkulam',
                    degree: 'Senior Secondary Education',
                    field: 'Computer Science',
                    startDate: '2014-06',
                    endDate: '2016-04',
                    current: false
                }
            ],
            projects: [],
            skills: [
                'Node.js', 'Azure Databricks', 'Azure Cloud', 'Load Testing', 'Unity Catalog', 'Strapi',
                'Next.js', 'Azure CDN', 'Salesforce', 'SSO Integration', 'Testing', 'Unit Testing',
                'Sonarqube', 'Python', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Angular'
            ],
            isDefault: false,
            createdAt: new Date('2024-11-27'),
            updatedAt: new Date('2024-11-27')
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
