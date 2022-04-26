import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { forkJoin } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

private serverPath = acConfig.url.apiUrl + 'ac1013';

  constructor(private apiService: BaseDataService
    , private dataLoadService: DataLoadService) { }
  
  // getCostCenterTree
  public getCostCenterTree(): any {
    return this.dataLoadService.load("FG_AC1013_COSTCENTER_TREE_LIST")
  }

   // getChartofAccount
   public getCostCenterDtl(_COST_NO: any): any {
    let params = { P_COST_NO: _COST_NO }
    let promises = [
      this.dataLoadService.load("FG_AC1013_COSTCENTER", params,true),
      this.dataLoadService.load("FG_AC1013_COST_COMPANY", params),
      this.dataLoadService.load("FG_AC1013_COST_MODULE", params),
   
    ];
    return forkJoin(promises)
  }






  // public remove(params): any {   
  //   return this.apiService.save<any>(`${this.serverPath}/remove-sl-return`, params);
  // }
  
  
  // public removePurContract(PURCONTRACT_NO: number): any {
  //   let params = { PURCONTRACT_NO: PURCONTRACT_NO }
  //   return this.apiService.executeQuery<any>(`${this.serverPath}/remove-pur-contract`, params);
  // }
  
  //POST /ac/ac1013/save-cost-center
  public saveCostCenter(params): any {   
    return this.apiService.save<any>(`${this.serverPath}/save-cost-center`, params);
  } 

  // POST /ac/ac1013/remove-cost-center
  public removeCostCenter(COST_NO: number): any {
    let params = { COST_NO: COST_NO }
    return this.apiService.executeQuery<any>(`${this.serverPath}/remove-cost-center`, params);
  }

}