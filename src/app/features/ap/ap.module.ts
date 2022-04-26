/* angular stuff */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* our own stuff */
import { LangService } from 'src/app/core/services/lang.service';
import { VendorModule } from 'src/app/shared/vendor/vendor.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogModule } from 'src/app/shared/modules/dialog.module';
import { ApComponent } from './ap.component';
import { ApRoutingModule } from './ap-routing.module';
import { Ap1004Component } from './components/forms/ap1004.component';

@NgModule({
  imports: [
    CommonModule,
    ApRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    VendorModule,
    DialogModule,
  ],
  declarations: [
    ApComponent,
    Ap1004Component
  ],
  providers: [
    LangService,
  ]
})
export class ApModule { }
