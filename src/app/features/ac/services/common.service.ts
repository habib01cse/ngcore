/* angular stuff */
import { Injectable } from '@angular/core';

/* our own stuff */
import { acConfig } from '../ac.config';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { globalVariables } from 'src/app/core/constants/globalVariables';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';


@Injectable({
    providedIn: 'root'
})
export class CommonService {


    private serverPath = acConfig.url.apiUrl + 'common';
    constructor(private apiService: BaseDataService
        , private dataLoadService: DataLoadService
       ) { }

    // getPeriods
    public getPeriods(QUERY_OPTION, GROUPPERIOD_NO) {
        let paramObj = {
            P_QUERYOPTIONS: QUERY_OPTION,
            P_GROUPPERIOD_NO: GROUPPERIOD_NO
        }
        return this.dataLoadService.load("FG_AC_COMM_PERIOD_LIST", paramObj)
    }

    // getPeriodsByGroupId
    public getPeriodsByGroupId(groupPeriodNo: any = null) {
        let paramObj = {
            P_GROUPPERIOD_NO: groupPeriodNo,
            P_QUERYOPTIONS: '3'
        };
        return this.dataLoadService.load("FG_AC_COMM_PERIOD_LIST", paramObj)
    }

    // getGroupPeriods
    public getGroupPeriods() {
        return this.dataLoadService.load("FG_AC_COMM_GROUP_PERIOD_LIST")
    }

    // getCostCenters
    public getCostCenters(queryOption: any, accNo = null) {
        let paramObj = {
            P_QUERYOPTIONS: queryOption,
            P_ACC_NO: null
        };
        return this.dataLoadService.load("FG_AC_COMM_COST_CENTERS", paramObj)
    }

    // getCurrencies
    public getCurrencies(paramObj: any) {
        return this.dataLoadService.load("FG_AC_COMM_CURRENCIES", paramObj)
    }

    // getVoucherTypes
    public getVoucherTypes(queryOption: any) {
        let paramObj = {
            P_QUERYOPTIONS: queryOption
        };
        return this.dataLoadService.load("FG_AC_COMM_VOUCHER_TYPES", paramObj)
    }
    public getDtlVoucheTypes() {
        return this.dataLoadService.load("FG_AC_COMM_VOUCHER_TYPE_LIST")
    }

    public getVouchers(params: any): any {
        return this.dataLoadService.load("FG_AC_COMM_VOUCHER_LIST", params)
    }

    // getChartOfAccounts
    public getChartOfAccounts(queryOption: any, baNo = null, PERIOD_NO = null, BU_NO = null, ACC_NO = null) {
        let paramObj = {
            P_QUERYOPTIONS: queryOption,
            P_BA_NO: baNo,
            P_PERIOD_NO: PERIOD_NO,
            P_BU_NO: BU_NO,
            P_ACC_NO: ACC_NO,
        };
        return this.dataLoadService.load("FG_AC_COMM_CHART_OF_ACCOUNTS", paramObj)
    }

    // getBusinessAreas
    public getBusinessAreas(queryOption: any, accNo = null, ctrlBuChk = null) {
        let paramObj = {
            P_QUERYOPTIONS: queryOption,
            P_ACC_NO: accNo,
            CTRL_BU_CHK: ctrlBuChk,
        };
        return this.dataLoadService.load("FG_AC_COMM_BA_NAME")
    }

    // getBaseCurrency
    public getBaseCurrency() {
        return this.dataLoadService.load("FG_SA_COMM_BASE_CURRENCY")
    }
    // getBanksBranch
    public getBanksBranch() {
        let paramObj = {
            P_QUERYOPTIONS: '6',
            P_COMPANY_NO: globalVariables.userInfo.company_NO,
            P_BANKDTL_NO: null,
            P_BANK_ACC_NO: null,
            P_SUBBANK_OF: null
        }
        return this.dataLoadService.load("FG_AC_COMM_BANK_INFO", paramObj)
    }

    public getReportServers() {
        return this.dataLoadService.load("FG_SA_COMM_REPORT_SERVERS")
    }

    public getDefaultReportServer(subMenuId: any) {
        let paramObj = {
            P_SUBMENU_ID: subMenuId
        };
        return this.dataLoadService.load("FG_SA_COMM_REPORT_CONFIG", paramObj)
    }

    public getOutputFormats() {
        return this.dataLoadService.load("FG_SA_COMM_REPORT_FORMAT")
    }

    // getStores
    public getStores() {
        return this.dataLoadService.load("FG_SA_STORE_USER")
    }

    // getCustomers
    public getCustomers() {
        let paramObj = {
            P_QUERYOPTIONS: '1',
            P_CUST_NO: null
        }
        return this.dataLoadService.load("FG_SL_COMM_CUSTOMER_LIST", paramObj)
    }

    // getUsers
    public getUsers() {
        return this.apiService.executeQuery<any>(`${this.serverPath}/get-users`);
    }

    // getUsers
    public getVoucherPreparedBy() {
        return this.apiService.executeQuery<any>(`${this.serverPath}/get-voucher-prepared-by`);
    }

    // getModules
    public getModules() {
        return this.dataLoadService.load("FG_AC_COMM_MODULES")
    }

    // getCreatedBy
    public geVoucherPreparedList() {
        return this.dataLoadService.load("FG_AC_COMM_VC_PREPARED_LIST")
    }

