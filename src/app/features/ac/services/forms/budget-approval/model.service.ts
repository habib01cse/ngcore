/* angular stuff */
import { Injectable } from '@angular/core';

/* our own stuff */
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { Budget } from '../../../models/budget.model';
import { BudgetDetail } from '../../../models/budget-details';
import { UserPrivileges } from 'src/app/core/models/user-privileges';

@Injectable({
  providedIn: 'root'
})

export class ModelService {

  public businessUnitList = [];
  public budgetYearList = []
  public selectBusinessUnit;
  public selectBudgetYear;
  public canChangeBusinessUnit;

  public budget = new Budget();
  public budgetList = new Array<Budget>();
  public budgetListBackup = new Array<Budget>();

  public statusList = [];
  public selectedStatus;
  public selectedBudget;

  public budgetDetailsList = new Array<BudgetDetail>();
  public budgetDetailsListBackup = new Array<BudgetDetail>();
  //Amount of Budget Details
  public totalReqAmtParent = 0;
  public totalAppAmtParent = 0;
  public totalReqAmt = 0;
  public totalQantity = 0;
  public totalAppAmt = 0;

  public displayField = '';
  
  public selectedBudgetIndex = -1;
  public budgetDetailsFocusAmount = 0;
  public userPrivilege = new UserPrivileges();
}
