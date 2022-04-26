import { Injectable } from "@angular/core";
import { BudgetList } from "../../../models/budget-list";
import { BudgetDtl } from "../../../models/budget-dtl";
import { UserPrivileges } from "src/app/core/models/user-privileges";

@Injectable({
    providedIn: 'root'
})

export class ModelService {
    budgetList: BudgetList[];
    budgetDetailsList: BudgetDtl[];
    budgetListBackup: BudgetList[];
    budgetDetailsListBackup: BudgetDtl[];

    budgetAppAmount = 0;
    budgetConsumedAmount = 0;
    budgetBalanceAmount = 0;
    budgetQBalance = 0;

    budgetDtlApproveAmount = 0;
    budgetDtlConsumedAmount = 0;
    budgetDtlBalanceAmount = 0;
    public userPrivilege: UserPrivileges;


    constructor() {
        this.budgetList = new Array<BudgetList>();
        this.budgetDetailsList = new Array<BudgetDtl>();
        this.budgetListBackup = new Array<BudgetList>();
        this.budgetDetailsListBackup = new Array<BudgetDtl>();
        this.userPrivilege = new UserPrivileges();

    }

    init() {
    }

    budgetSum() {
        this.budgetAppAmount = 0;
        this.budgetConsumedAmount = 0;
        this.budgetBalanceAmount = 0;
        this.budgetQBalance = 0;
        for (const iterator of this.budgetList) {
            this.budgetAppAmount += isNaN(Number(iterator.APPROVE_AMT)) ? 0 : Number(iterator.APPROVE_AMT);
            this.budgetConsumedAmount += isNaN(Number(iterator.CONSUMED_AMT)) ? 0 : Number(iterator.CONSUMED_AMT);
            this.budgetBalanceAmount += isNaN(Number(iterator.BALANCE_AMT)) ? 0 : Number(iterator.BALANCE_AMT);
            this.budgetQBalance += isNaN(Number(iterator.Q_BALANCE)) ? 0 : Number(iterator.Q_BALANCE);
        }
    }
    budgetDetailsSum() {
        this.budgetDtlApproveAmount = 0;
        this.budgetDtlConsumedAmount = 0;
        this.budgetDtlBalanceAmount = 0;
        for (const iterator of this.budgetDetailsList) {
            this.budgetDtlApproveAmount += isNaN(Number(iterator.APPROVE_AMT)) ? 0 : Number(iterator.APPROVE_AMT);
            this.budgetDtlConsumedAmount += isNaN(Number(iterator.CONSUMED_AMT)) ? 0 : Number(iterator.CONSUMED_AMT);
            this.budgetDtlBalanceAmount += isNaN(Number(iterator.BALANCE_AMT)) ? 0 : Number(iterator.BALANCE_AMT);
        }
    }
}