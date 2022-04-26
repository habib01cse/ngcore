/* angular stuff */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
/* 3rd party libraries */

/* our own stuff */
// Routing
import { AcRoutingModule } from './ac-routing.module';
// Forms

import { Ac1004Component } from './components/forms/ac1004.component';
import { Ac1023Component } from './components/forms/ac1023.component';
import { Ac1118Component } from './components/forms/ac1118.component';
import { Ac1127Component } from './components/forms/ac1127.component';
import { Ac1013Component } from './components/forms/ac1013.component';
import { Ac1057Component } from './components/forms/ac1057.component';
import { Ac1011Component } from './components/forms/ac1011.component';
//Reports
import { Ac3000Component } from './components/reports/ac3000.component';
// Modals
import { AcComponent } from './ac.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NumberToWordsPipe } from 'src/app/shared/pipes/number-to-words.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LangService } from 'src/app/core/services/lang.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { VendorModule } from 'src/app/shared/vendor/vendor.module';
import { DialogModule } from 'src/app/shared/modules/dialog.module';
@NgModule({
  imports: [
    CommonModule,
    AcRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    VendorModule,
    DialogModule,
    HighchartsChartModule,
    // ProgressbarModule,
    
    
  ],
  declarations: [
    Ac1004Component
    , Ac3000Component
    , AcComponent
    , DashboardComponent  
    , Ac1023Component
    , Ac1118Component  
    , Ac1127Component
    , Ac1013Component
    , Ac1057Component
    , Ac1011Component
    
  ],
  providers: [
    LangService,
    // ProgressbarConfig,
    // AcDashboardService
   
 
  ]
})
export class AcModule { }
