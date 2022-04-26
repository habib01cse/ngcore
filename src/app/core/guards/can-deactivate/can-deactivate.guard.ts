import { Component, Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import {ComponentCanDeactivate} from './component-can-deactivate';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<Component> {
  constructor(){

  }
  canDeactivate(component: Component): boolean {
    // console.log("component", component);
    // console.log("component['hasAnyChange']", component['hasAnyChange']);

    if(component['hasAnyChange']){
      // console.log("in inner call ");
      if (confirm("You have unsaved changes! If you leave, your changes will be lost.")) {
        return true;
      } else {
        return false;
      }
    }
    
    // if(!component.canDeactivate()){
    //   console.log("component.canDeactivate", component.canDeactivate);
    //     if (confirm("You have unsaved changes! If you leave, your changes will be lost.")) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // console.log("this.gridList", component['gridList']);
    // if(component.hasOwnProperty('gridList')){
    //   for(let i =0; i<component['gridList'].length; i++){
        
    //     if( component['gridList'][i].hasOwnProperty('api') &&  component['gridList'][i].api['psGetChangeList']().length > 0 ){
    //       if (confirm("You have unsaved changes! If you leave, your changes will be lost.")) {
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     }
    //   }
    //   // component['gridList'].forEach(element=>{
    //   //   //console.log("eval(element)['api']", eval(component+"."+element)['api']);
    //   //   if(element.hasOwnProperty('api') && element.api['psGetChangeList']().length > 0 ){
    //   //     if (confirm("You have unsaved changes! If you leave, your changes will be lost.")) {
    //   //       return true;
    //   //     } else {
    //   //       return false;
    //   //     }
    //   //   }
    //   // })
    // }
    return true;
  }
}
