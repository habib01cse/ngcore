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
  public budgetAllReqAmt;
  public budgetAllQuantity;
  public totalReqAmtParent = 0;
  public totalAppAmtParent = 0;
  public totalReqAmt = 0;
  public totalQantity = 0;
  public totalAppAmt = 0;

  public displayField = '';
  
  public selectedBudgetIndex = -1;
  public budgetDetailsFocusAmount = 0;
  public userPrivilege = new UserPrivileges();

  setAllQuaterAndQuantity(){
    let i =0;
    for (const iterator of this.budgetDetailsList) {
      this.budgetDetailsList[i].RCV_AMT = this.budgetAllReqAmt;
      this.budgetDetailsList[i].QTY = this.budgetAllQuantity;
      i++;
    }
  }

  setApproveAmoutFormReqAmount(){
    this.totalAppAmt = 0;
    if(this.selectedBudgetIndex>=0){
      let i =0;
      for (const iterator of this.budgetDetailsList) {
        this.budgetDetailsList[i].APPROVE_AMT = Number(this.budgetDetailsList[i].RCV_AMT) >=1?Number(this.budgetDetailsList[i].RCV_AMT):0;
        i++;
      }
    }
    this.totalApproveAountSum();
  }

  totalApproveAountSum(){
    this.totalAppAmt = 0;
    for (const iterator of this.budgetDetailsList) {
      if( (typeof iterator.APPROVE_AMT !== 'undefined') && (this.userPrivilege.CAN_VIEW  || iterator.SQL_STATE == fixedValues.sqlState.sqlInsert)){
        this.totalAppAmt += isNaN(Number(iterator.APPROVE_AMT)) ? 0 : Number(iterator.APPROVE_AMT);
      }
    }
  }

  totalAmountSumByAllSet(){
    this.totalReqAmt = isNaN(Number(this.budgetDetailsList.length * this.budgetAllReqAmt)) ? 0 : Number(this.budgetDetailsList.length * this.budgetAllReqAmt);
    this.totalQantity = isNaN(Number(this.budgetDetailsList.length * this.budgetAllQuantity)) ? 0 : Number(this.budgetDetailsList.length * this.budgetAllQuantity);
  }
  totalAmountSumByOnChange(){
    this.totalReqAmt = 0;
    this.totalQantity = 0;
    this.totalAppAmt = 0;
    for (const iterator of this.budgetDetailsList) {
      if( (typeof iterator.RCV_AMT !== 'undefined') && (this.userPrivilege.CAN_VIEW  || iterator.SQL_STATE == fixedValues.sqlState.sqlInsert) ){
        this.totalReqAmt += isNaN(Number(iterator.RCV_AMT)) ? 0 : Number(iterator.RCV_AMT);
      }
      if( (typeof iterator.QTY !== 'undefined') && (this.userPrivilege.CAN_VIEW  || iterator.SQL_STATE == fixedValues.sqlState.sqlInsert)){
        this.totalQantity += isNaN(Number(iterator.QTY)) ? 0 : Number(iterator.QTY);
      }
      if( (typeof iterator.APPROVE_AMT !== 'undefined') && (this.userPrivilege.CAN_VIEW  || iterator.SQL_STATE == fixedValues.sqlState.sqlInsert)){
        this.totalAppAmt += isNaN(Number(iterator.APPROVE_AMT)) ? 0 : Number(iterator.APPROVE_AMT);
      }
    }
    this.totalApproveAountSum();
  }
  totalParentAmountSum(){
    this.totalReqAmtParent = 0;
    this.totalAppAmtParent = 0;
    for (const iterator of this.budgetList) {
      if( (typeof iterator.RCV_AMT !== 'undefined') && (this.userPrivilege.CAN_VIEW  || iterator.SQL_STATE == fixedValues.sqlState.sqlInsert)){
        this.totalReqAmtParent += isNaN(Number(iterator.RCV_AMT)) ? 0 : Number(iterator.RCV_AMT);
      }
      if( (typeof iterator.APPROVE_AMT !== 'undefined') && (this.userPrivilege.CAN_VIEW  || iterator.SQL_STATE == fixedValues.sqlState.sqlInsert)){
        this.totalAppAmtParent += isNaN(Number(iterator.APPROVE_AMT)) ? 0 : Number(iterator.APPROVE_AMT);
      }
    }
  }

  reqAmtAppAmtisLarge(){
    let isLarge = this.budgetDetailsList.filter(function (el) {
      return el.RCV_AMT < el.APPROVE_AMT ;
    });
    return isLarge;
  }
  resetAll(){
    this.totalReqAmt = 0;
    this.totalQantity = 0;
    this.totalAppAmt = 0;
    this.totalReqAmtParent = 0;
    this.totalAppAmtParent = 0;
    this.budgetList = [];
    this.budgetDetailsList = [];
  }
  resetBudgetDetails(){
    this.budgetDetailsListBackup.length = 0;
    this.budgetDetailsListBackup = JSON.parse(JSON.stringify(this.budgetDetailsList));
  }
  resetBudget(){
    this.budgetListBackup.length = 0;
    this.budgetListBackup = JSON.parse(JSON.stringify(this.budgetList));
  }
}
