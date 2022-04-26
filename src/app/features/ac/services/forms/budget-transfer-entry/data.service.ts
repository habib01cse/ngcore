import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverPath = acConfig.url.apiUrl + 'ac1053';

  constructor(private apiService: BaseDataService,
    private dataLoadService: DataLoadService) { }

  // Get Pending Budget
  public getBudgetByPeriodNo(BUDGET_PERIOD_NO, ACC_NO) {
    let paramObj = {
      P_PERIOD_NO: BUDGET_PERIOD_NO,
      P_ACC_NO: ACC_NO,
    }
    return this.dataLoadService.load("FG_AC1053_NAMES_BY_PERIOD_NO", paramObj)
  }

  // Get Transfer Dept
  public getTransferDept(PERIOD_NO, ACC_NO, BU_NO) {
    let paramObj = {
      PERIOD_NO: PERIOD_NO,
      ACC_NO: ACC_NO,
      BU_NO: BU_NO
    };
    return this.apiService.executeQuery<any>(`${this.serverPath}/get-transfer-dept`, paramObj);
  }

  // Get Transfer Dept
  public getBudgetTransfers(BUDGET_TRANSFER_NO) {
    let paramObj = {
      P_BUDGETTRANS_NO: BUDGET_TRANSFER_NO,
    };
    return this.dataLoadService.load('FG_AC1053_GET_BUDGET_TRANS_NO', paramObj);
  }

  // update Budget
  public createBudgetNotice(BUDGET_TRANSFER_NO, FROM_BU_NO, TO_BU_NO, FROM_ACC_NO, P_AMT, EMP_NAME) {
    let paramObj = {
      BUDGET_TRANSFER_NO: BUDGET_TRANSFER_NO,
      FROM_BU_NO: FROM_BU_NO,
      TO_BU_NO: TO_BU_NO,
      FROM_ACC_NO: FROM_ACC_NO,
      P_AMT: P_AMT,
      EMP_NAME: EMP_NAME,
    };
    return this.apiService.executeQuery<any>(`${this.serverPath}/create-budget-notice`, paramObj);
  }
  // SaveBudget Transfer
  public submitAllBudget(pendingBudgetList) {
    let paramObj = pendingBudgetList;
    return this.apiService.save<any>(`${this.serverPath}/save-budget-transfer`, paramObj);
  }
  // update Budget
  // public updateBudget(PERIOD_NO, BUDGET_PERIOD_NO, BU_NO, TRANSFER_BU, ACC_NO, P_AMT) {
  //   let paramObj = {
  //     PERIOD_NO: PERIOD_NO,
  //     BUDGET_PERIOD_NO: BUDGET_PERIOD_NO,
  //     BU_NO: BU_NO,
  //     TRANSFER_BU: TRANSFER_BU,
  //     ACC_NO: ACC_NO,
  //     P_AMT: P_AMT,
  //   };
  //   return this.apiService.executeQuery<any>(`${this.serverPath}/update-budget`, paramObj);
  // }

}
