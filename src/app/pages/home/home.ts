import { Component } from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { RouterLink } from '@angular/router';
import { Card } from '../../shared/components/card/card';
import { Footer } from '../../shared/components/footer/footer';
import { CardItem, ImageCardSection } from '../../shared/components/image-card-section/image-card-section';

@Component({
    selector: 'app-home',
    imports: [Button, RouterLink,  Footer, ImageCardSection],
    templateUrl: './home.html',
    styleUrl: './home.css',
})
export class Home {
    cards: CardItem[] = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c',
            icon: 'users',
            title: 'For Companies',
            description:
                'We connect you with pre-vetted IT professionals across all experience levels and specializations. Our streamlined process saves you time and ensures quality matches.',
            features: [],
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
            icon: 'trending',
            title: 'For Job Seekers',
            description:
                'We help IT professionals at all levels find positions that match their skills, experience, and career goals with companies that value their talent.',
            features: [],
        },
    ];
}
