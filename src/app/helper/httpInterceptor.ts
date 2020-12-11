import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router, NavigationExtras } from '@angular/router';
import { AppService } from '../services/appService';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private router: Router, private appService: AppService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = localStorage.getItem('Authorization') || window.localStorage.getItem('Authorization');
        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: token
                }
            });
        }

        return next.handle(req)
            .pipe(map((event: HttpEvent<any>) => {
                // if (event instanceof HttpResponse && ~~(event.status / 100) > 3) {
                //     console.info('HttpResponse::event =', event, ';');
                // } else {
                //     console.info('event =', event, ';')
                // };
                return event;
            }))
            .pipe(catchError((err: any, caught) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.router.navigate(['login']);
                    }
                    else {
                        console.log(JSON.stringify(err));
                        this.appService.openSnackbar(JSON.stringify(err));
                    }

                    // alert(JSON.stringify(err));
                }
                return throwError(err);
            }));
    }
}
