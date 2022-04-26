/* angular stuff */
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';

/* our own stuff */
import { LangService } from 'src/app/core/services/lang.service';
import { globalVariables } from 'src/app/core/constants/globalVariables';

import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { DateService, MasterActionService } from 'src/app/shared';
import { ModalService } from 'src/app/shared/services/modal.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { CompanyService } from 'src/app/shared';

import { ModelService } from '../../services/forms/cheque-register/model.service';
import { DataService } from '../../services/forms/cheque-register/data.service';
import { CommonService } from '../../services/common.service';

import { FormParam } from '../../models/form-param';
import { ChequePrepared } from '../../models/cheque-prepared.model';
import { ChequPrepareList } from '../../models/cheque-prepare-list.model';
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import { DynamicModalService } from 'dynamicModal';
import { bankInfoColumnDefs, payToNameColumnDefs, accountMultiListColumnDefs, 
  CostCenterColumnDefs, businessAreaColumnDefs, EmployeeShortColumnDef, ChequeTypeColumnDef, invoiceListColumnDefs, costCenterColumnDef 
} from 'src/app/shared/constants/column-defs.enum';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { GridService } from 'src/app/shared/services/grid.service';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { ToastrService } from 'ngx-toastr';
import { FormCommonComponent } from 'src/app/core/base/form-common-component';
import { BillCheckdtl } from '../../models/bill-checkdtl.model';
import { Router } from '@angular/router';
import { Moneycheckpay } from '../../models/moneycheckpay.model';
import { Servicecheckpay } from '../../models/servicecheckpay.model';

@Component({
  selector: 'app-ac1023',
  templateUrl: './../../templates/forms/ac1023.component.html',
  providers: [DatePipe]
})


export class Ac1023Component extends FormCommonComponent implements OnInit {
  @ViewChild('modalContainer', { static: true, read: ViewContainerRef }) container;

  //AG grid
  columnDefs = [];
  colObj;
  grid: any;
  gridId: string = "ChequeRelated_1023";
  rowSelectionType = 'single';

  //AG grid
  columnDefsTwo = [];
  colObjTwo;
  gridTwo: any;
  gridIdTwo: string = "ChequePrepared_1023";

  dtlColumnDefs = [];
  dtlColObj;
  dtlGrid: any;
  dtlGridId: string = "dtlGridAC_1023"
  dtlRowSelection = 'single';
  pinnedBottomRowColsDtlGrid: any;
  pinnedBottomRowDataDtlGrid: any = [{}];
  bottomTotalDataDtl: any;

  msdColumnDefs = [];
  msdColObj;
  msdGrid: any;
  msdGridId: string = "msdGridAC_1023"
  msdRowSelection = 'single';
  pinnedBottomRowColsMsdGrid: any;
  pinnedBottomRowDataMsdGrid: any = [{}];
  bottomTotalDataMsd: any;

  serColumnDefs = [];
  serColObj;
  serGrid: any;
  serGridId: string = "SerGridAC_1023"
  serRowSelection = 'single';
  pinnedBottomRowColsSerGrid: any;
  pinnedBottomRowDataSerGrid: any = [{}];
  bottomTotalDataSer: any;

  public multiChartValue;
  psDecimal: any;
  public numberPrecision;
  public psDateFormat: any;
  public formParam: FormParam = new FormParam();
  private chequeRegisterOptions: any = {
    "settlementTyp": {
      "required": {
        "message": "Settlement Type required",
      }
    },
    "Description": {
      size: {
        min: 0,
        max: 500,
      }
    }
  }

  dtlGridVledOpt: any = {}
  msdGridVledOpt: any = {}
  serGridVledOpt: any = {}

  drCrList: any = [];

  public pinnedBottomRowData = [{
    //
  }];

  public pinnedBottomRowCols = ['BASE_AMOUNT_DR', 'BASE_AMOUNT_CR', 'DR', 'CR'];
  public bottomTotalData = { BASE_AMOUNT_DR: 0, BASE_AMOUNT_CR: 0, DR: 0, CR: 0};  

  constructor(
    public langService: LangService
    , public actionService: MasterActionService    
    , public model: ModelService
    , private dataService: DataService
    , private alertService: AlertService
    , private comService: CommonService
    , public gridService: GridService
    , private utilityService: UtilityService
    , private dateUtil: DateService
    , private datePipe: DatePipe
    , private toastr: ToastrService
    , private router: Router
    , private hrCommonService: CompanyService
    , private dataLoadService: DataLoadService
    , private modalService: DynamicModalService
    , private modal: ModalService) {
    super(actionService);
    this.loadIntFormInfo();
    this.numberPrecision = globalVariables.numberPrecision;    
    this.chequeRelatedColumnDef();
    this.drCrList = this.model.getDrCrList();
    this.chequePreparedColumnDef();
    console.log('this.drCrList!!', this.drCrList);
    this.dtlGridColDef();
    this.msdGridColDef();
    this.serGridColDef();
    this.pinnedBottomRowColsDtlGrid=['TOTAL_PAY'];
    this.bottomTotalDataDtl={TOTAL_PAY: 0};
    this.pinnedBottomRowColsMsdGrid = ['PAY_AMT'];
    this.bottomTotalDataMsd = { PAY_AMT: 0 };

    this.pinnedBottomRowColsSerGrid = ['PAY_AMT'];
    this.bottomTotalDataSer = { PAY_AMT: 0 };
  }

  loadIntFormInfo(){        
    const navigation = this.utilityService.getExtras(this.router, 'AC_1023');
    console.log('navigation.extras.state!!', navigation.extras.state);
    if (navigation.extras.state && navigation.extras.state.P_DOC_NO) {
      const state = navigation.extras.state as { 
        P_DOC_NO: string        
      };
      this.model.P_DOC_NO_STR = state.P_DOC_NO;     
    }
    if (navigation.extras.state && navigation.extras.state.P_SCHEDULE_NO) {
      const state = navigation.extras.state as {       
        P_SCHEDULE_NO: number
      };     
      this.model.P_SCHEDULE_NO = state.P_SCHEDULE_NO;      
    }

    if (navigation.extras.state && navigation.extras.state.P_SERVIC_BILL_NO) {
      const state = navigation.extras.state as {       
        P_SERVIC_BILL_NO: any
      };     
      this.model.P_SERVIC_BILL_NO = state.P_SERVIC_BILL_NO; 
      
      console.log('this.model.P_SERVIC_BILL_NO', this.model.P_SERVIC_BILL_NO);

    }

    // Camming AC_1281
    console.log('navigation.extras.state in ac1281', navigation.extras.state);

    if (navigation.extras.state && navigation.extras.state.P_PAY_NO) {
      const state = navigation.extras.state as {       
        P_PAY_NO: number
      };     
      this.model.P_PAY_NO = state.P_PAY_NO;      
    }

    
  }
  
  ngOnInit() {
    
    this.formsOnLoad();

    // load ac1107 of data 
    if(this.model.P_DOC_NO_STR){
      this.onClickTabItem(1);
      this.loadIntgratedDataList();
    }

   
    // Load AC_1281
    if(this.model.P_PAY_NO){
      this.onLosdForPayNo();
    }

    this.psDecimal = globalVariables.psDecimalPrecision;
    this.psDateFormat = globalVariables.psDateFormat;
    this.setDefaultData();
    let promiseAll = [
      this.comService.getMultiCompanyCost(),
      this.comService.getChangeBusinessUnit(),
      this.comService.getChequeStatus(),
      this.comService.getChqBooksNo(),  
      this.comService.getSignatoryAuthorities(),
      this.comService.getBillVouchers(),
      this.comService.getCurrency(),
      this.dataLoadService.load('FG_SA_COMM_ROUND'),
      this.comService.getAcCommConfig(),
    ];
    forkJoin(
      promiseAll
    ).subscribe(results => {
      this.model.multiCompanyList = results[0].body;
      this.model.businessUnitList = results[1].body;
      this.model.chequeStatusList = results[2].body;
      this.model.chequeBookList = results[3].body;
      this.model.signatoryAuthoritiesList = results[4].body;
      this.model.billVoucherList = results[5].body;
      this.model.currencyList = results[6].body;
      this.model.roundList = results[7].body;
      this.model.getAcCommConfig = results[8].body;

      if (this.model.multiCompanyList[0].MULTICOMPANY_CHART == 1) {
        this.multiChartValue = 1;
      } else {
        this.multiChartValue = 0;
      }
      //this.model.chequePreObj['CUR_NO'] = this.model.currencyList[0].CUR_NO
      this.setChequePreparDefaultVal();
      
    }, error => {
      this.displayError(error);
    });

    const companyObj = this.hrCommonService.getUserGlobalCompany();
    this.model.companyList = companyObj.companyList

    this.setDefaultValue();
  }

  onDtlGridReady(grid) {
    this.dtlGrid = grid;
    this.dtlGrid.api.setRowData([]);       
  }
  onMsdGridReady(grid) {
    this.msdGrid = grid;
    this.msdGrid.api.setRowData([]);
    if (this.model.P_SCHEDULE_NO){
      this.onClickTabItem(2);
      this.onLoadMsdList();
    }

  }

  // Load Service Bill 
  onSerGridReady(grid) {
    this.serGrid = grid;
    this.serGrid.api.setRowData([]);    
    if (this.model.P_SERVIC_BILL_NO){
      this.onClickTabItem(3);
      this.onLoadSerBillList();
    }    
  }

  onPsGridColumnTotalChangedDtlGrid(data) {
    this.bottomTotalDataDtl = data;
  } 
  onPsGridColumnTotalChangedMsdGrid(data) {
    this.bottomTotalDataMsd = data;
  } 

  onPsGridColumnTotalChangedSerGrid(data) {
    this.bottomTotalDataSer = data;
  } 


  formsOnLoad(){    
    this.dataLoadService.load("FG_SA_COMM_ADMINPRIV/NUMBER", { P_PRIV_NO: 50062  }).subscribe(res =>{
      this.model.saCommApminPriv = res.body;
      if (this.model.saCommApminPriv == 1){
        //this.toastr.warning('Posting Date Field Allow insert, update, delete.', this.langService.langData.warning);
      }else{
        //this.toastr.warning('Posting Date Field Allow insert, not allow update, not allow delete.', this.langService.langData.warning);
      }
    });
  }


  //#region  filter option
  /* ======================
  /* Filter Option
  =========================*/
  onClickSearchFilter() {
    this.getChequeRelatedList();    
  }


  onLosdForPayNo(){
    console.log('this.model.P_PAY_NO!', this.model.P_PAY_NO);
    let promiseAll = [
      // query5
      this.dataLoadService.load('FG_AC_COMM_BANK_CHEQUE_INFO/map',
        { 
          P_QUERYOPTIONS: 13,
          P_CHECKBOOK_ID: null,
          P_CHECKID: null,
          P_ACC_NO : null,
          P_CHECK_NO: this.model.P_PAY_NO || null,
          P_CHEQUE_AUTHO_NO: null,
          
        }
      ),
      // query 6
      this.dataLoadService.load('FG_AC_COMM_BANK_INFO/map',
        { 
          P_QUERYOPTIONS: 25,
          P_COMPANY_NO: null,
          P_BANKDTL_NO: this.model.P_PAY_NO,
          P_BANK_ACC_NO: null,
          P_SUBBANK_OF: null,
        }
      ),
      
    ];
    forkJoin(
      promiseAll
    ).subscribe(results => {
      let chequeInfo: any = {};
      let bankInfo: any = {};
      chequeInfo = results[0].body;
      bankInfo = results[1].body;

      console.log('chequeInfo!', chequeInfo);
      console.log('bankInfo!', bankInfo);

      console.log('model.chequeBookIDList!', this.model.chequeBookIDList);
      // query5
      this.model.bankinfo.BANK_ACC_NO = bankInfo.ACC_NO;
      this.model.bankinfo.ACC_NAME = bankInfo.ACC_NAME;
      this.model.bankinfo.BRANCH_NAME = bankInfo.BRANCH_NAME;
      this.model.bankinfo.BRANCH_ADDR = bankInfo.BRANCH_ADDR;
      this.model.selectedAccPath = bankInfo.ACC_PATH;
      // query5
      this.model.bankinfo.CHECKBOOK_ID = chequeInfo.CHECKBOOK_ID;
      this.onChangeChequeBookID();   
      
      // may be use this method
      // this.getChequeList();       
      // this.getCheckbookID();

      // business 
      // Account No = QUERY5.ACC_NO
      // lebel15 = QUERY5.ACC_NAME
      // Branch Name = QUERY5.BRANCH_NAME
      // Address = QUERY5.BRANCH_ADDR
      // Lebel100 = QUERY5.ACC_PATH
      // Cheque Book Id = QUERY6.CHECKBOOK_ID
       
    });
  }