    // get Repeots Nmaes
    public getReportNames(REP_TYPE) {
        return this.dataLoadService.load("FG_SA_COMM_REPSETUP", { P_REP_TYPE: REP_TYPE })
    }
    // get Pay To List
    public getPayTo() {
        let paramObj = {
            P_QUERYOPTIONS: '10',
            P_COMPANY_NO: globalVariables.userInfo.company_NO,
            P_BANKDTL_NO: null,
            P_BANK_ACC_NO: null,
            P_SUBBANK_OF: null
        }
        return this.dataLoadService.load("FG_AC_COMM_BANK_INFO", paramObj)

    }

    // Get Cost Center For TB
    public getCostCenterForTB() {
        let paramObj = {
            P_QUERYOPTIONS: 23,
            P_ACC_NO: null
        }
        return this.dataLoadService.load('FG_AC_COMM_COST_CENTERS', paramObj)
    }


    // Get Referance Number
    public getReferences(_ACC_NO) {
        let paramObj = {
            P_ACC_NO: _ACC_NO
        };
        return this.dataLoadService.load("FG_AC_COMM_REFERENCES", paramObj)
    }

    // Get Nature List
    public getNatures() {
        return this.dataLoadService.load("FG_AC_COMM_NATURE_LIST");
    }

    // Get Cost Center List by ACC_NO
    public getChartCostlists(_ACC_NO) {
        let paramObj = {
            P_ACC_NO: _ACC_NO
        };
        return this.dataLoadService.load("FG_AC_COMM_COST_LIST", paramObj)
    }

    // Get BA List by ACC_NO
    public getChartBalist(_ACC_NO) {
        let paramObj = {
            P_ACC_NO: _ACC_NO
        };
        return this.dataLoadService.load("FG_AC_COMM_CHART_BA_LISTS", paramObj)
    }

    // Get Change Business for AC_2060
    public getChangeBusinessUnit(PRIV_NO = null) {
        let paramObj = {
            P_PRIV_NO: PRIV_NO
        };
        return this.dataLoadService.load("FG_SA_COMMON_CHANGE_BU", paramObj)
    }

    // Get Change Business Accounts   
    public getBusinessUnitAccounts(user_NO?) {
        let paramObj = {
            USER_NO: user_NO
        };
        return this.dataLoadService.load("FG_AC_COMM_POLICY_LIST", paramObj)
    }

    // Get Multi company cost     
    public getMultiCompanyCost() {
        return this.dataLoadService.load("FG_AC_COMM_MULTICOMPANY_COST")
    }

    //Get Voucher Prepared List
    public getVoucherPreparedList() {
        return this.dataLoadService.load("FG_AC_COMM_VC_PREPARED_LIST")
        // return this.apiService.executeQuery<any>(`${this.serverPath}/get-voucher-prepared-lists`);
    }

    // Get Account Category   
    public getAccountCategories() {
        return this.dataLoadService.load("FG_AC_COMM_ACCOUNT_CATEGORIES")
    }


    public getAccountList(natureNo=null) {
        return this.dataLoadService.load("FG_AC_COMM_COA_BY_NATURE_NO",{ P_NATURE_NO:natureNo})
    }

    // Get getDeafultCurrency   
    public getDeafultCurrency() {
        return this.dataLoadService.load("FG_AC_COMM_DEAFULT_CURRENCY")
    }

    // Get getMapAccount   
    public getMapAccount(_ACC_NO) {
        let paramObj = {
            P_ACC_NO: _ACC_NO
        };
        return this.dataLoadService.load("FG_AC_COMM_MAP_ACCOUNT", paramObj)
    }

    // Get getBusinessUnit   
    public getBusinessUnit() {
        return this.dataLoadService.load("FG_SA_COMM_BU_NAME")
    }

    public getFiscalPeriods() {
        let paramObj = {
            P_QUERYOPTIONS: '2',
            P_GROUPPERIOD_NO: null
        }
        return this.dataLoadService.load("FG_AC_COMM_PERIOD_LIST", paramObj)
    }


    public getBudgetPeriods(PERIOD_NO) {
        let paramObj = {
            P_QUERYOPTIONS: fixedValues.queryOptions.CostCenterDtl,
            P_PERIOD_NO: PERIOD_NO,
            P_ACC_NO: null,
            P_BU_NO: null,
            P_STATUS: null,
            P_SEE_ALL_BUDGET: null,
            P_STEP_NO: null,
            P_BUDGETTRANS_NO: null
        };
        return this.dataLoadService.load("FG_AC_COMM_BUDGET_INFO", paramObj)
    }
    public getBudgetByPeriod(PERIOD_NO) {
        let paramObj = {
            P_QUERYOPTIONS: '4',
            P_PERIOD_NO: PERIOD_NO,
            P_ACC_NO: null,
            P_BU_NO: null,
            P_STATUS: null,
            P_SEE_ALL_BUDGET: null,
            P_STEP_NO: null,
            P_BUDGETTRANS_NO: null
        };
        return this.dataLoadService.load("FG_AC_COMM_BUDGET_INFO", paramObj)
    }


    // Get VOucher by voucher no
    public getVouchersByVNo(V_NO) {
        let paramObj = {
            P_QUERYOPTIONS: '6',
            P_FROM_DATE: null,
            P_END_DATE: null,
            P_VTYPE_NO: null,
            P_QJ_NAME: null,
            P_V_NO: V_NO,
            P_V_ID: null,

        };
        return this.dataLoadService.load("FG_AC_COMM_VOUCHER_INFO", paramObj)
    }

