/* angular stuff */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* 3rd party libraries */

/* our own stuff */
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { LanguageResolver } from './core/services/language-resolver';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', loadChildren: ()=> import('src/app/features/auth/auth.module').then(m=>m.AuthModule) },
  {
    path: 'home', 
    canActivate: [AuthGuard], 
    loadChildren: ()=> import('src/app/main/main.module').then(m=>m.MainModule),
    data: {title: "Angular Core"}
  },
  { path: 'activity', loadChildren: ()=> import('src/app/features/activity-log/activity-log.module').then(m=>m.ActivityLogModule) },
  { path: 'ac', resolve: {Items:LanguageResolver}, canActivate: [AuthGuard], loadChildren: ()=> import('src/app/features/ac/ac.module').then(m=>m.AcModule), data: {title: "General Ledger"} },
  { path: 'ap', resolve: {Items:LanguageResolver}, canActivate: [AuthGuard], loadChildren: ()=> import('src/app/features/ap/ap.module').then(m=>m.ApModule), data: {title: "Test.."} },  
  
  { path: 'common-list', loadChildren: "src/app/shared/modules/modals/common-list/common-list.module" },
  { path: 'file-upload', loadChildren: "src/app/shared/modules/modals/file-upload/file-upload.module" },   
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