  getChequeRelatedList(){
    let chequeObj = this.model.chequeBookList.find(e => {
      return e.CHECK_NO == this.model.filterOption.CHEQUE_NO_ALL;
    })
    
    let chcquId = '';
    if (chequeObj) {
      chcquId = chequeObj.CHECK_ID;
    }
    let VOIDFLG = null;
    if (this.model.filterOption.FILTER_OPTION == "V") {
      VOIDFLG = 1;
    } else if (this.model.filterOption.FILTER_OPTION == "AV") {
      VOIDFLG = 0;
    } else {
      VOIDFLG = null;
    }  



    this.dataLoadService.load("FG_AC1023_GET_CHEQUES", {
      P_CHECKBOOK_ID: this.model.bankinfo.CHECKBOOK_ID,
      P_CHECK_ID_ALL: chcquId,
      P_CHECK_STAT_NO: this.model.filterOption.STATUS,
      P_PAY_ACC_NO: this.model.filterOption.ACC_NO,
      P_CHECK_NO: this.model.filterOption.CHEQUE_NO,
      P_CHECK_NO_ALL: this.model.filterOption.CHEQUE_NO_ALL, 
      P_POST_STATUS: this.model.filterOption.RB_POST,
      P_VOIDFLG: VOIDFLG,
      P_CHECK_FROM_DATE: this.model.filterOption.DATE_TYPE == "C" ?
        this.dateUtil.getYYYYMMDDDashFromDate(this.model.filterOption.CHEQUE_DATE_FORM) : null,
      P_CHECK_TO_DATE: this.model.filterOption.DATE_TYPE == "C" ?
        this.dateUtil.getYYYYMMDDDashFromDate(this.model.filterOption.CHEQUE_DATE_TO) : null,
      P_PREPARE_FROM_DATE: this.model.filterOption.DATE_TYPE == "P" ?
        this.dateUtil.getYYYYMMDDDashFromDate(this.model.filterOption.PREPARE_DATE_FORM) : null,
      P_PREPARE_TO_DATE: this.model.filterOption.DATE_TYPE == "P" ?
        this.dateUtil.getYYYYMMDDDashFromDate(this.model.filterOption.PREPARE_DATE_TO) : null,
    }).subscribe(result => {
      this.model.chequeRelatedList = result.body;
      this.grid.api.setRowData(result.body);
      this.model.chequePrepared.MANUAL_FLG = result.body.MANUAL_VOUCHER_FLAG;
      this.model.chequePrepared.VOID_FLAG = result.body.VOID_FLG;
      this.model.chequePrepared.CHECK_NO = result.body.CHECK_NO;


      //Selecte spacific row
      let arrLen = this.model.chequeRelatedList.length;
      let i;
      // After save      
      if(this.model.saveStat){
        for (i = 0; i < arrLen; i++) {
          if ( this.model.chequeRelatedList[i].CHECK_NO == this.model.savedCheckNo ) {
            console.log("this.model.chequeRelatedList[i].CHECK_NO", this.model.chequeRelatedList[i].CHECK_NO);
            this.model.chequeRelatedSelectedId = i;
            break;
          }        
        }
      }else{ // only get
        for (i = 0; i < arrLen; i++) {
          if ( this.model.chequeRelatedList[i].CHECK_DATE == null ) {
            console.log("this.model.chequeRelatedList[i].CHECK_DATE", this.model.chequeRelatedList[i].CHECK_DATE);
            this.model.chequeRelatedSelectedId = i;
            break;
          }        
        }  
      }

      if (result.body.length > 0) {
        setTimeout(() => {
          //this.grid.api.getDisplayedRowAtIndex(0).setSelected(true);
          console.log("this.model.chequeRelatedSelectedId", this.model.chequeRelatedSelectedId);
          this.grid.api.getDisplayedRowAtIndex(this.model.chequeRelatedSelectedId).setSelected(true);
          this.onClickRelatedChequeItem(this.grid.api.getSelectedNodes()[0]);

          // clear after save status
          this.model.saveStat = false;
          this.model.savedCheckNo = null;
        }, 100);
      }
      this.model.chequeRelatedTotalAmountSum(result.body);
    })


    // this.dataLoadService.load("FG_AC1023_CHEQUE_PREPARED", {
   
    //   P_CHECK_NO: this.model.chequePrepared.CHECK_NO ,

    // }).subscribe(result => {
     
    //   this.model.chequePrepared.PAY_TO_ACC_NO = result.body.PAY_TO_ACC_NO;
    //   if (this.model.chequePrepared.PAY_TO_ACC_NO != null) {
    //     this.model.chequePrepared.PAY_TO_ACC_CHK = 0;
    //     this.model.chequePrepared.TTL_AMOUNT_CHK = 0;

    //   }
    //   else {
    //     this.model.chequePrepared.PAY_TO_ACC_CHK = 1

    //   }
    //   console.log("this.model.CHECK_NO", this.model.chequePrepared.CHECK_NO);
    //   console.log("this.model.chequePrepared.TTL_AMOUNT_CHK",this.model.chequePrepared.TTL_AMOUNT_CHK);
    //   console.log("this.model.chequePrepared.TTL_AMOUNT_CHK",this.model.chequePrepared.TTL_AMOUNT_CHK);
    //   if (result.body.length > 0) {
    //     setTimeout(() => {
         
    //     }, 100);
    //   }
     
    // })
    //return;
    // this.dataService.getChequesbyFilter(
    //   this.model.bankinfo.CHECKBOOK_ID,
    //   this.model.filterOption.CHEQUE_NO_ALL,
    //   this.model.filterOption.STATUS,
    //   this.dateUtil.getYYYYMMDDDashFromDate(this.model.filterOption.CHEQUE_DATE_FORM),
    //   this.dateUtil.getYYYYMMDDDashFromDate(this.model.filterOption.CHEQUE_DATE_TO),
    //   this.dateUtil.getYYYYMMDDDashFromDate(this.model.filterOption.PREPARE_DATE_FORM),
    //   this.dateUtil.getYYYYMMDDDashFromDate(this.model.filterOption.PREPARE_DATE_TO),
    //   "voidflat",
    //   this.model.filterOption.RB_POST,
    //   this.model.filterOption.ACC_NO,
    //   this.model.filterOption.CHEQUE_NO,
    //   this.model.filterOption.CHEQUE_NO_ALL
    // ).subscribe(result => {
    // })

  }


  onSearchClear() {
    this.setDefaultData();
  }

  // Old custom modal
  // onClickOpenAccountListModal() {
  //   this.modal.createAccountsListComponent(this.container, this.model.filterOption);
  // }

  onClickOpenAccountListModal() {

    let colObj = [
      { headerName: this.langService.langData.accountName, field: 'ACC_NAME', sortable: true, resizable: true, filter: true },
      { headerName: this.langService.langData.accCode, field: 'ACC_CODE', sortable: true, resizable: true, filter: true },
      { headerName: this.langService.langData.accNo, field: 'ACC_NO', sortable: true, resizable: true, filter: true }
    ];

    this.modalService.openDialog('CommonListModule', 'list', {
      title: this.langService.langData.accountList, data: {
        gridId: "BankInfoListGrid", columnDefs: colObj, api: 'FG_AC_COMM_CHART_OF_ACCOUNTS',
        params: {        
          P_QUERYOPTIONS: fixedValues.queryOptions.CoaForConfig1,
          P_BA_NO: null,
          P_PERIOD_NO: null,
          P_BU_NO: null,
          P_ACC_NO: null
        }
      }, settings: { modalClass: 'md' }
    }).then((modal: any) => {
      modal.closed = () => {
      };
      modal.success = (result) => {   
        
        this.model.filterOption.ACC_NO = result ? result.ACC_NO : null;
        this.model.filterOption.ACC_NAME = result ? result.ACC_NAME : '';
        this.model.filterOption.ACC_CODE = result ? result.ACC_CODE : '';  

       
      };
    });
  }



  


  // let paramObj = {
  //   P_QUERYOPTIONS: queryOption,
  //   P_BA_NO: baNo,
  //   P_PERIOD_NO: PERIOD_NO,
  //   P_BU_NO: BU_NO,
  //   P_ACC_NO: ACC_NO,
  // };
  // return this.dataLoadService.load("FG_AC_COMM_CHART_OF_ACCOUNTS", paramObj)


  // obj.ACC_NO = dataObj.ACC_NO;
  // obj.ACC_NAME = dataObj.ACC_NAME;
  // obj.ACC_CODE = dataObj.ACC_CODE;






  getChequeNoList() {
    this.comService.getChequesByChequeBookId(this.model.bankinfo.CHECKBOOK_ID).subscribe(result => {
      this.model.chequeNoList = result.body;
    })
  }
  //#endregion 

  //#region  Bank 
  /* ======================
  /* Bank 
  =========================*/
  onCLickOpenBankAccountList() {

    let qrOpt = null;
    //LOV_MULTI_ACC = 14 and 
    // LOV_ACC = 11
    qrOpt = ( this.model.getAcCommConfig.MULTICOMPANY_CHART == 1 ) ? 14 : 11;
    this.modalService.openDialog('CommonListModule', 'list', {
      title: this.langService.langData.accountList, data: {
        gridId: "BankInfoListGrid", columnDefs: bankInfoColumnDefs,
        api: 'FG_AC_COMM_BANK_INFO', 
        params: {
          P_BANKDTL_NO: null,
          P_BANK_ACC_NO: null,
          P_COMPANY_NO: globalVariables.userInfo.company_NO,
          P_QUERYOPTIONS: qrOpt,
          P_SUBBANK_OF: null,
        }
      }, settings: { modalClass: 'md' }
    }).then((modal: any) => {
      modal.closed = () => {
      };
      modal.success = (data) => {
        this.model.bankinfo.ACC_NO = data ? data.ACC_NO : null;
        this.model.bankinfo.BANK_ACC_NO = data ? data.BANK_ACC_NO : null;
        this.model.bankinfo.ACC_NAME = data ? data.ACC_NAME : null;
        this.model.bankinfo.BANKDTL_NO = data ? data.BANKDTL_NO : null;
        this.model.bankinfo.BRANCH_ADDR = data ? data.BRANCH_ADDR : null;
        this.model.bankinfo.BRANCH_NAME = data ? data.BRANCH_NAME : null;

        this.model.bankinfoBackup = JSON.parse(JSON.stringify(this.model.bankinfo));
        this.getCheckbookID();
      };
    });
  }
  onChangeChequeBookID() {
    this.getChequeNoList();
    this.getChequeList();
    this.getOpeningBalance();
  }
  getCheckbookID() {
    // old FG_AC_COMM_BANK_CHEQUE_INFO
    // Params
    // P_ACC_NO: this.model.bankinfo.BANK_ACC_NO,
    // P_CHECKBOOK_ID: null,
    // P_CHECKID: null,
    // P_CHECK_NO: null,
    // P_CHEQUE_AUTHO_NO: null,
    // P_QUERYOPTIONS: fixedValues.queryOptions.CostName

    if (this.model.userPrivilege.canShowData) {
      this.dataLoadService.load('FG_AC1023_CKBOOK_LIST', {
        P_ACC_NO : this.model.bankinfo.BANK_ACC_NO ? this.model.bankinfo.BANK_ACC_NO : null,
        P_BANK_ACC_NO : this.model.bankinfo.ACC_NO ? this.model.bankinfo.ACC_NO : null 

      }).subscribe(result => {
        this.model.chequeBookIDList = result.body;      
          this.model.bankinfo.CHECKBOOK_ID = null;
          if( this.model.chequeBookIDList.length > 0  ){
            let lastItem = this.model.chequeBookIDList[this.model.chequeBookIDList.length - 1];
            console.log('lastItem', lastItem);
            this.model.bankinfo.CHECKBOOK_ID = lastItem.CHECKBOOK_ID;
          }


          //?this.model.chequeBookIDList['0'].CHECKBOOK_ID : null;  
          
          if(this.model.bankinfo.CHECKBOOK_ID){
            this.getChequeList();
          }        
      })
    }
  }
  //#endregion 


  //#region  Cheque Related 
  /* ======================
  /* Cheque Related 
  =========================*/
  private getChequeList() {
    // this.dataService.getCheques(this.model.bankinfo.CHECKBOOK_ID).subscribe(result => {
    //   this.model.chequeRelatedList = result.body;
    //   console.log(" this.model.chequeRelatedList",  this.model.chequeRelatedList);

    //   this.grid.api.setRowData(result.body);
    //   if (result.body.length > 0) {
    //     setTimeout(() => {
    //       //this.grid.api.getDisplayedRowAtIndex(0).setSelected(true);
    //       console.log("this.model.chequeRelatedSelectedId", this.model.chequeRelatedSelectedId);
    //       this.grid.api.getDisplayedRowAtIndex(this.model.chequeRelatedSelectedId).setSelected(true);
    //       this.onClickRelatedChequeItem(this.grid.api.getSelectedNodes()[0]);
    //     }, 100);
    //   }
    //   this.model.chequeRelatedTotalAmountSum(result.body);
    // })
    this.getChequeRelatedList();
  }

  onChangeFilter(event) {
    console.log("gridOptions.api.getModel().rootNode.childrenAfterFilter.length", this.gridTwo.api.getModel().rootNode.childrenAfterFilter);
    let list = [];
    list = this.gridTwo.api.getModel().rootNode.childrenAfterFilter.forEach(element => {
      return element.data;
    })
    console.log("list", list);
    if (list && list.length >= 0) {
      this.model.chequeRelatedTotalAmountSum(list);
    }
    ///this.grid.api.getModel().rootNode;
  }
  onClickRelatedChequeItem(row) {
    this.model.chequeRelatedSelectedId = parseInt(row.id ? row.id : row.node.id);
    console.log("this.model.chequeRelatedSelectedId", this.model.chequeRelatedSelectedId)
    let cheque = row.data;
    this.model.chequePrepared = new ChequePrepared(cheque);
    this.getChequePreparedList(cheque);
    this.getChequePreparedMsdList(cheque);
    this.getSerBillList(cheque);
    this.grid.api.getDisplayedRowAtIndex(row.rowIndex).setSelected(true);
  }
  //#region Cheque Related Grid
  onGridReady(grid) {
    this.grid = grid;
    this.grid.api.setRowData([]);
    this.previllageCheck();
  }
  itemClick(e) {
    console.log("E", e);
    if (e.event.target !== undefined) {
      let actionType = e.event.target.getAttribute("data-action-type");
      switch (actionType) {
        case "onClickLoadDtl":
          return this.onClickRelatedChequeItem(e);

      }
    }
  }

  //#endregion 