    // Get geInventoryTypes
    public geInventoryTypes() {
        return this.dataLoadService.load("FG_SA_COMM_STORE_TYPE_LIST")
    }

    // Get Report Information
    public getReportInfo(SUBMENU_ID) {
        let paramObj = {
            P_SUBMENU_ID: SUBMENU_ID
        };
        return this.dataLoadService.load("FG_SA_COMM_REPORT_CONFIG", paramObj)
    }

    // Get Default Report 
    public getDefaultReport(REPORT_ID) {
        let paramObj = {
            P_QUERYOPTIONS: '2',
            P_REPORT_ID: REPORT_ID,
            P_SUBMENU_ID: null
        };
        return this.dataLoadService.load("FG_SA_COMM_REPORT_INFO", paramObj)
    }

    // Get Round Value 
    public getRound() {
        return this.dataLoadService.load("FG_SA_COMM_ROUND")
    }

    // Get getEmployees
    public getEmployees() {
        return this.dataLoadService.load("PG_AC1002_EMPLOYEE_NAMES")
    }

    // Get report Server
    public getReportServer() {
        return this.dataLoadService.load("FG_AC_COMM_RP_SERVER")
    }

    // Get Cost Center List by ACC_NO
    public getCoaByNatureNo(NATURE_NO) {
        let paramObj = {
            P_NATURE_NO: NATURE_NO
        };
        return this.dataLoadService.load("FG_AC_COMM_COA_BY_NATURE_NO", paramObj)
    }

    // Get Bank  Server
    public getBankAccountNames() {
        let paramObj = {
            P_QUERYOPTIONS: '11',
            P_COMPANY_NO: globalVariables.userInfo.company_NO,
            P_BANKDTL_NO: null,
            P_BANK_ACC_NO: null,
            P_SUBBANK_OF: null
        }
        return this.dataLoadService.load("FG_AC_COMM_BANK_INFO", paramObj)
    }

    // Get Cheque Book Id
    public getChkBooksByAccNo(BANK_DTL_NO) {
        let paramObj = {
            P_QUERYOPTIONS: '12',
            P_COMPANY_NO: globalVariables.userInfo.company_NO,
            P_BANKDTL_NO: BANK_DTL_NO,
            P_BANK_ACC_NO: null,
            P_SUBBANK_OF: null
        }
        return this.dataLoadService.load("FG_AC_COMM_BANK_INFO", paramObj)
    }

    // Get User List
    public getUsersList() {
        return this.dataLoadService.load("FG_IN_COMM_INT_EMP_LIST")
    }

    // Get Report Name List
    public reportNameList() {
        let paramObj = {
            P_REP_TYPE: null
        }
        return this.dataLoadService.load("FG_SA_COMM_REPSETUP", paramObj)
    }

    // Get Bank Name List
    public getBankBranchNames() {
        let paramObj = {
            P_QUERYOPTIONS: '5',
            P_COMPANY_NO: globalVariables.userInfo.company_NO,
            P_BANKDTL_NO: null,
            P_BANK_ACC_NO: null,
            P_SUBBANK_OF: null
        }
        return this.dataLoadService.load("FG_AC_COMM_BANK_INFO", paramObj)
    }

    // Get Bank Branch List
    public getBranchNames() {
        let paramObj = {
            P_QUERYOPTIONS: '7',
            P_COMPANY_NO: globalVariables.userInfo.company_NO,
            P_BANKDTL_NO: null,
            P_BANK_ACC_NO: null,
            P_SUBBANK_OF: null
        }
        return this.dataLoadService.load("FG_AC_COMM_BANK_INFO", paramObj)
    }

    // Get Bank Acoount number List
    public getBanksAccNo() {
        let paramObj = {
            P_QUERYOPTIONS: '1',
            P_COMPANY_NO: globalVariables.userInfo.company_NO,
            P_BANKDTL_NO: null,
            P_BANK_ACC_NO: null,
            P_SUBBANK_OF: null
        }
        return this.dataLoadService.load("FG_AC_COMM_BANK_INFO", paramObj)
    }

    // Get Beneficiary List
    public getBeneficiaries() {
        return this.dataLoadService.load("FG_AC_COMM_PAY_TO_LIST")
    }

    // Get Cheque Book  List
    public getChqBooksNo() {
        let paramObj = {
            P_QUERYOPTIONS: '8',
            P_COMPANY_NO: globalVariables.userInfo.company_NO,
            P_BANKDTL_NO: null,
            P_BANK_ACC_NO: null,
            P_SUBBANK_OF: null
        }
        return this.dataLoadService.load("FG_AC_COMM_BANK_INFO", paramObj)
    }

 // Get Cheque Book  List
 public getChqBookNo() {
    let paramObj = {
        P_QUERYOPTIONS: '22',
        P_COMPANY_NO: globalVariables.userInfo.company_NO,
        P_BANKDTL_NO: null,
        P_BANK_ACC_NO: null,
        P_SUBBANK_OF: null
    }
    return this.dataLoadService.load("FG_AC_COMM_BANK_INFO", paramObj)
}


    // Get Ledger Heads  List
    public getLedgerHeads() {
        return this.dataLoadService.load("FG_AC_COMM_PAY_TO_LEDGER_HEAD")
    }

