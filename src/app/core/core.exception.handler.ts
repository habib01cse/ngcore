/* angular stuff */
import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonService } from '../features/ac/services/common.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()

// @Injectable({
//     providedIn: 'root' 
// })
export class CoreExceptionHandler implements ErrorHandler {
    constructor(private commonService: CommonService, private toastr: ToastrService) { }
    handleError(error:any) {
        if(error == null) return;
        if (error instanceof HttpErrorResponse) {
            // Server or connection error happened
            if (!navigator.onLine) {
                // Handle offline error
            } else {
                // Handle Http Error (error.status === 403, 404...)
            }
        } else {
            // Handle Client Error (Angular Error, ReferenceError...)     
        }
        // Log the error anyway
        console.error('It happens: ', error);
       // this.messageService.add({severity:'success', summary:'Title', detail:error.message});

       /***
        *  will be commented out when need
        */
       /*
        this.commonService.saveErrorLog(JSON.stringify(error.message), 1, '', JSON.stringify(error.stack)).subscribe(result => {
            
        }, err => {
            console.log(err);
        });
        */
        this.toastr.error(error.message,'Error',{
            timeOut: 4000,
            extendedTimeOut:4000,
            positionClass: 'toast-bottom-right',
            closeButton:true,
        });
        
    }
}