import { Injectable } from "@angular/core";
import { UserPrivileges } from "src/app/core/models/user-privileges";
import { UtilityService } from "src/app/shared";

/* our own stuff */
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { MoneyPay } from "../../../models/money-pay";
import { MoneyPayDist } from "../../../models/money-pay-dist";
import { MoneyPayDtl } from "../../../models/money-pay-dtl";

@Injectable({
  providedIn: 'root'
})

export class ModelService {

  public GL_CHECK = 0;   

  transactionType = {
    DR: "DR",
    CR: "CR"
  };
  modalShow: boolean = false;

  public buyerList: any = [];
  public billPaymentList: any = [];
  public payNoList: any = [];
  public voucherTypeList: any = [];


  userPrivilege: UserPrivileges;
  public P_PAY_ID = null;
  public P_PAY_NO = null;
  public P_DOC_NO = null;
  public P_DOC_NO_STR = '';

  DIFFERENCE_AMMOUNT_TK = null;

  moneyPay: MoneyPay;
  moneyPayBackUp: MoneyPay;

  moneyPayDtl: MoneyPayDtl[];
  moneyPayDtlBackUp: MoneyPayDtl[];
  moneyPayDistributionListBackUp: MoneyPayDist[];
  // bill: any;


  //public buyerList:any = [];
  constructor(private utilService: UtilityService) {
    this.userPrivilege = new UserPrivileges();
    this.moneyPay = new MoneyPay();
    this.moneyPayBackUp = new MoneyPay();
    this.moneyPayDtl = new Array<MoneyPayDtl>();
    this.moneyPayDtlBackUp = new Array<MoneyPayDtl>();
    this.moneyPayDistributionListBackUp = new Array<MoneyPayDist>();
  }
  
  public getDrCrList() {
    return this.utilService.getEnumList(this.transactionType);
  }
}

