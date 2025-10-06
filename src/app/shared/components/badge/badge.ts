import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-badge',
    imports: [],
    templateUrl: './badge.html',
    styleUrl: './badge.css',
})
export class Badge {
    /** Badge variant: default, secondary, destructive, outline */
    @Input() variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
    @Input() class: string = '';

    /** Tailwind class mapping similar to CVA */
    get variantClasses(): string {
        const map: Record<string, string> = {
            default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
            secondary:
                'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
            destructive:
                'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
            outline: 'text-foreground',
        };
        return map[this.variant] || map['default'];
    }
}