  //#region  Cheque Prepared List
  /* ======================
  /* Cheque Prepared
  =========================*/
  public getChequePreparedList(cheque) {
    this.gridTwo.api.setRowData([]);
    if (!cheque.CHECK_DATE) {
      this.preparedChequeByDefaultValue(cheque)
      //this.setChequePreparDefaultVal();
    }
    this.model.chequePrepared = new ChequePrepared(cheque);
    console.log('this.model.chequePrepared !!', this.model.chequePrepared );

    this.model.chequePreparedBackup = JSON.parse(JSON.stringify(this.model.chequePrepared));
    
    // get cheque prepared list
    this.dataService.getChequePrepared(cheque.CHECK_NO).subscribe(result => {

      let tmpChecquePreparedList: any = [];
      tmpChecquePreparedList = result.body;
      this.assingDataInChequePrepared(tmpChecquePreparedList, '')

      // old code Alternative use this function @assingDataInChequePrepared(list)    
      // this.model.chequePerparedList = [];
      // let list = [];
      // result.body.forEach(element => {
      //   element['CHECK_NO'] = cheque.CHECK_NO;
      //   element['BASE_AMOUNT'] = Number(this.model.chequePrepared.EXCHANGE_RATE) * Number(element.CHECK_AMT);
      //   this.model.chequePerparedList.push(new ChequPrepareList(element));
      //   list.push(new ChequPrepareList(element));
      //   //this.model.chequePrepared.PAY_TO_ACC_NO=element.PAY_TO_ACC_NO;        
      // });
      // this.gridTwo.api.setRowData(list);
      // if (result.body.length > 0) {
      //   setTimeout(() => {
      //     this.gridTwo.api.getDisplayedRowAtIndex(0).setSelected(true);
      //   }, 100);
      // }
   
      // this.model.chequePerparedListBackup = JSON.parse(JSON.stringify(list));
      // this.model.chequePerparedListTotalAmount = this.model.chequeTotalAmountSum(list);
    
      this.model.chequePrepared.VOID_FLAG=cheque.VOID_FLG;
      this.model.chequePrepared.MANUAL_VOUCHER_FLAG=cheque.MANUAL_VOUCHER_FLAG;
      //this.model.chequePrepared.PAY_TO_ACC_NO=cheque.PAY_TO_ACC_NO;
          
      this.model.chequePrepared.STATUS=cheque.STATUS;
      
      console.log('cheque.POST_DATE get', cheque.POST_DATE);
      if(cheque.POST_DATE != null)
      {
        this.model.glPost = 1;
        //this.model.chequePrepared.POST_DATE=this.dateUtil.getYYYYMMDDDashFromDate(cheque.POST_DATE)
        
      }
      else

      {
        this.model.chequePrepared.POST_DATE=new Date();
        this.model.glPost = 0;
      }

      this.getCheckDtl(cheque.CHECK_NO);
    })
  }

  
  getCheckDtl(CHECK_NO){
    //if(!CHECK_NO)return;

    console.log('this.model.P_DOC_NO_STR', this.model.P_DOC_NO_STR)
    //if(this.model.P_DOC_NO_STR) return;

    this.dataLoadService.load('FG_AC1023_BILL_CKECKDTL', {P_CHECK_NO: CHECK_NO}).subscribe(result => {          
      let tmpBillCheckDtlList = result.body.map(element => {        
        element['SQL_STATE'] = fixedValues.sqlState.sqlUnchange;
        if (element.PENDING_VALUE != null) {
          element.PAY_AMT = element.PENDING_VALUE;
        }             
        return new BillCheckdtl(element);
      });
      console.log("tmpBillCheckDtlList", tmpBillCheckDtlList);

      this.dtlGrid.api.setRowData( tmpBillCheckDtlList );
      this.model.billCheckDtlListBackup = JSON.parse(JSON.stringify(tmpBillCheckDtlList)); 
     

     
      
      // if(tmpBillCheckDtlList.length > 0){
      //   setTimeout(() => {
      //     let rowNode = this.grid.api.getRowNode(0);         
      //     this.onClickGetDtl(rowNode);        
      //   },100);
      // }
      
    })      
  }

  getChequePreparedMsdList(cheque){
    console.log('this.model.chequePrepared!!', this.model.chequePrepared );
    this.msdGrid.api.setRowData([]);    
    this.dataLoadService.load('FG_AC1023_MONEYCHECKPAY', { P_CHECK_NO: cheque.CHECK_NO }).subscribe(result => {
    let tmpMsdList = result.body
    .map(element => {
      element['SQL_STATE'] = fixedValues.sqlState.sqlUnchange;
      return new Moneycheckpay(element);
    });
      console.log("tmpBillCheckDtlList", tmpMsdList);
      this.msdGrid.api.setRowData(tmpMsdList);
      this.model.msdListListBackup = JSON.parse(JSON.stringify(tmpMsdList));
    })
  }

  getSerBillList(cheque){
    console.log('this.model.chequePrepared!!', this.model.chequePrepared );
    this.msdGrid.api.setRowData([]);    
    this.dataLoadService.load('FG_AC1023_SERVICECHECKPAY', { P_CHECK_NO: cheque.CHECK_NO }).subscribe(result => {
    let tmpSerList = result.body
    .map(element => {
      element['SQL_STATE'] = fixedValues.sqlState.sqlUnchange;
      return new Servicecheckpay(element);
    });
      console.log("tmpSerList", tmpSerList);
      this.serGrid.api.setRowData(tmpSerList);
      this.model.serBillListBackup = JSON.parse(JSON.stringify(tmpSerList));
    })
  }

  loadIntgratedDataList(){       
    this.dataLoadService.load('FG_AC1023_DOC_LIST', { P_DOC_NO: this.model.P_DOC_NO_STR }).subscribe(result => {
      let tmpBillCheckDtlList = result.body.map(element => {
        element['SQL_STATE'] = fixedValues.sqlState.sqlInsert;
        element['BILL_ID'] = element.DOC_NO;
        element['LC_DATE'] = element.WO_DATE;   
        element['DUE_AMT'] = element.PENDING_VALUE;          
        element['CHECK_NO'] = this.model.chequePrepared.CHECK_NO ? this.model.chequePrepared.CHECK_NO : null;
        if (element.PENDING_VALUE != null) {
          element.PAY_AMT = element.PENDING_VALUE;
        }             
        return new BillCheckdtl(element);
      });

      //this.model.P_DOC_NO_STR = '';
      console.log("tmpBillCheckDtlList", tmpBillCheckDtlList);
      this.dtlGrid.api.setRowData(tmpBillCheckDtlList);
      this.model.billCheckDtlListBackup = JSON.parse(JSON.stringify(tmpBillCheckDtlList));
    })            
  }

  onLoadMsdList() {
    console.log('this.model.chequePrepared!!', this.model.chequePrepared);
    this.msdGrid.api.setRowData([]);
    this.dataLoadService.load('FG_AC1023_MONEY_PAYMENT_LIST', { P_SCHEDULE_NO: this.model.P_SCHEDULE_NO }).subscribe(result => {
      let tmpMsdList = result.body
        .map(element => {
          element['SQL_STATE'] = fixedValues.sqlState.sqlInsert;          
          element['CHECK_NO'] = this.model.chequePrepared.CHECK_NO;
          element['SCHEDULE_ID'] = element.MONEYSCHEDULE_ID;
          element['DUE_AMT'] = element.PANDING_AMOUNT;
          return new Moneycheckpay(element);
        });

      //this.model.P_SCHEDULE_NO = null;
      console.log("tmpBillCheckDtlList", tmpMsdList);
      this.msdGrid.api.setRowData(tmpMsdList);
      this.model.msdListListBackup = JSON.parse(JSON.stringify(tmpMsdList));
    })
  }

  onLoadSerBillList(parm?:any) {
    console.log('this.model.chequePrepared!!', this.model.chequePrepared);
    this.serGrid.api.setRowData([]);
    this.dataLoadService.load('FG_AC1023_SERVICE_BILL', { 
      P_SERVIC_BILL_NO: this.model.P_SERVIC_BILL_NO 
    }).subscribe(result => {
      let tmpSerBillList = result.body
        .map(el => {
          el['SQL_STATE'] = fixedValues.sqlState.sqlInsert;
          el['CHECK_NO'] = this.model.chequePrepared.CHECK_NO;
          el['SUPPINVOICE_ID'] = el.BILL_ID;          
          el['AUDITED_VALUE'] = el.PENDING_VALUE_BASE;

          if(parm == 'click'){
            el['SUPPINVOICE_NO'] = el.BILL_NO;
            el['PAY_AMT'] = el.PENDING_VALUE_BASE;  
          }

          return new Servicecheckpay(el);
        });
    
      //this.model.P_SCHEDULE_NO = null;
      console.log("tmpSerBillList", tmpSerBillList);
      this.serGrid.api.setRowData(tmpSerBillList);
      this.model.serBillListBackup = JSON.parse(JSON.stringify(tmpSerBillList));
    })
  }

  



  onChangeCurrency() {
    this.model.chequePrepared.EXCHANGE_RATE = this.model.currencyList.find(item => item.CUR_NO == this.model.chequePrepared.CUR_NO).EXCHANGE_RATE;

    if (this.gridTwo.api.psGridDataList().length > 0) {
      let totalDR = 0;
      let totalCR = 0;
      this.gridTwo.api.forEachNode(node => {
        node.data.BASE_AMOUNT_DR = node.data.DR * this.model.chequePrepared.EXCHANGE_RATE;
        node.data.BASE_AMOUNT_CR = node.data.CR * this.model.chequePrepared.EXCHANGE_RATE;
        node.setDataValue('BASE_AMOUNT_DR', node.data.BASE_AMOUNT_DR);
        node.setDataValue('BASE_AMOUNT_CR', node.data.BASE_AMOUNT_CR);
        totalDR += node.data.BASE_AMOUNT;

      })
      this.bottomTotalData.BASE_AMOUNT_DR = totalDR;
      this.bottomTotalData.BASE_AMOUNT_CR = totalCR;
      this.gridTwo.api.getPinnedBottomRow(0).data.BASE_AMOUNT_DR = totalDR;
      this.gridTwo.api.getPinnedBottomRow(0).data.BASE_AMOUNT_CR = totalCR;
      this.gridTwo.api.refreshCells();
    }
  }

  preparedChequeByDefaultValue(cheque) {
    cheque.PREPARE_DATE = new Date();
    cheque.CUR_NO = 1;
    cheque.EXCHANGE_RATE = this.model.currencyList.find(item => item.CUR_NO == cheque.CUR_NO).EXCHANGE_RATE;
    cheque.CHECK_DATE = new Date();
    cheque.CHEQUE_COMPANY_NO = globalVariables.userInfo.company_NAME;
    cheque.CHEQUE_COMPANY_NO = globalVariables.userInfo.company_NO;
    cheque.FINAL_SETTLEMENT_TYPE = 'C';
    cheque.FINAL_SETTLEMENT_DATE = new Date();


  }
  onClickAddNewChequePerpared() {
    let newObj = { DR_CR: 'Dr', CHECK_NO: this.model.chequePrepared.CHECK_NO };
    this.model.chequePerparedList.push(new ChequPrepareList(newObj));
    this.gridTwo.api.psClearFilter();
    this.gridTwo.api.stopEditing();
    setTimeout(() => {
      let validationResult = this.gridTwo.api.psValidate();
      if (validationResult.isValid) {
        let obj = this.gridTwo.api.updateRowData({ add: [new ChequPrepareList(newObj)] });
        this.gridTwo.api.ensureIndexVisible(obj.add[0].rowIndex);
        setTimeout(() => {
          this.gridTwo.api.startEditingCell({
            rowIndex: obj.add[0].rowIndex,
            colKey: this.colObjTwo[0].field
          });
        }, 100);
      }
    }, 100);

  }
  onClickResetChequePerparedList() {
    this.gridTwo.api.setRowData(JSON.parse(JSON.stringify(this.model.chequePerparedListBackup)));
    this.model.chequePerparedList.length = 0;
    this.model.chequePerparedList = JSON.parse(JSON.stringify(this.model.chequePerparedListBackup));
  }
  onClickRemoveChequePerpared(row) {
    if (row.data.SQL_STATE == fixedValues.sqlState.sqlInsert) {
      this.grid.api.updateRowData({ remove: [row.data] });
    } else {
      row.data.SQL_STATE = fixedValues.sqlState.sqlDelete;
      this.grid.api.psRemove();
    }
  }
  gridRequiredOptions: any = {
    "PAY_TO_NAME": {
      "required": {
      }
    },
    "ACC_NAME": {
      "required": {
      }
    },
    DESCR: {
      size: {
        min: 0,
        max: 500,
      }
    }

  }
  onGridReadyTwo(grid) {
    this.gridTwo = grid;
    this.gridTwo.api.setRowData([]);
  }
  itemClickTwo(e) {
    if (e.event.target !== undefined) {
      let actionType = e.event.target.getAttribute("data-action-type");
      switch (actionType) {
        case "deleteAction":
          return this.onClickDeleteChequePrepared(e);
        case "payToModal":
          return this.onClickOpenPayToModal(e);
        case "accountListModal":
          return this.onClickOpenAccountListModal2(e);
        case "costCenterListModal":
          return this.onClickOpenCostCenterModal(e);
        case "businessAreaListModal":
          return this.onClickOpenBusinessAreaModal(e);
      }
    }
    this.model.selectedAccPath = e.data.ACC_PATH;;
  }


