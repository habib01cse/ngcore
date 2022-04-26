import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverPath = acConfig.url.apiUrl + 'ac1011';

  constructor(private apiService: BaseDataService
    , private dataLoadService: DataLoadService) { }

  // getStatementHeads
  public getStatementHeads(_STATEMENT_TYPE: any): any {
    let paramObj = {
      P_REP_TYPE: _STATEMENT_TYPE
    };
    return this.dataLoadService.load("FG_AC1011_STATEMENT_HEADS", paramObj)
  }

  // getStatements
  public getStatement(_MSTR_SETUP_NO: any): any {
    let paramObj = {
      P_MASTER_SETUP_NO: _MSTR_SETUP_NO
    };
    let promiseAll = [
      this.dataLoadService.load("FG_AC1011_GET_STATEMENT", paramObj, true),
      this.dataLoadService.load("FG_AC1011_STATEMENT_DETAIL", paramObj)
    ]
    return forkJoin(promiseAll)
  }

  // saveStatement
  public saveStatement(entity: any) {
    return this.apiService.save<any>(`${this.serverPath}/save-statement`, entity);
  }
}
