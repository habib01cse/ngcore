/* angular stuff */
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

/* 3rd party libraries */
import { forkJoin } from 'rxjs';

/* our own stuff */
import { LangService } from 'src/app/core/services/lang.service';
import { globalVariables } from 'src/app/core/constants/globalVariables';

import { DateService } from 'src/app/shared';
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import { UtilityService } from 'src/app/shared/services/utility.service';

import { FormParam } from '../../models/form-param';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { GridService } from 'src/app/shared/services/grid.service';
import { ToastrService } from 'ngx-toastr';

import { DataService } from '../../services/forms/service-bill-payment-register/data.service';
import { ModelService } from '../../services/forms/service-bill-payment-register/model.service';
import { CommonService } from '../../services/common.service';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { PaymentRegister } from '../../models/payment-register.model';


@Component({
  selector: 'app-ac1118',
  templateUrl: './../../templates/forms/ac1118.component.html',
  providers: [DatePipe]
})

export class Ac1118Component implements OnInit {

  private validationOptions: any = {
    "auditStatus": {
      "required": {
        "message": "Audit Status required",
      }
    },
    "paymentStatus": {
      "required": {
        "message": "Payment Status required",
      }
    },
    "provision": {
      "required": {
        "message": "Provision type required",
      }
    }
  }

  public psDateFormat: any;
  public dateFormat: any;
  public formParam: FormParam = new FormParam();

  public searchFields: any[] = ['SUPPDOC_ID', 'SUPPINVOICE_ID', 'SUPPLIER_NAME'];
  public searchString;
  public numberPrecision;

  columnDefs = [];
  colObj;
  grid: any;
  gridId: string = "PmtRegGrid_1118"
  rowSelection = 'multiple';   
  paymentRegValid: any = {};
  pinnedBottomRowData: any; 
  pinnedBottomRowCols: any;

  constructor(
    public langService: LangService
    , private dataService: DataService
    , public model: ModelService
    , private dateUtil: DateService
    , private alertService: AlertService
    , private datePipe: DatePipe
    , private comService: CommonService
    , private utilityService: UtilityService    
    , public dataLoadService: DataLoadService
    , public gridService: GridService
    , private toastr: ToastrService
    , private router: Router
  ) {
    this.numberPrecision = globalVariables.numberPrecision;

    this.paymentRegColumnDef();
    this.pinnedBottomRowData = [{
      SUPPDOC_ID: this.langService.langData.total,       
    }];
    this.pinnedBottomRowCols =['INVOICE_VALUE', 'AUDITED_VALUE', 'DEDUCTION', 'PAY_AMT','PENDING_VALUE','PENDING_VALUE_BASE']; 
  }

  
  ngOnInit() {
    this.formParam.FORM_ID = 'AC_1118'
    this.psDateFormat = globalVariables.psDateFormat;
    this.dateFormat = globalVariables.dateFormat.dateFormat;
    this.setDefaultData();

    let promiseAll = [
      this.comService.getTasks(),
      this.comService.getReportInfo(this.formParam.SUBMENU_ID),
      this.comService.getUserPrivileges(this.formParam.FORM_ID)
    ];
    forkJoin(
      promiseAll
    ).subscribe(results => {
      this.model.taskList = results[0].body;
      this.model.reportInfoList = results[1].body;
      this.model.userPrivilege = new UserPrivileges(results[2].body)
    }, error => {
      this.displayError(error);
    });
  }

  onGridReady(grid) {
    this.grid = grid;
    this.grid.api.setRowData([]);    
  }
     