  onClickOpenPayToModal(row) {
    this.modalService.openDialog('CommonListModule', 'list', {
      title: this.langService.langData.payToName, data: {
        gridId: "PayToNameGrid", columnDefs: payToNameColumnDefs, api: 'FG_AC_COMM_BANK_CHEQUE_INFO', params: {
          P_ACC_NO: null,
          P_CHECKBOOK_ID: null,
          P_CHECKID: null,
          P_CHECK_NO: null,
          P_CHEQUE_AUTHO_NO: null,
          P_QUERYOPTIONS: fixedValues.queryOptions.RefCenterForGL
        }
      }, settings: { modalClass: 'md' }
    }).then((modal: any) => {
      modal.closed = () => {
        row.api.psSetCellFocus();
      };
      modal.success = (data) => {
        row.node.setDataValue("PAY_TO_NAME", data ? data.PAY_TO_NAME : '');
        //row.node.data.PAY_TO_ACC_NO = data ? data.PAY_TO_ACC_NO : null;        
        row.api.psSetCellValue();

        
      };
    });

    //this.modal.createPayToNameListComponent(this.container, cheque);
  }
  onClickOpenAccountListModal2(row) {
    this.modalService.openDialog('CommonListModule', 'list', {
      title: this.langService.langData.accountList, data: {
        gridId: "AccoutMultiListGridAC_1023", columnDefs: accountMultiListColumnDefs, api: 'FG_AC_COMM_CHART_OF_ACCOUNTS', params: {
          P_ACC_NO: null,
          P_BA_NO: null,
          P_BU_NO: null,
          P_PERIOD_NO: null,
          P_QUERYOPTIONS: fixedValues.queryOptions.CoaForAV
        }
      }, settings: { modalClass: 'lg' }
    }).then((modal: any) => {
      modal.closed = () => {
        row.api.psSetCellFocus();
      };
      modal.success = (data) => {
        row.node.setDataValue("ACC_NAME", data ? data.ACC_NAME : '');
        row.node.data.ACC_NO = data ? data.ACC_NO : null;
        row.node.data.PAY_TO_ACC_NO = data ? data.ACC_NO : null;
        row.node.data.ACC_CODE = data ? data.ACC_CODE : '';
        row.node.data.ACC_PATH = data ? data.ACC_PATH : '';
        row.node.data.MAP_ACC_NAME = data ? data.MAP_ACC_NAME : '';
        row.node.data.MAP_ACC_NO = data ? data.MAP_ACC_NO : null;
        row.api.psSetCellValue();

       // ChequePrepared.CHEQPAY_TO_ACC_NO=(row.node.data.ACC_NO;
       this.model.chequePrepared.PAY_TO_ACC_NO=row.node.data.ACC_NO;
        if (row.node.data.ACC_NO != null) {
   
          this.model.chequePrepared.PAY_TO_ACC_CHK = 0;
          this.model.chequePrepared.TTL_AMOUNT_CHK = 0;    }
        else {
          this.model.chequePrepared.PAY_TO_ACC_CHK = 1
         
        }
    
        //mahfuz      
      };
    });
    //this.modal.createAccountMultiListComponent(this.container, cheque);
  }
  onClickOpenCostCenterModal(row) {
    this.modalService.openDialog('CommonListModule', 'list', {
      title: this.langService.langData.costCenterList, data: {
        gridId: "CostCenterListGrid", columnDefs: CostCenterColumnDefs, api: 'FG_AC_COMM_COST_CENTERS', params: {
          P_ACC_NO: null,
          P_QUERYOPTIONS: fixedValues.queryOptions.CostCenterNO
        }
      }, settings: { modalClass: 'md' }
    }).then((modal: any) => {
      modal.closed = () => {
        row.api.psSetCellFocus();
      };
      modal.success = (data) => {
        row.node.setDataValue("COST_NAME", data ? data.COST_NAME : '');
        row.node.data.COST_NO = data ? data.COST_NO : null;
        row.api.psSetCellValue();
      };
    });
    //this.modal.createCostCenterListComponent(this.container, cheque);
  }

  onClickOpenBusinessAreaModal(row) {
    this.modalService.openDialog('CommonListModule', 'list', {
      title: this.langService.langData.businessAreaList, data: {
        gridId: "BusinessAreaListGrid", columnDefs: businessAreaColumnDefs, api: 'FG_AC_COMM_BUSINESS_AREAS', params: {
          CTRL_BU_CHK: null,
          P_ACC_NO: null,
          P_QUERYOPTIONS: fixedValues.queryOptions.BusinessAreaForGL
        }
      }, settings: { modalClass: 'md' }
    }).then((modal: any) => {
      modal.closed = () => {
        row.api.psSetCellFocus();
      };
      modal.success = (data) => {
        row.node.setDataValue("BA_NAME", data ? data.BA_NAME : '');
        row.node.data.BA_NO = data ? data.BA_NO : null;
        row.api.psSetCellValue();
      };
    });
    /// this.modal.createBaListPeriodSetupComponent(this.container, cheque, fixedValues.queryOptions.BusinessAreaForGL);
  }





  onClickOpenBaList2() {
    this.modalService.openDialog('CommonListModule', 'list', {
      title: this.langService.langData.businessAreaList, data: {
        gridId: "BusinessAreaListGrid", columnDefs: businessAreaColumnDefs, api: 'FG_AC_COMM_BUSINESS_AREAS', params: {
          CTRL_BU_CHK: null,
          P_ACC_NO: null,
          P_QUERYOPTIONS: fixedValues.queryOptions.BusinessAreaForGL
        }
      }, settings: { modalClass: 'md' }
    }).then((modal: any) => {
      modal.closed = () => {

      };
      modal.success = (data) => {
        this.model.chequePrepared.BA_NAME = data ? data.BA_NAME : '';
        this.model.chequePrepared.BA_NO = data ? data.BA_NO : null;
      };
    });

    //this.modal.createBaListPeriodSetupComponent(this.container, this.model.chequePrepared, fixedValues.queryOptions.BusinessAreaForGL);
  }

  onClickOpenCostCenterModal2() {
    this.modalService.openDialog('CommonListModule', 'list', {
      title: this.langService.langData.costCenterList, data: {
        gridId: "CostCenterListGrid", columnDefs: CostCenterColumnDefs, api: 'FG_AC_COMM_COST_CENTERS', params: {
          P_ACC_NO: null,
          P_QUERYOPTIONS: fixedValues.queryOptions.CostCenterNO
        }
      }, settings: { modalClass: 'sm' }
    }).then((modal: any) => {
      modal.closed = () => {

      };
      modal.success = (data) => {
        this.model.chequePrepared.COST_NAME = data ? data.COST_NAME : '';
        this.model.chequePrepared.COST_NO = data ? data.COST_NO : null;
      };
    });
    // this.modal.createCostCenterListComponent(this.container, this.model.chequePrepared);
  }

  onClickOpenUserListWithJobtitleModal() {
    this.modalService.openDialog('CommonListModule', 'list', {
      title: this.langService.langData.costCenterList, data: {
        gridId: "EmployeeShortGrid", columnDefs: EmployeeShortColumnDef, api: 'FG_AC_COMM_BANK_CHEQUE_INFO', params: {
          P_ACC_NO: null,
          P_CHECKBOOK_ID: null,
          P_CHECKID: null,
          P_CHECK_NO: null,
          P_CHEQUE_AUTHO_NO: null,
          P_QUERYOPTIONS: fixedValues.queryOptions.BusinessAreaForGL
        }
      }, settings: { modalClass: 'sm' }
    }).then((modal: any) => {
      modal.closed = () => {

      };
      modal.success = (data) => {
        this.model.chequePrepared.EMP_NAME_ID = data ? data.EMP_NAME_ID : '';
        this.model.chequePrepared.SIGNATORY_EMP_NO = data ? data.EMP_NO : null;
        this.model.chequePrepared.JOBTITLE = data ? data.JOBTITLE : '';
      };
    });

    // this.modal.createUserListWithJobtitleComponent(this.container, this.model.chequePrepared);
  }


  onPsGridColumnTotalChanged(data) {
    this.bottomTotalData = data;
  }













  onChangeChequePrepareListAmount() {
    //this.model.chequeTotalAmountSum();
  }

  //#region end Cheque Prepared List




  onClickOpensignatoryAuthorutyModal() {
    this.modalService.openDialog("SignatoryAuthorutyListModule", "signatory-authoruty-list",
      {
        title: this.langService.langData.signatoryAuthority, data: {
          userPrivilege: this.model.userPrivilege,
        }, settings: { modalClass: 'sm' }
      }
    ).then((modal: any) => {
      modal.closed = () => { },
        modal.success = (result) => {
          console.log("this.data.result", result);
          //Work order Details Backup

        }
    });
  }




  // onClickSaveChequePerparedList() {
  //   //save Confirmation
  //   this.alertService.info("Do you want to save Cheque Prepare?", true).then(data => {
  //     if (data) {
  //       this.dataService.saveChequeStat(this.model.chequePerparedList).subscribe(result => {
  //         this.model.chequePerparedListBackup.length = 0;
  //         this.model.chequePerparedListBackup = JSON.parse(JSON.stringify(this.model.chequePerparedList));
  //         this.alertService.success("Cheque Prepare saved successfully");
  //       }, err => {
  //         this.alertService.warning("Failed to save Cheque Prepare!");
  //       })
  //     }
  //   })
  // }

  onClickOpenChequeTypeList() {
    //this.modal.createChequeTypeListComponent(this.container, this.model.chequePrepared);

    this.modalService.openDialog('CommonListModule', 'list', {
      title: this.langService.langData.chequeType, data: {
        gridId: "ChequeTypeGrid", columnDefs: ChequeTypeColumnDef, api: 'FG_AC_COMM_BANK_CHEQUE_INFO', params: {
          P_ACC_NO: null,
          P_CHECKBOOK_ID: null,
          P_CHECKID: null,
          P_CHECK_NO: null,
          P_CHEQUE_AUTHO_NO: null,
          P_QUERYOPTIONS: fixedValues.queryOptions.PaidTo
        }
      }, settings: { modalClass: 'sm' }
    }).then((modal: any) => {
      modal.closed = () => {

      };
      modal.success = (data) => {
        this.model.chequePrepared.STATUS = data ? data.STATUS : '';
        this.model.chequePrepared.CHECK_STAT_NO = data ? data.CHECK_STAT_NO : null;
      };
    });
  }
  onClickOpenChequeTypeEntryList() {
    this.modalService.openDialog("ChequeTypeListModule", "cheque-type-list",
      {
        title: this.langService.langData.chequeType, data: {
          userPrivilege: this.model.userPrivilege,
        }, settings: { modalClass: 'sm' }
      }
    ).then((modal: any) => {
      modal.closed = () => { },
        modal.success = (result) => {
          console.log("this.data.result", result);
          //Work order Details Backup

        }
    });
  }

  onClickResetChequeRegister() {
    this.model.chequePrepared = new ChequePrepared(JSON.parse(JSON.stringify(this.model.chequePreparedBackup)));
  }


  onClickSaveChequeRegister(validateChequeRegister: any) {
   
    //Lok
    if (!this.model.glPost) {
      this.model.chequePrepared.IS_GL_POST = 0;
    }
    else {
      this.model.chequePrepared.IS_GL_POST = 1;
    }
      
    this.gridTwo.api.stopEditing();
    setTimeout(() => {

      // May be use @but not found in oracle form 
      // if (!this.gridTwo.api.getRowNode(0)) {
      //   this.toastr.warning("Pay To Name does not found.", 'Warning');
      //   return;
      // }
      
      if (this.model.chequePrepared.PAY_TO_ACC_CHK==1) {
        this.toastr.warning("'Payable a/c no not found.", 'Warning');
        return;
      }

      // Add this statement for problem solve Without business.
      // if (!this.model.chequePrepared.COST_NO) {
      //   this.toastr.warning("Cost name is required", 'Warning');
      //   return;
      // }


      let validationResult = validateChequeRegister.validate();

      console.log("this.gridTwo.api.psGetSelectedNode()", this.gridTwo.api.psGetSelectedNode());
      this.alertService.info(this.langService.langData.saveConfirmationMsg, true, "Save Confirmation").then(data => {
        this.model.chequePrepared.CHECK_AMT = this.bottomTotalData.DR;
        if (data) {
          if (validationResult.isValid) {
            //this.model.saveConditionCheck()
            if (this.model.saveConditionCheck().isSave) {
              
              console.log('this.model.chequePrepared.COST_NO', this.model.chequePrepared.COST_NO);

              this.dataService.createCheque(
                              
                this.model.chequePrepared.FINAL_SETTLEMENT_TYPE,
                this.dateUtil.getYYYYMMDDDashFromDate(this.model.chequePrepared.FINAL_SETTLEMENT_DATE),
                this.model.chequePrepared.V_NO,
                this.model.chequePrepared.VTYPE_NO,
                this.model.bankinfo.CHECKBOOK_ID,
                this.model.chequePrepared.CHECK_NO,
                this.model.chequePrepared.CHECK_ID,
                this.model.chequePrepared.STATUS,
                this.model.chequePrepared.VOID_FLAG,                
               // this.model.chequePrepared.SUM_AMT,
               this.model.totalChequeAmount,
               
                this.model.chequePrepared.MANUAL_VOUCHER_FLAG,
                this.model.chequePrepared.EXCHANGE_RATE,
                this.model.chequePrepared.ACTIVE_STAT,
                this.model.chequePrepared.COST_NO,
                this.model.chequePrepared.BA_NO,
                this.model.chequePrepared.SIGNATORY_EMP_NO,
                this.model.chequePrepared.CUR_NO,
                this.model.chequePrepared.CHECK_STAT_NO,
                this.dateUtil.getYYYYMMDDDashFromDate(this.model.chequePrepared.CHECK_DATE),
                this.model.chequePrepared.CHECK_AMT,                      
                this.dateUtil.getYYYYMMDDDashFromDate(this.model.chequePrepared.PREPARE_DATE),
                this.model.chequePrepared.DESCR,
                this.model.chequePrepared.CHEQUE_COMPANY_NO,
                this.model.chequePrepared.PAY_TO_ACC_CHK,
                this.model.chequePrepared.TTL_AMOUNT_CHK,
                // this.grid.set.PAY_TO_ACC_NO,
                // this.grid.api.getRowNode(0).data.PAY_TO_ACC_NO,
                this.dateUtil.getYYYYMMDDDashFromDate(this.model.chequePrepared.POST_DATE),
                this.model.chequePrepared.IS_GL_POST
                
               
              ).subscribe(result => {

                this.model.chequePreparedBackup = JSON.parse(JSON.stringify(this.model.chequePrepared));              
                this.model.p_mgs = result.body.P_MGS;                
                this.saveChequeRegister();
                this.saveBillCheckDtl();
                this.saveMoneyCheckPay();
                this.saveSerBillCheckPay();
                if(result.status == 200){
                  console.log('Test save .....');
                  this.model.saveStat = true;
                  this.model.savedCheckNo = this.model.chequePrepared.CHECK_NO;
                  this.getChequeList();
                }
                
              });
            } else {
            
              this.toastr.warning(this.model.saveConditionCheck().messege, 'Warning');
            }
          }
        }
      })
    }, 100);

  }