    // Get Ledger Heads  List
    public getFinancialYears() {
        return this.dataLoadService.load("FG_AC_COMM_FINANCIAL_YEARS")
    }

    // Get Ledger Heads  List
    public getBudgetPeriod(FY_YEAR_NO) {
        let paramObj = {
            FY_YEAR_NO: FY_YEAR_NO
        };
        return this.apiService.executeQuery<any>(`${this.serverPath}/get-budget-period`, paramObj);
    }

    // Get Periods By Sdate  List    
    public getPeriodsBySdate(START_DATE) {
        let paramObj = {
            P_QUERYOPTIONS: '1',
            P_START_DATE: START_DATE
        };
        return this.dataLoadService.load("FG_SA_COMM_PERIOD_LIST", paramObj)
    }

    // Get Min preriod Date
    public getMinPeriodDate() {
        let paramObj = {
            P_QUERYOPTIONS: '2',
            P_SDATE: null
        };
        return this.dataLoadService.load("FG_SA_COMM_PERIOD_LIST", paramObj)
    }

    // Get upledger Details
    public getUpledgerDetails() {
        return this.dataLoadService.load("FG_AC_COMM_UPLEDGER_DETAILS")
    }

    // Get ledger Details
    public getLedgerDetails() {
        return this.dataLoadService.load("FG_AC_COMM_LEDGER_DETAILS")
    }

    // Get Cheque No
    public getChequeNo() {
        let paramObj = {
            P_QUERYOPTIONS: '13',
            P_COMPANY_NO: globalVariables.userInfo.company_NO,
            P_BANKDTL_NO: null,
            P_BANK_ACC_NO: null,
            P_SUBBANK_OF: null
        }
        return this.dataLoadService.load("FG_AC_COMM_BANK_INFO", paramObj)
    }

    // Get Bank Name From Voucher
    public getBankNamesFromVoucher() {
        let paramObj = {
            P_QUERYOPTIONS: '1',
            P_FROM_DATE: null,
            P_END_DATE: null,
            P_VTYPE_NO: null,
            P_QJ_NAME: null,
            P_V_ID: null,
            P_V_NO: null,
        }
        return this.dataLoadService.load("FG_AC_COMM_VOUCHER_INFO", paramObj)
    }

    // Get Voucher No
    public getVouchersNo(START_DATE, END_DATE) {
        let paramObj = {
            P_FROM_DATE: START_DATE,
            P_END_DATE: END_DATE,
            P_QUERYOPTIONS: '2',
            P_VTYPE_NO: null,
            P_QJ_NAME: null,
            P_V_ID: null,
            P_V_NO: null,
        };
        return this.dataLoadService.load("FG_AC_COMM_VOUCHER_INFO", paramObj)
    }

    // Get Business Dept Name
    public getBusinessDept() {
        return this.dataLoadService.load("FG_SA_COMM_BU_NAME")
    }

    // Get Budget Years
    public getBudgetYears() {
        let paramObj = {
            P_QUERYOPTIONS: '1',
            P_PERIOD_NO: null,
            P_ACC_NO: null,
            P_BU_NO: null,
            P_STATUS: null,
            P_SEE_ALL_BUDGET: null,
            P_STEP_NO: null,
            P_BUDGETTRANS_NO: null,
        }
        return this.dataLoadService.load("FG_AC_COMM_BUDGET_INFO", paramObj)
    }

    // getMultiAccInfo
    getMultiAccInfo(): any {
        let paramObj = {
            P_QUERYOPTIONS: '14',
            P_COMPANY_NO: globalVariables.userInfo.company_NO,
            P_BANKDTL_NO: null,
            P_BANK_ACC_NO: null,
            P_SUBBANK_OF: null

        }
        return this.dataLoadService.load("FG_AC_COMM_BANK_INFO", paramObj)
    }

    // getChkBooksByBankAccNo
    getChkBooksByBankAccNo(BANK_DTL_NO: any): any {
        let paramObj = {
            BANK_DTL_NO: BANK_DTL_NO,
            P_QUERYOPTIONS: '15',
            P_COMPANY_NO: null,
            P_BANKDTL_NO: BANK_DTL_NO,
            P_BANK_ACC_NO: null,
            P_SUBBANK_OF: null
        };
        return this.dataLoadService.load("FG_AC_COMM_BANK_INFO", paramObj)
    }
    // Get TransFer Department
    getTransferDept(PERIOD_NO: any, ACC_NO: any, BU_NO: any): any {
        let paramObj = {
            P_QUERYOPTIONS: '3',
            P_PERIOD_NO: PERIOD_NO,
            P_ACC_NO: ACC_NO,
            P_BU_NO: BU_NO,
            P_STATUS: null,
            P_SEE_ALL_BUDGET: null,
            P_STEP_NO: null,
            P_BUDGETTRANS_NO: null
        };
        return this.dataLoadService.load("FG_AC_COMM_BUDGET_INFO", paramObj)
    }

    // getBusiness Units
    getBusinessUnits(USER_TYPE = null): any {
        let paramObj = {
            P_QUERYOPTIONS: '1',
            P_USER_TYPE: USER_TYPE,
        };
        return this.dataLoadService.load("FG_AC_COMM_BU_INFO", paramObj)
    }

