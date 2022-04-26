import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverPath = acConfig.url.apiUrl + 'ac1122';

  constructor(private apiService: BaseDataService
    , private dataLoadService: DataLoadService) { }

  // getVoucherDtls
  public getDataByPostStatus(STATUS, LEVEL, ORDER, START_DATE, END_DATE, ACCOUNT_MAP): any {
    let paramObj = {
      P_POST_STATUS:  STATUS,
      P_ITEM_LIST: LEVEL,
      P_SALE_TYPE: ORDER,
      //P_ITEM_LIST
      P_REQ_STDATE: START_DATE,
      P_REQ_ENDDATE: END_DATE,
      P_ACC_MAP: ACCOUNT_MAP,
    };
    return this.dataLoadService.load("FG_AC1122_GET_DATA_BY_POST_STS",paramObj)
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
    return this.dataLoadService.load("FG_AC1122_GET_DATA",paramObj);
  }

}
