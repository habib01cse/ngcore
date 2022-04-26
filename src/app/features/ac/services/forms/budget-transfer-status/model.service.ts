import { Injectable } from '@angular/core';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { BudgetTransfer } from '../../../models/budget-transfer.model';

@Injectable({
  providedIn: 'root'
})

export class ModelService {
  public budgetTransferList = new Array<BudgetTransfer>();
  public budgetTransferListBacup = new Array<BudgetTransfer>();
  public displayField = '';
  public userPrivilege = new UserPrivileges();

  
}
