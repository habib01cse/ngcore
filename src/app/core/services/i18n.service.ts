// https://github.com/ngx-rocket/starter-kit/tree/master/src/app/core
// https://medium.com/default-to-open/understanding-a-large-scale-angular-app-with-ngrx-80f9fc5660cc
// https://github.com/emonney/QuickApp/tree/master/src/QuickApp/ClientApp/src/app
// https://github.com/tomastrajan/angular-ngrx-material-starter/tree/master/src/app


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BaseDataService } from './base-data.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class I18nService {

    constructor(private baseDataSvc: BaseDataService) {
    }
    public getLanguageData(filePath: any): Observable<any> {
        return this.baseDataSvc.getFileData(`${environment.ASSET_HOST}assets/i18n/${filePath}.json`);
    }
}