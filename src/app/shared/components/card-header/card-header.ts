import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-card-header',
  imports: [],
  templateUrl: './card-header.html',
  styleUrl: './card-header.css'
})
export class CardHeader {
    @Input() className = '';

    @HostBinding('class')
    get hostClass(): string {
        return `app-card-header ${this.className}`.trim();
    }
}
