import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverPath = acConfig.url.apiUrl + 'ac1005';

  constructor(private apiService: BaseDataService
    , private dataLoadService: DataLoadService) { }

  // getPeriods
  public getPeriods(): any {
    return this.apiService.executeQuery<any>(`${this.serverPath}/get-periods`);
  }

  // getOpeningAccount
  public getOpeningAccount(_NATURE_NO: any, _PERIOD_NO: any, _GROUPPERIOD_NO: any): any {
    let params = { P_NATURE_NO: _NATURE_NO, P_PERIOD_NO: _PERIOD_NO, P_GROUP_PERIOD_NO: _GROUPPERIOD_NO }
    return this.dataLoadService.load("FG_AC1005_GET_OPENNING_ACCOUNT", params)
  }

  // saveVoucherType
  public saveAccountCategory(): any {
    return this.apiService.executeQuery<any>(`${this.serverPath}/save-account-category`);
  }

  // removeAccountCategory
  public removeAccountCategory(): any {
    return this.apiService.executeQuery<any>(`${this.serverPath}/remove-account-category`);
  }

  // saveOpeningPeriods
  public saveOpeningPeriods(params): any {
    return this.apiService.save<any>(`${this.serverPath}/save-opening-periods`, params);
  }

  // savePeriod
  public savePeriod(params): any {
    return this.apiService.save<any>(`${this.serverPath}/save-period`, params);
  }

  // saveOpeningPeriods
  public saveGroupPeriod(params): any {
    return this.apiService.save<any>(`${this.serverPath}/save-group-period`, params);
  }

  // closePeriod
  public closePeriod(PERIOD_NO, P_MAX_PRO, P_MAX_CLOSE_FLAG): any {
    let params = {
      PERIOD_NO: PERIOD_NO,
      P_MAX_PRO: P_MAX_PRO,
      P_MAX_CLOSE_FLAG: P_MAX_CLOSE_FLAG,

    }
    return this.apiService.save<any>(`${this.serverPath}/close-period`, params);
  }



  // removePeriod
  public removePeriod(GROUPPERIOD_NO): any {
    let params = { GROUPPERIOD_NO: GROUPPERIOD_NO }
    return this.apiService.executeQuery<any>(`${this.serverPath}/remove-period`, params);
  }

  // Get Period Close
  public getPeriodClose(PERIOD_NO: any): any {
    let params = { PERIOD_NO: PERIOD_NO }
    return this.apiService.executeQuery<any>(`${this.serverPath}/get-period-close`, params);
  }

  // Get Period Close
  public getPeriodOpen(PERIOD_NO: any): any {
    let params = { PERIOD_NO: PERIOD_NO }
    return this.apiService.executeQuery<any>(`${this.serverPath}/get-period-close`, params);
  }

  // closePeriod
  public periodClose(PERIOD_NO, P_MAX_PRO): any {
    let params = {
      PERIOD_NO: PERIOD_NO,
      P_MAX_PRO: P_MAX_PRO,
    }
    return this.apiService.executeQuery<any>(`${this.serverPath}/period-close`, params);
  }

  // Process Period
  public processPeriod(PERIOD_NO, START_DATE, END_DATE, OPENPERIOD_NO, P_MAX_PRO): any {
    let params = {
      PERIOD_NO: PERIOD_NO,
      START_DATE: START_DATE,
      END_DATE: END_DATE,
      OPENPERIOD_NO: OPENPERIOD_NO,
      P_MAX_PERIOD_NO: P_MAX_PRO,
    }
    return this.apiService.executeQuery<any>(`${this.serverPath}/process-period`, params);
  }
}