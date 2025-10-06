// src/app/toast-container/toast-container-container.component.ts
import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';

@Component({
    selector: 'app-toast-container',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-xs" aria-live="polite" aria-atomic="true">
        @for (t of toasts(); track t) {
            <div class="transform transition-all duration-200 ease-out">
                <div
                    class="flex items-start gap-3 p-3 rounded-lg shadow-lg ring-1 ring-black/5"
                    [ngClass]="toastClasses(t.type)"
                    role="status"
                >
                    <!-- icon -->
                    <div class="flex-shrink-0 mt-0.5">
                        @switch (t.type) {
                            @case ('success') {
                                <svg
                                    class="w-5 h-5 text-emerald-500"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path d="M20 6L9 17l-5-5"></path>
                                </svg>
                            }
                            @case ('error') {
                                <svg
                                    class="w-5 h-5 text-red-500"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path d="M18 6L6 18M6 6l12 12"></path>
                                </svg>
                            }
                            @case ('warning') {
                                <svg
                                    class="w-5 h-5 text-amber-500"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        d="M10.29 3.86L1.82 18a1.5 1.5 0 0 0 1.29 2.24h17.78a1.5 1.5 0 0 0 1.29-2.24L13.71 3.86a1.5 1.5 0 0 0-2.42 0z"
                                    ></path>
                                    <path d="M12 9v4M12 17h.01" />
                                </svg>
                            }
                            @default {
                                <svg
                                    class="w-5 h-5 text-sky-500"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path d="M13 16h-1v-4h-1"></path>
                                    <circle cx="12" cy="8" r="1"></circle>
                                </svg>
                            }
                        }
                    </div>

                    <!-- content -->
                    <div class="flex-1 min-w-0">
                        @if (t.title) {
                            <div class="text-sm font-semibold text-slate-900">
                                {{ t.title }}
                            </div>
                        }

                        <div class="mt-0.5 text-sm text-slate-700">
                            {{ t.message }}
                        </div>
                    </div>

                    <!-- actions -->
                    <div class="ml-3 flex items-start">
                        <button
                            (click)="dismiss(t.id)"
                            type="button"
                            class="text-slate-400 hover:text-slate-600"
                        >
                            <span class="sr-only">Dismiss</span>
                            <svg
                                class="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <path d="M6 6l12 12M6 18L18 6"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        }
    </div>
  `,
    styles: [
        // small local tweaks if needed; primarily styling by Tailwind classes in template
    ]
})
export class ToastContainer{
    toasts
    constructor(public toast: ToastService) {
        this.toasts = this.toast.toasts;
    }

     // signal

    dismiss(id: string) {
        this.toast.dismiss(id);
    }

    toastClasses(type?: string) {
        switch (type) {
            case 'success':
                return 'bg-white border-l-4 border-emerald-400';
            case 'error':
                return 'bg-white border-l-4 border-red-500';
            case 'warning':
                return 'bg-white border-l-4 border-amber-400';
            default:
                return 'bg-white border-l-4 border-sky-400';
        }
    }
}
