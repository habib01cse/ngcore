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
  public negotiationStatusList: any = [];
  public postTypeList: any = [];
  public reportInfoList: any = [];

  public salesNegotiationType: any = [];
  public selectedSalesNegotiationType;

  public totalRealAmount = 0;
  public totalNegotiationAmount = 0;
  userPrivilege = new UserPrivileges()

  constructor(
    private dateUtil: DateService,
  ) {
    this.salesNegotiationType = fixedValues.salesNegotiationType;
    this.postTypeList = fixedValues.postStatus;
    this.formParam = new FormParam();
    this.dateSet();
  }

  public dateSet() {
    this.formParam.END_DATE = new Date();
    this.formParam.START_DATE = new Date();
    this.formParam.START_DATE.setDate(new Date().getDate() - 30);
  }

  public totalNegotiationAmountSum() {
    this.totalRealAmount = 0;
    this.totalNegotiationAmount = 0;
    for (const iterator of this.negotiationStatusList) {
      if ((typeof iterator.RISD_AMT !== 'undefined')) {
        this.totalRealAmount += isNaN(Number(iterator.RISD_AMT)) ? 0 : Number(iterator.RISD_AMT);
      }
    }
    for (const iterator of this.negotiationStatusList) {
      if ((typeof iterator.NEG_AMT !== 'undefined')) {
        this.totalNegotiationAmount += isNaN(Number(iterator.NEG_AMT)) ? 0 : Number(iterator.NEG_AMT);
      }
    }
  }

  public realAmountSum(data){
    this.totalRealAmount=0;
    for (const iterator of data) {
      if ((typeof iterator.RISD_AMT !== 'undefined')) {
        this.totalRealAmount += isNaN(Number(iterator.RISD_AMT)) ? 0 : Number(iterator.RISD_AMT);
      }
    }
    return this.totalRealAmount;
  }

  public negAmountSum(data){
    this.totalRealAmount=0;
    for (const iterator of data) {
      if ((typeof iterator.NEG_AMT !== 'undefined')) {
        this.totalRealAmount += isNaN(Number(iterator.NEG_AMT)) ? 0 : Number(iterator.NEG_AMT);
      }
    }
    return this.totalRealAmount;
  }
}