    public getBudgetViews(STATUS, SEE_ALL_BUDGET) {
        let paramObj = {
            STATUS: STATUS,
            SEE_ALL_BUDGET: SEE_ALL_BUDGET
        }
        return this.apiService.executeQuery<any>(`${this.serverPath}/get-budget-views`, paramObj);
    }
    // getBusiness Units
    getBudgetStatus(STATUS: any): any {
        let paramObj = {
            P_QUERYOPTIONS: '14',
            P_STATUS: null,
            P_PERIOD_NO: null,
            P_ACC_NO: null,
            P_BU_NO: null,
            P_SEE_ALL_BUDGET: null,
            P_STEP_NO: STATUS,
            P_BUDGETTRANS_NO: null
        };
        return this.dataLoadService.load("FG_AC_COMM_BUDGET_INFO", paramObj)
    }
    // Get Statsu name by status
    public getStepNamesByStatus(STATUS) {
        let paramObj = {
            P_QUERYOPTIONS: '7',
            P_STATUS: STATUS,
            P_PERIOD_NO: null,
            P_ACC_NO: null,
            P_BU_NO: null,
            P_SEE_ALL_BUDGET: null,
            P_STEP_NO: null,
            P_BUDGETTRANS_NO: null,
        }
        return this.dataLoadService.load("FG_AC_COMM_BUDGET_INFO", paramObj)
    }
    // Get Bu Name by period no
    public getBuNameByPeriodNo(PERIOD_NO) {
        let paramObj = {
            P_QUERYOPTIONS: '10',
            P_PERIOD_NO: PERIOD_NO,
            P_ACC_NO: null,
            P_BU_NO: null,
            P_STATUS: null,
            P_SEE_ALL_BUDGET: null,
            P_STEP_NO: null,
            P_BUDGETTRANS_NO: null
        }
        return this.dataLoadService.load("FG_AC_COMM_BUDGET_INFO", paramObj)
    }
    // Get Budget Trans No
    public getBudgetTransNo() {
        let paramObj = {
            P_QUERYOPTIONS: '12',
            P_PERIOD_NO: null,
            P_ACC_NO: null,
            P_BU_NO: null,
            P_STATUS: null,
            P_SEE_ALL_BUDGET: null,
            P_STEP_NO: null,
            P_BUDGETTRANS_NO: null
        }
        return this.dataLoadService.load("FG_AC_COMM_BUDGET_INFO", paramObj)
    }
    // Get Budget Submit Date
    public getBudgetSubmitDate(BUDGET_TRANSFER_NO) {
        let paramObj = {
            P_QUERYOPTIONS: '13',
            P_PERIOD_NO: null,
            P_ACC_NO: null,
            P_BU_NO: null,
            P_STATUS: null,
            P_SEE_ALL_BUDGET: null,
            P_STEP_NO: null,
            P_BUDGETTRANS_NO: BUDGET_TRANSFER_NO,
        }
        return this.dataLoadService.load("FG_AC_COMM_BUDGET_INFO", paramObj)
    }

    // Get Budget Submit Date
    public getQJournal() {
        let paramObj = {
            P_QUERYOPTIONS: '4',
            P_FROM_DATE: null,
            P_END_DATE: null,
            P_VTYPE_NO: null,
            P_QJ_NAME: null,
            P_V_ID: null,
            P_V_NO: null
        }
        return this.dataLoadService.load("FG_AC_COMM_VOUCHER_INFO", paramObj)
    }
    public getChequeStatus() {
        let paramObj = {
            P_QUERYOPTIONS: '1',
            P_CHECKBOOK_ID: null,
            P_CHECKID: null,
            P_ACC_NO: null,
            P_CHECK_NO: null,
            P_CHEQUE_AUTHO_NO: null,
        }
        return this.dataLoadService.load("FG_AC_COMM_BANK_CHEQUE_INFO", paramObj)
    }

    // Get getQJournalName
    public getQJournalName(VTYPE_NO: any, QJ_NAME = null) {
        let paramObj = {
            P_VTYPE_NO: VTYPE_NO,
            P_QJ_NAME: QJ_NAME,
            P_QUERYOPTIONS: '3',
            P_FROM_DATE: null,
            P_END_DATE: null,
            P_V_ID: null,
            P_V_NO: null
        }
        return this.dataLoadService.load("FG_AC_COMM_VOUCHER_INFO", paramObj)
    }

