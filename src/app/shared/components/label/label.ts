import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'app-label',
    imports: [],
    templateUrl: './label.html',
    styleUrl: './label.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Label {
    @Input() for?: string;

    /** visually disable the label when used with a disabled control */
    @Input() disabled = false;

    @HostBinding('class')
    get hostClass(): string {
        return this.disabled ? 'app-label disabled' : 'app-label';
    }
}
