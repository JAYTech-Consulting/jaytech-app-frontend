import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-card-description',
  imports: [],
  templateUrl: './card-description.html',
  styleUrl: './card-description.css'
})
export class CardDescription {
    @Input() className = '';

    @HostBinding('class')
    get hostClass(): string {
        return `app-card-description ${this.className}`.trim();
    }
}
