/* angular stuff */
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { DatePipe } from '@angular/common';
/* 3rd party libraries */
import { forkJoin } from 'rxjs';
/* our own stuff */
import { LangService } from 'src/app/core/services/lang.service';
import { globalVariables } from 'src/app/core/constants/globalVariables';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import { DateService, MasterActionService } from 'src/app/shared';
import { ModalService } from 'src/app/shared/services/modal.service';
import { DataService } from '../../services/forms/sales-negotiation/data.service';
import { ModelService } from '../../services/forms/sales-negotiation/model.service';
import { CommonService } from '../../services/common.service';
import { FormParam } from '../../models/form-param';
import { Negotiation } from '../../models/negotiation.model';
import { Negofund } from '../../models/negofund.model';
import { DeleveryReg } from '../../models/delevery-regestration';
import { NegoDetails } from '../../models/nego-details.model';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { Router } from "@angular/router";
import { element } from 'protractor';
import { GridService } from 'src/app/shared/services/grid.service';
import { DynamicModalService } from 'dynamicModal';
import { ToastrService } from 'ngx-toastr';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { CustomerShortColumnDefs, salesListColumnDefs, accountMultiListColumnDefs, CostCenterColumnDefs, accountListColumnDefs, businessAreaColumnDefs, commonCurrencyColumnDefs } from 'src/app/shared/constants/column-defs.enum';
import { FormCommonComponent } from 'src/app/core/base/form-common-component';

@Component({
  selector: 'app-ac1127',
  templateUrl: './../../templates/forms/ac1127.component.html',
  providers: [DatePipe]
})


export class Ac1127Component extends FormCommonComponent implements OnInit {
  @ViewChild('modalContainer', { static: true, read: ViewContainerRef }) container;

  public numberPrecision;
  public psDateFormat: any;
  public dateFormat: any;
  public negoAttachment: string;
  public fileToUpload: File = null;
  public imageToUpload: File = null;
  public formParam: FormParam = new FormParam();

  //AG grid Filter
  public columnDefsFilter = [];
  public colObjFilter;
  public gridFilter: any;
  public gridIdFilter: string = "GridIdFilterHR_1127";
  public rowSelectionFilter = 'single';

  //AG grid
  public columnDefs = [];
  public colObj;
  public grid: any;
  public gridId: string = "FundDeistributionGridAC_1127";

  private validationOptions: any = {
    "drCr": {
      "required": {
        "message": "DR/CR Requred"
      }
    },
    'description': {
      size: {
        min: 0,
        max: 500,
      }
    }
  }
  isFormComeFromAC1108: boolean = false;
  P_CONTRACT_NO: number = null;
  P_DOC_NO: any = null;
  P_DOCUMENT_ID: any = null;
  
  constructor(
    public langService: LangService
    , public actionService: MasterActionService
    , private dataService: DataService
    , public model: ModelService
    , private dateUtil: DateService    
    , private alertService: AlertService
    , private datePipe: DatePipe
    , public gridService: GridService
    , private toastr: ToastrService
    ,private router: Router
    , private comService: CommonService
    , private utilityService: UtilityService
    , private modalService: DynamicModalService
    , private dataLoadService: DataLoadService
    , private modal: ModalService
  ) {    
    super(actionService);
    this.loadIntFormInfo() ;
    this.numberPrecision = globalVariables.numberPrecision;
    this.getColumnDefFilter();
    this.getColumnDefination();
  }

  loadIntFormInfo(){  
  
 
     // const navigation = this.utilityService.getExtras(this.router, this.formParam.FORM_ID);     
     const navigation = this.utilityService.getExtras(this.router, 'AC_1127');
     if (navigation.extras.state) {
         const state1 = navigation.extras.state as { P_CONTRACT_NO: number };
         const state2 = navigation.extras.state as { P_DOC_NO: string };
         const state3 = navigation.extras.state as { P_DOCUMENT_ID: string };
         
         this.P_CONTRACT_NO = state1.P_CONTRACT_NO;
         this.P_DOC_NO = state2.P_DOC_NO;
         this.P_DOCUMENT_ID = state3.P_DOCUMENT_ID;
         this.isFormComeFromAC1108 = true;
         // P_BILL_PAYNO: this.isFormComeFromAC1108 ? this.P_PAY_NO : this.formParam.PAY_NO,//this.formParam.CHALLAN_NO,
     }
      
    }

  ngOnInit() {
    this.formParam.FORM_ID = 'AC_1127'
    this.psDateFormat = globalVariables.psDateFormat;
    this.dateFormat = globalVariables.dateFormat.dateFormat;    
    this.setDefaultData();

    let promiseAll = [
      this.comService.getBaseCurrency(),
      this.comService.getBankDocSetup(),
      this.comService.getSalesNegotiations(),
      this.comService.getBankRefList(this.formParam.STATUS),
      this.comService.getCurrency(),
    ];
    forkJoin(
      promiseAll
    ).subscribe(results => {
      this.model.baseCurrencyList = results[0].body;
      this.model.bankDocSetupList = results[1].body;
      this.model.salesGegotiationsList = results[2].body;
      this.model.bankRefList = results[3].body;
      this.model.currencyList = results[4].body;
    }, error => {
      this.displayError(error);
    });

    let _this = this;
    window.addEventListener('keydown', function(e:any, ) {     
      if (e.altKey == true && e.keyCode == 90){
        console.log('Alt + Z'); 
        console.log('_this', _this);
        _this.ALTZaction();
      }
    });

  }

  ALTZaction(){     
    this.dataService.procGetNegoDescr({
      P_CUST_NO: this.model.negotiationData.CUSTOMER_NO,
      P_BANK_NO: this.model.negotiationData.OWN_BANKDTL_NO
    }).subscribe(result => {
      console.log('result', result);
      if(result.body){
        this.model.negotiationData.NEGOTIATION_DESCR = result.body.P_OUT_DESCR;
      }
    })        
  }

  handleFileInput(event, type) {
    console.log(event);
    if (event.target.files.length <= 0) return;
    switch (type) {
      case "doc":
        this.negoAttachment = event.target.files.item(0).name;
        this.fileToUpload = event.target.files.item(0);
        break;
      case "img":
        this.negoAttachment = event.target.files.item(0).name;
        this.imageToUpload = event.target.files.item(0);
        break;
      default:
        break;
    }

  }

  onClickUpload(type) {
    switch (type) {
      case 'doc':
        if (!this.fileToUpload) break;
        this.uploadFile();
        break;
      case 'img':
        if (!this.imageToUpload) break;
        this.uploadImage();
        break;

      default:
        break;
    }
  }

