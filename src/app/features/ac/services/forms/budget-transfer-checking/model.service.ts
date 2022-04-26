import { Injectable } from '@angular/core';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { BudgetTransfer } from '../../../models/budget-transfer.model';

@Injectable({
  providedIn: 'root'
})

export class ModelService {

  public selectedDepartment;
  public selectedType;
  public departmentList = [];
  public acceptList = [];
  public selectedStatus = 2;
  public budgetPeindingList = Array<BudgetTransfer>();
  public budgetPeindingListBacup = Array<BudgetTransfer>();
  public displayField = '';
  public totalReqAmt;
  public userPrivilege: UserPrivileges;
  constructor() {
  this.acceptList = fixedValues.acceptType;
  this.userPrivilege = new UserPrivileges();
  }  
}
