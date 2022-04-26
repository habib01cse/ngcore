import { Injectable } from '@angular/core';

import { Budget } from '../../../models/budget.model';
import { UserPrivileges } from 'src/app/core/models/user-privileges';

@Injectable({
  providedIn: 'root'
})

export class ModelService {
  public budgetYearList;
  public departmentList;
  public budgetPeindingList = new Array<Budget>();
  public queryOption = 63;

  public selectedBudget;
  public selectedBudgetYear = null;
  public selectedDepartment = null;

  public totalReqAmt: number = 0;
  public totalAppAmt: number = 0;
  public totalConsumedAmt: number = 0;
  public totalAvailableAmt: number = 0;
  public totalTranferAmt: number = 0;

  resetAllCaltulation(){
    this.totalReqAmt = 0;
    this.totalAppAmt = 0;
    this.totalConsumedAmt = 0;
    this.totalAvailableAmt = 0;
    this.totalTranferAmt = 0;
  }



  public userPrivilege = new UserPrivileges();
  //public budgetTransferConfirmModal: boolean = false;

  transferAmountUpdateCheck(budgetPending) {
    let obj = { isTransferable: false, message: '' };
    if ( budgetPending.ACC_NO_TR != null ) {
      if ( parseInt(budgetPending.TRANSFER_AMT) ) {
        if (budgetPending.PENDING_AMT - budgetPending.TRANSFER_AMT >= 0) {
          obj.isTransferable = true;
        } else {
          obj.message = 'Transfer Amount can not be null greater than pending amount';
        }
      } else {
        obj.message = 'Transfer Amount can not be null';
      }
    } else {
      obj.message = 'Transfer Dept name can not be null';
    }
    return obj;
  }

  // Calculation for TransferAmount clomun 
  // transferAmtsum(){
  //   this.totalTranferAmt = 0;
  //   for (const iterator of this.budgetPeindingList) {
  //     if( (typeof iterator.TRANSFER_AMT !== 'undefined')){
  //       this.totalTranferAmt += isNaN(Number(iterator.TRANSFER_AMT)) ? 0 : Number(iterator.TRANSFER_AMT);
  //     }
      
  //   }
  // }
}