  saveBillCheckDtl() {   
    this.dtlGrid.api.stopEditing();

    setTimeout(() => {
      let checkDtlList = this.dtlGrid.api.psGetChangeList(); 
      console.log("this.gridTwo.api.getRowNode(0)", this.gridTwo.api.getRowNode(0));
      this.dataService.saveBillCheck(checkDtlList).subscribe(result => {
        //this.alertService.success("Cheque Prepare updated successfully");
        //this.toastr.success(this.langService.langData.saveSuccessMsg, 'Success');
        this.dtlGrid.api.psResetValidation();
        this.dtlGrid.api.psUpdateList(result.body, BillCheckdtl);       
        this.model.billCheckDtlListBackup = JSON.parse(JSON.stringify(this.dtlGrid.api.psGridDataList()));
      })
    },50)
  }

  saveMoneyCheckPay() {   
    this.msdGrid.api.stopEditing();

    setTimeout(() => {
      let checkDtlList = this.msdGrid.api.psGetChangeList(); 
      console.log("this.gridTwo.api.getRowNode(0)", this.gridTwo.api.getRowNode(0));
      this.dataService.saveMoneyCheckPay(checkDtlList).subscribe(result => {       
        this.msdGrid.api.psResetValidation();
        this.msdGrid.api.psUpdateList(result.body, Moneycheckpay);       
        this.model.msdListListBackup = JSON.parse(JSON.stringify(this.msdGrid.api.psGridDataList()));
      })
    },50)
  }

  saveSerBillCheckPay() {   
    this.serGrid.api.stopEditing();
    setTimeout(() => {
      let checkSerBillList = this.serGrid.api.psGetChangeList();       
      this.dataService.saveServiceCheckPay(checkSerBillList).subscribe(result => {       
        this.serGrid.api.psResetValidation();
        this.serGrid.api.psUpdateList(result.body, Servicecheckpay);       
        this.model.serBillListBackup = JSON.parse(JSON.stringify(this.serGrid.api.psGridDataList()));
      })
    },50)
  }


  onClickContinueToSave() {
    this.saveChequeRegister();
  }

  public onClickChequePrint(param){
    this.model.chequePrepared.CHECK_AMT = this.bottomTotalData.DR;
    this.saveChequePrint(param);  
  }

  saveChequePrint(param){     
    let selectedNode = this.gridTwo.api.psGetSelectedNode()
    console.log("selectedNode.data.PAY_TO_ACC_NO", selectedNode.data.PAY_TO_ACC_NO);
    console.log("selectedNode.data", selectedNode.data);
    let paramObj = {
      SQL_STATE: fixedValues.sqlState.sqlInsert,
      PAY_TO: selectedNode.data.PAY_TO_ACC_NO,
      AMOUNT: this.model.chequePrepared.CHECK_AMT,
      CHEQUE_DATE: this.model.chequePrepared.PREPARE_DATE ?
        this.dateUtil.getYYYYMMDDDashFromDate(this.model.chequePrepared.PREPARE_DATE) 
        : null,
    }

    //saveChequePrint
    this.dataService.saveChequePrint(paramObj).subscribe(result => {
      console.log("result", result);
      this.chequePrintReport(param);
    })

  }
  
  //#region Report Preview
  public chequePrintReport(param): void {
    let submenuId = '';
    if(param == 'format2'){
      submenuId = 'AC_4243';
    }else{
      submenuId = 'AC_4242';
    }
    this.dataLoadService.load('FG_SA_COMM_REPORT_CONFIG/map', {
      P_SUBMENU_ID: submenuId
    }).subscribe(result => {
      this.getCallPreview(result, submenuId);
    });    
  }

  getCallPreview(result: any, submenuId: string) {
    console.log("this.gridTwo.api.getRowNode(0)", this.gridTwo.api.getRowNode(0));
    let X_Submenu_Id = globalVariables.menuInfo.MENU_ID;
    let subPart = X_Submenu_Id.substring(0, 2);
    let params = {
      // Old Code
      // baseUrl: globalVariables.paramsReportBaseUrl,
      // rwservlet: 'BMS',
      // desformat: 'PDF',
      // destype: 'cache',
      // report: `${globalVariables.reportPath}${subPart}/AC_4242`,
      // X_Emp_Id: globalVariables.userInfo.emp_ID,
      // X_Submenu_Id: 'AC_4242',
      // X_company_no: globalVariables.userInfo.company_NO,
      // X_currency_format: '9,99,99,99,99,999.00',
      // X_date_format: 'DD/MM/RR',
      // X_time_format: 'HH24:MI',
      // X_ROUND: 2,
      // P_DATE: this.transformDate(this.model.chequePrepared.CHECK_DATE),
      // P_TYPE: this.model.PRINT_TYPE_NAME ? this.model.PRINT_TYPE_NAME : '',
      // P_REGISTER_NO: this.model.selectedRegisterNo ? this.model.selectedRegisterNo : this.gridTwo.api.getRowNode(0).data.REGISTER_NO, // need change           
      // P_COMPANY: this.model.chequePrepared.COMPANY_NAME ? this.model.chequePrepared.COMPANY_NAME : '',
      // P_EMP_NO: this.model.chequePrepared.SIGNATORY_EMP_NO ? this.model.chequePrepared.SIGNATORY_EMP_NO : 0,     
      // P_AMOUNT: this.model.chequePrepared.CHECK_AMT ?  this.model.chequePrepared.CHECK_AMT : 0,           
      // p_reppath: globalVariables.reportPath,

      baseUrl: globalVariables.paramsReportBaseUrl,
      rwservlet: this.model.reportConfig.REPORT_SERVER,
      desformat: this.model.reportConfig.REPORT_FORMAT,
      destype: 'cache',
      report: `${globalVariables.reportPath}${subPart}/${submenuId}`,
      X_Emp_Id: globalVariables.userInfo.emp_ID,
      X_Submenu_Id: submenuId,
      X_company_no: globalVariables.userInfo.company_NO,
      X_currency_format: this.model.reportConfig.SS_CURRENCY_FMT,
      X_date_format: this.model.reportConfig.SS_DT_FMT,
      X_time_format: this.model.reportConfig.SS_TIME_FMT,
      X_ROUND: this.model.roundList[0].F_ROUND,

      P_DATE: this.transformDate(this.model.chequePrepared.CHECK_DATE),
      P_TYPE: this.model.PRINT_TYPE_NAME ? this.model.PRINT_TYPE_NAME : '',
      P_REGISTER_NO: this.model.selectedRegisterNo ? this.model.selectedRegisterNo : this.gridTwo.api.getRowNode(0).data.REGISTER_NO, // need change           
      P_COMPANY: this.model.chequePrepared.COMPANY_NAME ? this.model.chequePrepared.COMPANY_NAME : '',
      P_EMP_NO: this.model.chequePrepared.SIGNATORY_EMP_NO ? this.model.chequePrepared.SIGNATORY_EMP_NO : 0,     
      P_AMOUNT: this.model.chequePrepared.CHECK_AMT ?  this.model.chequePrepared.CHECK_AMT : 0,
    }
    this.utilityService.showReport(params);           
  }

  public onClickReportPreview(): void {
    let X_Submenu_Id = globalVariables.menuInfo.MENU_ID;
    let subPart = X_Submenu_Id.substring(0, 2);
    let params = {
      baseUrl: globalVariables.paramsReportBaseUrl,
      rwservlet: 'BMS',
      desformat: 'PDF',
      destype: 'cache',
      report: `${globalVariables.reportPath}${subPart}/AC_3002`,
      X_Emp_Id: globalVariables.userInfo.emp_ID,
      X_Submenu_Id: 'AC_3002',
      X_company_no: globalVariables.userInfo.company_NO,
      X_currency_format: '9,99,99,99,99,999.00',
      X_date_format: 'DD/MM/RR',
      X_time_format: 'HH24:MI',
      X_ROUND: 2,
      p_vno: this.model.chequePrepared.V_NO,
      p_reppath: globalVariables.reportPath,
    }
    this.utilityService.showReport(params);
  }

  transformDate(date) {
    // return this.datePipe.transform(date, 'yyyy-MM-dd');
    return this.datePipe.transform(date, 'dd-MMM-yy');
  }

  // getChekId(){
  //   this.comService.getChekId(this.model.chequePrepared.CHECK_NO, this.model.bankinfo.CHECKBOOK_ID).subscribe( result => {
  //     this.model.getChequeId = result.body[0].CHECK_NO;
  //     this.saveChequeRegister(this.model.getChequeId);
  //   })
  // }
  onClickUpdateChequeRegister() {
    this.gridTwo.api.stopEditing();
    this.alertService.info("Do you want to update Cheque Prepare?", true).then(data => {
      if (data) {
        console.log('this.model.chequePrepared', this.model.chequePrepared);
        this.dataService.preUpdating(
          this.dateUtil.getYYYYMMDDDashFromDate(this.model.chequePrepared.POST_DATE),
          this.model.chequePrepared.V_NO
        ).subscribe(result => {

          console.log('result preUpdating', result);

          if (result.body.return == 'P') {
            this.toastr.warning("Period Already Closed!", 'Warning');
          } else if (result.body.return == 'E') {
            this.toastr.warning("Account posting done!! Edit Not Allowed", 'Warning');
          } else {
            this.saveChequeRegister();

          }
        })
      }

    })
    //update confirmation and and operation done
  }

  

  saveChequeRegister() {
    let list = [];
    this.gridTwo.api.stopEditing();    
    setTimeout(() =>{
      let dataList: any = [];
      dataList = this.gridTwo.api.psGetChangeList();
      console.log('dataList cr save', dataList);

      list = dataList.map(el =>{
        el['PAY_TO_ACC_NO'] = el.PAY_TO_ACC_NO 
        ?  el.PAY_TO_ACC_NO 
        : this.model.chequePrepared.PAY_TO_ACC_NO;
        return new ChequPrepareList(el);
      });
      

      console.log("this.gridTwo.api.getRowNode(0)", this.gridTwo.api.getRowNode(0));
      this.dataService.saveChequeRegister(list).subscribe(result => {      
        this.toastr.success(this.langService.langData.saveSuccessMsg, 'Success');
        this.gridTwo.api.psResetValidation();
        this.gridTwo.api.psUpdateList(result.body, ChequPrepareList);        
      })
      console.log('list save !!', list);

    }, 100);



    // Old code
    // this.gridTwo.api.forEachNode(element => {
    //   console.log("element", element);
    //   list.push(element.data);
    
    //   if (element.data.PAY_TO_ACC_NO==null)
    //   {
    //     element.data.PAY_TO_ACC_NO=this.model.chequePrepared.PAY_TO_ACC_NO;

    //   }

    
    // });

    
  }

  //#endregion


  //#region glPost
  onChangeGlPost() {
    this.glPostUpdate();
    
    // if (this.model.glPost) {
    //   if (this.model.cheqePostDateToPrepareDate().isLarge) {
    //     this.glPostUpdate();
    //   } else {
    //     this.toastr.warning(this.model.cheqePostDateToPrepareDate().messege, 'Warning');
    //   }
    // }
  }
  public glPostUpdate() {

    console.log('this.model.chequePerparedList glPostUpdate', this.model.chequePerparedList);

    if (!this.model.glPost) {
      this.model.chequePrepared.IS_GL_POST = 0;

    }
    else {
      this.model.chequePrepared.IS_GL_POST = 1;


    }

  this.dataService.postVoucher(
       this.model.chequePrepared.FINAL_SETTLEMENT_TYPE,
       this.dateUtil.getYYYYMMDDDashFromDate(this.model.chequePrepared.FINAL_SETTLEMENT_DATE),     
       this.model.chequePrepared.VTYPE_NO,
       this.model.bankinfo.CHECKBOOK_ID,
       this.model.chequePrepared.CHECK_NO,
       this.model.chequePrepared.CHECK_ID,  
       this.model.chequePrepared.VOID_FLAG,  
       this.model.chequePrepared.MANUAL_VOUCHER_FLAG,  
       this.model.chequePrepared.EXCHANGE_RATE,   
       this.model.chequePrepared.ACTIVE_STAT,
       this.model.chequePrepared.COST_NO,
       this.model.chequePrepared.BA_NO,
    
       this.model.chequePrepared.CUR_NO,
       this.model.chequePrepared.CUR_NAME,
       this.model.chequePrepared.CHECK_STAT_NO,
       this.model.chequePrepared.STATUS,
       this.dateUtil.getYYYYMMDDDashFromDate(this.model.chequePrepared.CHECK_DATE),
      this.model.chequePrepared.CHECK_AMT,
       this.dateUtil.getYYYYMMDDDashFromDate(this.model.chequePrepared.PREPARE_DATE),
       this.model.chequePrepared.DESCR,      
       this.model.chequePerparedList[0].PAY_TO_ACC_NO,
       this.model.chequePerparedList[0].PAY_TO_ACC_NO,
       this.model.chequePerparedList[0].PAY_TO_NAME,
       //Old Statement 
       //this.gridTwo.api.psGetSelectedNode().data.PAY_TO_NAME,
       this.dateUtil.getYYYYMMDDDashFromDate(this.model.chequePrepared.POST_DATE),
       this.model.chequePrepared.IS_GL_POST
    ).subscribe(result => {
      if (!this.utilityService.checkResp(result)) return;
      this.model.chequePrepared.V_ID = result.body.P_V_ID;
      this.model.chequePrepared.V_NO = result.body.P_V_NO;
      if (result.body.P_MGS) {
        //this.alertService.success(result.body.P_MGS);
        this.toastr.success(result.body.P_MGS, 'Success');
      }
    });
  }


