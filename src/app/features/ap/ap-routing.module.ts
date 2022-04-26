/* angular stuff */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* 3rd party libraries */

/* our own stuff */
import { ApComponent } from './ap.component';
import { Ap1004Component } from './components/forms/ap1004.component';
import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate/can-deactivate.guard';


const routes: Routes = [
  { path: '', redirectTo: 'forms/ap_1041', pathMatch: 'full' },
  {
    path: '',
    component: ApComponent,
    children:
      [        
        { path: 'forms/ap_1004', canDeactivate: [CanDeactivateGuard], component: Ap1004Component },       
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApRoutingModule { }
