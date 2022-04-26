/* angular stuff */
import { Injectable } from "@angular/core";


/* 3rd party libraries */
import { CommonModel } from "src/app/shared/models/common-model";
import { DataService } from "./data.service";
import { InvoiceStatus } from "../../../models/invoice-status.model";
import { fixedValues } from "src/app/shared/constants/fixed-values.enum";
import { UserPrivileges } from "src/app/core/models/user-privileges";

@Injectable({
  providedIn: 'root'
})
export class ModelService {


  public selectedStatus;
  public billStatusList = new Array<CommonModel>();
  public invoiceStatusList: InvoiceStatus[];
  public reportInfoList = [];
  public postTypeList: any = [];
  public roundlIist = [];
  public totalNetBillAmount: number;
  userPrivilege = new UserPrivileges()

  constructor(private dataService: DataService) {
    this.invoiceStatusList = new Array<InvoiceStatus>();
    this.postTypeList = fixedValues.postStatus;
  }



  onSearchGetData(STATUS, LEVEL, START_DATE, END_DATE): any {
    this.dataService.getDataByPostStatus(STATUS, LEVEL, START_DATE, END_DATE).subscribe(result => {
      this.invoiceStatusList = [];
      this.invoiceStatusList = result.body;
      this.totalNetBillAmountSum();
    }, err => {
      console.log('Error in AC_1114 Component model', err);
    }, () => {
      console.log('Error in AC_1114 Component model');
    })
  }

  public totalNetBillAmountSum() {
    this.totalNetBillAmount = 0;
    for (const iterator of this.invoiceStatusList) {
      if ((typeof iterator.GRAND_TOTAL !== 'undefined')) {
        this.totalNetBillAmount += isNaN(Number(iterator.GRAND_TOTAL)) ? 0 : Number(iterator.GRAND_TOTAL);
      }
    }
    return this.totalNetBillAmount;
  }
}