  private uploadFile() {
    let formData = new FormData();
    // formData.append('DOCUMENT_REF_TYPE_ID', this.refTypeId);
    // formData.append('DOCUMENT_REF_ID', this.refId);
    // formData.append('DOCUMENT_TYPE', 'doc');
    // formData.append('NOTE', '');
    // formData.append('file', this.fileToUpload);
    // this.apiService.saveFile(coreUrl + 'upload', formData).subscribe(result => {
    //   console.log(result);
    //   const data = {
    //     ID: result.body['ID'],
    //     TITLE: result.body['TITLE'],
    //     NOTE: '',
    //     FILE_SIZE: result.body['SIZE'],
    //     SQL_STATE: fixedValues.sqlState.sqlUnchange,
    //   };
    //   this.grid.api.updateRowData({ add: [data] });
    //   this.onClickFileCancel('doc');

    // })
  }

  private uploadImage() {
    let formData = new FormData();
    // formData.append('DOCUMENT_REF_TYPE_ID', this.refTypeId);
    // formData.append('DOCUMENT_REF_ID', this.refId);
    // formData.append('DOCUMENT_TYPE', 'img');
    // formData.append('NOTE', '');
    // formData.append('file', this.imageToUpload);
    // this.apiService.saveFile(coreUrl + 'upload', formData).subscribe(result => {
    //   console.log(result);
    //   const data = {
    //     ID: result.body['ID'],
    //     TITLE: result.body['TITLE'],
    //     NOTE: '',
    //     FILE_SIZE: result.body['SIZE'],
    //     SQL_STATE: fixedValues.sqlState.sqlUnchange,
    //   };
    //   this.imageGrid.api.updateRowData({ add: [data] });
    //   this.onClickFileCancel('img');
    // })
  }



  //#region  filter option
  /* ======================
  /* Filter Option
  =========================*/
  onClickOpenCustomerListModal() {
    this.modalService.openDialog('CommonListModule', 'list', {
      title: this.langService.langData.customerList, data: {
        gridId: "CustomerGrid", columnDefs: CustomerShortColumnDefs, api: 'FG_SL_COMM_CUSTOMER_LIST', params: {
          P_CUST_NO: null,
          P_QUERYOPTIONS: fixedValues.queryOptions.PaidTo,
        }
      }, settings: { modalClass: 'md' }
    }).then((modal: any) => {
      modal.closed = () => {
      };
      modal.success = (data) => {
        this.model.filterData.CUSTOMER_NO = data ? data.CUSTOMER_NO : null;
        this.model.filterData.CUSTOMER_NAME = data ? data.CUSTOMER_NAME : '';
        this.onClickSearch();
      };
    });
  }
  onClickOpenSalesContactListModal() {
    this.modalService.openDialog('CommonListModule', 'list', {
      title: this.langService.langData.listOfSalesContract, data: {
        gridId: "SalesContractListGrid", columnDefs: salesListColumnDefs, api: 'FG_SL_COMM_CONTACT_BY_CUSTOMER', params: {
          P_CUSTOMER_NO: this.model.filterData.CUSTOMER_NO,
          P_FROM_DATE: this.dateUtil.getYYYYMMDDDashFromDate(this.formParam.START_DATE),
          P_TO_DATE: this.dateUtil.getYYYYMMDDDashFromDate(this.formParam.END_DATE),
        }
      }, settings: { modalClass: 'md' }
    }).then((modal: any) => {
      modal.closed = () => {
      };
      modal.success = (data) => {
        console.log("data", data);
       
        if (this.isFormComeFromAC1108 == true) {
          this.model.filterData.CONTRACT_NO = this.P_CONTRACT_NO;

        }
        else {

          this.model.filterData.CONTRACT_NO = data ? data.CONTRACT_NO : null;
        }

       //this.model.filterData.CONTRACT_NO = data ? data.CONTRACT_NO : null;
        
       // P_BILL_PAYNO: this.isFormComeFromAC1108 ? this.P_PAY_NO : this.formParam.PAY_NO,//this.formParam.CHALLAN_NO,
        this.model.filterData.DOC_AMENDMENT = data ? data.DOC_AMENDMENT : '';
        this.onClickSearch();
      };
    });
  }

  onClickSearch() {
    this.getNegotiationList();
  }
  public getNegotiationList() {
    this.gridFilter.api.setRowData([]);
    if (this.model.userPrivilege.canShowButton()) {
      this.comService.getBankRefList(
        this.formParam.STATUS,
        this.dateUtil.getYYYYMMDDDashFromDate(this.formParam.START_DATE),
        this.dateUtil.getYYYYMMDDDashFromDate(this.formParam.END_DATE),
        this.model.filterData.CUSTOMER_NO,
       // this.model.filterData.CONTRACT_NO
        this.isFormComeFromAC1108 ? this.P_CONTRACT_NO : this.model.filterData.CONTRACT_NO
      ).subscribe(result => {
        this.gridFilter.api.setRowData(result.body);
        if (result.body.length > 0) {
          setTimeout(() => {
            this.gridFilter.api.getDisplayedRowAtIndex(0).setSelected(true);
            this.getNegotiation(this.gridFilter.api.psGetSelectedNode().data.NEGOTIATION_NO);
          }, 100);
        } else {
          this.model.negotiationData = new Negotiation();
          this.grid.api.setRowData([]);
        }
      });
    }
  }
  onClickResetSearchField() {
    this.grid.api.psClearFilter();
    this.model.filterData = new DeleveryReg();
    this.setDefaultData();
    this.getNegotiationList();
  }

  previllageCheck() {
    this.dataLoadService.load('FG_SA_COMM_USER_PREVILAGE/MAP', {
      P_CURRFORM: this.formParam.FORM_ID
    }).subscribe(result => {
      this.model.userPrivilege = new UserPrivileges(result.body);
      this.getNegotiationList();
    });
  }


  onGridReadyFilter(grid) {
    this.gridFilter = grid;
    // this.gridService.sizeColumnsToFit(grid, this.gridIdFilter);
    this.gridFilter.api.setRowData([]);
    this.previllageCheck();
  }
  itemClickFilter(e) {
    this.grid.api.stopEditing();
    setTimeout(() => {
      if (this.gridFilter.api.psGetSelectedNode() && this.gridFilter.api.psGetSelectedNode().rowIndex === e.node.rowIndex) {
        return;
      }
      if (this.grid.api.psGetChangeList().length > 0 ||
        this.utilityService.psHasAnyChange(new Negotiation(this.model.negotiationData), new Negotiation(this.model.negotiationDataBackup))
      ) {
        this.toastr.warning(this.langService.langData.pleaseSaveYourChanges, 'Warning');
        return;
      }
      this.gridFilter.api.getDisplayedRowAtIndex(e.node.rowIndex).setSelected(true);

      if (e.data.NEGOTIATION_NO) {
        this.getNegotiation(e.data.NEGOTIATION_NO);
      }
    }, 100);

  }

