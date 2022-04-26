import { Injectable } from '@angular/core';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { FormParam } from '../../../models/form-param';
import { DateService } from 'src/app/shared';
import { UserPrivileges } from 'src/app/core/models/user-privileges';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  public selectedStatus;
  public selectedTrandate;
  public formParam: FormParam;
  public hrStatusList: any = [];
  public postTypeList: any = [];
  public tranDateList:any=[];
  public reportInfoList: any = [];

  public totalNetGrossAmount = 0;
  public totalPayableAmount = 0;
  userPrivilege = new UserPrivileges();

  constructor(
    private dateUtil: DateService,
  ) {
    this.postTypeList = fixedValues.postStatus;
    this.tranDateList=fixedValues.tranDate;
    this.formParam = new FormParam();
    this.dateSet();
  }
  public dateSet() {
    this.formParam.END_DATE = new Date();
    this.formParam.START_DATE = new Date();
    this.formParam.START_DATE.setDate(new Date().getDate() - 30);

  }

  public totalNetGrossAmountSum() {
    this.totalNetGrossAmount = 0;
    for (const iterator of this.hrStatusList) {
      if ((typeof iterator.NET_GROSS_SALARY !== 'undefined')) {
        this.totalNetGrossAmount += isNaN(Number(iterator.NET_GROSS_SALARY)) ? 0 : Number(iterator.NET_GROSS_SALARY);
      }
    }
  }

  public netDotGrossAmountSum(data) {
    this.totalNetGrossAmount= 0;
    for (let iterator of data) {
      if ((typeof iterator.NET_GROSS_SALARY !== 'undefined')) {
        this.totalNetGrossAmount += isNaN(Number(iterator.NET_GROSS_SALARY)) ? 0 : Number(iterator.NET_GROSS_SALARY);
      }
    }
    return this.totalNetGrossAmount;
  }

  public payableAmountSum(data) {
    this.totalPayableAmount= 0;
    for (let iterator of data) {
      if ((typeof iterator.TOTAL_PAYABLE_AMT !== 'undefined')) {
        this.totalPayableAmount += isNaN(Number(iterator.TOTAL_PAYABLE_AMT)) ? 0 : Number(iterator.TOTAL_PAYABLE_AMT);
      }
    }
    return this.totalPayableAmount;
  }
  public totalPayableAmountSum() {
    this.totalPayableAmount = 0;
    for (let iterator of this.hrStatusList) {
      if ((typeof iterator.TOTAL_PAYABLE_AMT !== 'undefined')) {
        this.totalPayableAmount += isNaN(Number(iterator.TOTAL_PAYABLE_AMT)) ? 0 : Number(iterator.TOTAL_PAYABLE_AMT);
      }
    }
  }
}
