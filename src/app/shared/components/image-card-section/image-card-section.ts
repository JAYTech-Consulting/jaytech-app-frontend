import { Component, Input } from '@angular/core';
import { CardContent } from '../card-content/card-content';
import { Card } from '../card/card';
import { Button } from '../button/button';

export interface CardItem {
    id: number;
    image: string;     // path inside /assets
    icon: 'users' | 'trending' | 'shield';
    title: string;
    description: string;
    features: string[];
}


@Component({
  selector: 'app-image-card-section',
    imports: [
        CardContent,
        Card,
        Button
    ],
  templateUrl: './image-card-section.html',
  styleUrl: './image-card-section.css'
})
export class ImageCardSection {
    @Input() card!: CardItem;

}
