import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor{
    /** forwarded attributes */
    @Input() id?: string;
    @Input() name?: string;
    @Input() type = 'text';
    @Input() placeholder?: string | null = null; // <- placeholder support
    @Input() autocomplete?: string | null = null;
    @Input() class = ''; // allow passing Tailwind or custom classes
    @Input() disabled = false;

    @ViewChild('nativeInput', { static: true }) nativeInput!: ElementRef<HTMLInputElement>;

    value = '';

    // CVA callbacks
    private onChange: (v: any) => void = () => {};
    private onTouched: () => void = () => {};

    constructor(private renderer: Renderer2) {}

    ngAfterViewInit(): void {
        // ensure disabled state is applied to native input (in case set before view init)
        if (this.disabled) {
            this.nativeInput.nativeElement.disabled = true;
        }
    }

    // ControlValueAccessor
    writeValue(value: any): void {
        this.value = value ?? '';
        if (this.nativeInput) {
            this.nativeInput.nativeElement.value = this.value;
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = !!isDisabled;
        if (this.nativeInput) {
            this.nativeInput.nativeElement.disabled = this.disabled;
        }
    }

    // Local handlers that call CVA callbacks
    onInput(event: Event) {
        const v = (event.target as HTMLInputElement).value;
        this.value = v;
        this.onChange(v);
    }

    onBlur() {
        this.onTouched();
    }

    // Utility: compose base classes + incoming classes
    computeClass(): string {
        const base =
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm';
        return [base, this.class].filter(Boolean).join(' ');
    }
}
