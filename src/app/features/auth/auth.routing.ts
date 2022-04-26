
import {Routes, RouterModule} from "@angular/router";
import { LogoutComponent } from "./logout/logout.component";


export const routes:Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: ()=> import('./login/login.module').then(m=>m.LoginModule)
  },
  {path: 'logout', component: LogoutComponent },
  // {
  //   path: 'register',
  //   loadChildren: './register/register.module#RegisterModule'
  // },
  // {
  //   path: 'forgot-password',
  //   loadChildren: './forgot/forgot.module#ForgotModule'
  // },
  // {
  //   path: 'locked',
  //   loadChildren: './locked/locked.module#LockedModule'
  // }
];

export const routing = RouterModule.forChild(routes);
