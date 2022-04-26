/* Angular Stuff*/
import { Component, OnInit } from '@angular/core';

/* 3rd party libraries */
import * as $ from 'jquery';
import { forkJoin } from 'rxjs';

/* our own stuff */
import { FormParam } from '../../models/form-param';
import { globalVariables } from 'src/app/core/constants/globalVariables';
import { ModelService } from 'src/app/features/ac/services/forms/financial-statement/model.service';
import { DataService } from 'src/app/features/ac/services/forms/financial-statement/data.service';
import { LangService } from 'src/app/core/services/lang.service';
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { Statement } from '../../models/statement.model';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { GridService } from 'src/app/shared/services/grid.service';
import { ToastrService } from 'ngx-toastr';

import { DynamicModalService } from "dynamicModal";
import { accountCatListColumnDef, inventoryListColumnDef } from "src/app/shared/constants/column-defs.enum";
import { FinancialStatementHead } from '../../models/financial-statement-head.model';
import { StatementDetails } from '../../models/statement-details.model';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { FormCommonComponent } from 'src/app/core/base/form-common-component';
import { MasterActionService } from 'src/app/shared';
import { WebStorageService } from 'src/app/core/services/web-storage.service';


@Component({
  selector: 'app-ac1011',
  templateUrl: './../../templates/forms/ac1011.component.html',
})
export class Ac1011Component extends FormCommonComponent implements OnInit {
  public formParam: FormParam = new FormParam();
  //public financialStType;

  columnDefs = [];
  colObj;
  grid: any;
  gridId: string = "financialStGrid_1011"
  rowSelection = 'single'; 
  //transTransfer: any = {};

  dtlColumnDefs = [];
  dtlColObj;
  dtlGrid: any;
  dtlGridId: string = "financialStDtlGrid_1011"
  dtlRowSelection = 'single'; 
  statementDtl: any = {
    "SL_NO": {
      "required": {
        "message": ''
      }
    },
    "NATURE_NAME": {
      // "required": {
      //   "message": ''
      // },
      "FORMULA":{
        "size":{
          "min":0,
          "max":50
        }
      }
    },
    "ALIAS":{
      "size":{
        "min":0,
        "max":100,
      }
    },
    "FORMULA":{
      "size":{
        "min":0,
        "max":50,
      }
    }
  };


  constructor(public model: ModelService
    , public langService: LangService
    ,  public actionService: MasterActionService
    , public utilityService: UtilityService
    , private alertService: AlertService    
    , public dataLoadService: DataLoadService
    , public dataService: DataService
    , public gridService: GridService
    , private toastr: ToastrService
    , public modalService: DynamicModalService
    , private storageService: WebStorageService
  ) { 
    super(actionService);
    this.formParam.FORM_ID = 'AC_1011';
    this.mstColumnDef(); 
    this.dtlColumnDef();
    this.model.statementHead = new FinancialStatementHead();  
    this.model.statementHeadBacup = new FinancialStatementHead(); 

  }

  ngOnInit() {    
    this.setDefaultData(); 
    // Data get with localstorage
    let data = JSON.parse( this.storageService.getData( globalVariables.DAMI_PREVILIGE));
    this.model.userPrivilege = new UserPrivileges(data);  
    //this.loadPrevilige();
    //this.getStatementHeadList();
  }

  setDefaultData(){
    this.model.MSTR_SETUP_NO = "";
    this.model.financialStType  = fixedValues.financialStatementType;        
    this.model.REP_TYPE = "B"; 
    this.model.Cash_Flow=false;
    
  }
  loadPrevilige()
    {this.dataLoadService.load('FG_SA_COMM_USER_PREVILAGE/MAP', { P_CURRFORM: this.formParam.FORM_ID }).subscribe(result => {
      this.model.userPrivilege = new UserPrivileges(result.body);      
    }) 
  }
  

  onGridReady(grid) {    
    this.grid = grid;
    this.grid.api.setRowData([]);
    this.grid.api.sizeColumnsToFit();    
              
  }

  onDtlGridReady(dtlGrid) {    
    this.dtlGrid = dtlGrid;
    this.dtlGrid.api.setRowData([]);
    this.dtlGrid.api.sizeColumnsToFit();  
    this.getStatementHeadList();                    
  }

