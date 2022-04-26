/* angular stuff */
import { Injectable } from '@angular/core';

/* our own stuff */
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { FormParam } from '../../../models/form-param';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
@Injectable({
  providedIn: 'root'
})
export class ModelService {
  public selectedPaymentStatus;
  public paymentStatusTypeList:any = [];

  public formParam: FormParam;
  public invoiceStatusList:any = [];
  public invoiceStatusListBackup:any = [];
  
  public totalInvoiceAmount = 0;
  public totalInvoiceValueBaseAmount = 0;
  public totalCallAmount = 0;
  public totalPendingAmount = 0;
  public totalPendingBaseAmount = 0;
  userPrivilege = new UserPrivileges()

  constructor() {
    this.paymentStatusTypeList = fixedValues.paymentStatus;
    this.formParam = new FormParam();
    this.dateSet();
   }

   public dateSet(){
    this.formParam.END_DATE = new Date();
    this.formParam.START_DATE = new Date(); 
    this.formParam.START_DATE.setDate(new Date().getDate() - 30);
   }

  public totalAmountSum(){
    this.totalInvoiceAmount = 0;
    this.totalInvoiceValueBaseAmount = 0;
    this.totalCallAmount = 0;
    this.totalPendingAmount = 0;
    this.totalPendingBaseAmount = 0;

    if(this.invoiceStatusList.length>0){
      for (const iterator of this.invoiceStatusList) {
        if( (typeof iterator.SALES_TOTAL !== 'undefined')){
          this.totalInvoiceAmount += isNaN(Number(iterator.SALES_TOTAL)) ? 0 : Number(iterator.SALES_TOTAL);
        }
        if( (typeof iterator.SALES_TOTAL_BASE !== 'undefined')){
          this.totalInvoiceValueBaseAmount += isNaN(Number(iterator.SALES_TOTAL_BASE)) ? 0 : Number(iterator.SALES_TOTAL_BASE);
        }
        if( (typeof iterator.COLL_AMOUNT !== 'undefined')){
          this.totalCallAmount += isNaN(Number(iterator.COLL_AMOUNT)) ? 0 : Number(iterator.COLL_AMOUNT);
        }
        if( (typeof iterator.PENDING_VALUE !== 'undefined')){
          this.totalPendingAmount += isNaN(Number(iterator.PENDING_VALUE)) ? 0 : Number(iterator.PENDING_VALUE);
        }
        if( (typeof iterator.PENDING_VALUE_BASE !== 'undefined')){
          this.totalPendingBaseAmount += isNaN(Number(iterator.PENDING_VALUE_BASE)) ? 0 : Number(iterator.PENDING_VALUE_BASE);
        }
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
