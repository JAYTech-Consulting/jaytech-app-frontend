import { Component } from '@angular/core';
import { Footer } from '../../shared/components/footer/footer';

@Component({
    selector: 'app-service',
    imports: [ Footer],
    templateUrl: './service.html',
    styleUrl: './service.css',
})
export class Service {
    features = [
        {
            title: 'IT Staffing',
            description:
                'We connect companies with qualified IT professionals for permanent positions across all ' +
                'experience levels, from junior developers to senior architects. Our rigorous screening process ensures ' +
                'candidates have both the technical skills and cultural fit needed for success.',
        },
        {
            title: 'Executive Search',
            description:
                'Finding the right leadership is critical for technology-driven companies. Our executive search ' +
                'service specializes in placing CTOs, CIOs, VPs of Engineering, and other technology leaders who can drive innovation ' +
                'and growth for your organization.',
        },
        {
            title: 'Remote Hiring',
            description:
                'Expand your talent pool globally with our remote hiring expertise. We help companies find, evaluate, and hire ' +
                'remote IT talent, managing the unique challenges of remote work arrangements and ensuring productive distributed teams.',
        },
        {
            title: 'Freelance/Contract Talent',
            description:
                'Access specialized skills for project-based work or temporary needs. Our network includes experienced IT ' +
                'contractors and freelancers ready to contribute immediately to your initiatives, offering flexibility and expertise ' +
                'without long-term commitments.',
        },
    ];

    steps = [
        {
            number: '01',
            title: 'Discovery',
            description:
                'We work closely with you to understand your specific needs, company culture, and technical ' +
                'requirements to create a detailed profile of your ideal candidate or position.',
        },
        {
            number: '02',
            title: 'Sourcing & Screening',
            description:
                'Our specialized recruiters leverage our extensive network and targeted search strategies to ' +
                'identify qualified candidates, conducting thorough technical and cultural assessments.',
        },
        {
            number: '03',
            title: 'Presentation & Interview',
            description:
                'We present you with a curated selection of candidates who match your requirements, organizing ' +
                'interviews and providing feedback to facilitate the evaluation process.',
        },
        {
            number: '04',
            title: 'Placement & Follow-up',
            description:
                'We assist with offer negotiations and onboarding, then provide ongoing support to ensure a successful ' +
                'integration and long-term satisfaction for both parties.',
        },
    ];
}
