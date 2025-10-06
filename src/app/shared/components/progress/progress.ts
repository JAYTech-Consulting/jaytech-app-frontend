import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-progress',
    imports: [
        NgStyle
    ],
  templateUrl: './progress.html',
  styleUrl: './progress.css'
})
export class Progress {
    /** value expected 0..100 */
    @Input() value = 0;

    /** optional custom classes (Tailwind friendly). Example: 'h-3 bg-slate-200' */
    @Input() class = '';

    // Base Tailwind classes to match your React version
    private baseRoot = 'relative h-4 w-full overflow-hidden rounded-full bg-secondary';

    // Tailwind class for the indicator (can be overridden via ::ng-deep or by adding a child selector if needed)
    private indicatorClass = 'h-full w-full flex-1 bg-primary transition-all';

    // Expose computed root class (merge base + incoming)
    get rootClass(): string {
        // if you have cn util like in React, you can use it:
        // return cn(this.baseRoot, this.class);
        // simple merge:
        return [this.baseRoot, this.class].filter(Boolean).join(' ');
    }

    get valueClamped(): number {
        const n = Number(this.value) || 0;
        return Math.max(0, Math.min(100, n));
    }

    // transform uses translateX(- (100 - value)%)
    get indicatorTransform(): string {
        return `translateX(-${100 - this.valueClamped}%)`;
    }
}
