import { Injectable } from '@angular/core';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { BudgetTransfer } from '../../../models/budget-transfer.model';

@Injectable({
  providedIn: 'root'
})

export class ModelService {

  public selectedDepartment;
  public selectedTransfer;
  public departmentList = [];
  public transferList = [];
  public transferListSt = [];
  public budgetPeindingList = Array<BudgetTransfer>();
  public budgetPeindingListDump = Array<BudgetTransfer>();
  public budgetPeindingListBacup = Array<BudgetTransfer>();
  public displayField = '';
  public totalReqAmt;
  public userPrivilege = new UserPrivileges();

  constructor(){
    this.transferList = fixedValues.transferType;
    this.transferListSt = this.transferList.slice(1);
  }
  transferAmountUpdateCheck(budget){
    let obj = { isTransferable: false, message: '' };
   if(budget.TO_BU_NO != null){
      if(budget.TRANS_AMT > 0 || budget.TRANS_AMT !=null ){
        if( (budget.PENDING_AMT - budget.TRANS_AMT)>=0 ){
          obj.isTransferable = true;
          
        }else{
          obj.message = 'Transfer Amount  can not be null greater than pending amount';
        }
      }else{
        obj.message = 'Transfer Amount  can not be null';
      }
    }else{
      obj.message = 'Transfer Dept name can not be null';
    }
    return obj;
  }  
}
