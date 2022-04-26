import { Injectable } from '@angular/core';
import { CommonService } from '../../common.service';
import { forkJoin } from 'rxjs';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { globalVariables } from 'src/app/core/constants/globalVariables';
import { Chart } from '../../../models/chart.model';
import { UserPrivileges } from 'src/app/core/models/user-privileges';


@Injectable({
  providedIn: 'root'
})
export class ModelService {

  public selectedBusinessArea = null;
  public selectedAccountsNo = null;
  public selectedPostingStatus = null;

  public businessUnitAccountList;
  public changeBusinessUnitList = [];
  public businessAreaList;
  public chartFoAccountList;
  public changedBusinessUnit = false;
  public account = new Chart();

  public accountModalValue = fixedValues.queryOptions.CoaForParent;
  public costCenterModalValue=fixedValues.queryOptions.CostCenterNO;
  public voucherDisplayDetails:any = [];
  public totalDrAmount;
  public totalCrAmount;
  public filterOptionList;
  public accountsModelValue;
  public userPrivilege = new UserPrivileges();
  public accChartList=[];

  constructor(
    private comService: CommonService,
 
  ) { }
  init() {
    let promiseAll = [
      this.comService.getBusinessUnitAccounts(),
      this.comService.getChangeBusinessUnit(),
      this.comService.getChangeBusinessUnit(),
      //remove able this statement this.comService.getChartOfAccounts(fixedValues.queryOptions.CoaForParent),
    ];
    forkJoin(
        promiseAll
      ).subscribe(results => {
        this.businessUnitAccountList = results[0].body;
        this.changeBusinessUnitList = results[1].body;
        this.accountsModelValue = results[2].body;
        // remove able this statement this.accChartList = results[3].body;
       this.getBusinessAreaCondition();
      }, error => {
        this.displayError(error);
    });
  }

  public getBusinessAreaCondition(): void {
    if (typeof this.businessUnitAccountList != 'undefined' && typeof this.businessUnitAccountList[0] != 'undefined' && typeof this.businessUnitAccountList[0].BU_ACC_NO != 'undefined') {
      let promiseAll1 = [];
      promiseAll1 = [
        this.comService.getBusinessAreas(fixedValues.queryOptions.BusinessAreaForCT),
      ];
      forkJoin(
        promiseAll1
      ).subscribe(results => {
        this.businessAreaList = results[0].body;
      })
    } else {
      this.comService.getBusinessAreas(fixedValues.queryOptions.BusinessAreaForTC).subscribe(
        result => {
          this.businessAreaList = result.body;
        },
        err => {
          // Do stuff whith your error
          this.displayError(err);
        },
        () => {
          // Do stuff after completion
        }
      )
    }
   // Set Default value of Business area List
  if (typeof this.businessAreaList != 'undefined' && typeof this.businessAreaList[0] != 'undefined' && typeof this.businessAreaList[0].BA_NO != 'undefined') {
    this.businessAreaList.BA_NO = this.businessAreaList[0].BA_NO;
  }
  if (this.changeBusinessUnitList[0].CAN_CHANGE_BUSINESS_UNIT == 1) {
    this.changedBusinessUnit = true;
  }
}


  // displayError
  private displayError(ex): void {
      console.log(ex);
  }

  totalDrCrAmount(){
    this.totalDrAmount = 0;
    this.totalCrAmount = 0;
    for (const iterator of this.voucherDisplayDetails) {
      if( (typeof iterator.DR !== 'undefined')){
        this.totalDrAmount += isNaN(Number(iterator.DR)) ? 0 : Number(iterator.DR);
      }
      if( (typeof iterator.CR !== 'undefined')){
        this.totalCrAmount += isNaN(Number(iterator.CR)) ? 0 : Number(iterator.CR);
      }
    }
  }
}