  private financialStatementOption: any = {
    "statementHead": {
      "required": {
        "message": "Head Of Balance Sheet is required"
      }
    },
    "statementSlNo": {
      "required": {
        "message": "SL NO required"
      },
      "size": {
				"min": 0,
				"max": 4,
			}
    },
    HEADING:{
      size:{
        min:0,
        max:100,
      }
    },
    ALIAS:{
      size:{
        min:0,
        max:100,
      }
    },
    FORMULA:{
      size:{
        min:0,
        max:50,
      }
    }

  }

  onChangeStatementType() {   

    if (this.model.REP_TYPE=='B')
    {
      this.model.ALL = false;
      this.model.Balance_Sheet =true;
      this.model.Income_Statement = false;
      this.model.Cash_Flow = false;

    }
    else if (this.model.REP_TYPE=='I')
    {
      this.model.ALL = false;
      this.model.Balance_Sheet =false;
      this.model.Income_Statement = true;
      this.model.Cash_Flow = false;

    }
    else if (this.model.REP_TYPE=='C')
    {
      this.model.ALL = false;
      this.model.Balance_Sheet =false;
      this.model.Income_Statement = false;
      this.model.Cash_Flow = true;


    }
    else

    {
      this.model.ALL = true;
      this.model.Balance_Sheet =false;
      this.model.Income_Statement = false;
      this.model.Cash_Flow = false;

    }

    this.getStatementHeadList();
  }
  getStatementHeadList(){

    this.dtlGrid.api.stopEditing(); 
    this.dtlGrid.api.psResetValidation(); 
     
    setTimeout(() => {
      if( this.dtlGrid.api.psGetChangeList().length > 0 || this.utilityService.psHasAnyChange(this.model.statementHeadBacup, this.model.statementHead) ){
        this.toastr.warning(this.langService.langData.pleaseSaveYourChanges, 'Warning');
        return;
      } 
      // Data get without API      
      let dataMstList = JSON.parse( this.storageService.getData( globalVariables.DAMI_STATEMENT_HEAD_LIST));
      let tmpStatementHeadList = dataMstList.map(element => {      
        element['SQL_STATE'] = fixedValues.sqlState.sqlUnchange;
        return new FinancialStatementHead( element );
      });         
      this.model.statementHeadListBacup = JSON.parse(JSON.stringify(tmpStatementHeadList));                                
      if (tmpStatementHeadList.length > 0) {
        this.grid.api.setRowData(tmpStatementHeadList); 
        setTimeout(() => {
          let rowNode = this.grid.api.getRowNode(0);         
          this.selectStatementMst(rowNode);
        });
      }

      // Data get with API
      // let paramObj = {
      //   P_REP_TYPE: this.model.REP_TYPE
      // };      
      // this.dataLoadService.load("FG_AC1011_STATEMENT_HEADS", paramObj)
      // .subscribe(result => {      
      //   let tmpStatementHeadList = result.body.map(element => {      
      //     element['SQL_STATE'] = fixedValues.sqlState.sqlUnchange;
      //     return new FinancialStatementHead( element );
      //   });         
      //   this.model.statementHeadListBacup = JSON.parse(JSON.stringify(tmpStatementHeadList));                                
      //   if (tmpStatementHeadList.length > 0) {
      //     this.grid.api.setRowData(tmpStatementHeadList); 
      //     setTimeout(() => {
      //       let rowNode = this.grid.api.getRowNode(0);

           
      //       this.selectStatementMst(rowNode);
      //     });
      //   }        
      // });


    }, 100);                
  }
  
