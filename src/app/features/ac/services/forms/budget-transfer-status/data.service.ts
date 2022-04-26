import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverPath = acConfig.url.apiUrl + 'ac1055';

  constructor(private apiService: BaseDataService
    , private dataLoadService: DataLoadService) { }

  // Get Budget Transfer
  public getBudgetTransfers(START_DATE, END_DATE) {
    let paramObj = {
      P_ST_DATE: START_DATE,
      P_END_DATE: END_DATE,
    }
    return this.dataLoadService.load("FG_AC1055_BUDGET_TRANSFER", paramObj)
  }

}
