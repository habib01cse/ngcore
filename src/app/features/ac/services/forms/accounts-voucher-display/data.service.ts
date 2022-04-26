import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverPath = acConfig.url.apiUrl + 'ac1036';

  constructor(private apiService: BaseDataService
    , private dataLoadService: DataLoadService) { }
  // Get Coucher List
  public getChequeNo() {
    return this.apiService.executeQuery<any>(`${this.serverPath}/get-cheque-no`);
  }
  // Get Coucher List
  public getBankName() {
    return this.apiService.executeQuery<any>(`${this.serverPath}/get-bank-name`);
  }

  // Get Search Data
  public getDataSearch(V_ID, P_NARRATION, START_DATE, END_DATE, ACC_NO, CHEQUE_NO, BANK_NAME, COST_NO, BA_NO, STATUS) {
    let paramObj = {
      P_V_ID: V_ID,
      P_NARRATION: P_NARRATION ? P_NARRATION : '',
      P_ST_DATE: START_DATE,
      P_END_DATE: END_DATE,
      P_ACC_NO: ACC_NO,
      P_CHEQUE: CHEQUE_NO,
      P_BK_NAME: BANK_NAME,
      P_COST_NO: COST_NO,
      P_BA_NO: BA_NO == 0 ? null : BA_NO,
      P_CHK_BA: STATUS
    };
    return this.dataLoadService.load("FG_AC1036_GET_SEARCH_DATA", paramObj);
  }

}
