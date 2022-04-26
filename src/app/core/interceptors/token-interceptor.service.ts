import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
// import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError,of } from 'rxjs';
import { Router } from '@angular/router';
import { WebStorageService } from '../services/web-storage.service';
import { SpinnerService } from '../services/spinner.service';
import { RequestCache } from '../services/request-cache.service';
import { ToastrService } from 'ngx-toastr';
import { AutoLogoutService } from '../services/auto-logout.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private timer = 0;

  constructor(
    private storage: WebStorageService,
    private router: Router,
    public spinnerService: SpinnerService,
    private cache: RequestCache,
    private toastr: ToastrService,
    private lockService:AutoLogoutService
    ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    request = request.clone({
      setHeaders: {
        "PATH": window.location.hash
      }
    });
    const cachedResponse = this.cache.get(request);
    // return cachedResponse ? of(cachedResponse) : this.sendRequest(request, next, this.cache); // Data caching
    return this.sendRequest(request, next, this.cache);
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    cache: RequestCache
  ): Observable<HttpEvent<any>> {
    let authRequest = req;
    //console.log(req);
    
    
    const started = Date.now();
    if(!req.url.includes('refresh-token')) {
      clearTimeout(this.timer);
      if(this.spinnerService.isBlock() === false) {
        this.timer = setTimeout(() => {
          this.spinnerService.blockOn();
        });
      }
    }
    
    if (this.storage.getToken()) {
      authRequest = req.clone({
        setHeaders: {
          "TOKEN": this.storage.getToken()
        }
      });

    }

    return next.handle(authRequest)
      .pipe(
        tap(event => {          
          if (event instanceof HttpResponse) {
            // cache.put(req, event); // Data caching
            if(!event.url.includes('refresh-token')) {
              clearTimeout(this.timer);
              this.timer = setTimeout(() => {
                this.spinnerService.blockOff();
              });
              const elapsed = Date.now() - started;
            }
            //console.log(`Request for ${authRequest.urlWithParams} took ${elapsed} ms.`);
          }
        }),
        catchError(err => {
          let errorMessage = '';
          if(!err.url.includes('refresh-token')) {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
              this.spinnerService.blockOff();
            });
          }
          if(err instanceof HttpErrorResponse) {
            if (!navigator.onLine) {
              errorMessage = `Check Your Internet Connection And Try again Later`;
              this.toastr.error(errorMessage,'Error',{
                  timeOut: 4000,
                  extendedTimeOut:4000,
                  positionClass: 'toast-bottom-right',
                  closeButton:true,
              });
            } else {
              if (err.status === 0) {
                errorMessage = `Error Code: ${err.status}, \nMessage: ${err.message}`;
                
                this.toastr.error(errorMessage,'Error',{
                    timeOut: 4000,
                    extendedTimeOut:4000,
                    positionClass: 'toast-bottom-right',
                    closeButton:true,
                });
              } else if (err.status === 401) {
                this.storage.signOut();
                this.router.navigate(['/', 'login']);
              } else if (err.status === 412) {
                this.lockService.setCondition(true,false);
              } else {
                errorMessage = `Error Code: ${err.status}, \nMessage: ${err.message}`;
                // this.toastr.error(errorMessage,'Error',{
                //     timeOut: 4000,
                //     extendedTimeOut:4000,
                //     positionClass: 'toast-bottom-right',
                //     closeButton:true,
                // });
              }
            }
          }
          
          return throwError(err);
        })
      );
  }
}