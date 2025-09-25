import { Component, HostBinding, Input } from '@angular/core';

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

@Component({
    selector: 'app-button',
    imports: [],
    standalone: true,
    templateUrl: './button.html',
    styleUrl: './button.css',
})
export class Button {
    @Input() variant: ButtonVariant = 'default';
    @Input() size: ButtonSize = 'default';
    @Input() asChild = false;

    // Combine Tailwind classes dynamically
    @HostBinding('class') get classes(): string {
        const base =
            'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

        const variantClasses: Record<ButtonVariant, string> = {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
            outline:
                'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground',
            link: 'text-primary underline-offset-4 hover:underline',
        };

        const sizeClasses: Record<ButtonSize, string> = {
            default: 'h-10 px-4 py-2',
            sm: 'h-9 rounded-md px-3',
            lg: 'h-11 rounded-md px-8',
            icon: 'h-10 w-10',
        };

        return [base, variantClasses[this.variant], sizeClasses[this.size]].join(' ');
    }
}
