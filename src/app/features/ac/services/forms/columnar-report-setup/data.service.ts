import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { forkJoin } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class DataService {

    private serverPath = acConfig.url.apiUrl + 'ac1028';

    constructor(private apiService: BaseDataService
        , private dataLoadService: DataLoadService) { }

    // getRepositoryDetails
    public getRepositoryDetails(RP_NO): any {
        let paramObj = {
            P_RP_NO: RP_NO
        };
        let promises = [
            this.dataLoadService.load("FG_AC1028_REPOSITORY_LIST", paramObj,true),
            this.dataLoadService.load("FG_AC1028_REPOSITORY_DTLS", paramObj),
        ]
        return forkJoin(promises)
    }

    // saveReport POST /ac/ac1009/remove-repository
    public saveReport(params): any {
        return this.apiService.save<any>(`${this.serverPath}/save-repository`, params);
    }

    /**
     * deleteReport
     */
    public deleteReport(params): any {
        return this.apiService.executeQuery<any>(`${this.serverPath}/remove-repository`, params);
    }

}