  selectStatementMst(rowNode) {   
    if (this.grid.api.psGetSelectedNode() && this.grid.api.psGetSelectedNode().rowIndex === rowNode.rowIndex) {
      return;
    }

    this.dtlGrid.api.stopEditing();      
    setTimeout(() => {      
      if( this.dtlGrid.api.psGetChangeList().length > 0 || this.utilityService.psHasAnyChange(this.model.statementHeadBacup, this.model.statementHead) ){
        this.toastr.warning(this.langService.langData.pleaseSaveYourChanges, 'Warning');
        return;
      } 
      
      this.grid.api.getDisplayedRowAtIndex(rowNode.rowIndex).setSelected(true);
      this.dtlGrid.api.setRowData([]); 

      //Data get without API
      // Master object
      let dataOnj = JSON.parse( this.storageService.getData( globalVariables.DAMI_FINANCIAL_STATEMENTHEAD));
      // Details list
      let dataDtlList = JSON.parse( this.storageService.getData( globalVariables.DAMI_STATEMENT_DETAILS));

      this.model.statementHead = new FinancialStatementHead(dataOnj);       
        this.model.statementHeadBacup = JSON.parse(JSON.stringify(this.model.statementHead))              
      let dtlList = JSON.parse( this.storageService.getData( globalVariables.DAMI_STATEMENT_DETAILS));
        let tmpStatementDetailsList = dataDtlList.map(element => {      
          element['SQL_STATE'] = fixedValues.sqlState.sqlUnchange;
          return new StatementDetails( element );
        });  
        this.model.statementDetailsListBacup = JSON.parse(JSON.stringify(tmpStatementDetailsList));
        this.dtlGrid.api.setRowData(tmpStatementDetailsList);

      // Data get with API
      // let paramObj = {
      //   P_MASTER_SETUP_NO: rowNode.data.MSTR_SETUP_NO
      // };
      // let promiseAll = [
      //   this.dataLoadService.load("FG_AC1011_GET_STATEMENT", paramObj, true),
      //   this.dataLoadService.load("FG_AC1011_STATEMENT_DETAIL", paramObj)
      // ]      
      // forkJoin(promiseAll).subscribe(result => {
      //   this.model.statementHead = new FinancialStatementHead(result[0].body);       
      //   this.model.statementHeadBacup = JSON.parse(JSON.stringify(this.model.statementHead))              
      //   let tmpStatementDetailsList = result[1].body.map(element => {      
      //     element['SQL_STATE'] = fixedValues.sqlState.sqlUnchange;
      //     return new StatementDetails( element );
      //   });  
      //   this.model.statementDetailsListBacup = JSON.parse(JSON.stringify(tmpStatementDetailsList));
      //   this.dtlGrid.api.setRowData(tmpStatementDetailsList);        
      // });  

    }, 100);    
  }


  onClickAddNewMst(){
    this.dtlGrid.api.stopEditing();
    this.dtlGrid.api.psResetValidation();
    this.dtlGrid.api.psClearFilter();       
    setTimeout(() => {      
      if( this.hasMasterChange ){
        this.toastr.warning(this.langService.langData.pleaseSaveYourChanges, 'Warning');
        return;
      } 
      if (this.grid.api.psGetSelectedNode()) {
        this.grid.api.psGetSelectedNode().setSelected(false);
      }
      this.model.statementHead = new FinancialStatementHead();  
      this.dtlGrid.api.setRowData([]);
      
    }, 100);   
  }
  
  onClickAddNew(){  
    setTimeout(() => {      
      this.dtlGrid.api.stopEditing();
    }, 100);

    setTimeout(() => {
      let validationResult = this.dtlGrid.api.psValidate();
      if (validationResult.isValid) {      
        let elementDtl = new StatementDetails();      
        this.dtlGrid.api.psClearFilter();
        let res = this.dtlGrid.api.updateRowData({ add: [elementDtl] });
        this.dtlGrid.api.ensureIndexVisible(res.add[0].rowIndex);
        setTimeout(() => {
          this.dtlGrid.api.getRowNode(res.add[0].rowIndex).setSelected(true);
          this.dtlGrid.api.startEditingCell({
            rowIndex: res.add[0].rowIndex,
            colKey: this.dtlColObj[0].field
          });
        }, 100);
      }
    }, 100);
  }

