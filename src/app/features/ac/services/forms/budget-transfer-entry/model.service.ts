import { Injectable } from '@angular/core';

import { Budget } from '../../../models/budget.model';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

@Injectable({
  providedIn: 'root'
})

export class ModelService {
  public queryOption = 3;
  public budgetYearList;
  public accountList;
  public budgetPeindingList = new Array<Budget>();
  public budgetPeindingListBacup = new Array<Budget>();

  public selectedBudget;
  public budget = new Budget();
  public selectedBudgetYear = null;
  public selectedAccount = null;

  public totalReqAmt: number = 0;
  public totalAppAmt: number = 0;
  public totalConsumedAmt: number = 0;
  public totalAvailableAmt: number = 0;
  public totalTransferAmt: number = 0;
  public budgetTransferConfirmModal: boolean = false;
  public submitDate:Date;
  public submitByEmpName = '';
  public userPrivilege = new UserPrivileges();

  transferAmountUpdateCheck(budgetPending) {    

    console.log('budgetPending', budgetPending);

    let obj = { isTransferable: false, message: '' };
    if (budgetPending.BU_NO_TR) {

      if ((parseInt(budgetPending.TRANSFER_AMT) > 0) || budgetPending.TRANSFER_AMT) {
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


}
