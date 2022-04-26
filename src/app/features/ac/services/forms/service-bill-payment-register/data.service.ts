import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverPath = acConfig.url.apiUrl + 'ac1118';

  constructor(private dataLoadService: DataLoadService) { }

  // Get Search Data
  public getDataByPostStatus(AUDIT_STATUS_LIST, PAID_STATUS, AUDIT_STATUS, CHECK_VOUCHER, ACCOUNT_MAP, COST_MAP, START_DATE, END_DATE) {
    let paramObj = {
      // P_LVL: LEVEL,
      // P_PAID_STATUS: PAID_STATUS == 1 ? null : PAID_STATUS,
      // P_AUDIT_STATUS: AUDIT_STATUS == 2 ? null : AUDIT_STATUS,
      // P_CHK_VOUCHER: CHECK_VOUCHER == 2? null: CHECK_VOUCHER,
      // P_ACC_MAP: ACCOUNT_MAP,
      // P_COST_MAP: COST_MAP,
      // P_ST_DATE: START_DATE,
      // P_END_DATE: END_DATE,
      // P_ACCEPT_STATUS : ''

      P_AUDIT_STATUS_LIST: AUDIT_STATUS_LIST,
      P_PAID_STATUS: PAID_STATUS == 1 ? null : PAID_STATUS,
      P_AUDIT_STATUS: AUDIT_STATUS == 2 ? null : AUDIT_STATUS,
      P_POST_STATUS: CHECK_VOUCHER,      
      P_ACC_MAP: ACCOUNT_MAP,
      P_COST_MAP: COST_MAP,
      P_ST_DATE: START_DATE,
      P_END_DATE: END_DATE,
      P_ACCEPT_STATUS : ''     



    };

    return this.dataLoadService.load("FG_AC1118_GET_DATA_BY_POST_STS",paramObj)
    // return this.apiService.executeQuery<any>(`${this.serverPath}/get-data-by-post-status`, paramObj);
  }
}
