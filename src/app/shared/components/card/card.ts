import { Component, Input } from '@angular/core';
import { CapitalizePipe } from '../../pipes/capitalize-pipe';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-card',
    imports: [],
    templateUrl: './card.html',
    styleUrl: './card.css',
})
export class Card {
    @Input() image!: string;
    @Input() icon!: string; // Could be an icon class or SVG path
    @Input() title!: string;
    @Input() description!: string;
    @Input() features: string[] = [];
}