  getNegotiation(negotiationNo) {    
    this.grid.api.setRowData([]);
    this.model.fundDistributionListBackup.length = 0;
    this.dataService.getNegotiation(negotiationNo).subscribe(result => {
      let negoDate = result[0].body.NEGOTIATION_DATE ? this.dateUtil.getYYYYMMDDDashFromDate(result[0].body.NEGOTIATION_DATE) : null;
      this.comService.getNegCurrency(negoDate).subscribe(rsl => {
        this.model.currencyList = rsl.body;
      });
      // result[0].body['GL_CHECK'] = result[0].body.GL_POST_NEGODATE ? 1 : 0;
      // result[0].body['GL_POST_NEGODATE'] = new Date();
    
      this.model.negotiationData = new Negotiation(result[0].body);
      this.postUnpostProcess(this.model.negotiationData);

      // setTimeout(() => {
      // }, 50);

      console.log("this.model.negotiationData", this.model.negotiationData );
      this.negoAttachment = this.model.negotiationData.NEGO_ATTACHMENT ;       
      this.getNegotiationInTaka();
      result[1].body.forEach(element => {
        this.model.negotiationData.negoDtl.push(element);
      })
      result[2].body.forEach(element => {
        element['SQL_STATE'] = fixedValues.sqlState.sqlUnchange;
        this.model.fundDistributionListBackup.push(new Negofund(element));
      })
      this.model.negotiationDataBackup = JSON.parse(JSON.stringify(this.model.negotiationData));
      this.model.bankDocumentTotalSum();
      this.grid.api.setRowData(JSON.parse(JSON.stringify(this.model.fundDistributionListBackup)));
    });
  }
  postUnpostProcess(mstData){
    this.model.postFlugStatus =  true;
    let paramObj = {
      P_QUERYOPTIONS:  6,
      P_FROM_DATE:  null,
      P_END_DATE:  null,
      P_VTYPE_NO:  null,
      P_QJ_NAME:  null,
      P_V_ID:  null,
      P_V_NO:  mstData.NEGO_VNO ? mstData.NEGO_VNO : null,

    };
    
    console.log("mstData.GL_POST_NEGODATE", mstData.GL_POST_NEGODATE);
    console.log(" mstData.NEGO_VNO",  mstData.NEGO_VNO);

    if( mstData.GL_POST_NEGODATE && mstData.NEGO_VNO ){
      this.dataLoadService.load("FG_AC_COMM_VOUCHER_INFO", paramObj).subscribe(result =>{
        this.model.negotiationData.GL_POST_NEGODATE = mstData.GL_POST_NEGODATE;
        this.model.negotiationData.GL_CHECK = 1;      
        if( result.body[0].CHECK_FLAG == 1){
          this.model.postFlugStatus =  false;
        }else{
          this.model.postFlugStatus =  true;
        }

      });
    }else{
      this.model.negotiationData.GL_CHECK = mstData.GL_POST_NEGODATE ? 1 : 0;
      this.model.negotiationData.GL_POST_NEGODATE = new Date();
      this.model.negotiationDataBackup = JSON.parse(JSON.stringify(this.model.negotiationData));
    }
  }

  onChangeNegotiationCurrency() {
    if (!this.model.negotiationData.NEG_CURRENCY_NO) {
      return;
    }
    let exRate = this.model.currencyList.find(element => {
      if (element.CUR_NO == this.model.negotiationData.NEG_CURRENCY_NO) {
        return element.EXCHANGE_RATE;
      }
    });
    this.model.negotiationData.NEG_EXCHANGE_RATE = exRate.EXCHANGE_RATE;
    this.getNegotiationInTaka();
  }
  onChangeNegotiationExchangeRate() {
    this.getNegotiationInTaka();
  }
  onChangeNegoAmt() {
    this.getNegotiationInTaka();
  }
  getNegotiationInTaka() {
    this.model.negotiationData.NEG_BASE_AMT = Number(this.model.negotiationData.NEG_AMT) * Number(this.model.negotiationData.NEG_EXCHANGE_RATE);
  }

  getSlCustomer(CUSTOMER_NO) {
    this.comService.getSlCustomer(CUSTOMER_NO).subscribe(result => {
    });
  }

  getSalesDocs(CONTRACT_NO, BANK_REF_NO) {
    this.comService.getSalesDocs(CONTRACT_NO, BANK_REF_NO).subscribe(result => {
      result.body.forEach(element => {

        this.model.negotiationData.negoDtl.push(new NegoDetails(element))
      });
    }, error => {
      this.displayError(error);
    });
  }

  // Use this function Assing details of currence when create a new item
  // call this function in modal services function @createDocumentListComponent
  // getCurrencyAssingForDtl(masterObj){
   
  //   console.log("masterObj", masterObj);    

  //   console.log(" this.model.CTR_C_NAME",  this.model.CTR_C_NAME);

  //   this.model.CTR_C_NAME =  masterObj.CURRENCY
  //   this.model.CTR_CURRENCY_NO =  masterObj.NEG_CURRENCY_NO
  // }

  //#endregion
  onClickOpenDocumentListModal() {
    this.modal.createDocumentListComponent(this.container, this.model.negotiationData, this);
    console.log("this.model.negotiationData asd", this.model.negotiationData);
    this.model.negotiationData.NEGOTIATION_DATE = new Date();
  }

  onChangeNegoDate(){
    this.model.negotiationData.GL_POST_NEGODATE = new Date( this.model.negotiationData.NEGOTIATION_DATE );
  }

  //#region Post Flag
  onChangePostFlagCheckbox() {
    if (this.model.negotiationData.GL_CHECK) {
      if (!this.model.negotiationData.NEGO_VNO) {
        this.model.postModalStatus = true;
      } else {
        this.updateNeotiationVoucher(null);
      }
    } else {
      this.updateNeotiationVoucher(null);
    }
    // Take Backup 
    this.model.negotiationDataBackup = JSON.parse(JSON.stringify(this.model.negotiationData));
  }

  onClickNewVoucher(VOUCHER_OPTION) {
    this.updateNeotiationVoucher(VOUCHER_OPTION);
    //let negoNO = this.model.negotiationData.NEGOTIATION_NO;
    // if (this.model.negotiationData.NEGOTIATION_NO) {
    //   this.dataService.updateNegotiation(this.dateUtil.getYYYYMMDDDashFromDate(
    //     this.model.negotiationData.GL_POST_NEGODATE),
    //     this.model.negotiationData.NEGOTIATION_NO
    //   ).subscribe(result => {
    //     this.getNegotiation(negoNO);
    //   }, error => {
    //     this.displayError(error);
    //   })
    // } else {
    //   this.toastr.warning(this.langService.langData.saveFundDistFirstMsg, this.langService.langData.warning);
    //   this.model.negotiationData.GL_CHECK = 0;
    // }

  }

