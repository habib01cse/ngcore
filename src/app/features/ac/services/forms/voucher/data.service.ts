import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from 'src/app/features/ac/ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { forkJoin } from 'rxjs';
const _url = acConfig.url.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private apiService: BaseDataService
    , private dataLoadService: DataLoadService) { }

  public getVoucherDefault() {
    return this.dataLoadService.load("FG_AC1004_GET_VOUCHER_DEFAULT",{}, true)
    // return this.apiService.executeQuery<any>(`${_url}ac1004/get-voucher-default`);
  }

  public getVoucher(_VTYPE_NO, _PERIOD_NO, _IS_PREVIOUS, _V_NO, _IS_OT_EXCLUDE?) {
    let params = {
      P_PERIOD_NO: _PERIOD_NO,
      P_VTYPE_NO: _VTYPE_NO,
      P_V_NO: _V_NO ? _V_NO : '',
      P_IS_PREVIOUS: _IS_PREVIOUS,
      P_IS_EXCLUD: _IS_OT_EXCLUDE ? _IS_OT_EXCLUDE : 0
    }
    return this.dataLoadService.load("FG_AC1004_GET_VOUCHER", params, true)

  }
  getVoucherDetail(_V_NO) {
    let dtlParam = {
      P_V_NO: _V_NO ? _V_NO : '',
    }
    return this.dataLoadService.load("FG_AC1004_GET_VOUCHER_DETAIL", dtlParam);
  }


  public saveVoucher(paramObj: any) {
    return this.apiService.save<any>(`${_url}ac1004/save-voucher`, paramObj);
  }

  public saveVoidVoucher(paramObj: any) {
    return this.apiService.executeQuery<any>(`${_url}ac1004/save-void-voucher`, paramObj);
  }

  public delete() {
    return this.apiService.executeQuery<any>(`${_url}ac1004/delete`);
  }

  // postVoucherClearing
  public postVoucherClearing(voucherDtl): any {
    return this.apiService.executeQuery<any>(`${_url}ac1004/post-voucher-clearing`, voucherDtl);
  }

  
  // postVoucherClearing //POST /ac/ac1004/voucher-clearing
  public voucherClearining(voucherDtl): any {
    return this.apiService.save<any>(`${_url}ac1004/voucher-clearing`, voucherDtl);
  }

  // Search Modal
  public getBuAreasForSearch() {
    return this.dataLoadService.load("FG_AC1004_BU_AREAS_FOR_SEARCH")
    // return this.apiService.executeQuery<any>(`${_url}ac1004/get-bu-areas-for-search`)
  }

  public getChartOfAccountsForSearch() {
    return this.dataLoadService.load("FG_AC1004_CHART_OF_ACC_FOR_SRC")
  }

  public getVouchersForSearch(_VTYPE_NO, _START_DATE, _END_DATE) {
    let paramObj = {
      P_VTYPE_NO: _VTYPE_NO,
      P_START_DATE: _START_DATE,
      P_END_DATE: _END_DATE
    }
    return this.dataLoadService.load("FG_AC1004_VOUCHERS_FOR_SEARCH", paramObj)
  }

  public getCostCentersForSearch() {
    return this.dataLoadService.load("FG_AC1004_COST_CENTERS_FOR_SRC")
  }

  public getVoucherSearchResult(params) {
    let paramObj = {
      P_ST_DATE: params.ST_DATE,
      P_END_DATE: params.END_DATE,
      P_V_ID: params.V_ID,
      P_NARRATION: params.NARRATION,
      P_FILTER_ST_DATE: params.FILTER_ST_DATE,
      P_FILTER_END_DATE: params.FILTER_END_DATE,
      P_CHEQUE: params.CHEQUE,
      P_BANK_NAME: params.BANK_NAME,
      P_COST_NO: params.COST_NO,
      P_BA_NO: params.BA_NO,
      P_ACC_NO: params.ACC_NO,
      P_VTYPE_NO: params.VTYPE_NO,
    }
    return this.dataLoadService.load("FG_AC1004_VOUCHER_SEARCH", paramObj)
  }

  // POST /ac/ac1004/remove-voucher
  public deleteVoucher(paramObj) {
    return this.apiService.executeQuery<any>(`${_url}ac1004/remove-voucher`, paramObj);
  }


}
