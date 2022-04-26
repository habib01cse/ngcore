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
  public selectedLCType;
  public selectedPaymentStatus;
  public selectedAcceptedStatus;
  public selectedCheckVoucher;
  public selectedProbisionStatus;

  public lcTypeypeList:any = [];
  public paymentStatusTypeList:any = [];
  public acceptedStatusList:any = [];
  public probisionDataList = [];

  public formParam: FormParam;
  public invoiceStatusList:any = [];
  public invoiceStatusListBackup:any = [];
  public reportInfoList:any = [];
  
  public totalInvoiceAmount = 0;
  public totalAcceptenceAmount = 0;
  public totalPaymentAmount = 0;
  public totalPendingAmount = 0;
  public totalPendingBaseAmount = 0;
  userPrivilege = new UserPrivileges()

  constructor(
   
  ) {

    this.lcTypeypeList = fixedValues.lcType2;
    this.paymentStatusTypeList = fixedValues.paymentStatus;
    this.acceptedStatusList = fixedValues.acceptedType;
    this.probisionDataList = fixedValues.probisionData;
    this.formParam = new FormParam();
    this.dateSet();
   }
   
   public dateSet(){
    this.formParam.END_DATE = new Date();
    this.formParam.START_DATE = new Date(); 
    this.formParam.START_DATE.setDate(new Date().getDate() - 30);
   }

  public totalAmountSum(data){
    this.totalInvoiceAmount = 0;
    this.totalAcceptenceAmount = 0;
    this.totalPaymentAmount = 0;
    this.totalPendingAmount = 0;
    this.totalPendingBaseAmount = 0;

    if(data.length>0){
      for (const iterator of data) {
        if( (typeof iterator.INVOICE_VALUE !== 'undefined')){
          this.totalInvoiceAmount += isNaN(Number(iterator.INVOICE_VALUE)) ? 0 : Number(iterator.INVOICE_VALUE);
        }
        if( (typeof iterator.ACCEPTANCE_VALUE !== 'undefined')){
          this.totalAcceptenceAmount += isNaN(Number(iterator.ACCEPTANCE_VALUE)) ? 0 : Number(iterator.ACCEPTANCE_VALUE);
        }
        if( (typeof iterator.PAY_AMT !== 'undefined')){
          this.totalPaymentAmount += isNaN(Number(iterator.PAY_AMT)) ? 0 : Number(iterator.PAY_AMT);
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
}
