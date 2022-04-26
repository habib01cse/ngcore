import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverPath = acConfig.url.apiUrl + 'ac1056';

  constructor(private apiService: BaseDataService,
    private dataLoadService: DataLoadService) { }

  // Get Transfre Budget
  public getBudgetTransfers(BU_NO, STATUS, START_DATE, END_DATE) {
    let paramObj = {
      P_BU_NO: BU_NO,
      P_APP_FLAG: STATUS,
      P_ST_DATE: START_DATE,
      P_END_DATE: END_DATE,
    }
    return this.dataLoadService.load("FG_AC1056_GET_BUDGET_TRANSFER", paramObj);
  }

  // update Budget
  public updateBudgetAccept(BUDGET_TRANSFER_NO, ACCEPT_COMMENTS, POST_FLG) {
    let paramObj = {
      BUDGET_TRANSFER_NO: BUDGET_TRANSFER_NO,
      ACCEPT_COMMENTS: ACCEPT_COMMENTS,
      POST_FLG: POST_FLG,
    };
    return this.apiService.executeQuery<any>(`${this.serverPath}/update-budget-accept`, paramObj);
  }
}
