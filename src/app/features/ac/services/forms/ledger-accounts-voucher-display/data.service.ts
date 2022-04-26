import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private serverPath = acConfig.url.apiUrl + 'ac1035';

  constructor(private apiService: BaseDataService
    , private dataLoadService: DataLoadService,
    private webStorage:WebStorageService) { }
  private randomNumber
  public getViewResult(POST_FLG, START_DATE, END_DATE, BA_NO, COST_NO, ACC_NO) {
    this.randomNumber=new Date().getTime()
    let paramObj = {
      POST_FLG: POST_FLG,
      START_DATE: START_DATE,
      END_DATE: END_DATE,
      BA_NO: BA_NO,
      COST_NO: COST_NO,
      ACC_NO: ACC_NO,
      TOKEN:this.randomNumber,

    };
    return this.apiService.executeQuery<any>(`${this.serverPath}/search-view`, paramObj);
  }

  public getData() { 
    return this.dataLoadService.load("FG_AC1035_DATA_LIST", { P_TOKEN_NO: this.randomNumber })
  }
}