  //#region html click event
  onClickFilter() {
    // Check view permission 
    if( !this.model.userPrivilege.CAN_VIEW ){
      return;
    }

    this.grid.api.setRowData([]);
    if (this.model.userPrivilege.canShowButton()) {
      this.dataService.getDataByPostStatus(
        this.model.selectedTask,
        this.model.selectedPaymentStatus,
        this.model.selectedAuditStatus,
        this.model.selectedProbisionStatus,
        this.formParam.SUPPLIER_NOT_MAP,
        this.formParam.COST_NOT_MAP,
        this.dateUtil.getYYYYMMDDDashFromDate(this.model.formParam.START_DATE),
        this.dateUtil.getYYYYMMDDDashFromDate(this.model.formParam.END_DATE),
      ).subscribe(result => {
        this.model.invoiceStatusList.length = 0;
        this.model.invoiceStatusListBackup.length = 0;        
        let tmpInvoiceStatusList = result.body.map(element => {
          element['SELECT_CHECKBOX'] = 0;
          return new PaymentRegister(element);
        }); 
        
        this.model.invoiceStatusList=tmpInvoiceStatusList
        this.model.invoiceStatusListBackup = JSON.parse(JSON.stringify( tmpInvoiceStatusList ));        
        this.grid.api.setRowData( this.model.invoiceStatusList); 
                        
      }, err => {
        this.displayError(err);
      });
    }

  }  

  public onChangeStatus() {  
    
    let selectedData = [];
    if (this.model.selectType == this.formParam.ALL) {
     
      this.grid.api.forEachNode(node=>{
        selectedData= this.model.invoiceStatusList;
      })
    } else {
      this.grid.api.forEachNode(node=>{
        if(node.data.SELECT_CHECKBOX == 1){
          selectedData.push(node.data);
        }
      })
     
    }
    this.grid.api.setRowData(selectedData);
    // this.grid.api.setRowData([]);

    // if(this.model.selectType == this.formParam.ALL){     
    //   let tmpInvoiceStatusList = this.model.invoiceStatusListBackup.map(element => {
    //     element['SQL_STATE'] = fixedValues.sqlState.sqlUnchange;
    //     return new PaymentRegister(element);
    //   });
    //   this.grid.api.setRowData(tmpInvoiceStatusList);         
    // }else{
      
    //   if( this.grid.api.getSelectedRows().length === 0){
    //     this.grid.api.setRowData([]);        
    //     this.toastr.info(this.langService.langData.NoSelectedItemFound, 'Info');
    //     return;
    //   }
      
    //   if( this.grid.api.getSelectedRows().length > 0 ){
    //     this.grid.api.setRowData([]);   

    //     let InvoiceStatusSelectedList = JSON.parse(JSON.stringify(this.grid.api.getSelectedRows()));
    //     let getInvoiceStatusList = InvoiceStatusSelectedList.map(element => {
    //       element['SQL_STATE'] = fixedValues.sqlState.sqlUnchange;
    //       return new PaymentRegister(element);
    //     });                    
    //     this.grid.api.setRowData(getInvoiceStatusList);                 
    //   }

    // }
  }

  public onClickReset() {    
    this.model.dateSet();
    this.setDefaultData();

    this.grid.api.psClearFilter();    
    this.grid.api.setRowData([]);    
    
    // ---Bacup Functionality---
    let tmpInvoiceStatusList = new Array<PaymentRegister>();
    tmpInvoiceStatusList = this.model.invoiceStatusListBackup.map(element => {
      element['SQL_STATE'] = fixedValues.sqlState.sqlUnchange;
      return new PaymentRegister(element);
    });
    this.grid.api.setRowData(tmpInvoiceStatusList);          
  }
  
  public onClickPayID(status) {    
    this.utilityService.openIntForm('/gr/forms/gr_1030');
  }
  //#endregion

  //#region All private Message
  private setDefaultData(): void {
    this.formParam.ALL = 'A';
    this.formParam.SELECTED = 'S';
    this.model.selectType = this.formParam.ALL;
    this.formParam.SUPPLIER_NOT_MAP = 0;
    this.formParam.COST_NOT_MAP = 0;

    this.model.selectedTask = null;
    this.model.selectedAuditStatus = null;
    this.model.selectedProbisionStatus = null;
    this.model.selectedPaymentStatus = '3';
    this.formParam.SUBMENU_ID = 'AC_3002';
    this.model.selectedTask=null;
  }
  
