import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { CommonService } from 'src/app/features/ac/services/common.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private commonService: CommonService, private toastr: ToastrService, ) {
        //console.log("OffLne constractor");
        
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                     let errorMessage = '';
                     console.log(error);

                    if (error.status == 0) {
                        // Internet Connection Error 
                       // errorMessage = `Error: ${error.error.message}`;
                        // this.toastr.error("No Internent Connection",'Error',{
                        //     timeOut: 4000,
                        //     extendedTimeOut:4000,
                        //     positionClass: 'toast-bottom-right',
                        //     closeButton:true,
                        // });
                        
                    } else {
                        console.log("Http error ");
                        // Http Error
                        // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                        // this.commonService.saveErrorLog(error.message, 1,  error.status, error.error.message, error.url,  '', '', 0).subscribe(result => {
                        // }, err => {
                        //     console.log(err);
                        //     return throwError(errorMessage);
                        // });
                        // this.toastr.error(error.message,'Error',{
                        //     timeOut: 4000,
                        //     positionClass: 'toast-bottom-right',
                        //     closeButton:true,
                        // });
                        return  throwError(errorMessage);
                    }
                })
            )

            
    }
}