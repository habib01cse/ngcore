import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverPath = acConfig.url.apiUrl + 'ac1055';

  constructor(private apiService: BaseDataService,
    private dataLoadService: DataLoadService) { }

  // Get Pending Budget
  public getBdTransfer(BU_NO, STATUS, START_DATE, END_DATE) {
    let paramObj = {
      P_BU_NO: BU_NO,
      P_APP_FLAG: STATUS,
      P_ST_DATE: START_DATE,
      P_END_DATE: END_DATE,
    }
    return this.dataLoadService.load("FG_AC1055_GET_BD_TRANSFER", paramObj);
  }
  // update Budget
  public updateBudget(PERIOD_NO, BUDGET_NO, BU_NO, TRANSFER_BU, ACC_NO, P_AMT, P_FLAG, BUDGET_TRANSFER_NO) {
    let paramObj = {
      PERIOD_NO: PERIOD_NO,
      BUDGET_NO: BUDGET_NO,
      BU_NO: BU_NO,
      TRANSFER_BU: TRANSFER_BU,
      ACC_NO: ACC_NO,
      P_AMT: P_AMT,
      P_FLAG: P_FLAG,
      BUDGET_TRANSFER_NO: BUDGET_TRANSFER_NO,
    };
    return this.apiService.executeQuery<any>(`${this.serverPath}/update-budget-transfer`, paramObj);
  }

}