  public paymentRegColumnDef(){
    this.colObj = [
    {
      headerName: this.langService.langData.entryNo,
      field: 'SUPPDOC_ID',
      sortable: true,
      editable: false,
      filter: true,
      resizable: true,
      hide: false,
      filterParams: this.gridService.startWithFilterParams,
      width: 125

    },      
    {
      headerName: this.langService.langData.billNo,
      field: 'SUPPINVOICE_ID',
      sortable: true,
      filter: true,
      editable: false,
      width: 175,
      resizable: true,
      hide: false,  
      cellRenderer: "linkCellRenderer",
      cellEditorParams: {
        psActionType: 'invoiceNoAction',
      },
      pinnedRowCellRenderer: pin => { return; },
      filterParams: this.gridService.startWithFilterParams,
    },
    {
      headerName: this.langService.langData.billDate,
      field: 'INVOICE_DATE',
      sortable: true,
      filter: true,
      editable: false,
      width: 75,
      resizable: true,
      hide: false,
      cellRenderer: 'datePipeRenderer',
      cellEditor: 'dateCellEditor',
      filterParams: this.gridService.startWithFilterParams,
    },
    {
      headerName: this.langService.langData.supplierName,
      field: 'SUPPLIER_NAME',
      sortable: true,
      editable: false,
      filter: true,
      resizable: true,
      hide: false,   
      width: 175, 
      filterParams: this.gridService.startWithFilterParams,    
    },
    {
      headerName: this.langService.langData.itemType,
      field: 'ITEM_TYPE',
      sortable: true,
      editable: false,
      filter: true,
      resizable: true,
      hide: false,
      filterParams: this.gridService.startWithFilterParams,   
      width: 100   
    },
    // puss 5 item
    

    {
      headerName: this.langService.langData.currency,
      field: 'CUR_NAME',
      sortable: true,
      filter: true,
      editable: false,
      width: 75,
      resizable: true,
      hide: false,
      filterParams: this.gridService.startWithFilterParams,
    },
    {
      headerName: this.langService.langData.exRate,
      field: 'EXCHANGE_RATE',
      sortable: true,
      editable: false,
      filter: true,
      resizable: true,
      hide: false,
      width: 75,
      cellRenderer:'numberPipeRenderer',
      cellEditor: 'decimalCellEditor',
      filterParams: this.gridService.startWithFilterParams,
    },
    {
      headerName: this.langService.langData.billValue,
      field: 'INVOICE_VALUE',
      sortable: true,
      editable: false,
      filter: true,
      resizable: true,
      hide: false,   
      width: 75, 
      cellRenderer:'numberPipeRenderer',
      cellEditor: 'decimalCellEditor',
      filterParams: this.gridService.startWithFilterParams,    
    },
    {
      headerName: this.langService.langData.billValueBase,
      field: 'INVOICE_VAL_IN_TK',
      sortable: true,
      filter: true,
      resizable: true,
      width: 100,
      hide: false,
      editable: false,    
      cellRenderer:'numberPipeRenderer',
      cellEditor: 'decimalCellEditor',
      filterParams: this.gridService.startWithFilterParams,  
    },    
    {
      headerName: this.langService.langData.auditedValue,
      field: 'AUDITED_VALUE',
      sortable: true,
      editable: false,
      filter: true,
      resizable: true,
      hide: false,  
      width: 100, 
      cellRenderer:'numberPipeRenderer',
      cellEditor: 'decimalCellEditor',
      filterParams: this.gridService.startWithFilterParams,      
    },
    // puss 10 item

    
    {
      headerName: this.langService.langData.deductionValue,
      field: 'DEDUCTION',
      sortable: true,
      filter: true,
      editable: false,
      width: 100,
      resizable: true,
      hide: false,  
      cellRenderer:'numberPipeRenderer',
      cellEditor: 'decimalCellEditor',
      filterParams: this.gridService.startWithFilterParams,       
    },
    {
      headerName: this.langService.langData.paymentValue,
      field: 'PAY_AMT',
      sortable: true,
      editable: false,
      filter: true,
      resizable: true,
      hide: false, 
      width: 75,  
      cellRenderer:'numberPipeRenderer',
      cellEditor: 'decimalCellEditor',
      filterParams: this.gridService.startWithFilterParams,             
    },
    {
      headerName: this.langService.langData.pendingValue,
      field: 'PENDING_VALUE',
      sortable: true,
      editable: false,
      filter: true,
      resizable: true,
      hide: false, 
      width: 75,  
      cellRenderer:'numberPipeRenderer',
      cellEditor: 'decimalCellEditor',
      filterParams: this.gridService.startWithFilterParams,          
    },
    {
      headerName: this.langService.langData.pendingValueBase,
      field: 'PENDING_VALUE_BASE',
      sortable: true,
      editable: false,
      filter: true,
      resizable: true,
      hide: false,
      width: 75,   
      cellRenderer:'numberPipeRenderer',
      cellEditor: 'decimalCellEditor',
      filterParams: this.gridService.startWithFilterParams,             
    },
    {
      headerName: this.langService.langData.auditStatus,
      field: 'AUDIT_STATUS',
      sortable: true,
      editable: false,
      filter: true,
      resizable: true,
      hide: false, 
      filterParams: this.gridService.startWithFilterParams,
      width: 75                
    },
    // puss 15 item


    {
      headerName: this.langService.langData.paymentDate,
      field: 'PAYMENT_DATE',
      sortable: true,
      editable: false,
      filter: true,
      resizable: true,
      hide: false, 
      width: 75, 
      cellRenderer: 'datePipeRenderer',
      cellEditor: 'dateCellEditor',
      filterParams: this.gridService.startWithFilterParams,       
    },
    {
      headerName: this.langService.langData.paymentNo,
      field: 'BILL_PAYID',
      sortable: true,
      editable: false,
      filter: true,
      resizable: true,
      hide: false, 
      width: 150,
      cellRenderer: "linkCellRenderer",
      cellEditorParams: {
        psActionType: 'paymentNoAction',
      },
      pinnedRowCellRenderer: pin => { return; },
      filterParams: this.gridService.startWithFilterParams,            
    },
    {
      headerName: this.langService.langData.proDotVoucher,
      field: 'PROVISION_V_ID',
      sortable: true,
      editable: false,
      filter: true,
      resizable: true,
      hide: false, 
      width: 150, 
      cellRenderer: "linkCellRenderer",
      cellEditorParams: {
        psActionType: 'proVoucherAction',
      },
      pinnedRowCellRenderer: pin => { return; },
      filterParams: this.gridService.startWithFilterParams,       
    },
    {
      headerName: this.langService.langData.date,
      field: 'PROVISION_V_DATE',
      sortable: true,
      editable: false,
      filter: true,
      resizable: true,
      hide: false, 
      width: 75, 
      cellRenderer: 'datePipeRenderer',
      cellEditor: 'dateCellEditor', 
      filterParams: this.gridService.startWithFilterParams,     
    },
    {
      headerName: this.langService.langData.payVoucher,
      field: 'PAYMENT_V_ID',
      sortable: true,
      editable: false,
      filter: true,
      resizable: false,
      hide: false, 
      width: 150, 
      cellRenderer: "linkCellRenderer",
      cellEditorParams: {
        psActionType: 'payVoucherAction',
      },
      pinnedRowCellRenderer: pin => { return; },
      filterParams: this.gridService.startWithFilterParams,   

    },
    // pass 20 item    
    
    {
      headerName: this.langService.langData.date,
      field: 'PAYMENT_POSTDATE',
      sortable: true,
      editable: false,
      filter: true,
      resizable: false,
      hide: false, 
      width: 75, 
      cellRenderer: 'datePipeRenderer',
      cellEditor: 'dateCellEditor',
      filterParams: this.gridService.startWithFilterParams,      
    }, 
    
    // Alternative below checkbox
    // {
    //   headerName: this.langService.langData.action,
    //   field: 'SELECT_CHECKBOX',
    //   sortable: true,
    //   resizable: true,
    //   width: 100,
    //   hide: false,
    //   editable: true,
    //   cellRenderer: 'checkboxRenderer',
    //   cellEditor: 'checkboxCellEditor',
    //   cellEditorParams: { psCheckedData: 1 },
    //   pinnedRowCellRenderer: pin => { return; }
    // },

    {
      headerName: "",
      field: 'SELECT_CHECKBOX',
      pinned: "right",
      cellStyle: { textAlign: "center" }, 
      cellRenderer: this.selectFlagCheckboxPrev.bind(this),
      sortable: true,
      resizable: true,
      filter: true,
      width: 50,
      hide: false,
      editable:false,
      pinnedRowCellRenderer: pin => { return; }, 
      floatingFilter: false,   
    }  
  ];

    this.columnDefs = this.gridService.getColumnDefs(this.colObj, this.gridId);
  }