    //lok
  
  
  //#endregion
  onBlurChequeDate() {
    this.getOpeningBalance();
  }
  private getOpeningBalance() {
    this.dataService.getOpBalance(
      this.dateUtil.getYYYYMMDDDashFromDate(this.model.filterOption.CHEQUE_DATE_FORM),
      this.dateUtil.getYYYYMMDDDashFromDate(this.model.filterOption.CHEQUE_DATE_TO),
      this.model.bankinfo.ACC_NO).subscribe(result => {
        this.model.openingBalance = result.body.return;
        this.ChequeAmtByChequeBookId();
      })
  }

  private ChequeAmtByChequeBookId() {
    this.comService.getChequeAmtByChequeBookId(this.model.bankinfo.CHECKBOOK_ID).subscribe(result => {
      this.model.probableBalance = Number(this.model.openingBalance) - Number(result.body[0].CHECK_AMT);
    });
  }

  private setDefaultValue() {
    this.formParam.ALL = 'A';
    this.formParam.POSTED = 'P';
    this.formParam.UNPOSTED = 'U';
    this.model.filterOptionList = this.utilityService.getEnumList(fixedValues.filterOptionType);
    this.model.settlementTypeList = this.utilityService.getEnumList(fixedValues.settlementType);
    this.model.chequePrepared.FINAL_SETTLEMENT_TYPE = 'C'
    this.model.filterOption.RB_POST = this.formParam.ALL;
    this.model.dateTypeList = this.utilityService.getEnumList(fixedValues.dateType);
  }




  private setDefaultData() {

    this.model.filterOption.CHEQUE_NO = null;
    this.model.bankinfo.CHECKBOOK_ID = null;
    this.model.filterOption.CHEQUE_NO_ALL = null;
    this.model.chequePrepared.STATUS = null;
    //this.model.chequePrepared.CHEQUE_COMPANY_NO = null;
  }

  // Set Cheque prepared Default value
  setChequePreparDefaultVal(){
    let curItem : any = {};
    curItem = this.model.currencyList.find(item => item.CUR_ID == 'BDT');
    this.model.chequePrepared = new ChequePrepared(this.model.chequePreObj);
    this.model.chequePrepared.CUR_NO = curItem.CUR_NO;
    this.model.chequePrepared.EXCHANGE_RATE = curItem.EXCHANGE_RATE;

    console.log('curItem!-', curItem);

    console.log('this.model.currencyList !:-', this.model.currencyList); 

    
    //EXCHANGE_RATE;
  }







  previllageCheck() {
    this.dataLoadService.load('FG_SA_COMM_USER_PREVILAGE/MAP', {
      P_CURRFORM: this.model.FORM_ID
    }).subscribe(result => {
      this.model.userPrivilege = new UserPrivileges(result.body);
      //this.getHealthInsurance();
    });
  }


  onClickGetDtl(node) {
    if (node.event.target !== undefined) {
      let data = node.data;      
      let actionType = node.event.target.getAttribute("data-action-type");
      switch (actionType) {       
        case "invoiceListModal":
          return this.openInvoiceListModal(node);
        case "suppCostCenterListModal":
          return this.openCostCenterListModal(node);  
      
        // case "uomListModal":
        //   return this.onClickOpenUomListModal(node);  
        case "deleteAction":
          return this.onClickDeleteSupBill(node);    
              
        default:
      }
    } else {

    }
  }

  // Delete Supplier bill gitd row
  private onClickDeleteSupBill(row): void {
    if (row.data.SQL_STATE == fixedValues.sqlState.sqlInsert) {
      this.dtlGrid.api.updateRowData({ remove: [row.data] });
    } else {
      row.data.SQL_STATE = fixedValues.sqlState.sqlDelete;
      this.dtlGrid.api.psRemove();
    }
  }


  onClickGetMsd(node) {
    if (node.event.target !== undefined) {
      let data = node.data;
      let actionType = node.event.target.getAttribute("data-action-type");
      switch (actionType) {
        case "MoneyCostListModal":
          return this.openMonyCostListModal(node);      
        case "deleteAction":
          return this.onClickDeleteMsd(node);    

        default:
      }
    } else {

    }
  }

  onClickGetSer(node) {
    if (node.event.target !== undefined) {
      let data = node.data;
      let actionType = node.event.target.getAttribute("data-action-type");
      switch (actionType) {            
        case "deleteAction":
          this.serGrid.api.psRemoveGrid(node);          
          return;    

        default:
      }
    } else {

    }
  }

  // Open money cost center modal
  openMonyCostListModal(e){      
    
    this.modalService.openDialog('CommonListModule', 'list', {
      title: this.langService.langData.invoiceList,
        data: {
        gridId: "MonyeCostCenterListGridID",
        columnDefs: costCenterColumnDef,
        api: 'FG_AC1023_SCHEDULE_LIST',
        params:{}
      }, settings: { modalClass: 'md' }
    }).then((modal: any) => {
      modal.closed = () => {
        e.api.psSetCellFocus();
      };
      modal.success = (data) => { 
        console.log('data', data);
        e.node.setDataValue('MONEYREQ_ID', data ? data.MONEYREQ_ID : '');
        e.node.setDataValue('SCHEDULE_ID', data ? data.MONEYSCHEDULE_ID : null);
        e.node.setDataValue('COST_CENTER', data ? data.COST_CENTER : null);
        e.node.setDataValue('PAY_AMT', data ? data.PANDING_AMOUNT : null);
        e.node.setDataValue('DUE_AMT', data ? data.DUE_AMT : null);
        e.node.data.SCHEDULE_NO = data ? data.MONEYSCHEDULE_NO : null;
        e.node.data.COST_NO = data ? data.COST_NO : null;     
        e.api.psSetCellValue();     
      };
    });
  }




  private onClickDeleteMsd(row): void {
    if (row.data.SQL_STATE == fixedValues.sqlState.sqlInsert) {
      this.msdGrid.api.updateRowData({ remove: [row.data] });
    } else {
      row.data.SQL_STATE = fixedValues.sqlState.sqlDelete;
      this.msdGrid.api.psRemove();
    }
  }


  // Open invoice list modal
  openInvoiceListModal(e){      
    
    this.modalService.openDialog('CommonListModule', 'list', {
      title: this.langService.langData.invoiceList,
        data: {
        gridId: "InvoiceAc1023ListGridID",
        columnDefs: invoiceListColumnDefs,
        api: 'FG_IN_COMM_INVOICE_LIST',
        params:{}
      }, settings: { modalClass: 'lg' }
    }).then((modal: any) => {
      modal.closed = () => {
        e.api.psSetCellFocus();
      };
      modal.success = (data) => {        
        console.log('data ', data);
        if (!this.checkDuplicataedValueOfQuery2(data, e)) {

          e.node.setDataValue('SUPPLIER_NAME', data ? data.SUPPLIER_NAME : '');
          e.node.setDataValue('COST_NAME', data ? data.COST_NAME : null);
          e.node.setDataValue('DOC_NO', data ? data.DOC_NO : null);
          e.node.setDataValue('INVOICE_VALUE', data ? data.INVOICE_VALUE : null);
          e.node.setDataValue('AUDITED_VALUE', data ? data.AUDITED_VALUE : null);
          e.node.setDataValue('DUE_AMT', data ? data.AUDITED_VALUE : null);
          // Remove able field 
          //e.node.setDataValue('DUE_AMT', data ? data.PENDING_VALUE : null);          
          e.node.setDataValue('PAY_AMT', data ? data.PENDING_VALUE : null);          
          e.node.data.BILL_NO = data ? data.BILL_NO : null;
          e.node.data.WO_ID = data ? data.WO_ID : null;
          e.node.data.SUPPLIER_NO = data ? data.SUPPLIER_NO : null;
          e.node.data.COST_NO = data ? data.COST_NO : null;
          e.node.data.CUR_NO = data ? data.CUR_NO : null;
          e.node.data.REF_NO = data ? data.REF_NO : null;           
          e.api.psSetCellValue(); 
                            
      } else {
          this.toastr.info('Duplicate record found!', 'info')
      }       
      };
    });
  }

  checkDuplicataedValueOfQuery2(data, e) {
    if (data) {
        let tempList = this.dtlGrid.api.psGridDataList();
        let result = tempList.find(item => item.REF_NO == data.REF_NO)
        return result ? true : false
    }

  }

  // Open cost center list modal
  openCostCenterListModal(row){      
    let gridColumnDefs = [
      { headerName: this.langService.langData.name, field: 'COST_NAME', Filter: true },             
    ];
    this.modalService.openDialog('CommonListModule', 'list', {
      title: this.langService.langData.buyerStyle,
        data: {
        gridId: "CostCenterAc1023ListGridID",
        columnDefs: gridColumnDefs,
        api: 'FG_IN_COMM_INVOICE_LIST',
        params:{}
      }, settings: { modalClass: 'sm' }
    }).then((modal: any) => {
      modal.closed = () => {
        row.api.psSetCellFocus();
      };
      modal.success = (result) => {        
        console.log("result", result);       
        row.node.setDataValue("COST_NAME", result ? result.COST_NAME : '' );                 
        row.node.data.COST_NO = result ? result.COST_NO : null;                 
        row.api.psSetCellValue();        
      };
    });
  }

  onClickSDotRecall(){
    let func = 'FG_AC1023_SRECALL_PAY';
    this.chequeRreparedRecall(func, 's');
  } 

  onClickMDotRecall(){
    let func = 'FG_AC1023_MRECALL_PAY';
    this.chequeRreparedRecall(func, 'm');
  } 

  async onClickRecall(){   
    let recallChkObj = await this.dataLoadService.load("FG_AC1023_RECALL_CHK/map", {     
      P_CHECK_NO: this.model.chequePrepared.CHECK_NO,       
    }).toPromise();
    console.log('recallChkObj', recallChkObj);
    if(recallChkObj.body.SERVIC_BILL_CHK > 0 ){
      let func = 'FG_AC1023_SER_RECALL_PAY';
      this.chequeRreparedRecall(func, 'ser');
    }else if(recallChkObj.body.SUP_BILL_CHK > 0 ){      
        let func = 'FG_AC1023_SRECALL_PAY';
        this.chequeRreparedRecall(func, 's');      
    }else if(recallChkObj.body.MONEY_PAY_CHK > 0 ){      
        let func = 'FG_AC1023_MRECALL_PAY';
        this.chequeRreparedRecall(func, 'm');      
    }  
  }

  chequeRreparedRecall(_func, _recall){   
    let bankInfo: any = {};
    let sRecallPayList: any = [];
    this.dataLoadService.load("FG_AC_COMM_BANK_CHEQUE_INFO/map", {
      P_QUERYOPTIONS:  12,
      P_CHECKBOOK_ID: null,
      P_CHECKID: null,
      P_ACC_NO: null,
      P_CHECK_NO: this.model.chequePrepared.CHECK_NO,
      P_CHEQUE_AUTHO_NO: null
    }).subscribe(res =>{
      bankInfo = res.body;
      //console.log('res!!', res);
      if(bankInfo.CNT == 1){
        this.dataLoadService.load(_func, {        
          P_CHECK_NO: this.model.chequePrepared.CHECK_NO,         
        }).subscribe(res =>{ 
          sRecallPayList = res.body;
          if(sRecallPayList.length > 0 ){
           this.assingDataInChequePrepared(sRecallPayList, _recall);
          }          
        });
      }else{
        this.toastr.warning('Record already saved..!', 'Warning');
      }

    });
  }

  assingDataInChequePrepared(list, _recall?: any){  
    //console.log('list!!', list);  
    //console.log('_recall!', _recall);
    let tmpChequePrepard = list.map(el => {
      el["SQL_STATE"] = _recall ? fixedValues.sqlState.sqlInsert : fixedValues.sqlState.sqlUnchange;
      el["CHECK_NO"] = this.model.chequePrepared.CHECK_NO; 
      //( typeof(el.DR_CR) != 'undefined' && el.DR_CR == null &&  el.DR_CR.toLowerCase() != "dr" ) ?               
      el['DR_CR'] = _recall ? el.TYPE : el.DR_CR;
      el['CHECK_AMT'] = _recall ? el.PAY_AMT : el.CHECK_AMT ;
      el['DR'] = _recall ? el.PAY_AMT : el.DR;
      el['CR'] = el.CR;
      el["BASE_AMOUNT_DR"] = Number(this.model.chequePrepared.EXCHANGE_RATE) * Number(el.DR) ;
      el["BASE_AMOUNT_CR"] = Number(this.model.chequePrepared.EXCHANGE_RATE) * Number(el.CR);  
      el['DESCR'] = _recall ? el.INVOICE_NO : el.DESCR;
      el['PAY_TO_ACC_NO'] = _recall == 's' ? el.ACC_NO : el.PAY_TO_ACC_NO;

      // Confused about this statement 
      this.model.chequePrepared['PAY_TO_ACC_NO']= el.PAY_TO_ACC_NO;
      // Business not remove this code  
      // M.recall
      // QUERY_SOUCE1.DR_CR = QUERY1.TYPE;
      // QUERY_SOUCE1.CHECK_AMT = QUERY1.PAY_AMT;
      // DR  = QUERY1.PAY_AMT;
      // QUERY_SOUCE1.COST_NO = QUERY1.COST_NO;
      // Cost Center = QUERY1.COST_NAME;
      // QUERY_SOUCE1.DESCR = QUERY1.INVOICE_NO;

      // S.Recall
      // On account of = QUERY1.ACC_NAME;
      // QUERY_SOUCE1.PAY_TO_ACC_NO = QUERY1.ACC_NO;
      // QUERY_SOUCE1.DR_CR = QUERY1.TYPE;
      // Dr = QUERY1.PAY_AMT;
      // QUERY_SOUCE1.CHECK_AMT = QUERY1.PAY_AMT;
      // QUERY_SOUCE1.COST_NO = QUERY1.COST_NO;
      // Cost Center = QUERY1.COST_NAME;
      // QUERY_SOUCE1.DESCR = QUERY1.INVOICE_NO;

      // SER Recall
      // On account of = QUERY3.ACC_NAME;
      // QUERY_SOUCE3.PAY_TO_ACC_NO = QUERY3.ACC_NO;
      // QUERY_SOUCE3.DR_CR = QUERY3.TYPE;
      // Dr = QUERY3.PAY_AMT;
      // QUERY_SOUCE3.CHECK_AMT = QUERY3.PAY_AMT;
      // QUERY_SOUCE3.COST_NO = QUERY3.COST_NO;
      // Cost Center = QUERY3.COST_NAME;            
      return new ChequPrepareList(el)
    });

    console.log('tmpChequePrepard !!', tmpChequePrepard);
    this.gridTwo.api.setRowData(tmpChequePrepard);
    if (tmpChequePrepard.length > 0) {
      setTimeout(() => {
        this.gridTwo.api.getDisplayedRowAtIndex(0).setSelected(true);
      }, 100);
    }
    this.model.chequePerparedList = JSON.parse(JSON.stringify(tmpChequePrepard))
    this.model.chequePerparedListBackup = JSON.parse(JSON.stringify(tmpChequePrepard));   
    this.model.chequePerparedListTotalAmount = this.model.chequeTotalAmountSum(tmpChequePrepard);  
  }

