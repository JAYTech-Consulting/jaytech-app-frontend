import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class Header implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedReq = req.clone({
            setHeaders: { Authorization: 'Bearer my-fake-token' },
        });

        return next.handle(clonedReq).pipe(
            tap({
                next: (event) => {
                    if (event instanceof HttpResponse)
                        console.log('Response status:', event.status);
                },
                error: (err: any) => {
                    if (err instanceof HttpErrorResponse) console.log('Error status:', err.status);
                },
            }),
        );
    }
}
