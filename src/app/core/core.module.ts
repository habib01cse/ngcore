/* angular stuff */
import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/* 3rd party libraries */
import { BsDatepickerModule } from 'src/app/shared/vendor';
/* our own stuff */
import { throwIfAlreadyLoaded } from './guards/module-import.guard';
import { CoreExceptionHandler } from './core.exception.handler';
import { NotFoundComponent } from './not-found/not-found.component';
import { TokenInterceptor } from './interceptors/token-interceptor.service';
import { TitleService } from './services/title.service';
import { WebStorageService } from './services/web-storage.service';
import { SpinnerService } from './services/spinner.service';
// Modals
import { SharedModule } from '../shared/shared.module';
import { RequestCache } from './services/request-cache.service';
//import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { DocumentListComponent } from '../features/ac/components/forms/modals/document-list.component';
import { VendorModule } from '../shared/vendor/vendor.module';
import { DialogModule } from '../shared/modules/dialog.module';
import { BaseComponent } from './base/base.component';
import { FormCanDeactivate } from './guards/form-can-deactivate/form-can-deactivate';
import { FormCommonComponent } from './base/form-common-component';

@NgModule({
    declarations: [
        NotFoundComponent            
        , DocumentListComponent                
        , BaseComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        SharedModule,
        VendorModule,
        DialogModule,
        BsDatepickerModule.forRoot(),
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        BsDatepickerModule,
        BaseComponent
    ],
    providers: [
        TitleService,
        SpinnerService,
        RequestCache,
        { provide: ErrorHandler, useClass: CoreExceptionHandler },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
    ],
    entryComponents: [       
        DocumentListComponent        
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule, titleService: TitleService) {
        titleService.init();
        WebStorageService.setUserGloablData();
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
