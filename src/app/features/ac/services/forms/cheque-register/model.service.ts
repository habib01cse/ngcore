/* angular stuff */
import { Injectable } from '@angular/core';
import { Bank } from '../../../models/bank.model';
import { BankDtl } from '../../../models/bank-dtl.model';
import { DataService } from './data.service';


/* 3rd party libraries */
import * as $ from 'jquery';
import { forkJoin } from 'rxjs';
import { CommonService } from '../../common.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { globalVariables } from 'src/app/core/constants/globalVariables';
import { ReportSetUp } from '../../../models/repsetup.model';
import { ReportSetUpDetails } from '../../../models/report-set-up-details.model';
import { BankName } from '../../../models/bank-info.model';
import { ChequeBook } from '../../../models/cheque-book.model';
import { ChequeBookList } from '../../../models/cheque-book-list.model';
import { ChequeFilter } from '../../../models/cheque-filter.model';
import { ChequeRelated } from '../../../models/cheque-related.model';
import { ChequePrepared } from '../../../models/cheque-prepared.model';
import { ChequPrepareList } from '../../../models/cheque-prepare-list.model';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { BillCheckdtl } from '../../../models/bill-checkdtl.model';
import { Moneycheckpay } from '../../../models/moneycheckpay.model';
import { typeSourceSpan } from '@angular/compiler';
import { Servicecheckpay } from '../../../models/servicecheckpay.model';


@Injectable({
    providedIn: 'root'
})
export class ModelService {

    public P_DOC_NO_STR = '';    
    public P_SCHEDULE_NO = null;
    public P_PAY_NO = null;
    public P_SERVIC_BILL_NO = '';
    public saCommApminPriv: any = {};
    public multiCompanyList: any = [];
    public businessUnitList: any = [];
    public filterOptionList: any = [];
    public chequeStatusList: any = [];
    public chequeBookList: any = [];
    public chequeNoList: any = [];
    public billVoucherList: any = [];
    public signatoryAuthoritiesList: any = [];

    public chequeBookIDList: any = [];
    public reportConfig: any = {}; 
    public roundList = [];
    public getAcCommConfig : any = {};


    public selectedStatus = null;
    public selectedChequeByAll = null;
    public selectedChequebookId = null;

    public bankinfo = new BankName();
    public bankinfoBackup = new BankName();
    public filterOption = new ChequeFilter();

    public chequeRelatedList = new Array<ChequeRelated>();
    //public chequePrepared = new ChequePrepared();

    public billCheckDtlListBackup = new Array<BillCheckdtl>();
    public msdListListBackup = new Array<Moneycheckpay>();
    public serBillListBackup = new Array<Servicecheckpay>();
    public chequePrepared: ChequePrepared;
    public chequePreparedBackup: ChequePrepared;

    public signatoryAuthority = new ChequePrepared();

    public chequePerparedList;
    public chequePerparedListBackup;
    public chequePerparedListTotalAmount = 0;

    //public isChequeDate = true;
    public totalChequeAmount;

    public settlementTypeList: any = [];
    public selectedAccPath = null;

    public chequeTypeList:any = [];

    public selectedRegisterNo = null;

    public currencyList:any = [];
    public companyList:any = [];

    public p_mgs = '';
    public CHEQUE_TYPE = null;

    public getChequeId:any;
    public glPost: any;

    public voucherPerparedModalShow = false;


    public readonly FORM_ID = "AC_1023";

    public PRINT_TYPE_NAME = "A/C Payee";


    public openingBalance;
    public probableBalance;
    public actualClosingBalance;
   // public totalChkSum;

    public dateTypeList:any = [];
    public userPrivilege:UserPrivileges;
    public chequePreObj: any = {};

    public saveStat = false;
    public savedCheckNo = null;

    public currentTabNumber = 1;

    constructor(private apiService: DataService,
        private commonService: CommonService,
        private utilityService: UtilityService
        ) { 
            this.chequePrepared = new ChequePrepared();
            this.chequePreparedBackup = new ChequePrepared();
            this.chequePerparedList = new Array<ChequPrepareList>();
            this.chequePerparedListBackup = new Array<ChequPrepareList>();
            this.userPrivilege = new UserPrivileges();
            this.chequePreObj = {
                PREPARE_DATE: new Date(),
                CHECK_DATE: new Date(),
                POST_DATE: new Date(),
                CHEQUE_COMPANY_NO: globalVariables.userInfo.company_NO,
                STATUS: null
            }
        }
    public chequeRelatedSelectedId = 0;
    
    chequeTotalAmountSum(list){
        let amount = 0;
        for (const iterator of list) {
            let crDr = ( typeof(iterator.DR_CR) != 'undefined' && iterator.DR_CR.toLowerCase() != "dr" ) ?
                iterator.DR : 
                iterator.CR;
            if ((typeof iterator.CHECK_AMT !== 'undefined') && (iterator.SQL_STATE !== 3 )) {
                amount += isNaN(Number(crDr)) ? 0 : Number(crDr);
            }
        }
        return amount;
        // this.chequePerparedListTotalAmount = 0;
        // for (const iterator of this.chequePerparedList) {
        //     this.chequePerparedListTotalAmount += Number(iterator.CHECK_AMT);
        // }
    }

    glPostObj = {
        isGlPost:false,
        messege: '',
    }

    saveConditionObj = {
        isSave: false,
        messege:''
    }
    saveConditionCheck(){
       
        if(this.chequePrepared.ACTIVE_STAT == 0){
            this.saveConditionObj.messege = 'Status is Inactive.';
        }else if(this.chequePrepared.PREPARE_DATE == null){
            this.saveConditionObj.messege = 'Prepare date does not found.';
        }else if(this.chequePrepared.PAY_TO_NAME == null){
            this.saveConditionObj.messege = 'Pay To Name does not found.';
        }else if(this.chequePrepared.STATUS == null){
            this.saveConditionObj.messege = 'Cheque Type not found.';
        }else{
            this.saveConditionObj.isSave = true;
        }
        return this.saveConditionObj;
    }

    dateCheque = {
        isLarge:false,
        messege:''
    }
    cheqePostDateToPrepareDate(){
  
        if( this.chequePrepared.POST_DATE.getFullYear() > this.chequePrepared.PREPARE_DATE.getFullYear() ){
            this.dateCheque.isLarge = true;
        }else if( this.chequePrepared.POST_DATE.getFullYear() == this.chequePrepared.PREPARE_DATE.getFullYear() ){
        if( this.chequePrepared.POST_DATE.getMonth() > this.chequePrepared.PREPARE_DATE.getMonth() ){
            this.dateCheque.isLarge = true;
        }else if(this.chequePrepared.POST_DATE.getMonth() == this.chequePrepared.PREPARE_DATE.getMonth()){
            if( this.chequePrepared.POST_DATE.getDay() >= this.chequePrepared.PREPARE_DATE.getDay() ){
            this.dateCheque.isLarge = true;
            }else{
            this.dateCheque.messege = 'Void check can not be posted';
            }
        }else{
            this.dateCheque.messege = 'Void check can not be posted';
        }
        }else{
            this.dateCheque.messege = 'Void check can not be posted';
        }
        return this.dateCheque;
    }

    chequeRelatedTotalAmountSum(list){
        this.totalChequeAmount = 0;
        for (const iterator of list) {
            this.totalChequeAmount += Number(iterator.CHECK_AMT);
        }
       // this.totalChkSum = this.totalChequeAmount; 
        //debugger;
    }

    getDrCrList () {
        return this.utilityService.getEnumList(fixedValues.transactionType);
    }


}
