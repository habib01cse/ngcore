/* angular stuff */
import { Injectable } from '@angular/core';
/* our own stuff */
import { DateService } from 'src/app/shared';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

import { FormParam } from '../../../models/form-param';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
@Injectable({
  providedIn: 'root'
})
export class ModelService {
  
  public selectedStatus;
  public formParam: FormParam;
  public invoiceStatusList:any = [];
  public postTypeList: any = [];
  public reportInfoList:any = [];

  public salesInvoiceDateTypeList:any = [];
  public selectedSalesInvoiceDateType;
  
  public totalGrandAmount = 0;
  userPrivilege = new UserPrivileges()

  constructor(
    private dateUtil: DateService,
  ) {
    this.postTypeList = fixedValues.postStatus;
    this.salesInvoiceDateTypeList = fixedValues.salesInvoiceDateType
    this.formParam = new FormParam();
    this.dateSet();
   }
   
   public dateSet(){
    this.formParam.END_DATE = new Date();
    this.formParam.START_DATE = new Date(); 
    this.formParam.START_DATE.setDate(new Date().getDate() - 30);
   }

  public totalGrandAmountSum(){
    this.totalGrandAmount = 0;
    for (const iterator of this.invoiceStatusList) {
      if( (typeof iterator.GRAND_TOTAL !== 'undefined')){
        this.totalGrandAmount += isNaN(Number(iterator.GRAND_TOTAL)) ? 0 : Number(iterator.GRAND_TOTAL);
      }
    }
  }

  public grandAmountSum(data){
    this.totalGrandAmount=0;
    for (const iterator of data) {
      if( (typeof iterator.GRAND_TOTAL !== 'undefined')){
        this.totalGrandAmount += isNaN(Number(iterator.GRAND_TOTAL)) ? 0 : Number(iterator.GRAND_TOTAL);
      }
    }
    return this.totalGrandAmount;
  }
}
