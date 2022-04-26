/* angular stuff */
import { Injectable } from "@angular/core";


/* 3rd party libraries */
import { CommonModel } from "src/app/shared/models/common-model";
import { DataService } from "./data.service";
import { AcceptanceRelization } from "../../../models/acceptance-relization.model";
import { fixedValues } from "src/app/shared/constants/fixed-values.enum";
import { UserPrivileges } from "src/app/core/models/user-privileges";

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  public selectedStatus;
  public billStatusList = new Array<CommonModel>();
  public invoiceStatusList: AcceptanceRelization[];
  public reportInfoList = [];
  public postTypeList: any = [];
  public roundlIist = [];
  public totalNetBillAmount: number;
  userPrivilege= new UserPrivileges()

  constructor(private dataService: DataService) {
    this.invoiceStatusList = new Array<AcceptanceRelization>();
    this.postTypeList = fixedValues.postStatus;
    this.userPrivilege = new UserPrivileges();
  }

  init() {

  }

  // onSearchGetData(STATUS, LEVEL, START_DATE, END_DATE): any {
  //   this.dataService.getDataByPostStatus(STATUS, LEVEL, START_DATE, END_DATE).subscribe(result => {

  //     this.invoiceStatusList = [];
  //     this.invoiceStatusList = result.body;
  //     this.totalNetBillAmountSum();
  //   }, err => {
  //     console.log('Error in AC_1109 Component model', err);
  //   }, () => {
  //     console.log('Error in AC_1109 Component model');
  //   })
  // }

  public totalNetBillAmountSum() {
    this.totalNetBillAmount = 0;
    for (const iterator of this.invoiceStatusList) {
      if ((typeof iterator.ACCEPT_AMOUNT !== 'undefined')) {
        this.totalNetBillAmount += isNaN(Number(iterator.ACCEPT_AMOUNT)) ? 0 : Number(iterator.ACCEPT_AMOUNT);
      }
    }
  }
}