  selectFlagCheckboxPrev(params) {
    return (
      ` <div class="d-flex justify-content-center">
        <label class="custom-control custom-checkbox custom-control--without-label">
        <input class="custom-control-input" data-action-type="selectFlagCheckbox" ` +
      (params.data.SELECT_CHECKBOX == 1 ? "checked" : "") +
      ` type="checkbox" name="SELECT_CHECKBOX">
          <span class="custom-control-label"></span>
        </label>
      </div>`
    )
  }
   
  // form Link
  invoiceNoLink(params){  
    return `<div data-action-type="invoiceNoAction">${ params.data.SUPPINVOICE_ID ? params.data.SUPPINVOICE_ID : ''}</div>`;
  }

  // form Link
  paymentNoLink(params){  
    return `<div data-action-type="paymentNoAction">${ params.data.BILL_PAYID ? params.data.BILL_PAYID : ''}</div>`;
  }

  // Voucher link
  proVoucherLink(params){  
    return `<div data-action-type="proVoucherAction">${ params.data.PROVISION_V_ID ? params.data.PROVISION_V_ID : ''}</div>`;
  }
  
  // Voucher link
  payVoucherLink(params){  
    return `<div data-action-type="payVoucherAction">${ params.data.PAYMENT_V_ID ? params.data.PAYMENT_V_ID : ''}</div>`;
  }
  


