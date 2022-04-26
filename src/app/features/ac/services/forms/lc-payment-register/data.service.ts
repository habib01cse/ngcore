import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverPath = acConfig.url.apiUrl + 'ac1108';

  constructor(private dataLoadService: DataLoadService) { }

  // Get Search Data
  public getDataByPostStatus(START_DATE, END_DATE, LC_TYPE, ACCEPT_STATUS, PAID_STATUS, CHECK_VOUCHER, ACCOUNT_MAP, COST_MAP) {
    let paramObj = {
      P_ST_DATE: START_DATE,
      P_END_DATE: END_DATE,
      P_LC_TYPE: LC_TYPE == 2 ? null : LC_TYPE,
      P_ACCEPT_STATUS: ACCEPT_STATUS,
      P_PAYMENT_STATUS: PAID_STATUS == 1 ? null : PAID_STATUS,
      P_POST_STATUS: CHECK_VOUCHER == 2 ? null : CHECK_VOUCHER,
      P_ACC_MAP: ACCOUNT_MAP,
      P_COST_MAP: COST_MAP,

    };
    return this.dataLoadService.load("FG_AC1108_GET_DATA_BY_POST_STS", paramObj);
  }
}
