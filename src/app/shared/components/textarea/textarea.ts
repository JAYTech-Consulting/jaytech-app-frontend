import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-textarea',
  imports: [],
  templateUrl: './textarea.html',
  styleUrl: './textarea.css'
})
export class Textarea {
    @Input() placeholder: string = '';
    @Input() value: string = '';
    @Input() disabled: boolean = false;
    @Input() rows: number = 4;
}
