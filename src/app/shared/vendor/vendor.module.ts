/* angular stuff */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '../modules/ng-select/ng-select.module';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};


@NgModule({
    imports: [
        PerfectScrollbarModule,
        FormsModule,
        NgSelectModule,
        ToastrModule.forRoot({
            timeOut: 4000,
            extendedTimeOut: 4000,
            positionClass: 'toast-bottom-right',
            closeButton: true,
        }),
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot()
        
    ],
    exports: [
        NgSelectModule,
        PerfectScrollbarModule,
        BsDatepickerModule,
        ToastrModule,
        TimepickerModule
    ],
    declarations: [
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ],

})
export class VendorModule {

}