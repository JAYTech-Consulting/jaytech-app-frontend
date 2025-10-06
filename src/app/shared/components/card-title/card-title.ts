import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-card-title',
  imports: [],
  templateUrl: './card-title.html',
  styleUrl: './card-title.css'
})
export class CardTitle {
    @Input() className = '';

    @HostBinding('class')
    get hostClass(): string {
        return `app-card-title ${this.className}`.trim();
    }
}
