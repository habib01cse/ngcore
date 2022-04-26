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
  public selectedNegosiation = '';
  public bankDocumentTotalAmount = 0;
  public bankDocumentTotalBaseAmount = 0;
  public fundDistributionTotalDRAmount = 0;
  public fundDistributionTotalCRAmount = 0;
  public fundDistributionDefferenceDRandCR = 0;
  public bankDocsetup;

  public currencyList: any = [];
  public drCrList: any = [];

  public isEditable = true;  
  public postModalStatus = false;
  public postFlugStatus = true;
  public userPrivilege:UserPrivileges;

  public fundDistributionListBackup = [];

  public negotiationNewInsertDataBa = [];
  public negotiationNewInsertDataCurrency = [];
  public CTR_C_NAME = null;
  public CTR_CURRENCY_NO = null;
  public CTR_EXCHANGE_RATE = null;
  


  constructor(private utilService:UtilityService) {
    this.userPrivilege = new UserPrivileges();
    this.drCrList = this.utilService.getEnumList(fixedValues.transactionTypeUpperCase);
  }

  public bankDocumentTotalSum() {
    this.bankDocumentTotalAmount = 0;
    this.bankDocumentTotalBaseAmount = 0;
    for (const iterator of this.negotiationData.negoDtl) {
      if ((typeof iterator.TOTAL_VALUE !== 'undefined') && (iterator.SQL_STATE != fixedValues.sqlState.sqlDelete)) {
        this.bankDocumentTotalAmount += isNaN(Number(iterator.TOTAL_VALUE)) ? 0 : Number(iterator.TOTAL_VALUE);
      }
      if ((typeof iterator.TOTAL_BASE_VALUE !== 'undefined') && (iterator.SQL_STATE != fixedValues.sqlState.sqlDelete)) {
        this.bankDocumentTotalBaseAmount += isNaN(Number(iterator.TOTAL_BASE_VALUE)) ? 0 : Number(iterator.TOTAL_BASE_VALUE);
      }
    }
  }

  public fundDistributionTotalSum() {
    this.fundDistributionTotalDRAmount = 0;
    this.fundDistributionTotalCRAmount = 0;
    if( this.negotiationData.negoFundList.length > 0){
      for (const iterator of this.negotiationData.negoFundList) {
        if (( typeof iterator.DR !== 'undefined') && (iterator.SQL_STATE != 3 )) {
          this.fundDistributionTotalDRAmount += isNaN(Number(iterator.DR)) ? 0 : Number(iterator.DR);
        }
        if ((typeof iterator.CR !== 'undefined') && (iterator.SQL_STATE != 3)) {
          this.fundDistributionTotalCRAmount += isNaN(Number(iterator.CR)) ? 0 : Number(iterator.CR);
        }
      }
    }
    // if( this.fundDistributionTotalCRAmount > this.fundDistributionTotalDRAmount ){
    //   this.fundDistributionDefferenceDRandCR = this.fundDistributionTotalCRAmount - this.fundDistributionTotalDRAmount
    // }else{
    //   this.fundDistributionDefferenceDRandCR = this.fundDistributionTotalDRAmount - this.fundDistributionTotalCRAmount
    // }
  }
  
  public helperObj = {
    message:'',
    V_AMOUNT:'',
    V_AMOUNT_BASE:'', 
    V_CURRENCY:'',
    isTrue:false,
    ACC_NAME:'',
    DR_E:null,
    CR_E:null,
    C_NAME:'',
    EXCHANGE_RATE:null,
  }

  public fundDistributionCondition(item){
    this.helperObj.isTrue = false;
    if( item.ACC_NO == this.negotiationData.ACC_NO ){
      if( item.FUND_DISTRIBUTION_NO ){
        if( this.fundDistributionDefferenceDRandCR != 0 ){
          this.helperObj.message = 'Debit Amount and Credit Amount mismatch!';
        }else{
          this.helperObj.DR_E = null;
          this.helperObj.CR_E = null;
          if( !item.DR ){
            this.helperObj.V_AMOUNT = item.DR;
            this.helperObj.V_AMOUNT_BASE = item.CR;
            this.helperObj.V_CURRENCY = item.CR;
            this.helperObj.CR_E = item.CR_E;
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
