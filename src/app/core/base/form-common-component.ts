import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { MasterActionService } from 'src/app/shared';
import {NgForm} from "@angular/forms";
import { FormCanDeactivate } from '../guards/form-can-deactivate/form-can-deactivate';
import { ComponentCanDeactivate } from '../guards/can-deactivate/component-can-deactivate';
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { GridService } from 'src/app/shared/services/grid.service';
import { ToastrService } from 'ngx-toastr';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { LangService } from 'src/app/core/services/lang.service';

export abstract class FormCommonComponent implements OnInit, AfterViewInit {

  constructor( protected actionService:MasterActionService) { 
  }

  
  ngOnInit() {
    
  }

  ngAfterViewInit(): void {
     this.actionService._checkView$.next();
  }
  
  // get hasAnyChange():Boolean{
  //   return false;
  // }

  // public save(grid:any, dataService: any, entityModel:any, isValidate: boolean){
  //   let alertService = new AlertService();
  //   let langService = new LangService();

  //   grid.api.stopEditing();
  //   setTimeout(() => {

  //     if (grid.api.psGetChangeList().length == 0) {
  //       this.toastService.info(langService.langData.noChangeFound,'Info');
  //       return;
  //     }

  //     alertService.info(langService.langData.saveConfirmationMsg, true).then(data => {      
  //       if(data){
  //         let listTemp = JSON.parse(JSON.stringify(grid.api.psGetChangeList())); 
  //         dataService.save(listTemp).subscribe(result => {
  //           if( result.body ){
  //             this.toastService.success(langService.langData.saveSuccessMsg,'Success');
  //           }
  //           grid.api.psResetValidation();
  //           grid.api.psUpdateList(result.body, entityModel);
  //         }, err => {
  //           console.log("err", err);
  //         });
  //       }
  //     })


  //   }, 100);
  // }

}