  onCellClicked(e) {  
   
    if (e.event.target !== undefined) {
      let data = e.data;
      
      let actionType = e.event.target.getAttribute("data-action-type");    
      switch (actionType) {
        case "invoiceNoAction":        
          return this.onClickInvoiceNo(data); 
        case "paymentNoAction":        
          return this.onClickPaymentNo(data); 
        case "proVoucherAction":        
          return this.onClickProVoucherReport(data); 
        case "payVoucherAction":        
          return this.onClickPayentReport(data);  
          case "selectFlagCheckbox":
            const check = (e.event.target.checked) ? 1 : 0;
            e.node.setDataValue("SELECT_CHECKBOX", check);
            return;
  
        default:
      }
    } else {

    }
  }

  onClickPaymentLinkGr1030(){    
    let getDataList = JSON.parse(JSON.stringify(this.grid.api.psGridDataList()));      
    let countlist = [];
    countlist = getDataList.filter(el => el.SELECT_CHECKBOX == 1);    
    let SUPPDOC_ID_STR = "";
    countlist.forEach(el => {
      SUPPDOC_ID_STR += ','+el.SUPPDOC_ID 
    });   
    
    console.log('SUPPDOC_ID_STR', SUPPDOC_ID_STR );
    this.utilityService.openIntForm('/gr/forms/gr_1030', 'GR_1030', { state: {  P_DOC_NO: SUPPDOC_ID_STR  } } );   
  }

  onClickCQPaymentLinkAC1023(){
    let isValid = true;    
    let getDataList = JSON.parse(JSON.stringify(this.grid.api.psGridDataList()));      
    let countlist = [];
    countlist = getDataList.filter(el => el.SELECT_CHECKBOX == 1);    
    let SUPPDOC_ID_STR = "";

    console.log('countlist', countlist);
    let count = countlist.length;
    if(count <= 0){
      this.toastr.warning('Please select record first', 'Warning');
      return;
    }  

    for(let i = 0; i < count; i++){  
      isValid = countlist[i].PENDING_VALUE ? true : false;
      if(!isValid) break;
      SUPPDOC_ID_STR += ','+countlist[i].SUPPDOC_ID ;
    }

    if(!isValid){
      this.toastr.warning('Payment Complete', 'Warning');
      return;
    }

    console.log('SUPPDOC_ID_STR', SUPPDOC_ID_STR );
    this.utilityService.openIntForm('/ac/forms/ac_1023', 'AC_1023', { state: { P_SERVIC_BILL_NO: SUPPDOC_ID_STR  } } );   
  }
  