  onClickSave(financialStatementValidation ){        

    this.dtlGrid.api.stopEditing();      
    setTimeout(() => {

      // form validation
      if (!(financialStatementValidation.validate().isValid)) {
        return;
      }

      // form Grid validation
      let validationResult = this.dtlGrid.api.psValidate();
      if (!validationResult.isValid) {
        return;
      }
      
      // No change fornd
      let hasChangeMst = this.utilityService.psHasAnyChange(this.model.statementHeadBacup, this.model.statementHead);      
      let dtlChangeCount = this.dtlGrid.api.psGetChangeList().length;  
      
      if (dtlChangeCount === 0 && !hasChangeMst ) {
        this.toastr.info(this.langService.langData.noChangeFound, 'Info');
        return;
      }
      
      var S_STATE;
      this.alertService.info(this.langService.langData.saveConfirmationMsg, true).then(data => {
        if (data) {
          let masterObj = JSON.parse(JSON.stringify(this.model.statementHead));          

          S_STATE = masterObj.SQL_STATE;
          masterObj['SHOW_IN'] = this.model.REP_TYPE;
          let DTL_LIST = JSON.parse(JSON.stringify(this.dtlGrid.api.psGetChangeList()));
          masterObj['DTL_LIST'] = DTL_LIST;          
          this.dataService.saveStatement(masterObj).subscribe(result => {                            
            this.toastr.success(this.langService.langData.saveSuccessMsg, 'Success');
            const DTL_LIST = JSON.parse(JSON.stringify(result.body.DTL_LIST));
            result.body.DTL_LIST = null;                  
            this.dtlGrid.api.psResetValidation(); 
            this.dtlGrid.api.psUpdateList(DTL_LIST, StatementDetails);

            this.model.statementHead = new FinancialStatementHead( result.body );                    
            this.model.statementHeadBacup = new FinancialStatementHead(result.body);             

            if (Number(S_STATE) == fixedValues.sqlState.sqlInsert) {
              this.grid.api.psClearFilter();
              let dtl = this.grid.api.updateRowData({ add: [this.model.statementHead] });
              setTimeout(() => {
                this.grid.api.ensureIndexVisible(dtl.add[0].rowIndex);
                dtl.add[0].setSelected(true);
              }, 100);
            }                        
            // get bacup      
            this.model.statementDetailsListBacup = JSON.parse(JSON.stringify(this.dtlGrid.api.psGridDataList()));

          }, err => {
            console.log("err", err);
          })

        }
      }) 
    }, 100 );
  }
    
  getStatementDtl(node){
    
    if (node.event.target !== undefined) {
      let data = node.data;
      //console.log("event", e)
      let actionType = node.event.target.getAttribute("data-action-type");
      switch (actionType) {
        case "accountCatListModal":
          return this.onClickOpenAccountCatListModal(node);
        case "inventoryListModal":
          return this.onClickOpenInventoryListModal(node);
          case "DeleteDtl":
            return this.onCellClickedDeleteDtl(node);

        default:
      }
    } else {

    }

  }

  checkDeletePrev(params) {
    if (this.model.userPrivilege.checkDeletePrev(params)) {
      return ` <button type="button" data-action-type="DeleteDtl" class="btn btn--squire text-danger border-0"><i class="ion-close" data-action-type="DeleteDtl"></i></button>`
    } else return '';
  }


  // Delete Element details
  private onCellClickedDeleteDtl(row): void {
    if (row.data.SQL_STATE == fixedValues.sqlState.sqlInsert) {
      this.dtlGrid.api.updateRowData({ remove: [row.data] });
    } else {
      row.data.SQL_STATE = fixedValues.sqlState.sqlDelete;
      this.dtlGrid.api.psRemove();
    }
  }

  onClickOpenAccountCatListModal(row) {
    this.modalService.openDialog('CommonListModule', 'list', {
      title: this.langService.langData.reportHeadList, data: {
        gridId: "AccountCatListGrid", columnDefs: accountCatListColumnDef, api: 'FG_AC_COMM_ACCOUNT_CATEGORIES',
        params: {}
      }, settings: { modalClass: 'sm' }
    }).then((modal: any) => {
      modal.closed = () => {
      };
      modal.success = (value) => {        
        row.node.data.NATURE_NO = value ? value.NATURE_NO : null;
        row.node.setDataValue("NATURE_NAME", value ? value.NATURE_NAME : '');
        row.api.psSetCellValue();
      };
    });
  }

