import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.html',
    styleUrls: ['./card.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
    /** optional extra classes */
    @Input() className = '';

    @HostBinding('class')
    get hostClass(): string {
        return ['app-card', this.className].filter(Boolean).join(' ');
    }
}
