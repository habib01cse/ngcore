import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverPath = acConfig.url.apiUrl + 'ac1034';

  constructor(private apiService: BaseDataService
    , private dataLoadService: DataLoadService) { }

  // Get Coa Heads
  public getCoaHeads(NATURE_NO) {
    let paramObj = {
      P_NATURE_NO: NATURE_NO
    };
    return this.dataLoadService.load("FG_AC1034_GET_COA_HEADS",paramObj);
    // return this.apiService.executeQuery<any>(`${this.serverPath}/get-coa-heads`, paramObj);
  }
  // Get Search Data
  public getSearchData(ACC_NO, P_DATE, NATURE_NO) {
    let paramObj = {
      P_ACC_NO: ACC_NO,
      P_DATE: P_DATE,
      P_NATURE_NO: NATURE_NO
    };
    return this.dataLoadService.load("FG_AC1034_GET_SEARCH_DATA",paramObj)
    // return this.apiService.executeQuery<any>(`${this.serverPath}/get-search-data`, paramObj);
  }

}
