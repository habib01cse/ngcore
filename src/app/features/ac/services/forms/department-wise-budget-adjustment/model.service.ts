import { Injectable } from '@angular/core';

import { Budget } from '../../../models/budget.model';
import { UserPrivileges } from 'src/app/core/models/user-privileges';

@Injectable({
  providedIn: 'root'
})

export class ModelService {
  public budgetYearList;
  public accountList;
  public budgetPeindingList = new Array<Budget>();

  public selectedBudget;
  public selectedBudgetYear = null;
  public selectedAccount = null;

  public totalReqAmt: number = 0;
  public totalAppAmt: number = 0;
  public totalConsumedAmt: number = 0;
  public totalAvailableAmt: number = 0;
  public totalTranferAmt: number = 0;
  public budgetTransferConfirmModal: boolean = false;
  public userPrivilege = new UserPrivileges();

  transferAmountUpdateCheck(budgetPending) {
    let obj = { isTransferable: false, message: '' };
    if ((budgetPending.BU_NAME_TR != null) || (budgetPending.BU_NO_TR != null)) {
      if ((parseInt(budgetPending.TRANSFER_AMT) > 0) || (parseInt(budgetPending.TRANSFER_AMT) != null)) {
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

  transferAmtsum(){
    this.totalTranferAmt = 0;
    for (const iterator of this.budgetPeindingList) {
      if( (typeof iterator.TRANSFER_AMT !== 'undefined')){
        this.totalTranferAmt += isNaN(Number(iterator.TRANSFER_AMT)) ? 0 : Number(iterator.TRANSFER_AMT);
      }
    }
  }

  public total(data,prop){
    let t=0;
    for(let iterator of data){
      if(iterator[prop]!=='undefined'){
       t += isNaN(Number(iterator[prop])) ? 0 : Number(iterator[prop]);
      }
    }
    return t;
  }
}
