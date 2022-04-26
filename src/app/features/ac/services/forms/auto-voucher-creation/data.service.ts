import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { forkJoin } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class DataService {

    private serverPath = acConfig.url.apiUrl + 'ac1051';


    constructor(private apiService: BaseDataService
        , private dataLoadService: DataLoadService) {

    }


    // getChequeBookList
    public getJournal(QJ_NO): any {
        let paramObj = {
            P_QJ_NO: QJ_NO,
        }
        let promises = [
            this.dataLoadService.load("FG_AC1051_GET_QUICK_JOURNAL", paramObj,true),
            this.dataLoadService.load("FG_AC1051_GET_DETAILS", paramObj)
        ]
        return forkJoin(promises)
    }

    // getChequeBookList
    public getCurrency(): any {
        return this.dataLoadService.load("FG_AC1051_GET_CURRENCY")
    }

    public saveQuickJournal(qJournal: any) {
        return this.apiService.save<any>(`${this.serverPath}/save-quick-journal`, qJournal);
    }

    
  // POST /ac/ac1004/remove-voucher
  public deleteVoucher(paramObj) {
    return this.apiService.executeQuery<any>(`${this.serverPath}/remove-quick-journal`, paramObj);
  }


    // getChequeBookList
    public createAutoVoucher(QJ_NO, POST_DATE, VTYPE_NO, DESCR): any {
        let paramObj = {
            QJ_NO: QJ_NO,
            POST_DATE: POST_DATE,
            VTYPE_NO: VTYPE_NO,
            DESCR: DESCR,
        }
        return this.apiService.executeQuery<any>(`${this.serverPath}/create-auto-voucher`, paramObj);
    }


}
