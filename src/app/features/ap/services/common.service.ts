/* angular stuff */
import { Injectable } from '@angular/core';

/* our own stuff */
import { apConfig } from '../ap.config';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
@Injectable({
    providedIn: 'root'
})
export class CommonService {
  private serverPath = apConfig.url.apiUrl + 'common';
  constructor(private apiService: BaseDataService,
    private dataLoadService: DataLoadService ) { }

  // getPeriods
  // public getPeriods() {
  //     return this.apiService.executeQuery<any>(`${this.serverPath}/get-periods`);
  // }
  // public getRound() {
  //     return this.dataLoadService.load("FG_SA_COMM_ROUND")
  // }
  // public getReportInfo(SUBMENU_ID) {
  //   let paramObj = {
  //       P_SUBMENU_ID: SUBMENU_ID
  //   };
  //   return this.dataLoadService.load("FG_SA_COMM_REPORT_CONFIG", paramObj)
  // }

}