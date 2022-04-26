import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { forkJoin } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class DataService {

    private serverPath = acConfig.url.apiUrl + 'ac1029';

    constructor(private apiService: BaseDataService
        , private dataLoadService: DataLoadService) { }

    // getRepositoryDetails
    public getRepositoryDetails(RP_NO): any {
        let paramObj = {
            P_RP_NO: RP_NO
        };
        let promise = [
            this.dataLoadService.load("FG_AC1029_GET_REPOSITORY", paramObj, true),
            this.dataLoadService.load("FG_AC1029_GET_REPOSITORY_DTLS", paramObj)
        ]
        return forkJoin(promise);
    }

    // saveReport
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
