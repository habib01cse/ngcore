import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverPath = acConfig.url.apiUrl + 'ac1012';

  constructor(private apiService: BaseDataService
    , private dataLoadService: DataLoadService) { }

  // getAccountCategories
  public getNatures(): any {
    return this.dataLoadService.load("FG_AC1012_GET_NATURES")
  }

  // saveVoucherType
  public saveNatures(params): any {
    return this.apiService.save<any>(`${this.serverPath}/save-natures`, params);
  }

  // removeAccountCategory
  public removeAccountCategory(): any {
    return this.apiService.executeQuery<any>(`${this.serverPath}/remove-nataure`);
  }
}