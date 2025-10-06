import {
    Component,
    Input,
    HostBinding,
    ChangeDetectionStrategy,
    ElementRef,
    Renderer2,
    AfterViewInit,
    AfterContentInit,
} from '@angular/core';

export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

@Component({
    selector: 'app-button',
    templateUrl: './button.html',
    styleUrls: ['./button.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button implements  AfterContentInit {
    @Input() variant: 'default' | 'outline' | 'ghost' | 'link' = 'default';
    @Input() size: 'default' | 'sm' | 'lg' | 'icon' = 'default';
    @Input() asChild = false; // bind using [asChild]="true"
    @Input() type: 'button' | 'submit' | 'reset' = 'button';
    @Input() disabled = false;
    @Input() extraClass = ''; // optional extra classes

    // ensure host element has the composed classes so Tailwind/global CSS works
    @HostBinding('class')
    get hostClass(): string {
        const base =
            'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50';
        const variantCls = {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
            ghost: 'hover:bg-accent hover:text-accent-foreground',
            link: 'text-primary underline-offset-4 hover:underline',
        }[this.variant]!;
        const sizeCls = {
            default: 'h-10 px-4 py-2',
            sm: 'h-9 rounded-md px-3',
            lg: 'h-11 rounded-md px-8',
            icon: 'h-10 w-10',
        }[this.size]!;
        return [base, variantCls, sizeCls, this.extraClass].filter(Boolean).join(' ');
    }

    constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}


    ngAfterContentInit(): void {
        // If the component contains a native <button> inside (nativeTpl), copy attributes from host to it.
        // This ensures [disabled], type, id, aria-* etc. work on the actual button element.
        const host = this.el.nativeElement as HTMLElement;
        const innerButton = host.querySelector('button');
        if (innerButton) {
            // copy disabled + type + anything else
            if (this.disabled) {
                this.renderer.setAttribute(innerButton, 'disabled', 'true');
            } else {
                this.renderer.removeAttribute(innerButton, 'disabled');
            }
            this.renderer.setAttribute(innerButton, 'type', this.type ?? 'button');

            // forward aria- and id if present on host
            Array.from(host.attributes).forEach((attr) => {
                const name = attr.name;
                if (['class', 'style'].includes(name)) return;
                if (!innerButton.hasAttribute(name)) {
                    try {
                        this.renderer.setAttribute(innerButton, name, attr.value);
                    } catch {}
                }
            });
        }
    }
}