  onClickAddSupBill(){
    this.dtlGrid.api.psAddNewGrid(BillCheckdtl, { CHECK_NO: this.model.chequePrepared.CHECK_NO });         
  }

  onClickResetSupBill(){
    this.dtlGrid.api.psClearFilter();
    this.dtlGrid.api.psResetValidation();
    let supBillList = JSON.parse(JSON.stringify(this.model.billCheckDtlListBackup)); 
    this.dtlGrid.api.setRowData(supBillList);    
  }


  onClickAddMsd(){
    this.msdGrid.api.psAddNewGrid(Moneycheckpay, { CHECK_NO: this.model.chequePrepared.CHECK_NO });         
  }

  onClickResetMsd(){
    this.msdGrid.api.psClearFilter();
    this.msdGrid.api.psResetValidation();
    let msdList = JSON.parse(JSON.stringify(this.model.msdListListBackup)); 
    this.msdGrid.api.setRowData(msdList);    
  }


  onClickAddSer(){
    this.serGrid.api.psAddNewGrid(Servicecheckpay, { CHECK_NO: this.model.chequePrepared.CHECK_NO });         
  }

  onClickResetSer(){
    this.serGrid.api.psClearFilter();
    this.serGrid.api.psResetValidation();
    let serList = JSON.parse(JSON.stringify(this.model.serBillListBackup)); 
    this.serGrid.api.setRowData(serList);    
  }
  

  onClickTabItem(tabNumber) {
    this.model.currentTabNumber = tabNumber;
  } 

  private chequeRelatedColumnDef() {
    this.colObj = [
      {
        headerName: '',
        sortable: true,
        resizable: false,
        width: 25,
        hide: false,
        field: '_loadDtls',
        pinned: "left",
        editable: false,
        cellStyle: { textAlign: "center" },
        cellRenderer: render => {
          return (
            ` <button class="btn btn--squire border-0" type="button" data-action-type="onClickLoadDtl"> <i
                class="fa fa-mouse-pointer" data-action-type="onClickLoadDtl"></i></button>`
          );
        }
      },
      {
        headerName: this.langService.langData.inactiveQus,
        field: 'ACTIVE_STAT',
        width: 33,
        cellRenderer: 'checkboxRenderer',
        cellEditorParams: { psCheckedData: 0 },
        sortable: false,
        editable: false,
        resizable: true,
        filter: false,
        hide: false
      },
      {
        headerName: this.langService.langData.chequeNo,
        field: 'CHECK_ID',
        width: 85,
        sortable: true,
        editable: false,
        resizable: true,
        filter: true,
        hide: false
      },
      {
        headerName: this.langService.langData.chequeDate,
        field: 'CHECK_DATE',
        cellRenderer: 'datePipeRenderer',
        width: 73,
        sortable: true,
        editable: false,
        resizable: true,
        filter: true,
        hide: false
      },
      {
        headerName: this.langService.langData.postDate,
        field: 'POST_DATE',
        cellRenderer: 'datePipeRenderer',
        width: 73,
        sortable: true,
        editable: false,
        resizable: true,
        filter: true,
        hide: false
      },
      {
        headerName: this.langService.langData.chequeType,
        field: 'STATUS',
        sortable: true,
        editable: false,
        resizable: true,
        width: 55,
        filter: true,
        hide: false
      },
      {
        headerName: this.langService.langData.amount,
        field: 'CHECK_AMT',
        sortable: true,
        editable: false,
        resizable: true,
        filter: true,
        width: 80,
        cellRenderer: 'numberPipeRenderer',
        hide: false
      },
      {
        headerName: this.langService.langData.settlementType,
        field: 'SETTLEMENT',
        sortable: true,
        editable: false,
        resizable: true,
        width: 80,
        filter: true,
        hide: false
      },
      {
        headerName: this.langService.langData.payTo,
        field: 'PAY_TO_NAME',
        sortable: true,
        editable: false,
        resizable: true,
        width: 80,
        filter: true,
        hide: false
      },    
    ];
    this.columnDefs = this.gridService.getColumnDefs(this.colObj, this.gridId);

  }

  //#endregion
  //#region Cheque Prepared


  onClickDeleteChequePrepared(row) {
    if (row.data.SQL_STATE == fixedValues.sqlState.sqlInsert) {
      this.gridTwo.api.updateRowData({ remove: [row.data] });
    } else {
      row.data.SQL_STATE = fixedValues.sqlState.sqlDelete;
      this.gridTwo.api.psRemove();
    }
  }

  private chequePreparedColumnDef() {
    this.colObjTwo = [

      {
        headerName: this.langService.langData.drOblicCr,
        field: "DR_CR",
        sortable: true,
        filter: true,
        resizable: false,
        hide: false,
        width: 50,
        pinned: "left",
        suppressSizeToFit: true,
        editable: this.isColumnEditable.bind(this),
        cellEditor: "selectCellEditor",
        cellRenderer: "selectRenderer",
        cellEditorParams: {
          list: this.drCrList,
          psAffectedCols: ["DR", "CR"],
          psCallbackAfterChange: this.onGridAfterChangeGridTwo.bind(this)
        },
        pinnedRowCellRenderer: pin => {
          return;
        }
      },

      {
        headerName: this.langService.langData.payTo,
        field: 'PAY_TO_NAME',
        sortable: true,
        resizable: true,
        filter: true,
        width: 130,
        hide: false,
        editable: this.isColumnEditable.bind(this),
        cellEditor: "modalAndTextCellEditor",
        cellEditorParams: { psActionType: 'payToModal', psAffectedCols: [], psText: true },
        refferenceKey:"PAY_TO_ACC_NO",
        copyAbleFields: [
         "PAY_TO_ACC_NO"   
        ]
      },
      {
        headerName: this.langService.langData.onAccountOf,
        field: 'ACC_NAME',
        sortable: true,
        resizable: true,
        filter: true,
        width: 130,
        hide: false,
        editable: this.isColumnEditable.bind(this),
        cellEditor: "modalCellEditor",
        cellEditorParams: { psActionType: 'accountListModal', psAffectedCols: ['ACC_NAME'] },
        refferenceKey:"ACC_NO",
        copyAbleFields: [
         "ACC_NO", "ACC_CODE", "ACC_PATH",
         "MAP_ACC_NAME", "MAP_ACC_NO"   
        ]
      },
      {
        headerName: this.langService.langData.costCenter,
        field: 'COST_NAME',
        sortable: true,
        resizable: true,
        filter: true,
        width: 130,
        hide: false,
        editable: this.isColumnEditable.bind(this),
        cellEditor: "modalCellEditor",
        cellEditorParams: { psActionType: 'costCenterListModal', psAffectedCols: ['COST_NAME'] },
        refferenceKey:"COST_NO",
        copyAbleFields: [
         "COST_NO"  
        ]      
      },
      {
        headerName: this.langService.langData.businessArea,
        field: 'BA_NAME',
        sortable: true,
        resizable: true,
        filter: true,
        width: 130,
        hide: false,
        editable: this.isColumnEditable.bind(this),
        cellEditor: "modalCellEditor",
        cellEditorParams: { psActionType: 'businessAreaListModal', psAffectedCols: ['BA_NAME'] },
        refferenceKey:"BA_NO",
        copyAbleFields: [
         "BA_NO"  
        ]
      },
      {
        headerName: this.langService.langData.description,
        field: 'DESCR',
        sortable: true,
        resizable: true,
        filter: true,
        width: 150,
        editable: this.isColumnEditable.bind(this),
        hide: false,
        cellRenderer: "textCellRenderer",
        cellEditor: "textCellEditor",
      },
      // {
      //   headerName: this.langService.langData.amount,
      //   field: 'CHECK_AMT',
      //   sortable: true,
      //   resizable: true,
      //   filter: true,
      //   width: 90,
      //   editable: this.isColumnEditable.bind(this),
      //   hide: false,
      //   cellRenderer: "numberPipeRenderer",
      //   cellEditor: "decimalCellEditor",
      //   cellEditorParams: { psAffectedCols: ['BASE_AMOUNT'], psCallbackAfterChange: this.checkAmoutChange.bind(this) },
      // },
     
      {
        headerName: this.langService.langData.dr,
        field: "DR",
        sortable: false,
        filter: true,
        resizable: true,
        hide: false,
        width: 85,
        suppressSizeToFit: true,
        //suppressKeyboardEvent: this.onCellKeyDown.bind(this),
        editable: this.isColumnEditable.bind(this),
        //editable: false,
        cellRenderer: "numberPipeRenderer",
        cellEditor: "decimalCellEditor",
        cellEditorParams: {
          psCallbackAfterChange: this.onGridAfterChangeGridTwo.bind(this),
          psReadonly: this.checkReadOnly.bind(this)
        },
        pinned: "right"
      },
      {
        headerName: this.langService.langData.cr,
        field: "CR",
        sortable: false,
        filter: true,
        resizable: true,
        hide: false,
        width: 85,
        suppressSizeToFit: true,
        //suppressKeyboardEvent: this.onCellKeyDown.bind(this),
        editable: this.isColumnEditable.bind(this),
        //editable: false,
        cellRenderer: "numberPipeRenderer",
        cellEditor: "decimalCellEditor",
        cellEditorParams: {
          psCallbackAfterChange: this.onGridAfterChangeGridTwo.bind(this),
          psReadonly: this.checkReadOnly.bind(this)
          // psMax: '6,2'
        },
        pinned: "right"
      },
      {
        headerName: this.langService.langData.baseAmountDr,
        field: 'BASE_AMOUNT_DR',
        sortable: true,
        resizable: true,
        filter: true,
        width: 5,
        editable: false,
        hide: false,
        cellRenderer: "numberPipeRenderer",
        // cellEditor: "decimalCellEditor",
        pinned: "right"
      },
      {
        headerName: this.langService.langData.baseAmountCr,
        field: 'BASE_AMOUNT_CR',
        sortable: true,
        resizable: true,
        filter: true,
        width: 5,
        editable: false,
        hide: false,
        cellRenderer: "numberPipeRenderer",
        // cellEditor: "decimalCellEditor",
        pinned: "right"
      },
      {
        headerName: this.langService.langData.action,
        field: '_delete',
        sortable: false,
        resizable: true,
        pinned: "right",
        width: 50,
        hide: false,
        cellStyle: { textAlign: "center" },
        pinnedRowCellRenderer: pin => { return; },
        cellRenderer: this.checkDeletePrev.bind(this)
      }      
    ];
    this.columnDefsTwo = this.gridService.getColumnDefs(this.colObjTwo, this.gridIdTwo);
  }

  checkDeletePrev(params) { 
    if (this.model.userPrivilege.checkDeletePrev(params)) {
      return ` <button type="button" data-action-type="deleteAction" class="btn btn--squire text-danger border-0"><i class="ion-close" data-action-type="deleteAction"></i></button>`
    } else return '';
  }

  //#endregion
  checkAmoutChange(event) {
    this.gridTwo.api.psGetSelectedNode().setDataValue('BASE_AMOUNT', Number(this.model.chequePrepared.EXCHANGE_RATE) * Number(event.value));
    this.gridTwo.api.psSetCellValue();

  }