  onClickAttachAVoucher(VOUCHER_OPTION) {
    this.updateNeotiationVoucher(VOUCHER_OPTION)
    // this.modal.createAttachableVoucherListComponent(this.container, this.model.negotiationData, fixedValues.queryOptions.VoucherForBFE, this);
    // this.dataService.removeNegoFund(this.model.negotiationData.NEGOTIATION_NO).subscribe(result => {
    // }, error => {
    //   this.displayError(error);
    // });

  }

  voucherByVNo() {
    let params = {
      P_QUERYOPTIONS: fixedValues.queryOptions.VoucherByVNO,
      P_V_NO: this.model.negotiationData.V_NO,
      P_FROM_DATE: null,
      P_TO_DATE: null,
      P_VTYPE_NO: null,
      P_BU_NO: null,
      P_MODULE_NO: null,
      P_POST_FLAG: null,
      P_CHECK_FLAG: null,
    };
    this.comService.getVouchers(params).subscribe(result => {
      this.model.fundDistributionListBackup.length = 0;
      let list = [];
      this.grid.api.setRowData([]);
      result.body.forEach(element => {
        element['NEGOTIATION_NO'] = this.model.negotiationData.NEGOTIATION_NO;
        list.push(new Negofund(element))
      });

      this.dataService.saveNegoFund(list).subscribe(rsl => {

        rsl.body.forEach(element => {
          this.model.fundDistributionListBackup.push(new Negofund(element))
          this.grid.api.setRowData(JSON.parse(JSON.stringify(this.model.fundDistributionListBackup)));

        });
        this.updateNeotiationVoucher(null);
      })

    }, error => {
      this.displayError(error);
    });
  }

  onClickCancel() {
    this.model.negotiationData.GL_CHECK = 0;
  }
  //#endregion

  //#region Report Preview
  public onClickPreviewReport(status) {
    if (status.NEGO_VNO) {
      this.comService.getReportInfo(this.formParam.SUBMENU_ID).subscribe(result => {
        let X_Submenu_Id = this.formParam.SUBMENU_ID;
        let subPart = X_Submenu_Id.substring(0, 2);
        let params = {
          baseUrl: globalVariables.paramsReportBaseUrl,
          rwservlet: result.body[0].REPORT_SERVER,
          desformat: result.body[0].REPORT_FORMAT,
          destype: 'cache',
          report: `${globalVariables.reportPath}${subPart}/${this.formParam.SUBMENU_ID}`,
          X_Emp_Id: globalVariables.userInfo.emp_ID,
          X_Submenu_Id: this.formParam.SUBMENU_ID,
          X_company_no: globalVariables.userInfo.company_NO,
          X_currency_format: result.body[0].SS_CURRENCY_FMT,
          X_date_format: result.body[0].SS_DT_FMT,
          X_time_format: result.body[0].SS_TIME_FMT,
          X_ROUND: 2,
          p_vno: status.NEGO_VNO,
          _reppath: globalVariables.reportPath,
        }
        this.utilityService.showReport(params);
      });
    }
  }
  //#endregion

  //#region Fund Distribution
  onGridReady(grid) {
    this.grid = grid;
    this.gridService.sizeColumnsToFit(grid, this.gridId);
    this.grid.api.setRowData([]);
  }

  itemClick(e) {
    if (e.event.target !== undefined) {
      let actionType = e.event.target.getAttribute("data-action-type");
      switch (actionType) {
        case "accountModal":
          return this.onClickOpenAccountListModal(e);
        case "costCenterModal":
          return this.onClickOpenCostCenterListModal(e);
        case "businessAreaModal":
          return this.onClickOpenBusinessAreaListModal(e);
        case "currencyModal":
          return this.onClickOpenCurrencyListModal(e);
        case "fundDistribution":
          return this.onClickFundDistributionIcon(e.data);
        case "delete":
          return this.onClickRemoveFundDistributionItem(e);
      }
    }
  }
  onClickAddNewFundDistribution() {
    this.grid.api.psClearFilter();

    this.grid.api.stopEditing();
    if (this.model.negotiationNewInsertDataBa.length == 0 || this.model.negotiationNewInsertDataBa.length == 0) {
      let promiseAll = [
        this.dataLoadService.load('FG_AC1127_NEG_BA_NAME', {
          P_SALESCONTRACT_NO: this.model.negotiationData.SALESCONTRACT_NO
        }),
        this.dataLoadService.load('FG_AC1127_NEG_CURRENCY', {
          P_NEGOTIATION_NO: this.model.negotiationData.NEGOTIATION_NO
        }),

      ]
      forkJoin(
        promiseAll
      ).subscribe(results => {
        this.model.negotiationNewInsertDataBa = results[0].body;
        this.model.negotiationNewInsertDataCurrency = results[1].body;
        this.getAddNewCheck();
      })
    } else {
      this.getAddNewCheck();
    }

  }

