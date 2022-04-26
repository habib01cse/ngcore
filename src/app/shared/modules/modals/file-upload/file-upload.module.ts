
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { VendorModule } from 'src/app/shared/vendor/vendor.module';
import { DialogModule } from '../../dialog.module';
import { FileUploadComponent } from './file-upload.component';

@NgModule({
  declarations: [FileUploadComponent],
  imports: [
    CommonModule,
    SharedModule,
    DialogModule,
    FormsModule,
    VendorModule
  ],
  entryComponents: [FileUploadComponent]
})
export class FileUploadModule {
  static components = {
    'file-upload': FileUploadComponent
  }
 }
