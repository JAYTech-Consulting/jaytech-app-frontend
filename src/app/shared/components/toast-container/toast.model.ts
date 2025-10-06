export type ToastType = 'info' | 'success' | 'error' | 'warning';

export interface Toast {
    id: string;
    message: string;
    title?: string;
    type?: ToastType;
    duration?: number; // ms
}