  //return this.dataLoadService.load("FG_SA_COMM_STORE_TYPE_LIST")
  onClickOpenInventoryListModal(row) {
    
    if( ( !row.data.FORMULA && row.data.NATURE_NO ) || ( !row.data.FORMULA && row.data.STRTYPE_NO )){
      this.toastr.warning('Not Allowed Here!', 'Warning');
      return;
    }

    this.modalService.openDialog('CommonListModule', 'list', {
      title: this.langService.langData.inventoryList, data: {
        gridId: "InventoryListGrid", columnDefs: inventoryListColumnDef, api: 'FG_SA_COMM_STORE_TYPE_LIST',
        params: {}
      }, settings: { modalClass: 'sm' }
    }).then((modal: any) => {
      modal.closed = () => {
      };
      modal.success = (value) => {        
        row.node.data.STRTYPE_NO = value ? value.STRTYPE_NO : '';
        row.node.setDataValue("STRTYPE_NAME", value ? value.STRTYPE_NAME : '');
        row.api.psSetCellValue();
      };
    });
  }

  onClickReset() {        
    this.model.statementHead = new FinancialStatementHead(JSON.parse(JSON.stringify(this.model.statementHeadBacup)));
    this.onClickResetDtl();
  }

  onClickResetDtl(){
    this.dtlGrid.api.stopEditing();    
    this.dtlGrid.api.psClearFilter();
    this.dtlGrid.api.psResetValidation();    
    this.dtlGrid.api.setRowData([]);    
    let tmpStatementDetailsList = JSON.parse(JSON.stringify(this.model.statementDetailsListBacup));
    this.dtlGrid.api.setRowData(tmpStatementDetailsList);  
  }

  public mstColumnDef(){
    this.colObj = [
      {
        headerName: this.langService.langData.headOfCashFlow,
        field: 'HEADING',
        sortable: true,
        editable: false,
        filter: true,
        resizable: true,
        hide: false,
        width: 125
      },
                
    ];
    this.columnDefs = this.gridService.getColumnDefs(this.colObj, this.gridId);
  }


  // Details grid
  public dtlColumnDef(){
    this.dtlColObj = [
      {
        headerName: this.langService.langData.slNo,
        field: 'SL_NO',
        sortable: true,
        editable: this.isColumnEditable.bind(this),
        filter: true,
        resizable: true,
        hide: false,
        width: 125,
        cellRenderer:'numericPipeRenderer',
        cellEditor: 'numericCellEditor'
      },
      {
        headerName: this.langService.langData.accountsCategory,
        field: 'NATURE_NAME',
        sortable: true,        
        filter: true,
        resizable: true,
        hide: false,
        width: 125,
        editable: this.isColumnEditable.bind(this),
        cellEditor: "modalCellEditor",
        cellEditorParams: { psActionType: 'accountCatListModal' }
      },
      {
        headerName: this.langService.langData.inventory,
        field: 'STRTYPE_NAME',
        sortable: true,        
        filter: true,
        resizable: true,
        hide: false,
        width: 125,
        editable: this.isColumnEditable.bind(this),
        cellEditor: "modalCellEditor",
        cellEditorParams: { psActionType: 'inventoryListModal' }
      },      
      {
        headerName: this.langService.langData.alias,
        field: 'ALIAS',
        sortable: true,
        editable: this.isColumnEditable.bind(this),
        filter: true,
        resizable: true,
        hide: false,
        width: 125        
      },
      {
        headerName: this.langService.langData.formula,
        field: 'FORMULA',
        sortable: true,
        editable: this.isColumnEditable.bind(this),
        filter: true,
        resizable: true,
        hide: false,
        width: 125
      },
      {
        headerName: this.langService.langData.action,
        field: '_delete',
        sortable: false,
        width: 50,
        resizable: true,
        hide: false,
        pinned: "right",
        cellStyle: { textAlign: "center" },
        cellRenderer: this.checkDeletePrev.bind(this)
      },
          
      
    ];
    this.dtlColumnDefs = this.gridService.getColumnDefs(this.dtlColObj, this.dtlGridId);
  }

  isColumnEditable(params) {
    return this.model.userPrivilege.checkEditablePrev(params);
  }

  get hasAnyChange():Boolean{
		return this.hasMasterChange;
  }
  
  get hasMasterChange():Boolean{
    return ( this.hasChildChange || this.utilityService.psHasAnyChange(this.model.statementHeadBacup, this.model.statementHead) )
  }

  get hasChildChange():Boolean{
    return this.dtlGrid.api.psGetChangeList().length > 0;
  }

  trackByFn(index, item) {
    return index; // or item.id
  }
}