  onClickPaymentLinkAc1052(){                
    this.utilityService.openIntForm('/ac/forms/ac_1051');    
  }

  public onClickInvoiceNo(data) {          
    this.utilityService.openIntForm('/gr/forms/gr_1842', 'GR_1842', { state: { P_PI_NO: data.SUPPDOC_NO } });       
  }

  public onClickPaymentNo(data) {   
    this.utilityService.openIntForm('/gr/forms/gr_1030', 'GR_1030',{ state: { P_PAY_ID: data.BILL_PAYID, P_PAY_NO: data.BILL_PAYNO } });           
  }

  public onClickPayentReport(data) {
    if (data.V_NO) {
      this.paymentReportPreview(data, this.model.reportInfoList);
    } else {
      this.alertService.warning("VOUCHER NO CAN NOT BE NULL !");
    }
  }

  onClickProVoucherReport(data){
    if (data.V_NO) {
      this.proVoucherReportPreview(data, this.model.reportInfoList);
    } else {
      this.alertService.warning("VOUCHER NO CAN NOT BE NULL !");
    }
  }

  proVoucherReportPreview(data,reportInfo){
    if (data.V_NO) {
      let X_Submenu_Id = this.formParam.SUBMENU_ID;
      let subPart = X_Submenu_Id.substring(0, 2);
      let params = {
        baseUrl: globalVariables.paramsReportBaseUrl,
        rwservlet: reportInfo[0].REPORT_SERVER,
        desformat: reportInfo[0].REPORT_FORMAT,
        destype: 'cache',
        report: `${globalVariables.reportPath}${subPart}/${this.formParam.SUBMENU_ID}`,
        X_Emp_Id: globalVariables.userInfo.emp_ID,
        X_Submenu_Id: this.formParam.SUBMENU_ID,
        X_company_no: globalVariables.userInfo.company_NO,
        X_currency_format: reportInfo[0].SS_CURRENCY_FMT,
        X_date_format: reportInfo[0].SS_DT_FMT,
        X_time_format: reportInfo[0].SS_TIME_FMT,
        X_ROUND: 2,
        p_vno: data.PROVISION_V_NO,
        _reppath: globalVariables.reportPath,
      }
      this.utilityService.showReport(params);
    }
  }

  private paymentReportPreview(data, reportInfo) {
    if (data.V_NO) {
      let X_Submenu_Id = this.formParam.SUBMENU_ID;
      let subPart = X_Submenu_Id.substring(0, 2);
      let params = {
        baseUrl: globalVariables.paramsReportBaseUrl,
        rwservlet: reportInfo[0].REPORT_SERVER,
        desformat: reportInfo[0].REPORT_FORMAT,
        destype: 'cache',
        report: `${globalVariables.reportPath}${subPart}/${this.formParam.SUBMENU_ID}`,
        X_Emp_Id: globalVariables.userInfo.emp_ID,
        X_Submenu_Id: this.formParam.SUBMENU_ID,
        X_company_no: globalVariables.userInfo.company_NO,
        X_currency_format: reportInfo[0].SS_CURRENCY_FMT,
        X_date_format: reportInfo[0].SS_DT_FMT,
        X_time_format: reportInfo[0].SS_TIME_FMT,
        X_ROUND: 2,
        p_vno: data.PAYMENT_V_NO,
        _reppath: globalVariables.reportPath,
      }
      this.utilityService.showReport(params);
    }
  }

  public defaultColDef = {
    floatingFilter: true,
  };

  private displayError(ex): void {
  }
  //#endregion

  public trackByFn(index, item) {
    return index; // or item.id
  }




}