    // Get getChequeNoList
    public getChequeBookIdByBKAccNo(BANK_ACC_NO: any = null) {
        let paramObj = {
            P_ACC_NO: BANK_ACC_NO,
            P_QUERYOPTIONS: '2',
            P_CHECKBOOK_ID: null,
            P_CHECKID: null,
            P_CHECK_NO: null,
            P_CHEQUE_AUTHO_NO: null

        }
        return this.dataLoadService.load("FG_AC_COMM_BANK_CHEQUE_INFO", paramObj)
    }
    // Get Cheque No by cheque book id
    public getChequesByChequeBookId(CHECKBOOK_ID: any) {
        let paramObj = {
            P_QUERYOPTIONS: '2',
            P_CHECKBOOK_ID: CHECKBOOK_ID,
            P_CHECKID: null,
            P_ACC_NO: null,
            P_CHECK_NO: null,
            P_CHEQUE_AUTHO_NO: null
        }
        return this.dataLoadService.load("FG_AC_COMM_BANK_CHEQUE_INFO", paramObj)
    }
    // Get Cheque No by cheque book id
    public getChequeAmtByChequeBookId(CHECKBOOK_ID: any) {
        let paramObj = {
            P_QUERYOPTIONS: '4',
            P_CHECKBOOK_ID: CHECKBOOK_ID,
            P_CHECKID: null,
            P_ACC_NO: null,
            P_CHECK_NO: null,
            P_CHEQUE_AUTHO_NO: null

        }
        return this.dataLoadService.load("FG_AC_COMM_BANK_CHEQUE_INFO", paramObj)
    }
    // Get Cheque No by cheque book id
    public getSignatoryAuthorities() {
        let paramObj = {
            P_QUERYOPTIONS: '5',
            P_CHECKBOOK_ID: null,
            P_CHECKID: null,
            P_ACC_NO: null,
            P_CHECK_NO: null,
            P_CHEQUE_AUTHO_NO: null
        }
        return this.dataLoadService.load("FG_AC_COMM_BANK_CHEQUE_INFO", paramObj)
    }
    // Get Cheque No by cheque book id
    public getpayToNameList() {
        let paramObj = {
            P_QUERYOPTIONS: '8',
            P_CHECKBOOK_ID: null,
            P_CHECKID: null,
            P_ACC_NO: null,
            P_CHECK_NO: null,
            P_CHEQUE_AUTHO_NO: null,
        }
        return this.dataLoadService.load("FG_AC_COMM_BANK_CHEQUE_INFO", paramObj)
    }
    // Get Cheque No by cheque book id
    public saveChequeStat() {
        return this.apiService.executeQuery<any>(`${this.serverPath}/save-cheque-stat`);
    }
    // Get bill coucher 
    public getBillVouchers() {
        return this.dataLoadService.load("FG_AC_COMM_VOUCHER_TYPE_LIST")
    }
    // Get Cheque No by cheque book id
    public getCurrency() {
        return this.dataLoadService.load("FG_SA_COMM_CURRENCY_LIST")
    }
    public getChekId(CHEQUE_NO, CHECKBOOK_ID) {
        let paramObj = {
            P_CHECK_NO: CHEQUE_NO,
            P_CHECKBOOK_ID: CHECKBOOK_ID,
            P_QUERYOPTIONS: '9',
            P_CHECKID: null,
            P_ACC_NO: null,
            P_CHEQUE_AUTHO_NO: null
        }
        return this.dataLoadService.load("FG_AC_COMM_BANK_CHEQUE_INFO", paramObj)
    }

    // Get Cheque No by cheque book id
    public getNatures1(NATURE_NO: any) {
        let paramObj = {
            NATURE_NO: NATURE_NO
        }
        return this.apiService.executeQuery<any>(`${this.serverPath}/get-nature-no1`, paramObj);
    }

    // Get Cheque No by cheque book id
    public getCosCenterForAll(STARAT_NO: any, LIMIT_NO: any) {
        let paramObj = {
            STARAT_NO: STARAT_NO,
            LIMIT_NO: LIMIT_NO
        }
        return this.apiService.executeQuery<any>(`${this.serverPath}/get-cos-center-for-all`, paramObj);
    }

    // getReportInfoBySubMenuId
    public getReportInfoBySubMenuId(SUBMENU_ID: any) {
        let paramObj = {
            P_SUBMENU_ID: SUBMENU_ID,
            P_QUERYOPTIONS: '1',
            P_REPORT_ID: null
        }
        return this.dataLoadService.load("FG_SA_COMM_REPORT_INFO", paramObj)
    }


    // getBkDtlNo
    public getBkDtlNo(BANK_ACC_NO: any) {
        let paramObj = {
            P_BANK_ACC_NO: BANK_ACC_NO,
            P_QUERYOPTIONS: '16',
            P_COMPANY_NO: globalVariables.userInfo.company_NO,
            P_BANKDTL_NO: null,
            P_SUBBANK_OF: null

        }
        return this.dataLoadService.load("FG_AC_COMM_BANK_INFO", paramObj)
    }

    // getBkDtlNo
    public getVouchersByViD(V_ID: any = null) {
        let paramObj = {
            P_V_ID: V_ID,
            P_QUERYOPTIONS: '5',
            P_FROM_DATE: null,
            P_END_DATE: null,
            P_VTYPE_NO: null,
            P_QJ_NAME: null,
            P_V_NO: null,
        }
        return this.dataLoadService.load("FG_AC_COMM_VOUCHER_INFO", paramObj)
    }
    public saveErrorLog(ERR_MSG: any, SQL_STATE, ERR_CODE?: any, ERR_DETAILS?: any, ERR_URL?: any, ERR_LINENO?: any, ERR_COLUMNNO?: any, ERR_SOLVE_STATUS?: any) {
        let paramObj = {
            ERR_MSG: ERR_MSG,
            ERR_URL: ERR_URL,
            ERR_LINENO: ERR_LINENO,
            ERR_COLUMNNO: ERR_COLUMNNO,
            ERR_CODE: ERR_CODE,
            ERR_DETAILS: ERR_DETAILS,
            ERR_SOLVE_STATUS: ERR_SOLVE_STATUS,
            SQL_STATE: SQL_STATE
        }
        return this.apiService.save<any>(`${this.serverPath}/save-error-log`, paramObj);
    }
    // get-report-info
    public getUserAccess() {
        let paramObj = {
            P_SUBMENU_ID: 'SL_1015'
        }
        return this.dataLoadService.load("FG_SA_COMM_USERACCESS", paramObj)
    }

