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
  public selectdateStatus;
  public selectedMoneyreqStatus;
  public selectedProbisionStatus;

  public billTypeList:any = [];
  public dateStatusTypeList:any = [];
  public acceptedTypeList:any = [];
  public auditStatusTypeList:any = [];
  public probisionDataList = [];

  public formParam: FormParam;
  public moneyreqList:any = [];
  public moneyreqListBackup:any = [];
  public reportInfoList:any = [];
  public reportConfig : any = [];
  public roundList: any = [];
  public taskList: any = [];

  public salesInvoiceDateTypeList:any = [];
  public remarks;
  public PRM_STATUS;
  public STATUS_NO : number=null;
  public TASK_NAME;
  public DESCR;
  public isApprooveFlag : boolean=false;
  public isUnApprooveFlag : boolean=false;

  public task;
  public totalAmount = 0;
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
    this.dateStatusTypeList = fixedValues.dateStatus;
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
    this.totalAmount = 0;
    

    if(data.length>0){
      for (const iterator of data) {
        if( (typeof iterator.INVOICE_VALUE !== 'undefined')){
          this.totalAmount += isNaN(Number(iterator.TOTAL_AMT)) ? 0 : Number(iterator.TOTAL_AMT);
        }
       
      }
    }
  }
}
