import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-card-footer',
  imports: [],
  templateUrl: './card-footer.html',
  styleUrl: './card-footer.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFooter {
    @Input() className = '';

    @HostBinding('class')
    get hostClass(): string {
        return `app-card-footer ${this.className}`.trim();
    }
}
