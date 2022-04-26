import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from 'src/app/features/ac/ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { forkJoin } from 'rxjs';
const _url = acConfig.url.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private apiService: BaseDataService
    , private dataLoadService: DataLoadService) { }
  
  public save(paramObj: any) {
  return this.apiService.save<any>(`${_url}ac1290/save-adj-approval`, paramObj);
  }

  public saveDtl(paramObj: any) {
    return this.apiService.save<any>(`${_url}ac1290/save-adj-approval-dtl`, paramObj);
    }

    public saveAllEmp(params) {
      return this.apiService.save<any>(`${_url}ac1290/save-app-user-list`, params);
    }

    public procCreateNewBu( APPSET_NO, BU_NAME, BU_NO) {
      let paramObj = {      
        APPSET_NO: APPSET_NO,
        BU_NAME: BU_NAME,   
        BU_NO: BU_NO
      };
      return this.apiService.executeQuery<any>(`${_url}ac1290/proc-create-new-bu`, paramObj);
    }

    
  public removeMaster(APPSET_NO): any {
    let params = {
      APPSET_NO: APPSET_NO
    }
    return this.apiService.executeQuery<any>(`${_url}ac1290/remove-adj-approval`, params);
  }
    
  
  public removeMasterDtl(APPSETDTL_NO): any {
    let params = {
      APPSETDTL_NO: APPSETDTL_NO
    }
    return this.apiService.executeQuery<any>(`${_url}ac1290/remove-adj-approval-dtl`, params);
  }

}
