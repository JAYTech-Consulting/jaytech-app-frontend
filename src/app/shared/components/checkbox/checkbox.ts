import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../../helpers/utils';

@Component({
    selector: 'app-checkbox',
    imports: [],
    templateUrl: './checkbox.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => Checkbox),
            multi: true,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './checkbox.css',
})
export class Checkbox implements ControlValueAccessor {
    @Input() id?: string;
    @Input() disabled = false;

    checked = false;

    // CVA
    private onChange = (_: any) => {};
    private onTouched = () => {};

    toggle() {
        if (this.disabled) return;
        this.checked = !this.checked;
        this.onChange(this.checked);
        this.onTouched();
    }

    // Angular form API
    writeValue(value: any): void {
        this.checked = !!value;
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    // Classes (like cn() in React)
    get classes(): string {
        return cn(
            'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            this.checked && 'bg-primary text-primary-foreground',
            this.disabled && 'cursor-not-allowed opacity-50',
        );
    }
}
