/* angular stuff */
import { Injectable } from '@angular/core';
/* our own stuff */
import { DateService } from 'src/app/shared';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

import { FormParam } from '../../../models/form-param';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { DeleveryReg } from '../../../models/delevery-regestration';
@Injectable({
  providedIn: 'root'
})
export class ModelService {

  public selectedBillType;
  public selectedPaymentStatus;
  public selectedAuditStatus;
  public selectedProbisionStatus;

  public billTypeList:any = [];
  public paymentStatusTypeList:any = [];
  public auditStatusTypeList:any = [];
  public probisionDataList = [];

  public formParam: FormParam;
  public invoiceStatusList:any = [];
  public invoiceStatusListBackup:any = [];
  public reportInfoList:any = [];
  public reportConfig : any = [];
  public roundList: any = [];

  public salesInvoiceDateTypeList:any = [];
  
  public totalInvoiceValue = 0;
  public totalBillBaseValue = 0;
  public totalAuditedValue = 0;
  public totalDidactionValue = 0;
  public totalPaymentValue = 0;
  public totalPendingValue = 0;
  public totalPendingBaseValue = 0;
  userPrivilege = new UserPrivileges()
  postModalStatus=false;
  public selectdInvoiceStatus = new DeleveryReg();
  constructor(
    private dateUtil: DateService,
  ) {

    this.billTypeList = fixedValues.billType;
    this.paymentStatusTypeList = fixedValues.paymentStatus;
    this.auditStatusTypeList = fixedValues.auditStatusBillPayment;
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
    this.totalInvoiceValue = 0;
    this.totalBillBaseValue = 0;
    this.totalAuditedValue = 0;
    this.totalPaymentValue = 0;
    this.totalDidactionValue = 0;
    this.totalPendingValue = 0;
    this.totalPendingBaseValue = 0;

    if(data.length>0){
      for (const iterator of data) {
        if( (typeof iterator.INVOICE_VALUE !== 'undefined')){
          this.totalInvoiceValue += isNaN(Number(iterator.INVOICE_VALUE)) ? 0 : Number(iterator.INVOICE_VALUE);
        }
        if( (typeof iterator.BILL_VALUE_BASE !== 'undefined')){
          this.totalBillBaseValue += isNaN(Number(iterator.BILL_VALUE_BASE)) ? 0 : Number(iterator.BILL_VALUE_BASE);
        }
        if( (typeof iterator.AUDITED_VALUE !== 'undefined')){
          this.totalAuditedValue += isNaN(Number(iterator.AUDITED_VALUE)) ? 0 : Number(iterator.AUDITED_VALUE);
        }
        if( (typeof iterator.PAY_AMT !== 'undefined')){
          this.totalPaymentValue += isNaN(Number(iterator.PAY_AMT)) ? 0 : Number(iterator.PAY_AMT);
        }
        if( (typeof iterator.DEDUCTION !== 'undefined')){
          this.totalDidactionValue += isNaN(Number(iterator.DEDUCTION)) ? 0 : Number(iterator.DEDUCTION);
        }
        if( (typeof iterator.PENDING_VALUE !== 'undefined')){
          this.totalPendingValue += isNaN(Number(iterator.PENDING_VALUE)) ? 0 : Number(iterator.PENDING_VALUE);
        }
        if( (typeof iterator.PENDING_VALUE_BASE !== 'undefined')){
          this.totalPendingBaseValue += isNaN(Number(iterator.PENDING_VALUE_BASE)) ? 0 : Number(iterator.PENDING_VALUE_BASE);
        }
      }
    }
  }
}
