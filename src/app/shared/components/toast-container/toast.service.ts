// src/app/toast-container/toast-container.service.ts
import { Injectable, signal } from '@angular/core';
import { Toast } from './toast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
    // use signals so consuming standalone component autoupdates
    private _toasts = signal<Toast[]>([]);
    toasts = this._toasts.asReadonly();

    private idCounter = 0;

    show(message: string, opts?: { title?: string; type?: Toast['type']; duration?: number }) {
        const id = `${Date.now()}-${this.idCounter++}`;
        const toast: Toast = {
            id,
            message,
            title: opts?.title,
            type: opts?.type ?? 'info',
            duration: opts?.duration ?? 4000,
        };

        this._toasts.update(prev => [toast, ...prev]);

        if (toast.duration && toast.duration > 0) {
            setTimeout(() => this.dismiss(id), toast.duration);
        }

        return id;
    }

    success(message: string, opts?: { title?: string; duration?: number }) {
        return this.show(message, { ...opts, type: 'success' });
    }
    error(message: string, opts?: { title?: string; duration?: number }) {
        return this.show(message, { ...opts, type: 'error' });
    }
    info(message: string, opts?: { title?: string; duration?: number }) {
        return this.show(message, { ...opts, type: 'info' });
    }
    warning(message: string, opts?: { title?: string; duration?: number }) {
        return this.show(message, { ...opts, type: 'warning' });
    }

    dismiss(id: string) {
        this._toasts.update(prev => prev.filter(t => t.id !== id));
    }

    clear() {
        this._toasts.set([]);
    }
}