  getAddNewCheck() {
    setTimeout(() => {
      this.model.CTR_C_NAME = this.model.negotiationData.NEG_CURRENCY;
      this.model.CTR_CURRENCY_NO = this.model.negotiationData.NEG_CURRENCY_NO;
      this.model.CTR_EXCHANGE_RATE = this.model.negotiationData.NEG_EXCHANGE_RATE;

      // Old Code but business not work 
      // if (this.grid.api.getDisplayedRowCount() == 0) {
      //   this.model.CTR_C_NAME = this.model.negotiationData.NEG_CURRENCY;
      //   this.model.CTR_CURRENCY_NO = this.model.negotiationData.NEG_CURRENCY_NO;
      //   this.model.CTR_EXCHANGE_RATE = this.model.negotiationData.NEG_EXCHANGE_RATE;
      // } else {

      //   console.log("this.model.negotiationNewInsertDataCurrency", this.model.negotiationNewInsertDataCurrency);
      //   let data = this.grid.api.getRowNode(this.grid.api.getDisplayedRowCount() - 1).data;
      //   this.model.CTR_C_NAME = data.C_NAME ? data.C_NAME : (this.model.negotiationNewInsertDataCurrency.length > 0 ? this.model.negotiationNewInsertDataCurrency[0].C_NAME : null);
      //   this.model.CTR_CURRENCY_NO = data.CURRENCY_NO ? data.CURRENCY_NO : (this.model.negotiationNewInsertDataCurrency.length > 0 ? this.model.negotiationNewInsertDataCurrency[0].CURRENCY_NO : null);
      //   this.model.CTR_EXCHANGE_RATE = data.EXCHANGE_RATE ? data.EXCHANGE_RATE : (this.model.negotiationNewInsertDataCurrency.length > 0 ? this.model.negotiationNewInsertDataCurrency[0].EXCHANGE_RATE : null);
      // }
      let validationResult = this.grid.api.psValidate();
      if (validationResult.isValid) {

        console.log("new this.model.CTR_C_NAME", this.model.CTR_C_NAME);
        console.log("new this.model.CTR_CURRENCY_NO", this.model.CTR_CURRENCY_NO);

        let obj = this.grid.api.updateRowData({
          add: [new Negofund({
            COST_NAME: this.model.negotiationData.COST_NAME,
            COST_NO: this.model.negotiationData.COST_NO,
            BA_NO: (this.model.negotiationNewInsertDataBa.length && this.model.negotiationNewInsertDataBa[0].BA_NO) ? this.model.negotiationNewInsertDataBa[0].BA_NO : null,
            BA_NAME: (this.model.negotiationNewInsertDataBa.length && this.model.negotiationNewInsertDataBa[0].BA_NAME) ? this.model.negotiationNewInsertDataBa[0].BA_NAME : '',
            C_NAME: this.model.CTR_C_NAME,
            CURRENCY_NO: this.model.CTR_CURRENCY_NO,
            EXCHANGE_RATE: this.model.CTR_EXCHANGE_RATE,
            PROMPT: this.totalDifferent() < 0 ? "CR" : "DR"
          })]
        });
        this.grid.api.ensureIndexVisible(obj.add[0].rowIndex);
        setTimeout(() => {
          this.grid.api.startEditingCell({
            rowIndex: obj.add[0].rowIndex,
            colKey: this.colObj[0].field
          });
        }, 100);
      }
    }, 100);
  }

  private totalDifferent() {
    let crSum = 0;
    let drSum = 0;
    this.grid.api.forEachNode(node => {
      if (node.data.SQL_STATE != fixedValues.sqlState.sqlDelete) {
        if (node.data.CR) {
          crSum += Number(node.data.CR);
        }
        if (node.data.DR) {
          drSum += Number(node.data.DR);
        }
      }
    });
    return crSum - drSum;
  }

  onClickResetFundDistrubution() {
    if (this.model.negotiationData.NEGOTIATION_NO) {
      this.grid.api.setRowData(JSON.parse(JSON.stringify(this.model.fundDistributionListBackup)));
    }
  }

  onClickOpenAccountListModal(row) {
    this.modalService.openDialog('CommonListModule', 'list', {
      title: this.langService.langData.accountList, data: {
        gridId: "AccoutiListGrid", columnDefs: accountListColumnDefs, api: 'FG_AC_COMM_CHART_OF_ACCOUNTS', params: {
          P_ACC_NO: null,
          P_BA_NO: null,
          P_BU_NO: null,
          P_PERIOD_NO: null,
          P_QUERYOPTIONS: fixedValues.queryOptions.CoaForBFE
        }
      }, settings: { modalClass: 'lg' }
    }).then((modal: any) => {
      modal.closed = () => {
        row.api.psSetCellFocus();
      };
      modal.success = (data) => {
        row.node.setDataValue("ACC_NAME", data ? data.ACC_NAME : '');
        row.node.data.ACC_NO = data ? data.ACC_NO : null;
        //row.node.data.ACC_CODE = data ? data.ACC_CODE : '';
        if (parseInt(row.node.data.SQL_STATE) == fixedValues.sqlState.sqlInsert) {
          let different = this.totalDifferent();
          if (row.data.PROMPT == 'DR' && different > 0) {
            row.node.setDataValue('DR_E', Math.abs(different/Number(row.data.EXCHANGE_RATE)));
          } else if (row.data.PROMPT == 'CR' && different < 0) {
            row.node.setDataValue('CR_E', Math.abs(different/Number(row.data.EXCHANGE_RATE)));
          }
        }
        this.calculateRate(row);
        row.api.psSetCellValue();
      }
    });
  }