    // getSaleInvoice
    public getSaleInvoice() {
        return this.dataLoadService.load("FG_SL_COMM_CONFIG")
    }

    // getDtlNames
    public getDtlNames() {
        return this.dataLoadService.load("FG_SA_COMM_ORDER_TYPE")
    }

    // getTrnNames
    public getTrnNames() {
        return this.dataLoadService.load("FG_IN_COMM_TRN_NAME_LIST")
    }

    // getTrnNames
    public getRefNames() {
        return this.dataLoadService.load("FG_SA_COMM_REF_LIST")
    }
    // getTrnNames
    public getTasks() {
        return this.dataLoadService.load("FG_GR_COMM_TASK_LIST", { P_APP_PROCESSTYPE_NO: '50260002' })
    }

    // getAllBanksName
    public getAllBanksName() {
        let paramObj = {
            P_QUERYOPTIONS: '6',
            P_COMPANY_NO: globalVariables.userInfo.company_NO,
            P_BANKDTL_NO: null,
            P_BANK_ACC_NO: null,
            P_SUBBANK_OF: null
        }
        return this.dataLoadService.load("FG_AC_COMM_BANK_INFO", paramObj)
    }

    // getLoanNature
    public getLoanNature() {
        return this.dataLoadService.load("FG_SA_COMM_CONFIGARATION", { P_LOOKUP_NO: '5029' })
    }

    // getLoanCategy
    public getLoanCategy() {
        return this.dataLoadService.load("FG_SA_COMM_CONFIGARATION", { P_LOOKUP_NO: '5030' })
    }

    // getLoanType
    public getLoanType() {
        return this.dataLoadService.load("FG_SA_COMM_CONFIGARATION", { P_LOOKUP_NO: '5031' })
    }

    // getImportLcNo
    public getImportLcNo() {
        return this.dataLoadService.load("FG_IN_COMM_IMPORT_LC_LIST")
    }

    // getExportLcNo
    public getExportLcNo() {
        return this.dataLoadService.load("FG_IN_COMM_EXPORT_LC_LIST")
    }

    // getLedger
    public getLedger() {
        let paramObj = {
            P_QUERYOPTIONS: '33',
            P_ACC_NO: null,
            P_BU_NO: null,
            P_BA_NO: null,
            P_PERIOD_NO: null
        }
        return this.dataLoadService.load("FG_AC_COMM_CHART_OF_ACCOUNTS", paramObj)
    }

    // getCostCenter
    public getCostCenter() {
        let paramObj = {
            P_QUERYOPTIONS: '73',
            P_ACC_NO: null
        }
        return this.dataLoadService.load("FG_AC_COMM_COST_CENTERS", paramObj)
    }

    // getInterestType
    public getInterestType() {
        return this.dataLoadService.load("FG_SA_COMM_CONFIGARATION", { P_LOOKUP_NO: '5033' })
    }

    // getPaymentPolicy
    public getPaymentPolicy() {
        return this.dataLoadService.load("FG_SA_COMM_CONFIGARATION", { P_LOOKUP_NO: '5034' })
    }

    // getBankDocSetup
    public getBankDocSetup() {
        return this.dataLoadService.load("FG_SL_COMM_CONFIG")
    }

    // getSalesNegotiations
    public getSalesNegotiations(CONTRACT_NO?, DOC_NO?) {
        let paramObj = {
            P_CONTRACT_NO: CONTRACT_NO ? CONTRACT_NO : null,
            P_DOC_NO: DOC_NO ? DOC_NO : null,
        }
        return this.dataLoadService.load("FG_SL_COMM_NEGO_LIST", paramObj)
    }

    // getBankRefList
    public getBankRefList(STATUS?, START_DATE?, END_DATE?, CUSTOMER_NO?, CONTRACT_NO?) {
        let paramObj = {
            P_STATUS: STATUS ? STATUS : null,
            P_ST_DATE: START_DATE ? START_DATE : null,
            P_END_DATE: END_DATE ? END_DATE : null,
            P_CUSTOMER_NO: CUSTOMER_NO ? CUSTOMER_NO : null,
            P_CONTRACT_NO: CONTRACT_NO ? CONTRACT_NO : null
        }
        return this.dataLoadService.load("FG_AC_COMM_BANK_REF_LIST", paramObj)
    }

    // getBankRefList
    public getContactsDocByCustomer(START_DATE?, END_DATE?, CUSTOMER_NO?) {
        let paramObj = {
            P_FROM_DATE: START_DATE,
            P_TO_DATE: END_DATE,
            P_CUSTOMER_NO: CUSTOMER_NO,
        }
        return this.dataLoadService.load("FG_SL_COMM_CONTACT_BY_CUSTOMER", paramObj)
    }

    // getBankDocSetup
    public getDocuments() {
        return this.dataLoadService.load("FG_SL_COMM_DOCUMENT_LIST")
    }

    // getBankLoan
    public getBankLoan(START_DATE, END_DATE, BANK_NO, LOAN_TYPE_ID, LOAN_ID) {
        let paramObj = {
            P_QUERYOPTIONS: '1',
            P_FROM_DATE: null, //START_DATE,
            P_TO_DATE: null, //END_DATE,
            P_BANK_NO: BANK_NO,
            P_LOAN_TYPE_ID: LOAN_TYPE_ID ? LOAN_TYPE_ID : null,
            P_LOAN_ID: LOAN_ID ? LOAN_ID : null,
        }
        return this.dataLoadService.load("FG_AC_COMM_BANK_LOAN_INFO", paramObj)
    }

