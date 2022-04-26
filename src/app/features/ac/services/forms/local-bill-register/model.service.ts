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
  public selectedPaymentStatus;
  public selectedAuditStatus;
  public selectedProbisionStatus;
  public formParam: FormParam;
  public billStatusList: any = [];
  public postTypeList: any = [];
  public reportInfoList: any = [];
  public paymentStatusTypeList: any = [];
  public auditStatusTypeList: any = [];
  public probisionStatusList: any = [];

  public billRegisterTypeList: any = [];
  public selectedBillRegisterType;

  public totalBillAmount = 0;
  userPrivilege = new UserPrivileges()

  constructor(
    private dateUtil: DateService,

  ) {
    this.billRegisterTypeList = fixedValues.billType;
    this.paymentStatusTypeList = fixedValues.paymentStatus;
    this.auditStatusTypeList = fixedValues.auditStatusBillPayment;
    this.postTypeList = fixedValues.postStatus;
    this.probisionStatusList = fixedValues.probisionData;
    this.formParam = new FormParam();
    this.dateSet();
  }

  public dateSet() {
    let date = new Date();
    this.formParam.START_DATE = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 30);
    this.formParam.END_DATE = new Date();
    this.formParam.GL_PROVISION_POST_DATE = null

  }

  public totalBillAmountSum() {
    this.totalBillAmount = 0;
    for (const iterator of this.billStatusList) {
      if ((typeof iterator.GRAND_TOTAL !== 'undefined')) {
        this.totalBillAmount += isNaN(Number(iterator.GRAND_TOTAL)) ? 0 : Number(iterator.GRAND_TOTAL);
      }
    }
  }
}
