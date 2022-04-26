import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverPath = acConfig.url.apiUrl + 'ac1106';

  constructor(private dataLoadService: DataLoadService) { }

  // Get Search Data
  public getDataByPostStatus(STATUS, START_DATE, END_DATE, P_PAYMENT_STATUS, P_AUDIT_STATUS, P_ACC_MAP, P_COST_MAP,LC_TYPE) {
    let paramObj = {
      P_POST_STATUS: STATUS,
      P_LC_TYPE: LC_TYPE,
      P_PAYMENT_STATUS: P_PAYMENT_STATUS,
      P_AUDIT_STATUS: P_AUDIT_STATUS,
      P_ST_DATE: START_DATE,
      P_END_DATE: END_DATE,
      P_ACC_MAP: P_ACC_MAP ? 1 : 0,
      P_COST_MAP: P_COST_MAP ? 1 : 0
    };
    return this.dataLoadService.load("FG_AC1106_GET_DATA_BY_POST_STS", paramObj);
  }
}
