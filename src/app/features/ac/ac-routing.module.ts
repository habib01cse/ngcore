/* angular stuff */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* 3rd party libraries */

/* our own stuff */
//Forms

import { Ac1004Component } from './components/forms/ac1004.component';
import { Ac1023Component } from './components/forms/ac1023.component';
import { Ac1118Component } from './components/forms/ac1118.component';
import { Ac1127Component } from './components/forms/ac1127.component';
import { Ac1013Component } from './components/forms/ac1013.component';
import { Ac1057Component } from './components/forms/ac1057.component';
import { Ac1011Component } from './components/forms/ac1011.component';
//Reports
import { Ac3000Component } from './components/reports/ac3000.component';
import { AcComponent } from './ac.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CanDeactivateGuard } from 'src/app/core/guards/can-deactivate/can-deactivate.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: AcComponent,
    children:
      [
        { path: 'dashboard', component: DashboardComponent, data: { title: "Dashboard" } },              
        { path: 'forms/ac_1004', component: Ac1004Component, canDeactivate: [CanDeactivateGuard], data: { state: 'ac_1004' } },        
        { path: 'forms/ac_1023', component: Ac1023Component, canDeactivate: [CanDeactivateGuard], data: { state: 'ac_1023' } },        
        { path: 'forms/ac_1118', component: Ac1118Component, canDeactivate: [CanDeactivateGuard], data: { state: 'ac_1118' } },      
        { path: 'forms/ac_1127', component: Ac1127Component, canDeactivate: [CanDeactivateGuard], data: { state: 'ac_1127' } },      
        { path: 'forms/ac_1013', component: Ac1013Component, canDeactivate: [CanDeactivateGuard], data: { state: 'ac_1013' } },      
        { path: 'forms/ac_1057', component: Ac1057Component, canDeactivate: [CanDeactivateGuard], data: { state: 'ac_1057' } },      
        { path: 'forms/ac_1011', component: Ac1011Component, canDeactivate: [CanDeactivateGuard], data: { state: 'ac_1011' } },      
        { path: 'reports/ac_3000', component: Ac3000Component, data: { state: 'ac_3000' } },        
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcRoutingModule { }
