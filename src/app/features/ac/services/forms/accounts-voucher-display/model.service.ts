import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { CommonService } from '../../common.service';
import { forkJoin } from 'rxjs';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { globalVariables } from 'src/app/core/constants/globalVariables';
import { AccountsVoucherDisplay } from '../../../models/accounts-voucher-display.model';
import { FormParam } from '../../../models/form-param';
import { DateService } from 'src/app/shared';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
@Injectable({
  providedIn: 'root'
})
export class ModelService {
  
  public businessUnitAccountList;
  // public changeBusinessUnit;
  public businessAreaList;
  public accountDisplay:AccountsVoucherDisplay = new AccountsVoucherDisplay();
  public voucherNoList;
  public voucherList: any = [];
  public withoutBaName: number;
  public naration = '';
  userPrivilege = new UserPrivileges();

  public postingStatus = Object.keys(fixedValues.postingStatus).map(e => { return { type:e, name:fixedValues.postingStatus[e] } });
  public formParam: FormParam = new FormParam();
  public startDate= this.dateUtil.getYYYYMMDDDashFromDate(this.formParam.START_DATE);
  public endDate= this.dateUtil.getYYYYMMDDDashFromDate(this.formParam.END_DATE);

  constructor(
    private comService: CommonService,
    private dateUtil: DateService,
  ) { }

  public getBusinessAreaCondition(): void {
    if (typeof this.businessUnitAccountList != 'undefined' && typeof this.businessUnitAccountList[0] != 'undefined' && typeof this.businessUnitAccountList[0].BU_ACC_NO != 'undefined') {
      this.comService.getBusinessAreas(fixedValues.queryOptions.BusinessAreaCB).subscribe(
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
    } else {
      this.comService.getBusinessAreas(fixedValues.queryOptions.BusinessAreaForGL).subscribe(
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
  }
  
  // displayError
  private displayError(ex): void {
      console.log(ex);
  }
}
