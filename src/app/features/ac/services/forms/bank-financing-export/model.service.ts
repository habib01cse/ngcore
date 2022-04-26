/* angular stuff */
import { Injectable } from '@angular/core';

/* our own stuff */
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { FormParam } from '../../../models/form-param';
import { DeleveryReg } from '../../../models/delevery-regestration';
import { Negotiation } from '../../../models/negotiation.model';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
@Injectable({
  providedIn: 'root'
})
export class ModelService {
  public formParam: FormParam;

  public baseCurrencyList: any = [];
  public bankDocSetupList: any = [];
  public salesGegotiationsList: any = [];
  public bankRefList: any = [];
  public reportInfoList: any = [];

  public filterData: DeleveryReg = new DeleveryReg();

  public negotiationData: Negotiation = new Negotiation();
  public negotiationDataBackup: Negotiation = new Negotiation();

  public userPrivilege:UserPrivileges;

  public selectedNegosiation = '';

  public fundDistributionTotalDRAmount = 0;
  public fundDistributionTotalCRAmount = 0;

  public fundDistributionDefferenceDRandCR = 0;

  public bankDocsetup;

  public currencyList: any = [];
  public drCrList: any = [];

  public isEditable = true;
  public postModalStatus = false;
  public fundDistributionListBackup = [];

  public loanTypeList:any = [];
  public FORM_ID = "AC_1128";
  public defaultTranType = 'L';

  public negotiationNewInsertDataBa = [];
  public negotiationNewInsertDataCurrency = [];
  public CTR_C_NAME = null;
  public CTR_CURRENCY_NO = null;
  public CTR_EXCHANGE_RATE = null;
  

  constructor(private utilService:UtilityService) {
    this.formParam = new FormParam();
    this.userPrivilege = new UserPrivileges();
    this.dateSet();

    this.drCrList = this.utilService.getEnumList(fixedValues.transactionTypeUpperCase);
    this.loanTypeList = fixedValues.loanType;
  }

  public dateSet() {
    this.formParam.END_DATE = new Date();
    this.formParam.START_DATE = new Date();
    //this.formParam.START_DATE.setDate(new Date().getDate() - 2920);
  }

  public fundDistributionTotalSum() {
    this.fundDistributionTotalDRAmount = 0;
    this.fundDistributionTotalCRAmount = 0;
    if( this.negotiationData.negoFundList.length > 0 ){
      for (const iterator of this.negotiationData.negoFundList) {
        if (( typeof iterator.DR !== 'undefined') && (iterator.SQL_STATE != 3 )) {
          this.fundDistributionTotalDRAmount += isNaN(Number(iterator.DR)) ? 0 : Number(iterator.DR);
        }
        if ((typeof iterator.CR !== 'undefined') && (iterator.SQL_STATE != 3)) {
          this.fundDistributionTotalCRAmount += isNaN(Number(iterator.CR)) ? 0 : Number(iterator.CR);
        }
      }
    }
    if( this.fundDistributionTotalCRAmount > this.fundDistributionTotalDRAmount ){
      this.fundDistributionDefferenceDRandCR = this.fundDistributionTotalCRAmount - this.fundDistributionTotalDRAmount
    }else{
      this.fundDistributionDefferenceDRandCR = this.fundDistributionTotalDRAmount - this.fundDistributionTotalCRAmount
    }
  }

  public helperObj = {
    message:'',
    V_AMOUNT:'',
    V_AMOUNT_BASE:'',
    V_CURRENCY:'',
    isTrue:false,
    ACC_NAME:'',
    DR_E:null,
    C_NAME:'',
    EXCHANGE_RATE:null,

    
  }
  public fundDistributionCondition(item){
    if( item.ACC_NO == this.negotiationData.ACC_NO ){
      if( item.FUND_DISTRIBUTION_NO ){
        if( this.fundDistributionDefferenceDRandCR != 0 ){
          this.helperObj.message = 'Debit Amount and Credit Amount mismatch!';
        }else{
          if( item.DR == 0 ){
            this.helperObj.V_AMOUNT = item.DR;
            this.helperObj.V_AMOUNT_BASE = item.CR;
            this.helperObj.V_CURRENCY = item.CR;
          }else{
            this.helperObj.DR_E = item.DR_E;
            this.helperObj.V_AMOUNT = item.DR;
            this.helperObj.V_AMOUNT_BASE = item.DR;
            this.helperObj.V_CURRENCY = item.DR;
          }
          this.helperObj.C_NAME = item.C_NAME;
          this.helperObj.ACC_NAME = this.negotiationData.CUSTOMER_NAME;
          this.helperObj.EXCHANGE_RATE = item.EXCHANGE_RATE;
          this.helperObj.isTrue = true;
        }
      }else{
        this.helperObj.message = 'Save the record at first!';
      }
    }
    else{
      this.helperObj.message = 'Distribution allowed only for customer account';
    }
    return this.helperObj;
  }
}