  dtlGridColDef(){
    this.dtlColObj = [                   
      {
        headerName: this.langService.langData.supplier,
        field: 'SUPPLIER_NAME',
        sortable: true,
        filter: true,
        resizable: true,
        width: 120,
        hide: false,
        editable: this.isColumnEditable.bind(this),
        refferenceKey:"SUPPLIER_NO",
        copyAbleFields: [
          "COST_NAME", "DOC_NO", "INVOICE_VALUE", "AUDITED_VALUE", "DUE_AMT",
            "PAY_AMT", "BILL_NO", "WO_ID", "COST_NO", "CUR_NO", "REF_NO"
        ],
        cellEditor: "modalCellEditor",
        cellEditorParams: {
          psActionType: "invoiceListModal",
          psAffectedCols: ["COST_NAME", "DOC_NO", "INVOICE_VALUE", "AUDITED_VALUE", "DUE_AMT",
            "PAY_AMT", "BILL_NO", "WO_ID", "SUPPLIER_NO", "COST_NO", "CUR_NO", "REF_NO" 
          ]
        }
      }, 
      {
        headerName: this.langService.langData.costCenter,
        field: 'COST_NAME',
        sortable: true,
        filter: true,
        resizable: true,
        width: 120,
        hide: false,
        editable: this.isColumnEditable.bind(this),
        cellEditor: "modalCellEditor",
        cellEditorParams: { psActionType: 'suppCostCenterListModal'}      
      }, 
      {
        headerName: this.langService.langData.empBillNo ,
        field: 'DOC_NO',
        sortable: true,
        filter: true,
        resizable: true,
        width: 120,
        hide: false,
        editable: this.isColumnEditable.bind(this),
        refferenceKey:"BILL_NO",
        copyAbleFields: [
          "COST_NAME", "DOC_NO", "INVOICE_VALUE", "AUDITED_VALUE", "DUE_AMT",
            "PAY_AMT", "BILL_NO", "WO_ID", "COST_NO", "CUR_NO", "REF_NO"
        ],
        cellEditor: "modalCellEditor",
        cellEditorParams: {
          psActionType: "invoiceListModal",
          psAffectedCols: ["COST_NAME", "INVOICE_VALUE", "AUDITED_VALUE", "DUE_AMT",
            "PAY_AMT", "SUPPLIER_NAME", "WO_ID", "SUPPLIER_NO", "COST_NO", "CUR_NO", "REF_NO" 
          ]
        }
      }, 
      {
        headerName: this.langService.langData.invoiceValue,
        field: 'INVOICE_VALUE',
        sortable: true,
        editable: false,
        filter: true,
        width: 75,
        resizable: true,
        hide: false,
        cellRenderer: "numberPipeRenderer",
        cellEditor: "decimalCellEditor"
      },
      {
        headerName: this.langService.langData.auditedValue,
        field: 'AUDITED_VALUE',
        sortable: true,
        editable: false,
        filter: true,
        width: 75,
        resizable: true,
        hide: false,
        cellRenderer: "numberPipeRenderer",
        cellEditor: "decimalCellEditor",
        pinned: "right"
      },
      {
        headerName: this.langService.langData.dueAmt,
        field: 'DUE_AMT',        
        sortable: true,
        editable: false,
        filter: true,
        width: 75,
        resizable: true,
        hide: false,
        cellRenderer: "numberPipeRenderer",
        cellEditor: "decimalCellEditor",
        cellEditorParams: {
          psCallbackAfterChange: this.onGridAfterChange.bind(this),          
        },
        pinned: "right"
      },
      {
        headerName: this.langService.langData.advDotAdj,
        field: 'ADVANCE_PAY_AMT',        
        sortable: true,
        editable: false,
        filter: true,
        width: 75,
        resizable: true,
        hide: false,
        cellRenderer: "numberPipeRenderer",
        cellEditor: "decimalCellEditor",
        cellEditorParams: {
          psCallbackAfterChange: this.onGridAfterChange.bind(this),          
        },
        pinned: "right"
      },
      // DUE_AMT
      {
        headerName: this.langService.langData.payAmt,
        field: 'PAY_AMT',
        sortable: true,
        editable: this.isColumnEditable.bind(this),
        filter: true,
        width: 75,
        resizable: true,
        hide: false,
        cellRenderer: "numberPipeRenderer",
        cellEditor: "decimalCellEditor",
        cellEditorParams: {
          psCallbackAfterChange: this.onGridAfterChange.bind(this),          
        },
        pinned: "right"
      },         
      {
        headerName: this.langService.langData.totalPay,
        field: 'TOTAL_PAY',
        sortable: true,
        editable: this.isColumnEditable.bind(this),
        filter: true,
        width: 75,
        resizable: true,
        hide: false,
        cellRenderer: "numberPipeRenderer",
        cellEditor: "decimalCellEditor",
        cellEditorParams: {
          psCallbackAfterChange: this.onGridAfterChange.bind(this),          
        },
        pinned: "right"
      },
      
      {
        headerName: this.langService.langData.action,
        field: '_delete',
        sortable: false,
        width: 50,
        resizable: false,
        hide: false,
        pinned: "right",
        cellStyle: { textAlign: "center" },
        cellRenderer: this.checkDeletePrev.bind(this),
        pinnedRowCellRenderer: pin => { return; } 
      }, 

    ];
    this.dtlColumnDefs = this.gridService.getColumnDefs(this.dtlColObj, this.dtlGridId);
  }

  msdGridColDef() {
    this.msdColObj = [
      {
        headerName: this.langService.langData.entryNo,
        field: 'SUPPLIER',
        sortable: true,
        filter: true,
        resizable: true,
        width: 120,
        hide: false,
        editable: this.isColumnEditable.bind(this),        
      },
      {
        headerName: this.langService.langData.costCenter,
        field: 'COST_CENTER',
        sortable: true,
        filter: true,
        resizable: true,
        width: 120,
        hide: false,
        editable: this.isColumnEditable.bind(this),    
        cellEditor: "modalCellEditor",
        cellEditorParams: { psActionType: 'MoneyCostListModal',         
          psAffectedCols: [
            "SCHEDULE_ID",            
            "MONEYREQ_ID",
            "DUE_AMT",
            "PAY_AMT"            
          ]
        },
        refferenceKey:"COST_NO",
        copyAbleFields: [
          "SCHEDULE_ID",            
          "MONEYREQ_ID",
          "DUE_AMT",
          "PAY_AMT"    
        ]
      },
      {
        headerName: this.langService.langData.workOrder,
        field: 'FIELD_NAME',
        sortable: true,
        filter: true,
        resizable: true,
        width: 120,
        hide: false,
        editable: this.isColumnEditable.bind(this),      
      },     
      {
        headerName: this.langService.langData.scheduleNo,
        field: 'SCHEDULE_ID',
        sortable: true,
        filter: true,
        resizable: true,
        width: 120,
        hide: false,
        editable: this.isColumnEditable.bind(this),
        cellEditor: "modalCellEditor",
        cellEditorParams: { psActionType: 'MoneyCostListModal',         
          psAffectedCols: [
            "SCHEDULE_ID",            
            "MONEYREQ_ID",
            "DUE_AMT",
            "PAY_AMT"            
          ]
        },
        refferenceKey:"SCHEDULE_NO",
        copyAbleFields: [
          "SCHEDULE_ID",            
          "MONEYREQ_ID",
          "DUE_AMT",
          "PAY_AMT"    
        ]
      },
      {
        headerName: this.langService.langData.requisitionNo,
        field: 'MONEYREQ_ID',
        sortable: true,
        filter: true,
        resizable: true,
        width: 120,
        hide: false,
        editable: this.isColumnEditable.bind(this),
        cellEditor: "modalCellEditor",
        cellEditorParams: { psActionType: 'MoneyCostListModal',
          psAffectedCols: [
            "SCHEDULE_ID",            
            "MONEYREQ_ID",
            "DUE_AMT",
            "PAY_AMT"            
          ]
        },      
        copyAbleFields: [
          "SCHEDULE_ID",            
          "MONEYREQ_ID",
          "DUE_AMT",
          "PAY_AMT"    
        ]
      },
      {
        headerName: this.langService.langData.dueAmt,
        field: 'DUE_AMT',
        sortable: true,
        filter: true,
        resizable: true,
        pinned: "right",
        width: 100,
        hide: false,
        editable: this.isColumnEditable.bind(this),
        cellEditor: "modalCellEditor",
        cellEditorParams: { psActionType: 'MoneyCostListModal',
          psAffectedCols: [
            "SCHEDULE_ID",            
            "MONEYREQ_ID",
            "DUE_AMT",
            "PAY_AMT"            
          ]
        },      
        copyAbleFields: [
          "SCHEDULE_ID",            
          "MONEYREQ_ID",
          "DUE_AMT",
          "PAY_AMT"    
        ]
      },
      {
        headerName: this.langService.langData.payAmt,
        field: 'PAY_AMT',
        sortable: true,
        editable: this.isColumnEditable.bind(this),
        filter: true,
        width: 75,
        pinned: "right",
        resizable: true,
        hide: false,
        cellRenderer: "numberPipeRenderer",
        cellEditor: "decimalCellEditor"
      },          
      {
        headerName: this.langService.langData.action,
        field: '_delete',
        sortable: false,
        width: 50,
        resizable: false,
        hide: false,
        pinned: "right",
        cellStyle: { textAlign: "center" },
        cellRenderer: this.checkDeletePrev.bind(this),
        pinnedRowCellRenderer: pin => { return; } 
      }, 

    ];
    this.msdColumnDefs = this.gridService.getColumnDefs(this.msdColObj, this.msdGridId);
  }

  serGridColDef() {
    this.serColObj = [
      {
        headerName: this.langService.langData.entryNo,
        field: 'SUPPDOC_ID',
        sortable: true,
        filter: true,
        resizable: true,
        width: 100,
        hide: false,
        editable: this.isColumnEditable.bind(this),        
      },
      {
        headerName: this.langService.langData.billNo,
        field: 'SUPPINVOICE_ID',
        sortable: true,
        filter: true,
        resizable: true,
        width: 100,
        hide: false,
        editable: this.isColumnEditable.bind(this),        
      },
      {
        headerName: this.langService.langData.supplierName,
        field: 'SUPPLIER_NAME',
        sortable: true,
        filter: true,
        resizable: true,
        width: 158,
        hide: false,
        editable: this.isColumnEditable.bind(this),        
      },
      {
        headerName: this.langService.langData.itemType,
        field: 'ITEM_TYPE',
        sortable: true,
        filter: true,
        resizable: true,
        width: 93,
        hide: false,
        editable: this.isColumnEditable.bind(this),        
      },
      {
        headerName: this.langService.langData.pendingValue,
        field: 'AUDITED_VALUE',
        sortable: true,
        filter: true,
        resizable: true,
        width: 100,
        hide: false,
        editable: this.isColumnEditable.bind(this),
        cellRenderer: "numberPipeRenderer",
        cellEditor: "decimalCellEditor",
        pinned: "right"        
      },
      {
        headerName: this.langService.langData.payAmt,
        field: 'PAY_AMT',
        sortable: true,
        filter: true,
        resizable: true,
        width: 100,
        hide: false,
        editable: this.isColumnEditable.bind(this), 
        cellRenderer: "numberPipeRenderer",
        cellEditor: "decimalCellEditor",
        pinned: "right"       
      },         
      {
        headerName: this.langService.langData.action,
        field: '_delete',
        sortable: false,
        width: 50,
        resizable: false,
        hide: false,
        pinned: "right",
        cellStyle: { textAlign: "center" },
        cellRenderer: this.checkDeletePrev.bind(this),
        pinnedRowCellRenderer: pin => { return; } 
      }, 

    ];
    this.serColumnDefs = this.gridService.getColumnDefs(this.serColObj, this.serGridId);
  }

  onGridAfterChange(params) {
    switch (params.colDef.field) {
      case "DUE_AMT":
        this.validChkDueAmt(params);
        break;
      case "PAY_AMT":
        this.totalPayFormula(params);  
        this.validChkPayAmt(params);  
        break;  
      case "ADVANCE_PAY_AMT":
        this.totalPayFormula(params);     
        break;      
      default:
        break;
    }
  }

  onGridAfterChangeGridTwo(params) {
    switch (params.colDef.field) {
      case "DR":
        this.calculateBaseAmt(params);        
        break;
      case "CR":
        this.calculateBaseAmt(params);
        break;
      case "DR_CR":
        this.resetDebitCredit(params);
        break;
      default:
        break;
    }
  }

  resetDebitCredit(params) {
    params.node.setDataValue("DR", null);
    params.node.setDataValue("CR", null);
    this.gridTwo.api.psSetCellValue();
    this.calculateBaseAmt(params);
  }
  calculateBaseAmt(params) {
    //Base Amount
    let DR_BASE_AMT = 0;
    let CR_BASE_AMT = 0;
      if( params.node.data.DR_CR && params.node.data.DR_CR.toLowerCase() == "dr" ){
        DR_BASE_AMT = Number(params.node.data.DR) * Number(this.model.chequePrepared.EXCHANGE_RATE);
        params.node.data.CHECK_AMT = params.node.data.DR;
      }else{
        CR_BASE_AMT = Number(params.node.data.CR) * Number(this.model.chequePrepared.EXCHANGE_RATE);
        params.node.data.CHECK_AMT = params.node.data.CR;
      }       
    params.node.setDataValue("BASE_AMOUNT_DR", DR_BASE_AMT);
    params.node.setDataValue("BASE_AMOUNT_CR", CR_BASE_AMT);
    // this.setCRValue(); 
  }
  

  checkReadOnly(params) {
    let result = false;
    switch (params.colDef.field) {
      case "DR":
        console.log("params.data.DR_CR", params.data.DR_CR);
        if ( typeof(params.data.DR_CR) != 'undefined' && params.data.DR_CR && params.data.DR_CR.toLowerCase() != "dr") {
          result = true;
        }
        break;
      case "CR":
        if (typeof(params.data.DR_CR) != 'undefined' && params.data.DR_CR && params.data.DR_CR.toLowerCase() != "cr") {
          result = true;
        }
        break;

      default:
        break;
    }
    return result;
  }


  validChkDueAmt(params) {    
    if( params.data.DUE_AMT ){
      params.node.setDataValue("PAY_AMT", params.data.DUE_AMT);
    }      
    // this.setCRValue();
  }

  validChkPayAmt(params){
    if(params.data.PAY_AMT > params.data.DUE_AMT){
      this.toastr.warning('Pay can not Greater-than Audited value ..!', 'Warning');
      return;
    }
  }

  totalPayFormula(params) {     
    params.node.setDataValue("PAY_AMT", params.data.ADVANCE_PAY_AMT + params.data.PAY_AMT);    
    // this.setCRValue();
  }

  

  



  private displayError(ex): void {
    console.log(ex);
  }

  //this.model.bankinfoBackup = JSON.parse(JSON.stringify(this.model.bankinfo));

  get hasAnyChange():Boolean{
		return this.hasMasterChange;
  }
  
  get hasMasterChange():Boolean{
    // console.log("this.model.bankinfoBackup", this.model.bankinfoBackup);
    // console.log("this.model.bankinfo", this.model.bankinfo);
    // || this.utilityService.psHasAnyChange(this.model.bankinfoBackup, this.model.bankinfo)
    return ( this.hasChildChange )
  }

  get hasChildChange():Boolean{

    // console.log("this.model.chequePreparedBackup", this.model.chequePreparedBackup);
    // console.log("this.model.chequePrepared", this.model.chequePrepared);
    //this.utilityService.psHasAnyChange(this.model.chequePreparedBackup, this.model.chequePrepared)
    return this.gridTwo.api.psGetChangeList().length > 0 ;   
  }



  trackByFn(index, item) {
    return index; // or item.id
  }
  isColumnEditable(params) {
    return this.model.userPrivilege.checkEditablePrev(params);
  }


}