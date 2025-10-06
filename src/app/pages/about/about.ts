import { Component } from '@angular/core';
import { Footer } from '../../shared/components/footer/footer';
import { CardItem, ImageCardSection } from '../../shared/components/image-card-section/image-card-section';

@Component({
    selector: 'app-about',
    imports: [ Footer, ImageCardSection],
    templateUrl: './about.html',
    styleUrl: './about.css',
})
export class About {
    cards :CardItem[]= [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1582005450386-52b25f82d9bb',
            icon: 'users',
            title: 'Startups\n',
            description:
                "We've helped numerous early-stage companies build their engineering teams from the ground up, including placing CTOs and lead developers who have taken startups from seed to Series B funding.",
            features: [],
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd',
            icon: 'trending',
            title: 'Mid-sized Companies',
            description:
                'Our recruitment strategies have enabled growing companies to scale their IT departments efficiently, providing both permanent hires and flexible contract solutions during periods of rapid expansion.',
            features: [],
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1624555130858-7ea5b8192c49',
            icon: 'trending',
            title: 'Enterprise Clients',
            description:
                "We've partnered with multiple MNCs to recruit specialized talent for critical projects and leadership roles, navigating complex requirements and delivering candidates who excel in enterprise environments.",
            features: [],
        },
    ];
}
