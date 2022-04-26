/* angular stuff */
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { CommonService } from '../../common.service';
import { Statement } from '../../../models/statement.model';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { forkJoin } from 'rxjs';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import { element } from 'protractor';
import { FinancialStatementHead } from '../../../models/financial-statement-head.model';
import { StatementDetails } from '../../../models/statement-details.model';
import { UserPrivileges } from 'src/app/core/models/user-privileges';


/* 3rd party libraries */


/* our own stuff */

@Injectable({
    providedIn: 'root'
})
export class ModelService {
    
    public userPrivilege: UserPrivileges;
    public statement: Statement;
    public REP_TYPE;
    public financialStType;
    public MSTR_SETUP_NO: any;

    public statementHead: FinancialStatementHead;
    public statementHeadBacup: FinancialStatementHead;
    public statementHeadList = Array<FinancialStatementHead>();
    public statementHeadListBacup = Array<FinancialStatementHead>();
    public statementDetailsList = Array<StatementDetails>();
    public statementDetailsListBacup = Array<StatementDetails>();
    public inventoryList: any[];
    public accountCategoryList: any[];
    public inventoryTypesList: any[];

    public  ALL = false;
    public Balance_Sheet =true;
    public Income_Statement = false;
    public Cash_Flow = false;

    

    
    constructor(
        private apiService: DataService,
        private alertService: AlertService,
        private commonService: CommonService,
        private utilityServcie: UtilityService
    ) {        
        this.userPrivilege = new UserPrivileges();  
        this.inventoryTypesList = utilityServcie.getEnumList(fixedValues.inventoryTypes);   
    }

    public init(): void {
        // this.MSTR_SETUP_NO = "";
        // this.financialStType  = fixedValues.financialStatementType;        
        // this.REP_TYPE = "B";       

        // this.statementHeadList = new Array();
        // this.addNewStatementHead();
        // this.getInventoryList();

        // forkJoin(
        //     this.commonService.geInventoryTypes(),
        //     this.commonService.getAccountCategories()
        // ).subscribe(results => {
        //     this.inventoryList = results[0].body;
        //     this.accountCategoryList = results[1].body;
        // });
    }

    /* getInventoryList() {
        this.statementHeadList.length = 0;
        this.apiService.getStatementHeads(this.REP_TYPE)
            .subscribe(result => this.statementHeadList = result.body);
    }

    changeStatementType() {
        this.addNewStatementHead();
        this.getInventoryList();
    }

    changeStatementHead() {
        this.apiService.getStatement(this.MSTR_SETUP_NO)
            .subscribe(result => {
                this.statement = new Statement(result[0].body);
                result[1].body.forEach(element => {
                    this.statement.statmentSetupList.push(element)
                })
            });
    }

    removeSetupChild(index, setupChild) {
        if (setupChild.SQL_STATE == 1) {
            this.statement.statmentSetupList.splice(index, 1);
        }
        else {
            setupChild.SQL_STATE = fixedValues.sqlState.sqlDelete;
        }
    }

    addNewSetupChild() {
        this.statement.statmentSetupList.push(
            {
                ALIAS: "",
                FORMULA: "",
                HEADING: "",
                MSTR_SETUP_NO: null,
                SHOW_IN: "",
                SL_NO: null,
                SQL_STATE: fixedValues.sqlState.sqlInsert
            }
        )
    }


    addNewStatementHead() {
        this.statement = new Statement();
    }

    saveSatement() {
        this.apiService.saveStatement(this.statement).subscribe(result => {
            this.statement = new Statement(result.body);
            this.getInventoryList();
            this.alertService.success("Saved Successfully");
        }, error => {
            this.alertService.warning("Failed to save data!");
        });
    } */

}
