import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-separator',
    imports: [],
    templateUrl: './separator.html',
    styleUrl: './separator.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Separator {
    @Input() classList = '';
}
