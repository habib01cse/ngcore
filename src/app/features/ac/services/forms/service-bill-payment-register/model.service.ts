/* angular stuff */
import { Injectable } from '@angular/core';
/* our own stuff */
import { DateService } from 'src/app/shared';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

import { FormParam } from '../../../models/form-param';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { PaymentRegister } from '../../../models/payment-register.model';
@Injectable({
  providedIn: 'root'
})
export class ModelService {
  
  public selectedTask = '';
  public selectedPaymentStatus = '';
  public selectedAuditStatus = '';
  public selectedCheckVoucher = '';
  public selectedProbisionStatus = '';

  public selectType = '';

  public paymentStatusTypeList:any = [];
  public auditStatusTypeList:any = [];
  public taskList:any = [];
  public probisionStatusList = [];

  public formParam: FormParam;
  public invoiceStatusList = new Array<PaymentRegister>();
  public invoiceStatusListBackup = new Array<PaymentRegister>();
  public reportInfoList:any = [];

  public salesInvoiceDateTypeList:any = [];
  
  public totalInvoiceValue = 0;
  public totalAcceptanceValue = 0;
  public totalAuditedValue = 0;
  public totalDeductionValue = 0;
  public totalPaymentValue = 0;
  public totalPendingValue = 0;
  public totalPendingBaseValue = 0;
  userPrivilege = new UserPrivileges();

  constructor(
    private dateUtil: DateService,
  ) {
    this.paymentStatusTypeList = fixedValues.paymentStatus;
    this.auditStatusTypeList = fixedValues.auditStatus;
    this.taskList = fixedValues.bblcDateType;
    this.probisionStatusList = fixedValues.probisionData;
    this.formParam = new FormParam();
    this.dateSet();
   }
   
   public dateSet(){
    this.formParam.END_DATE = new Date();
    this.formParam.START_DATE = new Date(); 
    this.formParam.START_DATE.setDate(new Date().getDate() - 30);
   }

  

  public totalAmountSum(){
    this.resetCalculation();

    if(this.invoiceStatusList.length>0){
      for (const iterator of this.invoiceStatusList) {
        if( (typeof iterator.INVOICE_VALUE !== 'undefined')){
          this.totalInvoiceValue += isNaN(Number(iterator.INVOICE_VALUE)) ? 0 : Number(iterator.INVOICE_VALUE);
        }
        if( (typeof iterator.ACCEPTANCE_VALUE !== 'undefined')){
          this.totalAcceptanceValue += isNaN(Number(iterator.ACCEPTANCE_VALUE)) ? 0 : Number(iterator.ACCEPTANCE_VALUE);
        }
        if( (typeof iterator.AUDITED_VALUE !== 'undefined')){
          this.totalAuditedValue += isNaN(Number(iterator.AUDITED_VALUE)) ? 0 : Number(iterator.AUDITED_VALUE);
        }
        if( (typeof iterator.DEDUCTION !== 'undefined')){
          this.totalDeductionValue += isNaN(Number(iterator.DEDUCTION)) ? 0 : Number(iterator.DEDUCTION);
        }
        if( (typeof iterator.PAY_AMT !== 'undefined')){
          this.totalPaymentValue += isNaN(Number(iterator.PAY_AMT)) ? 0 : Number(iterator.PAY_AMT);
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

  public resetCalculation(){
    this.totalInvoiceValue = 0;
    this.totalAcceptanceValue = 0;
    this.totalAuditedValue = 0;
    this.totalDeductionValue = 0;
    this.totalPaymentValue = 0;
    this.totalPendingValue = 0;
    this.totalPendingBaseValue = 0;
  }


}

