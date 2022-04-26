import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityLogRoutingModule } from './activity-log-routing.module';
import { VersionLogComponent } from './components/version-log.component';

@NgModule({
  declarations: [VersionLogComponent],
  imports: [
    CommonModule,
    ActivityLogRoutingModule
  ]
})
export class ActivityLogModule { }
