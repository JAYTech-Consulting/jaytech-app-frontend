import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'app-card-content',
    imports: [],
    templateUrl: './card-content.html',
    styleUrl: './card-content.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardContent {
    @Input() className = '';

    @HostBinding('class')
    get hostClass(): string {
        return `app-card-content ${this.className}`.trim();
    }
}
