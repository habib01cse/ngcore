/* angular stuff */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, SystemJsNgModuleLoader, NgModuleFactoryLoader } from '@angular/core';
import { FormsModule } from '@angular/forms';

/* 3rd party libraries */
import { DynamicModalModule, DynamicModalService } from 'dynamicModal';


/* our own stuff */
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LanguageResolver } from './core/services/language-resolver';
import { modalLazyModules } from './app.config.lazy.module';

// import { HighchartsChartComponent } from 'highcharts-angular';
// import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    //  HighchartsChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    DynamicModalModule.forRoot(modalLazyModules),
    SharedModule,
    FormsModule,
    
    // HighchartsChartModule
  ],
  providers: [LanguageResolver, DynamicModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// all extension is here
declare global {
  interface Array<T> {
    // entityPush(o: T): Array<T>;
    // entityPop(o: T): Array<T>;
    spliceEntity(o: T): Array<T>;
    spliceEntityById(o: T): Array<T>;
  }

  interface Date {
    compareDate(date: Date): number;
    psToDate():any;
  }

  interface String {
    capitalize(): String;
    psToDate():any;
  }
}

// // entityPush
// Array.prototype.entityPush = function (entity: any) {
//   let index = 0;
//   this.push(entity);
//   return index;
// }

// Array.prototype.entityPop = function (entity: any) {
//   let index = 0;
//   this.push(entity);
//   return index;
// }

// spliceEntity
Array.prototype.spliceEntity = function (sourceToRemove: any) {
  //Remove the deleted entry from list
  const index = this.indexOf(sourceToRemove);
  if (index != -1) { // Make sure the value exists
    this.splice(index, 1);
  }
  return index;
}

// spliceEntityById
Array.prototype.spliceEntityById = function (V_NO: any) {
  //Remove the deleted entry from list
  const index = this.map(function (x) { return x.V_NO; }).indexOf(parseInt(V_NO));
  if (index != -1) { // Make sure the value exists
    this.splice(index, 1);
  }
  return index;
}

// compareDate
Date.prototype.compareDate = function (date: Date) {
  if (this.toLocaleDateString() === date.toLocaleDateString()) {
    //console.log('equal');
    return 0;
  }
  else if (this > date) {
    //console.log('greater');
    return 1;
  }
  else if (this < date) {
    //console.log('less');
    return -1;
  }

  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
}

Date.prototype.psToDate = function() {
  if(!this) return null;
  try {
    const result = new Date(this);
    if(result instanceof Date) return result;
    else return null;
  } catch(e) {
    return null;
  }
}

String.prototype.psToDate = function() {
  if(!this) return null;
  try {
    const result = new Date(this);
    if(result instanceof Date) return result;
    else return null;
  } catch(e) {
    return null;
  }
}

export { }; 
