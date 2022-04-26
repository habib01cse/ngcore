import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { forkJoin } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class DataService {


    private serverPath = acConfig.url.apiUrl + 'ac1009';

    constructor(private apiService: BaseDataService
        , private dataLoadService: DataLoadService) { }

    // getRepositoryDetails
    public getRepositoryDetails(RP_NO): any {
        let paramObj = {
            P_RP_NO: RP_NO
        };

        let promises = [
            this.dataLoadService.load("FG_AC1009_GET_REPOSITORY", paramObj, true),
            this.dataLoadService.load("FG_AC1009_GET_REPOSITORY_DTL", paramObj)
        ]
        return forkJoin(promises)
    }

    /**
 * deleteReport
 */
    public deleteReport(params): any {
        return this.apiService.executeQuery<any>(`${this.serverPath}/remove-repository`, params);
    }


    // saveReport
    public saveReport(params): any {
        return this.apiService.save<any>(`${this.serverPath}/save-repository`, params);
    }

    //  // getRepositoryDetails
    //  public getHeading(): any {
    //     return this.apiService.executeQuery<any>(`${this.serverPath}/get-heading`);
    // }

    //   // getChartOfAccounts
    // public getChartOfAccounts(queryOption: any, baNo?: any) {
    //     let paramObj = {
    //         QUERY_OPTION: queryOption,
    //         // BA_NO: 0
    //         BA_NO: baNo ? baNo : 0
    //     };
    //     return this.apiService.executeQuery<any>(`${this.serverPath}/get-chart-of-accounts`, paramObj);
    // }

}
