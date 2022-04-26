import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverPath = acConfig.url.apiUrl + 'ac1001';

  constructor(private apiService: BaseDataService
    , private dataLoadService: DataLoadService) { }

  // getCOATree
  public getCOATree(): any {
    return this.dataLoadService.load("FG_AC1001_COA_TREE")
  }

  // getChartofAccount
  public getChartofAccount(_ACC_NO: any): any {
    let params = { P_ACC_NO: _ACC_NO }
    let promises = [
      this.dataLoadService.load("FG_AC1001_CHART_OF_ACCOUNT", params,true),
      this.dataLoadService.load("FG_AC1001_COST_CENTER_LIST", params),
      this.dataLoadService.load("FG_AC1001_CHART_COST_LIST", params),
      this.dataLoadService.load("FG_AC1001_CHART_BA_LIST", params),
      this.dataLoadService.load("FG_AC1001_COMPANY_LIST", params),
    ];
    return forkJoin(promises)
  }

  // Remove ChartofAccount
  public removeChartofAccount(_ACC_NO: any): any {
    let params = { ACC_NO: _ACC_NO }
    return this.apiService.executeQuery<any>(`${this.serverPath}/remove-chart`, params);
  }

  // getOpeningAccount
  public getAccountCode(_NATURE_NO: any, _ACC_NO: any, _LEVEL: any): any {
    let params = {
      P_NATURE_NO: _NATURE_NO,
      P_ACC_NO: _ACC_NO,
      P_LEVEL: _LEVEL
    }
    return this.dataLoadService.load("FG_AC1001_CHART_OF_ACC_NO_WISE", params,true)
  }

  // saveOpeningPeriods
  public saveChartOfAccount(params): any {
    return this.apiService.save<any>(`${this.serverPath}/save-chart`, params);
  }

  // saveApplyAll
  public saveApplyAll(_ACC_NO: any): any {
    let params = { ACC_NO: _ACC_NO }
    return this.apiService.executeQuery<any>(`${this.serverPath}/save-apply-all`, params);
  }


}