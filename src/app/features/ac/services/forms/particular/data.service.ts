import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
const _url = acConfig.url.apiUrl;


@Injectable({
    providedIn: 'root'
})
export class DataService {

    private serverPath = acConfig.url.apiUrl + 'ac1066';

    constructor(private apiService: BaseDataService
        , private dataLoadService: DataLoadService) { }


    public saveParticular(paramObj: any) {
        return this.apiService.save<any>(`${_url}ac1066/save-particular`, paramObj);
    }

    public delete() {
        return this.apiService.executeQuery<any>(`${_url}ac1066/delete`);
    }

}
