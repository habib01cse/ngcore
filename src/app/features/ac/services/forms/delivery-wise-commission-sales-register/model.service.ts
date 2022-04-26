/* angular stuff */
import { Injectable } from '@angular/core';
/* our own stuff */
import { DateService } from 'src/app/shared';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

import { FormParam } from '../../../models/form-param';
import { DeleveryReg } from '../../../models/delevery-regestration';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
@Injectable({
  providedIn: 'root'
})
export class ModelService {
  
  public formParam: FormParam;
  public selectedStatus = null;
  public selectedOrderType1=null;
  public exportStatus = null ; 
  public deliveryType=null;

  public getSaleInvoiceList:any = [];
  public getDtlNamesList:any = [];
  public invoiceStatusList:any = new Array<DeleveryReg>();
  public invoiceStatusListBackup:any = new Array<DeleveryReg>();
  public buNameList:any = [];
  public referenceNameList:any = [];
  public reportInfoList:any = [];
  public saleReturnTypeList:any = [];
  public postTypeList:any = [];
  public orderTypeList:any=[];
  public exportStatusList:any = [];
  public deliveryTypeList:any=[];
  public selectedSaleReturnType = null;
  public totalGrandAmount = 0;
  public totalDCQtyAmount = 0;
  public postModalStatus :boolean = false;
  public unpostModalStatus = false;
  public selectdInvoiceStatus = new DeleveryReg();
  public invoiceStatusDetailsList:any = [];
  public salseDetailsTotalAmount = 0;
  public selectedTranNo;
  public selectedNaration;
  public selectedOrderType;

  userPrivilege = new UserPrivileges();
  constructor(
    private dateUtil: DateService,
  ) {
    this.saleReturnTypeList = fixedValues.dcdoDate;
    this.formParam = new FormParam();
    this.dateSet();
    this.postTypeList = fixedValues.postStatus;
    this.exportStatusList = fixedValues.invoiceType;
    this.deliveryTypeList= fixedValues.deliveryType;
   }
   
   public dateSet(){
    this.formParam.END_DATE = new Date();
    this.formParam.START_DATE = new Date(); 
    this.formParam.START_DATE.setDate(new Date().getDate() - 30);
   }

  public totalAmountSum(){
    this.totalGrandAmount = 0;
    this.totalDCQtyAmount = 0;
    for (const iterator of this.invoiceStatusList) {
      if( (typeof iterator.ISU_QTY !== 'undefined')){
        this.totalDCQtyAmount += isNaN(Number(iterator.ISU_QTY)) ? 0 : Number(iterator.ISU_QTY);
      }
      if( (typeof iterator.GRAND_TOTAL !== 'undefined')){
        this.totalGrandAmount += isNaN(Number(iterator.GRAND_TOTAL)) ? 0 : Number(iterator.GRAND_TOTAL);
      }
    }
  }

  public salesDetailsTotalAmountSum(){
    this.salseDetailsTotalAmount = 0;
    for (const iterator of this.invoiceStatusDetailsList) {
      if( (typeof iterator.SALE_TOTAL !== 'undefined')){
        this.salseDetailsTotalAmount += isNaN(Number(iterator.SALE_TOTAL)) ? 0 : Number(iterator.SALE_TOTAL);
      }
    }
  }

  public total(data,prop){
    let t=0;
    for(let iterator of data){
      if(iterator[prop]!=='undefined'){
       t += isNaN(Number(iterator[prop])) ? 0 : Number(iterator[prop]);
      }
    }
    return t;
  }

}