  onClickOpenCostCenterListModal(row) {
    this.modalService.openDialog('CommonListModule', 'list', {
      title: this.langService.langData.costCenterList, data: {
        gridId: "CostCenterListGrid", columnDefs: CostCenterColumnDefs, api: 'FG_AC_COMM_COST_CENTERS', params: {
          P_ACC_NO: null,
          P_QUERYOPTIONS: fixedValues.queryOptions.CostCenterForBFE
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
  }

  onClickOpenBusinessAreaListModal(row) {
    this.modalService.openDialog('CommonListModule', 'list', {
      title: this.langService.langData.businessAreaList, data: {
        gridId: "BusinessAreaListGrid", columnDefs: businessAreaColumnDefs, api: 'FG_AC_COMM_BUSINESS_AREAS', params: {
          CTRL_BU_CHK: null,
          P_ACC_NO: null,
          P_QUERYOPTIONS: fixedValues.queryOptions.BusinessAreaBEF
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
  }

  onClickOpenCurrencyListModal(row) {
    this.modalService.openDialog('CommonListModule', 'immutableList', {
      title: this.langService.langData.currencyList,
      data: {
        gridId: 'CommonCurrencyListGrid', columnDefs: commonCurrencyColumnDefs, list: this.model.currencyList
      },
      settings: { modalClass: 'sm' }
    }).then((modal: any) => {
      modal.closed = () => {
        row.api.psSetCellFocus();
      };
      modal.success = (data) => {
        row.node.setDataValue("C_NAME", data ? data.C_NAME : '');
        row.node.setDataValue("EXCHANGE_RATE", data ? data.EXCHANGE_RATE : null);
        row.node.data.CURRENCY_NO = data ? data.CUR_NO : null;
        row.api.psSetCellValue();
      };
    });
  }

  onClickFundDistributionIcon(item) {
    if (this.model.fundDistributionCondition(item).isTrue) {
      // this.modal.createInvoiceDistributionWithDescListComponent(this.container, item, this.model.fundDistributionCondition(item), this.model.bankDocSetupList[0].BANK_DOCSETUP, this.model.negotiationData);
    } else {
      this.toastr.warning(this.model.fundDistributionCondition(item).message, this.langService.langData.warning);
    }
  }


  onClickRemoveFundDistributionItem(row) {
    if (row.data.SQL_STATE == fixedValues.sqlState.sqlInsert) {
      this.grid.api.updateRowData({ remove: [row.data] });
    } else {
      row.data.SQL_STATE = fixedValues.sqlState.sqlDelete;
      this.grid.api.psRemove();
    }
  }

  onClickAddNewDocument() {
   
    this.gridFilter.api.psClearFilter();    
    this.model.negotiationData = new Negotiation();
    this.model.negotiationData.GL_POST_NEGODATE= new Date();
   // this.model.negotiationData.GL_POST_REALDATE= new Date();
    this.grid.api.setRowData([]);
    this.model.bankDocumentTotalSum();
  }
  //#endregion

  //#region Bank Details Section
  onClickOpenInvoiceDistributionModal(status) {
    this.comService.getBankDocSetup().subscribe(result => {
      this.model.bankDocsetup = result.body[0].BANK_DOCSETUP;
      if (this.model.bankDocsetup == 'P') {
        // this.modal.createInvoiceDistributionListComponent(this.container, status, this.model.bankDocsetup);
      }
    })
  }
  //#endregion

  //#region Save
  onClickSave() {
    this.grid.api.stopEditing();
    setTimeout(() => {
      let validationResult = this.grid.api.psValidate();
      if (!validationResult.isValid) {
        this.toastr.warning(this.langService.langData.validationFailedMsg, this.langService.langData.warning);
        return;
      }
      if (this.grid.api.psGetChangeList().length == 0 && (JSON.stringify(this.model.negotiationData) == JSON.stringify(this.model.negotiationDataBackup))) {
        this.toastr.info(this.langService.langData.noChangeFound, 'Info');
        return;
      }
      if (this.model.fundDistributionDefferenceDRandCR == 0) {
        this.alertService.info(this.langService.langData.saveConfirmationMsg, true, this.langService.langData.saveConfirmation).then(data => {
          if (data) {
            let saveObj = JSON.parse(JSON.stringify(this.model.negotiationData));
            let addNewCheck = saveObj.SQL_STATE === 1 ? true : false;
            saveObj.NEGOTIATION_DATE = saveObj.NEGOTIATION_DATE ? this.dateUtil.getYYYYMMDDDashFromDate(saveObj.NEGOTIATION_DATE) : null;
            saveObj.APPLICATION_DATE = saveObj.APPLICATION_DATE ? this.dateUtil.getYYYYMMDDDashFromDate(saveObj.APPLICATION_DATE) : null;
            saveObj.REALIZATION_DATE = saveObj.REALIZATION_DATE ? this.dateUtil.getYYYYMMDDDashFromDate(saveObj.REALIZATION_DATE) : null;
            saveObj.GL_POST_REALDATE = saveObj.GL_POST_REALDATE ? this.dateUtil.getYYYYMMDDDashFromDate(saveObj.GL_POST_REALDATE) : null;
            saveObj.GL_POST_NEGODATE = saveObj.GL_POST_NEGODATE ? this.dateUtil.getYYYYMMDDDashFromDate(saveObj.GL_POST_NEGODATE) : null;
            saveObj['negoFundList'] = JSON.parse(JSON.stringify(this.grid.api.psGetChangeList()));
            this.dataService.saveNegotiaonData(saveObj).subscribe(result => {
              this.toastr.success(this.langService.langData.saveSuccessMsg, this.langService.langData.success);
              this.model.negotiationData = new Negotiation(result.body);
              // DOC_AMENDMENT : BANK_REF_NO              

              this.grid.api.psResetValidation();
              this.grid.api.psUpdateList(result.body['negoFundList'], Negofund);
              this.model.negotiationData = new Negotiation(JSON.parse(JSON.stringify(result.body)));
              this.model.negotiationDataBackup = new Negotiation(JSON.parse(JSON.stringify(this.model.negotiationData)));
              if (addNewCheck) {                
                this.gridFilter.api.psClearFilter();                
                this.model.negotiationData.BANKREF_LIST = this.model.negotiationData.DOC_AMENDMENT+ ' : '+ this.model.negotiationData.BANK_REF_NO;                
                this.gridFilter.api.updateRowData({ add: [this.model.negotiationData] });
                this.gridFilter.api.getDisplayedRowAtIndex(this.gridFilter.api.getDisplayedRowCount() - 1).setSelected(true);
              }
              let items: any = [];
              this.grid.api.forEachNode(function (node) {
                items.push(node.data);
              });
              this.model.fundDistributionListBackup = JSON.parse(JSON.stringify(this.grid.api.psGridDataList()));
            })
          }
        })
      } else {
        this.toastr.warning(this.langService.langData.drCRmismatchMsg, this.langService.langData.warning);
      }
    }, 100);
  }
  onClickDeleteDocument() {
    this.alertService.danger(this.langService.langData.deleteConfirmationMsg, true, this.langService.langData.deleteConfirmation).then(data => {
      if (data) {
        this.dataService.removeNegotiation(this.model.negotiationData.NEGOTIATION_NO).subscribe(result => {
          this.toastr.success(this.langService.langData.deleteSuccessMsg, 'Success');
          if (this.gridFilter.api.psGetSelectedNode()) {
            const results = this.gridFilter.api.updateRowData({ remove: this.gridFilter.api.getSelectedRows() });
            const isSelected = this.gridFilter.api.psSetSelectedAfterRemove(results);
            if (isSelected) {
              this.model.negotiationData = new Negotiation(this.gridFilter.api.getSelectedRows()[0]);
              console.log("this.gridFilter.api.getSelectedRows()", this.gridFilter.api.getSelectedRows());
              this.getNegotiation(this.gridFilter.api.getSelectedRows()[0].NEGOTIATION_NO);
            } else {
              this.model.negotiationData = new Negotiation();
              this.grid.api.setRowData([]);
            }
          }
        })
      }
    })
  }
  onClickResetDocument() {
    this.grid.api.psClearFilter();
    this.grid.api.setRowData(JSON.parse(JSON.stringify(this.model.fundDistributionListBackup)));
    this.model.negotiationData = new Negotiation(JSON.parse(JSON.stringify(this.model.negotiationDataBackup)));
    this.model.bankDocumentTotalSum();
  }
  //#region All private Message
  private updateNeotiationVoucher(VOUCHER_OPTION) {
    // this.dataService.updateNegotiation(this.dateUtil.getYYYYMMDDDashFromDate(
    //   this.model.negotiationData.GL_POST_NEGODATE),
    //   this.model.negotiationData.NEGOTIATION_NO    
    // ).subscribe(result => {
      
    // })
    this.dataService.savePostVoucher({
    
      POST_DATE: this.dateUtil.getYYYYMMDDDashFromDate(this.model.negotiationData.GL_POST_NEGODATE),
      GL_CHECK: this.model.negotiationData.GL_CHECK == 1 ? 1 : 0,
      VOUCHER_OPTION: VOUCHER_OPTION,
      NEGOTIATION_NO: this.model.negotiationData.NEGOTIATION_NO,
      NEGO_VNO: this.model.negotiationData.NEGO_VNO,

    }).subscribe(result => {         
      if( result.status ==  globalVariables.respStatus200){        
        let resp = result.body;        
        // this.model.billPayment.PRDATE = resp.P_GL_POSTDATE ?  new Date(resp.P_GL_POSTDATE) : this.model.billPayment.PRDATE;
        // this.model.billPayment.V_ID = resp.P_V_ID ? resp.P_V_ID : ''; 
        // this.model.billPayment.V_NO = resp.P_V_NO ? resp.P_V_NO : null;
        // this.model.billPaymentBackUp = JSON.parse(JSON.stringify(this.model.billPayment));
        this.getNegotiation(this.model.negotiationData.NEGOTIATION_NO);

      }else{
        this.toastr.error(result.message,this.langService.langData.error);
      }
    })
  }

  private setDefaultData(): void {
    this.formParam.SUBMENU_ID = 'AC_3002';
    this.formParam.STATUS = 1;
    this.formParam.START_DATE = null;
    this.formParam.END_DATE = null;
    this.model.selectedNegosiation = '';
    this.model.filterData = new DeleveryReg();
  }

  private displayError(ex): void {
    console.log(ex);
  }
  //#endregion


  getColumnDefFilter() {
    this.colObjFilter = [
      { headerName: this.langService.langData.negotiation,
        filter: true,
        field: 'BANKREF_LIST',
        sortable: true,
        resizable: true,
        width: 238,
        hide: false },
    ];
    this.columnDefsFilter = this.gridService.getColumnDefs(this.colObjFilter, this.gridIdFilter);
  }
  gridRequiredOptions: any = {
    "PROMPT": {
      "required": {
      }
    },
    "ACC_NAME": {
      "required": {
      }
    },
    "C_NAME": {
      "required": {
      }
    },
  }
  public pinnedBottomRowData = [{

  }];

  public pinnedBottomRowCols = ['DR', 'CR'];
  public bottomTotalData = { "DR": 0, "CR": 0 };
  onPsGridColumnTotalChanged(data) {
    this.bottomTotalData = data;
    this.model.fundDistributionDefferenceDRandCR = (data.DR >= data.CR) ? data.DR - data.CR : data.CR - data.DR;
  }
  calculateRate(params) {
    const DR = (params.node.data.PROMPT && params.node.data.PROMPT.toLowerCase() == 'dr') ? Number(params.node.data.DR_E) * Number(params.node.data.EXCHANGE_RATE) : null;
    const CR = (params.node.data.PROMPT && params.node.data.PROMPT.toLowerCase() == 'cr') ? Number(params.node.data.CR_E) * Number(params.node.data.EXCHANGE_RATE) : null;
    params.node.setDataValue('DR', DR);
    params.node.setDataValue('CR', CR);
  }

  onChangePrompt(params) {
    params.node.setDataValue('DR_E', null);
    params.node.setDataValue('CR_E', null);
    this.grid.api.psSetCellValue();
    this.calculateRate(params);
  }

  onChangeExchangeRate(params) {

    this.calculateRate(params);
  }

  onChangeDR(params) {
    this.calculateRate(params);
  }
  onChangeCR(params) {
    this.calculateRate(params);
  }
  onChangeCurrency(item) {

  }
  checkReadOnly(params) {
    let result = false;
    switch (params.colDef.field) {
      case 'DR_E':
        if (params.data.PROMPT.toLowerCase() !== 'dr' || this.model.negotiationData.GL_CHECK) {
          result = true;
        }
        break;
      case 'CR_E':
        if (params.data.PROMPT.toLowerCase() !== 'cr' || this.model.negotiationData.GL_CHECK) {
          result = true;
        }
        break;
      default:
        break;
    }
    return result;
  }
  checkGlFlag(params) {
    const result = this.model.negotiationData.GL_CHECK ? true : false;
    return result;
  }


  /**
   * onClickRecall
   */
  public onClickRecall(): void {     
    let girdDatalist = []
    girdDatalist = JSON.parse(JSON.stringify(this.grid.api.psGridDataList()));    
    console.log("girdDatalist", girdDatalist);
    if(girdDatalist.length == 0 ){    
      let negoFundQr1
      let negoFundSerUpQr2
      let updategirdDatalist = []; 

      let promiseAll = [           
        this.dataLoadService.load('FG_AC_COMM_NEGO_FUND/MAP',
          {P_BANK_NO: this.model.negotiationData.OWN_BANKDTL_NO}
          ),     
        this.dataLoadService.load('FG_AC_COMM_NEGO_FUND_SET_UP/MAP', 
        {P_BANK_NO: this.model.negotiationData.OWN_BANKDTL_NO}),       
                        
      ];
      forkJoin(
        promiseAll
      ).subscribe(results => {         
        negoFundQr1 = results[0].body;  
        negoFundSerUpQr2  = results[1].body;  
                
          if( negoFundSerUpQr2 && negoFundSerUpQr2.ACC_TYPE){
            updategirdDatalist  = girdDatalist.map(el => {
                el['SQL_STATE'] = fixedValues.sqlState.sqlUpdate;
                el['PROMPT'] = negoFundSerUpQr2.ACC_TYPE;
                el['ACC_NO'] = negoFundSerUpQr2.ACC_NO;
                el['ACC_NAME'] = negoFundSerUpQr2.ACC_NAME;
                return new Negofund(el);
              } ); 
            
          }else{
            if( negoFundQr1 && negoFundQr1.ACC_NO){
              negoFundQr1['SQL_STATE'] = fixedValues.sqlState.sqlInsert;              
              negoFundQr1['PROMPT'] = negoFundQr1.TYPE;            
              let newItem = new Negofund(negoFundQr1)
              updategirdDatalist.push(newItem);
            }
            this.grid.api.setRowData([]);
            this.grid.api.setRowData(updategirdDatalist);
            this.model.fundDistributionListBackup = this.grid.api.setRowData(JSON.parse(JSON.stringify(updategirdDatalist)));
          }               
      });

    }else{
      this.toastr.error('Recall not possible!' ,this.langService.langData.error);
    }
  }

  



  private getColumnDefination() {
    this.colObj = [
      {
        headerName: this.langService.langData.drOblicCr,
        filter: true,
        field: 'PROMPT',
        sortable: true,
        resizable: true,
        hide: false,
        width: 70,
        editable: this.isColumnEditable.bind(this),
        cellRenderer: "selectRenderer",
        cellEditor: 'selectCellEditor',
        params: this.model.drCrList,
        cellEditorParams: { psAffectedCols: ['DR_E', 'CR_E'], psCallbackAfterChange: this.onChangePrompt.bind(this), psReadonly: this.checkGlFlag.bind(this) },

        pinnedRowCellRenderer: pin => { return; },
      },
      {
        headerName: this.langService.langData.account,
        field: 'ACC_NAME',
        filter: true,
        sortable: true,
        resizable: true,
        hide: false,
        width: 180,
        editable: this.isColumnEditable.bind(this),
        cellEditor: "modalCellEditor",
        cellEditorParams: { psActionType: 'accountModal', psAffectedCols: ['ACC_NAME', 'DR_E', 'CR_E'], psReadonly: this.checkGlFlag.bind(this) },
        pinnedRowCellRenderer: pin => { return; }
      },
      {
        headerName: this.langService.langData.costCenter,
        field: 'COST_NAME',
        filter: true,
        sortable: true,
        resizable: true,
        hide: false,
        width: 140,
        editable: this.isColumnEditable.bind(this),
        cellEditor: "modalCellEditor",
        cellEditorParams: { psActionType: 'costCenterModal', psAffectedCols: ['COST_NAME'], psReadonly: this.checkGlFlag.bind(this) },
        pinnedRowCellRenderer: pin => { return; }
      },
      {
        headerName: this.langService.langData.businessArea,
        field: 'BA_NAME',
        filter: true,
        sortable: true,
        resizable: true,
        hide: false,
        width: 140,
        editable: this.isColumnEditable.bind(this),
        cellEditor: "modalCellEditor",
        cellEditorParams: { psActionType: 'businessAreaModal', psAffectedCols: ['BA_NAME'], psReadonly: this.checkGlFlag.bind(this) },
        pinnedRowCellRenderer: pin => { return; }
      },
      {
        headerName: this.langService.langData.currency,
        filter: true,
        field: 'C_NAME',
        sortable: true,
        resizable: true,
        hide: false,
        width: 120,
        editable: this.isColumnEditable.bind(this),
        // cellRenderer: "selectRenderer",
        // cellEditor: 'selectCellEditor',
        // params: this.model.currencyList,
        cellEditor: "modalCellEditor",
        cellEditorParams: { psActionType: 'currencyModal', psAffectedCols: ['C_NAME', 'EXCHANGE_RATE'], psReadonly: this.checkGlFlag.bind(this) },
        pinnedRowCellRenderer: pin => { return; }
        // cellEditorParams: { psAffectedCols: ['DR','CR'], psCallbackAfterChange: this.onChangeCurrency.bind(this) },
      },
      {
        headerName: this.langService.langData.exDotRate,
        field: 'EXCHANGE_RATE',
        filter: true,
        sortable: true,
        resizable: true,
        hide: false,
        width: 70,
        editable: this.isColumnEditable.bind(this),
        cellRenderer: "numberPipeRenderer",
        cellEditor: "decimalCellEditor",
        cellEditorParams: { psAffectedCols: ['DR_E', 'CR_E'], psCallbackAfterChange: this.onChangeExchangeRate.bind(this), psReadonly: this.checkGlFlag.bind(this) },
        pinnedRowCellRenderer: pin => { return; }
      },
      {
        headerName: this.langService.langData.drDot,
        field: 'DR_E',
        filter: true,
        sortable: true,
        resizable: true,
        hide: false,
        width: 85,
        editable: this.isColumnEditable.bind(this),
        cellRenderer: "numberPipeRenderer",
        cellEditor: "decimalCellEditor",
        cellEditorParams: {
          psAffectedCols: ['DR', 'CR'],
          psCallbackAfterChange: this.onChangeDR.bind(this),
          psReadonly: this.checkReadOnly.bind(this)
        },
        pinnedRowCellRenderer: pin => { return; }
      },
      {
        headerName: this.langService.langData.crDot,
        field: 'CR_E',
        filter: true,
        sortable: true,
        resizable: true,
        hide: false,
        width: 85,
        editable: this.isColumnEditable.bind(this),
        cellRenderer: "numberPipeRenderer",
        cellEditor: "decimalCellEditor",
        cellEditorParams: {
          psAffectedCols: ['DR', 'CR'],
          psCallbackAfterChange: this.onChangeCR.bind(this),
          psReadonly: this.checkReadOnly.bind(this)
        },
        pinnedRowCellRenderer: pin => { return; }
      },
      {
        headerName: this.langService.langData.drDotInTakaBrcTk,
        field: 'DR',
        filter: true,
        sortable: true,
        resizable: true,
        hide: false,
        width: 90,
        editable: false,
        cellRenderer: "numberPipeRenderer",
        cellEditor: "decimalCellEditor",
      },
      {
        headerName: this.langService.langData.crDotInTakaBrcTk,
        field: 'CR',
        filter: true,
        sortable: true,
        resizable: true,
        hide: false,
        width: 90,
        editable: false,
        cellRenderer: "numberPipeRenderer",
        cellEditor: "decimalCellEditor",
      },
      {
        headerName: '',
        field: '_fundDistribution',
        sortable: false,
        resizable: true,
        width: 70,
        hide: false,
        pinned: "right",
        cellStyle: { textAlign: "center" },
        cellRenderer: render => {
          return ` <button type="button" data-action-type="fundDistribution" class="btn btn--squire"><i class="ion-plus" data-action-type="fundDistribution"></i></button>`
        },
        pinnedRowCellRenderer: pin => { return; }
      },
      {
        headerName: this.langService.langData.delete,
        field: '_delete',
        sortable: false,
        resizable: true,
        width: 70,
        hide: false,
        pinned: "right",
        cellStyle: { textAlign: "center" },
        cellRenderer: this.checkDeletePrev.bind(this),
        pinnedRowCellRenderer: pin => { return; }
      },
    ];
    this.columnDefs = this.gridService.getColumnDefs(this.colObj, this.gridId);
  }
  
  isColumnEditable(params) {
    return (!params.node.rowPinned) && this.model.userPrivilege.checkEditablePrev(params);
  }
  checkDeletePrev(params) {
    if (this.model.negotiationData.GL_CHECK || this.model.userPrivilege.checkDeletePrev(params)) {
      return ` <button type="button" data-action-type="delete" class="btn btn--squire text-danger border-0"><i class="ion-close" data-action-type="delete"></i></button>`
    } else return '';
  }

  get hasAnyChange():Boolean{
		return this.hasMasterChange;
  }  
  get hasMasterChange():Boolean{
    return ( this.hasChildChange || this.utilityService.psHasAnyChange(this.model.negotiationDataBackup, this.model.negotiationData) )
  }

  get hasChildChange():Boolean{
    return this.grid.api.psGetChangeList().length > 0;
  }

  public trackByFn(index, item) {
    return index; // or item.id
  }

}
