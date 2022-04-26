import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VersionLogComponent } from './components/version-log.component';

const routes: Routes = [
  { path: '', redirectTo: 'version-log', pathMatch: 'full' },
  {
    path: 'version-log',
    component: VersionLogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityLogRoutingModule { }
