import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverPath = acConfig.url.apiUrl + 'ac1115';

  constructor(private apiService: BaseDataService
    , private dataLoadService: DataLoadService) { }

  // getVoucherDtls
  public getDataByPostStatus(STATUS, LEVEL, ORDER, ACCOUNT_MAP, COST_MAP, START_DATE, END_DATE,TRNTYPE_NO,LC_NOT_MAP): any {
    let paramObj = {
      P_POST_STATUS: STATUS == 2 ? null : STATUS,
      P_ITEM_LIST: LEVEL,
      P_SALE_TYPE: ORDER == 2 ? null : ORDER,
      P_ACC_MAP: ACCOUNT_MAP,
      P_COST_MAP: COST_MAP,
      P_REQ_STDATE: START_DATE,
      P_REQ_ENDDATE: END_DATE,
      P_TRNTYPE_NO : TRNTYPE_NO,
      P_LC_NOT_MAP: null
    };

    return this.dataLoadService.load("FG_AC1115_GET_DATA_BY_POST_STS", paramObj);
  }

  // Create Voucher
  public createVoucher(paramObj) {


    return this.apiService.save<any>(`${this.serverPath}/create-voucher`, paramObj);
  }
  // Create Voucher
  public getData(TRN_NO) {
    let paramObj = {
      P_TRN_NO: TRN_NO,
    };

    return this.dataLoadService.load("FG_AC1115_GET_DATA", paramObj)
  }

}
