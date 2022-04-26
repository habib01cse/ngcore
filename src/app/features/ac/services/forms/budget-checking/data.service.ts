import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverPath = acConfig.url.apiUrl + 'ac1045';

  constructor(private apiService: BaseDataService,
    private dataLoadService: DataLoadService) { }

  public getStatus() {
    return this.apiService.executeQuery<any>(`${this.serverPath}/get-status`);
  }

  public getBudgets(BU_NO, PERIOD_NO, STATUS) {
    let paramObj = {
      P_BUDGET_PERIOD_NO: PERIOD_NO,
      P_BU_NO: BU_NO,
      P_STATUS: STATUS
    }
    return this.dataLoadService.load("FG_AC1045_GET_BUDGETS", paramObj)
  }

  public getBudgetDetails(PERIOD_NO) {
    let paramObj = {
      PERIOD_NO: PERIOD_NO,
    }
    return this.apiService.executeQuery<any>(`${this.serverPath}/get-budget-details`, paramObj);
  }


  public getBudgetDetailsByBudgetNo(BUDGET_NO) {
    let paramObj = {
      P_BUDGET_PERIOD_NO: BUDGET_NO,
    }
    return this.dataLoadService.load('FG_AC1045_BDGT_DTL_BY_BDGT_NO', paramObj);
  }

  public saveBudget(budgetDtlList) {
    let paramObj = budgetDtlList;
    return this.apiService.save<any>(`${this.serverPath}/save-budget`, paramObj);
  }

  public saveBudgetsApproval(BUDGET_NO, STATUS) {
    let paramObj = {
      BUDGET_NO: BUDGET_NO,
      STATUS: STATUS
    }
    return this.apiService.executeQuery<any>(`${this.serverPath}/save-budget-approval`, paramObj);
  }
  public updateBudgetsApproval(BUDGET_NO, STATUS) {
    let paramObj = {
      BUDGET_NO: BUDGET_NO,
      STATUS: STATUS
    }
    return this.apiService.executeQuery<any>(`${this.serverPath}/update-budget-approval`, paramObj);
  }
  public removeBudgetApproval(BUDGET_NO, STATUS) {
    let paramObj = {
      BUDGET_NO: BUDGET_NO,
      STATUS: STATUS
    }
    return this.apiService.executeQuery<any>(`${this.serverPath}/remove-budget-approval`, paramObj);
  }
  public updateBudgetStatus(BUDGET_NO, STATUS) {
    let paramObj = {
      BUDGET_NO: BUDGET_NO,
      STATUS: STATUS
    }
    return this.apiService.executeQuery<any>(`${this.serverPath}/update-budget-approval`, paramObj);
  }
}
