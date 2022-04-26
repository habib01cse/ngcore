import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverPath = acConfig.url.apiUrl + 'ac1052';

  constructor(private apiService: BaseDataService,
    private dataLoadService: DataLoadService) { }

  // Get Pending Budget
  public getBudgetPendings(BUDGET_PERIOD_NO, BU_NO) {
    let paramObj = {
      P_PERIOD_NO: BUDGET_PERIOD_NO,
      P_BU_NO: BU_NO
    };
    return this.dataLoadService.load("FG_AC1052_GET_BUDGET_PENDING", paramObj);
  }
  // // Get Transfer Dept
  public getTransferDept(PERIOD_NO, ACC_NO, BU_NO) {
    let paramObj = {
      PERIOD_NO: PERIOD_NO,
      ACC_NO: ACC_NO,
      BU_NO: BU_NO
    };
    return this.apiService.executeQuery<any>(`${this.serverPath}/get-transfer-dept`, paramObj);
  }
  // update Budget
  public updateBudgetHead(BUDGET_PERIOD_NO, BUDGET_NO, TRANSFER_BU, ACC_NO, TRAN_ACC_NO, P_AMT) {
    let paramObj = {
      BUDGET_PERIOD_NO: BUDGET_PERIOD_NO,
      BUDGET_NO: BUDGET_NO,
      TRANSFER_BU: TRANSFER_BU,
      ACC_NO: ACC_NO,
      TRAN_ACC_NO: TRAN_ACC_NO,
      P_AMT: P_AMT,
    };
    return this.apiService.executeQuery<any>(`${this.serverPath}/update-budget-head`, paramObj);
  }
  // public updateBudget(PERIOD_NO, BUDGET_PERIOD_NO, BU_NO, TRANSFER_BU, ACC_NO, P_AMT) {
  //   let paramObj = {
  //     PERIOD_NO: PERIOD_NO,
  //     BUDGET_PERIOD_NO: BUDGET_PERIOD_NO,
  //     BU_NO: BU_NO,
  //     TRANSFER_BU: TRANSFER_BU,
  //     ACC_NO: ACC_NO,
  //     P_AMT: P_AMT,
  //   };
  //   return this.apiService.executeQuery<any>(`${this.serverPath}/update-budget-head`, paramObj);
  // }

}
