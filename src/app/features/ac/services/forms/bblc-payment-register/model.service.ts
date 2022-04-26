/* angular stuff */
import { Injectable } from '@angular/core';

/* our own stuff */
import { DateService } from 'src/app/shared';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

import { FormParam } from '../../../models/form-param';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { PaymentRegister } from 'src/app/features/ac/models/payment-register.model';
@Injectable({
  providedIn: 'root'
})
export class ModelService {
  
  public selectedLevel = '';
  public selectedLcType = '';
  public selectedAcceptStatus = '';
  public selectedPaymentStatus = '';
  public selectedCheckVoucher = '';
  public selectedStatus = '';

  public selectType = "";
  

  public lcTypeList:any = [];
  public acceptedTypeList:any = [];
  public paymentStatusTypeList:any = [];
  public levelList:any = [];
  public checkVoucherList:any = [];

  public formParam: FormParam;
  public invoiceStatusList = new Array<PaymentRegister>();
  public invoiceStatusListBackup = new Array<PaymentRegister>();
  public reportInfoList:any = [];
  
  public totalInvoiceValue = 0;
  public totalAuditedValue = 0;
  public totalAcceptanceValue = 0;
  public totalPaymentValue = 0;
  public totalPendingValue = 0;
  public totalPendingBaseValue = 0;
  userPrivilege = new UserPrivileges();

  constructor(
    private dateUtil: DateService,
  ) {

    this.lcTypeList = fixedValues.lcType;
    this.acceptedTypeList = fixedValues.acceptedType;
    this.paymentStatusTypeList = fixedValues.paymentStatus;
    this.checkVoucherList = fixedValues.probisionData;
    this.levelList = fixedValues.bblcDateType;
    this.formParam = new FormParam();
    this.dateSet();
   }
   
   public dateSet(){
    this.formParam.END_DATE = new Date();
    this.formParam.START_DATE = new Date(); 
    this.formParam.START_DATE.setDate(new Date().getDate() - 30);
   }  
}