    // getPIByDocNo
    public getPIByDocNo(DOC_NO) {
        let paramObj = {
            P_DOC_NO: DOC_NO
        }
        return this.dataLoadService.load("FG_AC_COMM_PI_DOC_NO", paramObj)
    }

    // getBankDocSetup
    public getInvoiceByDocNo(DOC_NO) {
        let paramObj = {
            P_DOC_NO: DOC_NO
        }
        return this.dataLoadService.load("FG_AC_COMM_INVOICE_DOC_NO", paramObj)
    }

    // getNegCurrency
    public getNegCurrency(NEGOTIATION_DATE) {
        let paramObj = {
            P_STDATE: NEGOTIATION_DATE,
            P_CUR_NO: null
        }
        return this.dataLoadService.load("FG_SA_COMM_NEGO_CURRENCY", paramObj)
    }

    // getSiIdByNegoNo
    public getSiIdByNegoNo(NEGOTIATION_NO) {
        let paramObj = {
            P_NEGOTIATION_NO: NEGOTIATION_NO ? NEGOTIATION_NO : null
        }
        return this.dataLoadService.load("FG_AC_COMM_PI_ID", paramObj)
    }

    // getPiIdByNegoNo
    public getPiIdByNegoNo(NEGOTIATION_NO) {
        let paramObj = {
            NEGOTIATION_NO: NEGOTIATION_NO
        }
        return this.apiService.executeQuery<any>(`${this.serverPath}/get-pi-id-by-nego-no`, paramObj);
    }

    // getTrnTypes
    public getTrnTypes() {
        return this.dataLoadService.load("FG_SA_COMM_TRN_LIST")
    }

    //getItems
    public getItems() {
        let paramObj = {
            P_QUERYOPTIONS: '3',
            P_GROUP_ITEM_NO: null,
            P_SUPPLIER_NO: null,
            P_SUBITEM_OF: null,
            P_LVL_NO: null,
            P_CUSTOMER_NO: null
        }
        return this.dataLoadService.load("FG_SA_COMM_ITEM_LIST", paramObj)
    }

    //getNegoFundSetup
    public getDocumentsByLcFile(LC_FILE_NO?) {
        let paramObj = {
            P_FILE_NO: LC_FILE_NO ? LC_FILE_NO : null
        }
        return this.dataLoadService.load("FG_AC_COMM_LC_FILE_DOCUMENT", paramObj)
    }

    //getNegoFundSetup
    public getNegoNoBycontractNo(CONTRACT_NO) {
        let paramObj = {
            P_CONTRACT_NO: CONTRACT_NO,
        }
        return this.dataLoadService.load("FG_AC_COMM_NEGO_CONTRACTS", paramObj)
    }

    //getNegoFundSetup
    public getSlCustomer(CUSTOMER_NO) {
        let paramObj = {
            P_QUERYOPTIONS: '2',
            P_CUST_NO: CUSTOMER_NO,
        }
        return this.dataLoadService.load("FG_SL_COMM_CUSTOMER_LIST", paramObj)
    }

    //getNegoFundSetup
    public getSalesDocs(CONTRACT_NO, BANK_REF_NO) {
        let paramObj = {
            P_SALESCONTRACT_NO: CONTRACT_NO,
            P_BANK_REF_NO: BANK_REF_NO
        }
        return this.dataLoadService.load("FG_AC_COMM_SALES_DOCS", paramObj)
    }

    //getNegoFundSetup
    public getPosTranNo(POST_FLG) {
        let paramObj = {
            P_POST_FLAG: POST_FLG,
        }
        return this.dataLoadService.load("FG_AC_COMM_TRAN_POST_NO", paramObj)
    }

    //getBatchNo
    public getBatchNo(paramObj) {
        return this.dataLoadService.load("FG_AC_COMM_BATCH_NO", paramObj)
    }

    //getDistricts
    public getDistricts(LOOKUP_NO) {
        let paramObj = {
            P_LOOKUP_NO: LOOKUP_NO,
        }
        return this.dataLoadService.load("FG_AC_COMM_CONFIGARATION", paramObj)
    }
    //getDistricts
    public getCompanyByEmp() {
        return this.dataLoadService.load("FG_SA_COMM_GRANT_COMPANY")
    }

//getDistricts
public getCompany() {
    return this.dataLoadService.load("FG_SA_COMM_COMPANY_LIST")
}


    //getPostEditChk
    public getPostEditChk() {
        return this.dataLoadService.load("FG_AC_COMM_POST_EDIT_CHECK")
    }

    //getPostEditChk
    public getAllText() {
        return this.dataLoadService.load("FG_AC_COMM_ALT_TEXT")
    }

    //getUserPrivileges
    public getUserPrivileges(SUBMENU_ID) {
        let paramObj = {
            P_CURRFORM: SUBMENU_ID
        }
        return this.dataLoadService.load("FG_SA_COMM_USER_PREVILAGE", paramObj, true);
    }
    public getAcCommConfig() {
        return this.dataLoadService.load("FG_AC_COMM_CONFIG/map")
    }
     

}
