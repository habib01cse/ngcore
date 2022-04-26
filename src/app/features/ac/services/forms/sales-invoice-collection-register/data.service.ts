import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverPath = acConfig.url.apiUrl + 'ac1103';

  constructor( private dataLoadService: DataLoadService) { }

  // Get Search Data
  public getDataByPostStatus(STATUS, START_DATE, END_DATE, CUSTOMER_MAP, COST_MAP) {
    let paramObj = {
      P_POST_STATUS: STATUS == 1 ? null : STATUS,
      P_ST_DATE: START_DATE,
      P_END_DATE: END_DATE,
      P_CUSTOMER_MAP: CUSTOMER_MAP,
      P_COST_MAP: COST_MAP,
    };
    return this.dataLoadService.load("FG_AC1103_GET_DATA_BY_POST_STS", paramObj);
  }
}
