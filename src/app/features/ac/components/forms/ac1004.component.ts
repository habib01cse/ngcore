/* angular stuff */3
import { Component, OnInit, ViewContainerRef, ViewChild } from "@angular/core";
import { DatePipe } from "@angular/common";

/* 3rd party libraries */
import { forkJoin } from "rxjs";
import { ToastrService } from "ngx-toastr";

/* our own stuff */
import { Voucher, VoucherDtl } from "src/app/features/ac/models/voucher.model";
import {
  DateService,
  MasterActionService,
  UtilityService
} from "src/app/shared";
import { acConfig as config } from "src/app/features/ac/ac.config";
import { fixedValues } from "src/app/shared/constants/fixed-values.enum";
import { DataService } from "src/app/features/ac/services/forms/voucher/data.service";
import { ModelService } from "src/app/features/ac/services/forms/voucher/model.service";
import { ModalService } from "src/app/shared/services/modal.service";
import { CommonService } from "src/app/features/ac/services/common.service";
import { LangService } from "src/app/core/services/lang.service";
import { globalVariables } from "src/app/core/constants/globalVariables";
import { Period } from "../../models/period.model";
import { AlertService } from "src/app/shared/popup/service/alert.service";
import { BaseComponent } from "src/app/core/base/base.component";
import { UserPrivileges } from "src/app/core/models/user-privileges";
import { DataLoadService } from "src/app/shared/services/data-load.service";
import { GridService } from "src/app/shared/services/grid.service";
import { DynamicModalService } from "dynamicModal";
import { Router } from '@angular/router';
import { element } from "protractor";
import { NgForm } from "@angular/forms";

import { FormCanDeactivate } from 'src/app/core/guards/form-can-deactivate/form-can-deactivate';
import { FormCommonComponent } from "src/app/core/base/form-common-component";

@Component({
  selector: "app-ac1004",
  templateUrl: "./../../templates/forms/ac1004.component.html",
  providers: [DatePipe]
})
export class Ac1004Component extends FormCommonComponent implements OnInit {
  @ViewChild("modalContainer", { static: true, read: ViewContainerRef })
  container;

  public gridList = [];

  defaultObject: any = {
    SYMBOL: null,
    CUR_NO: null,
    BU_ACC_NO: null,
    DEFAULT_BA: null,
    USED_SHORT_KEY: null,
    PERIOD_NO: null,
    VTYPE_NO: null,
    DATA_INSERT_ONLY: "0",
    GL_POSTING_DATE_MODIFY: "0",
    CREATE_VOUCHER_WITHOUT_CHIELD: "0"
  };
  voucher: Voucher;
  _isPrevious: number = 1;
  baseCurrency: string;
  voucherTypeName: string = "";
  dateFormat = config.defaultDateFormat;
  public psDateFormat;
  public numberPrecision;

  

  toDate: string;
  modalShow: boolean = false;

  showPaidTo: boolean = false;
  showReceiveFrom: boolean = false;
  showCostName: boolean = false;

  saveNewVoucher: boolean = false;

  addNewVoucher = false;
     
  voucherTypeList: any = [];
  periodList: any = [];
  payOrReceiveList: any = [];
  costNameList: any = [];
  currencyList: any = [];
  drCrList: any = [];
  dtlVoucherTypeList: any = [];

  clearingVoucherDtl: any;
  psDecimal: any;
  scrollPercentage = 0;

  // Grid Variables
  columnDefs = [];
  grid: any;
  gridId: string = "AC_1004";
  colObj = [];
  rowSelectionType = "single";

  voucherFilter = {
    PERIOD_NO: null,
    VTYPE_NO: null
  };

  public pinnedBottomRowData = [
    {
      CR: "Total"
    }
  ];
	get hasAnyChange():Boolean{
		return ( this.grid.api.psGetChangeList().length > 0 ||
    this.utilityService.psHasAnyChange(this.voucher, this.model.voucherBackup))
	}


 

  public pinnedBottomRowCols = ["DR_EX", "CR_EX"];
  public bottomTotalData = { DR_EX: 0, CR_EX: 0 };

  voucherOptions: any = {
    filterPeriodNo: {
      required: {
        message: "Period required"
      }
    },
    filterVoucherType: {
      required: {
        message: "Voucher Type required"
      }
    },
    periodNo: {
      required: {
        message: "Period required"
      }
    },
    voucherType: {
      required: {
        message: "Voucher Type required"
      }
    },
    voucherNo: {
      required: {
        message: "Voucher No required"
      }
    },
    date: {
      required: {
        message: "Date required"
      }
    },
    drCr: {
      required: {
        message: "Dr/Cr required"
      }
    },
    accountCode: {
      required: {
        message: "Account Code required"
      }
    },
    accountName: {
      required: {
        message: "Account Name required"
      }
    },
    currency: {
      required: {
        message: "Currency required"
      }
    },
    exchangRate: {
      required: {
        message: "Exchang rate required"
      }
    }
  };

  gridRequiredOptions: any = {
    DR_CR: {
      required: {
        message: ""
      }
    },
    ACC_CODE: {
      required: {
        message: ""
      }
    },
    ACC_NAME: {
      required: {
        message: ""
      }
    },
    CUR_NAME: {
      required: {
        message: ""
      }
    },
    EXCHANG_RATE: {
      required: {
        message: ""
      }
    },
    NARRATION: {
      size: {
        min: 0,
        max: 600
      }
    },
    COST_NAME: {  
       
      custom: row => {
        if (
          row.data.COST_FLG == 1 &&
          row.data.COST_SEL_TYPE != "O" &&
          !row.data.COST_NO
        )
          return false;
        return true;
      }
    },
    BA_NAME: {
      custom: row => {
        if (
          row.data.BA_FLG == 1 &&
          row.data.BA_SEL_TYPE != "O" &&
          !row.data.BA_NO
        )
          return false;
        return true;
      }
    }
  };

  V_NO_CALLING = null;

  constructor(
    private dataService: DataService,
    private commonService: CommonService,
    private dateUtil: DateService,
    public model: ModelService,
    private modal: ModalService,
    private alertService: AlertService,
    private utilityService: UtilityService,
    public langService: LangService,
    public actionService: MasterActionService,
    private dataLoadService: DataLoadService,
    public gridService: GridService,
    private dynamicModalService: DynamicModalService,
    private toastService: ToastrService,
    private router: Router
  ) {
    super(actionService);
    this.loadIntFormInfo();
    this.toDate = this.dateUtil.getYYYYMMDDDashFromDate(new Date());

    this.voucher = new Voucher();
    this.model.voucherBackup = JSON.parse(JSON.stringify(this.voucher));
    this.psDateFormat = globalVariables.psDateFormat;
    this.numberPrecision = globalVariables.numberPrecision;
    
  }

  loadIntFormInfo(){    
    const navigation = this.utilityService.getExtras(this.router, 'AC_1004');
    if (navigation.extras.state && navigation.extras.state.V_NO) {
      const state = navigation.extras.state as { V_NO: number };
      this.V_NO_CALLING = state.V_NO;
    }    
  }

  ngOnInit(): void {
    this.drCrList = this.model.getDrCrList();
    this.colObj = this.getColumnDefs();
    this.columnDefs = this.gridService.getColumnDefs(this.colObj, this.gridId);
    this.model.voucherBackup = JSON.parse(JSON.stringify(this.voucher));
    this.psDecimal = globalVariables.psDecimalPrecision;
    let _this = this;
    this.getDefaultData();
    this.init();
  }




  onPsGridColumnTotalChanged(data) {
    this.bottomTotalData = data;
  }
  // Calendar Open
  calendarOpen: boolean = false;
  calendarClose() {
    this.calendarOpen = false;
  }
  calendarSelect() {
    this.calendarOpen = false;
  }
  calendarFocus() {
    this.calendarOpen = true;
  }
  getTransform() {
    if (this.calendarOpen) {
      return "translateX(-" + this.scrollPercentage + "px)";
    } else {
      return "translateX(0)";
    }
  }

  getDefaultData() {
    this.dataService.getVoucherDefault().subscribe(result => {
      this.defaultObject = result.body;
      if (this.grid) {
        this.grid.api.getColumnDef(
          "DR_EX"
        ).headerName += this.getBasCurrencySymbol();
        this.grid.api.getColumnDef(
          "CR_EX"
        ).headerName += this.getBasCurrencySymbol();
        this.grid.api.refreshHeader();
      }
    });

    this.acCommPostCheck();
  }

  init() {
    this.periodList.length = 0;
    this.dataLoadService
      .load("FG_SA_COMM_USER_PREVILAGE/MAP", { P_CURRFORM: this.model.FORM_ID })
      .subscribe(result => {
        this.model.userPrivilege = new UserPrivileges(result.body);
        const promiseAll = [
          this.commonService.getVoucherTypes("-100"),
          this.commonService.getPeriods("1", ""),
          this.commonService.getCurrencies({ P_V_DATE: this.toDate }),
          this.commonService.getDtlVoucheTypes(),
          
          this.commonService.getRound()
        ];
        forkJoin(promiseAll).subscribe(
          results => {
            this.voucherTypeList = results[0].body;
            this.periodList = results[1].body.map(element => {
              return new Period(element);
            });

            this.currencyList = results[2].body;
            this.dtlVoucherTypeList = results[3].body;            
            this.model.roundlIist = results[4].body;            
            this.initDefault();
            this.onChangeVoucherPeriod();
          },
          error => {
            this.showlog("Error from forkjoin", error);
          }
        );

        
        // this.getConstCenterData();
      });

    // call outside of forkJoin for query result slowness
    // this.commonService.getCostCenters( fixedValues.queryOptions.PaidTo ).subscribe( result=> {
    //   this.payOrReceiveList = result.body;
    // }, error=> {
    //   this.showlog(error);
    // });
  }

  private getConstCenterData(): void {
    this.commonService
      .getCostCenters(fixedValues.queryOptions.PaidTo)
      .subscribe(result => {
        this.payOrReceiveList = result.body;
      });
  }

  initDefault() {
    this.voucherFilter.VTYPE_NO = this.defaultObject.VTYPE_NO;
    this.voucherFilter.PERIOD_NO = this.defaultObject.PERIOD_NO;
    this.model.voucherBackup = JSON.parse(JSON.stringify(this.voucher));
  }

  setEmptyData() {
    const voucherOptions = {
      VTYPE_NO: this.voucherFilter.VTYPE_NO,
      PERIOD_NO: this.voucherFilter.PERIOD_NO,
      V_DATE: new Date(),
      MODULE: "Accounts"
    };
    this.voucher = new Voucher(voucherOptions);
    this.generateVoucherTypeAndPeriod();
    this.model.voucherBackup = JSON.parse(JSON.stringify(this.voucher));
    this.grid.api.setRowData([]);
    if (this.addNewVoucher) {
      this.onClickAddVoucherDtl();
      this.addNewVoucher = false;
    }
  }

  generateVoucherTypeAndPeriod() {
    const period = this.periodList.find(x => {
      return Number(x.PERIOD_NO) == Number(this.voucher.PERIOD_NO);
    });
    if (period) {
      this.voucher.START_PERIOD_DATE = new Date(period.START_PERIOD_DATE);
      this.voucher.END_PERIOD_DATE = new Date(period.END_PERIOD_DATE);
    }

    const voucherType = this.voucherTypeList.find(x => {
      return Number(x.VTYPE_NO) == Number(this.voucher.VTYPE_NO);
    });
    if (voucherType) {
      this.voucher.VOUCHER_TYPE = voucherType.TYPE_NAME;
    }
  }


  acCommPostCheck(){
    this.dataLoadService.load("FG_AC_COMM_POST_CHECK/MAP", {
      P_MODULE: 'AC'
    }).subscribe(result => {
      this.model.postCheckObj = result.body;      
    });
  }

  // onGridReady()
  public onGridReady(grid): void {
    this.grid = grid;
    this.gridList = [this.grid];    
    // grid.api.gridCore.gridOptions.suppressKeyboardEvent = this.myEvent.bind(this);

    this.grid.api.setRowData([]);
    this.gridService.sizeColumnsToFit(grid, this.grid);
  }

  /**
   * onChangeVoucherFilter
   */
  public onChangeVoucherFilter(): void {
    if (this.voucherFilter.VTYPE_NO && this.voucherFilter.PERIOD_NO) {
      this.onChangeVoucherPeriod();
    } else {
      return;
    }
  }

  onChangeVoucherPeriod(V_NO?): void {
    this.grid.api.stopEditing();
    setTimeout(() => {
      if (
        this.grid.api.psGetChangeList().length > 0 ||
        this.utilityService.psHasAnyChange(
          this.voucher,
          this.model.voucherBackup
        )
      ) {
        this.toastService.warning(
          this.langService.langData.pleaseSaveYourChanges,
          "Warning"
        );
        return;
      }

      if (!this.voucherFilter.PERIOD_NO) {
        return;
      }

      this.setEmptyData();

      let _IS_OT_EXCLUDE = 0;
      if (V_NO) {
        _IS_OT_EXCLUDE = 1;
      }
      let voucherNo = this.voucherFilter.VTYPE_NO;
      this.model.setVisibility(voucherNo);

      this._isPrevious = 1;

      this.getVoucher(V_NO, _IS_OT_EXCLUDE);
    }, 200);
  }

  onClickPrevVoucher(event): void {
    if (
      this.grid.api.psGetChangeList().length > 0 ||
      this.utilityService.psHasAnyChange(this.voucher, this.model.voucherBackup)
    ) {
      this.toastService.warning(
        this.langService.langData.pleaseSaveYourChanges,
        "Warning"
      );
      return;
    }
    const validationResult = event.validate();
    if (!validationResult.isValid) {
      return;
    }
    this._isPrevious = 1;
    this.getVoucher(this.voucher.V_NO, 0);
  }

  onClickNextVoucher(event): void {
    if (
      this.grid.api.psGetChangeList().length > 0 ||
      this.utilityService.psHasAnyChange(this.voucher, this.model.voucherBackup)
    ) {
      this.toastService.warning(
        this.langService.langData.pleaseSaveYourChanges,
        "Warning"
      );
      return;
    }
    const validationResult = event.validate();
    if (!validationResult.isValid) {
      return;
    }
    this._isPrevious = 0;
    this.getVoucher(this.voucher.V_NO, 0);
  }

  onClickFilter(event) {
    const validationResult = event.validate();
    if (validationResult.isValid) {
      this.onChangeVoucherPeriod();
    }
  }

  getVoucher(V_NO, _EXCLUDE): void {
    this.model.setSelectdPeriod(this.periodList, this.voucherFilter.PERIOD_NO);
    this.dataService
      .getVoucher(
        this.voucherFilter.VTYPE_NO,
        this.voucherFilter.PERIOD_NO,
        this._isPrevious,
        // V_NO,
        // _EXCLUDE
        V_NO = this.V_NO_CALLING ? this.V_NO_CALLING : V_NO ? V_NO : null,
        // @this.V_NO_CALLING it used when calling another form 
        _EXCLUDE = _EXCLUDE ? _EXCLUDE : this.V_NO_CALLING ? 1 : 0
      )
      .subscribe(
        data => {
          if (data.body) {
            this.grid.api.psResetValidation();
            data.body["SQL_STATE"] = fixedValues.sqlState.sqlUnchange;
            this.voucher = new Voucher(data.body);
            this.generateVoucherTypeAndPeriod();
            this.model.voucherBackup = JSON.parse(JSON.stringify(this.voucher));
            this.grid.api.setRowData([]);
            this.dataService
              .getVoucherDetail(this.voucher.V_NO)
              .subscribe(result => {
                let voucherDtlList = result.body.map(element => {
                  element["SQL_STATE"] = fixedValues.sqlState.sqlUnchange;
                  return new VoucherDtl(element);
                });
                this.model.voucherDtlBackup = JSON.parse(
                  JSON.stringify(voucherDtlList)
                );
                this.grid.api.setRowData(voucherDtlList);
              });
          } else {
            this.toastService.warning(
              this.langService.langData.noDataFound,
              "Warning"
            );
          }
        },
        err => { }
      );
  }

  openBankAccount(row): void {
    // this.modal.createBankDetailComponent(this.container, row);
  }

  private setVisibility(vtypeNo): void {
    this.model.setVisibility(vtypeNo);
  }
  // R&D

  private showlog(arg1: any = null, arg2: any = null): void {
    console.log(arg1, arg2);
  }

  onClickNewVoucher(event): void {
    this.grid.api.stopEditing();
    this.addNewVoucher = true;
    setTimeout(() => {
      if (!this.voucherFilter.PERIOD_NO) return;

      const voucherObject = this.periodList.find(element => {
        return element.PERIOD_NO == this.voucherFilter.PERIOD_NO;
      });

      if (voucherObject) {
        if (
          new Date(voucherObject.START_PERIOD_DATE).getFullYear() !=
          new Date().getFullYear()
        ) {
          this.toastService.info(
            "You can only add voucher in the current year"
          );
          // Add new item protect
          //return;
        }
      }

      if (
        this.grid.api.psGetChangeList().length > 0 ||
        this.utilityService.psHasAnyChange(
          this.voucher,
          this.model.voucherBackup
        )
      ) {
        this.toastService.warning(
          this.langService.langData.pleaseSaveYourChanges,
          "Warning"
        );
        return;
      }
      const validationResult = event.validate();
      if (!validationResult.isValid) {
        return;
      }
      this.setEmptyData();
    }, 200);
  }

  /**
   * onClickPaidToModal
   */
  public onClickPaidToModal(): void {

    let shiftListColumnDefs1 = [{ headerName: "Cost Name", field: "COST_NAME" }];
    this.dynamicModalService
      .openDialog("CommonListModule", "list", {
        title: this.langService.langData.costCenterList,
        data: {
          gridId: "AC1004CostCentetListGrid",
          columnDefs: shiftListColumnDefs1,
          api: "FG_AC_COMM_COST_CENTERS",
          params: {
            P_QUERYOPTIONS: fixedValues.queryOptions.PaidTo,
            P_ACC_NO: null
          }
        },
        settings: { modalClass: "sm" }
      })
      .then((modal: any) => {
        modal.closed = () => { };
        modal.success = result => {
          this.voucher.PAID_TO = result ? result.COST_NO : null;
          this.voucher.PAID_TO_NAME = result ? result.COST_NAME : null;
        };
      });
  }

  onClickAddVoucherDtl() {
    this.grid.api.stopEditing();
    this.grid.api.psClearFilter();
    setTimeout(() => {

      if (!this.voucherFilter.PERIOD_NO) return;
      // Perioad Related  validation
      // Protect create new item for details same login already apply in master record
      // const voucherObject = this.periodList.find(element => {
      //   return element.PERIOD_NO == this.voucherFilter.PERIOD_NO;
      // });
             
      // if (voucherObject) {
      //   if (
      //     new Date(voucherObject.START_PERIOD_DATE).getFullYear() !=
      //     new Date().getFullYear()
      //   ) {
      //     this.toastService.info(
      //       "You can only add voucher in the current year"
      //     );         
      //     return;
      //   }
      // }

      let validationResult = this.grid.api.psValidate();
      if (validationResult.isValid) {
        let different = this.totalDifferent();
        let res;
        let deletedItemLength = 0;
        this.grid.api.forEachNode(node => {
          if((node.data.SQL_STATE == fixedValues.sqlState.sqlDelete) && (this.grid.api.getSelectedNodes()[0].rowIndex > node.rowIndex)){
            deletedItemLength++;
          }
        });

        if (different < 0) {
          if (this.grid.api.getSelectedNodes().length > 0) {
            res = this.grid.api.updateRowData({
              add: [new VoucherDtl({ ACTIVE_STAT: 1, DR_CR: "Cr", POST_DATE: new Date() })],
              addIndex: parseInt(this.grid.api.getSelectedNodes()[0].id) + ++deletedItemLength
            });
          } else {
            res = this.grid.api.updateRowData({
              add: [new VoucherDtl({ ACTIVE_STAT: 1, DR_CR: "Cr", POST_DATE: new Date() })]
            });
          }

        } else {
          if (this.grid.api.getSelectedNodes().length > 0) {
            res = this.grid.api.updateRowData({
              add: [new VoucherDtl({ ACTIVE_STAT: 1, POST_DATE: new Date() })],
              addIndex: parseInt(this.grid.api.getSelectedNodes()[0].id) + ++deletedItemLength
            });
          } else {
            res = this.grid.api.updateRowData({
              add: [new VoucherDtl({ ACTIVE_STAT: 1, POST_DATE: new Date() })]
            });
          }

        }


        // res = this.grid.api.updateRowData({ add: [new VoucherDtl({ ACTIVE_STAT: 1 })] });
        this.grid.api.ensureIndexVisible(res.add[0].rowIndex);
        res.add[0].setSelected(true);
        this.grid.api.startEditingCell({
          rowIndex: res.add[0].rowIndex,
          colKey: this.colObj[0].field
        });
      }
    }, 200);
  }

  private totalDifferent() {
    // Old Code
    let crSum = 0;
    let drSum = 0;
    this.grid.api.forEachNode(node => {
      if (node.data.SQL_STATE != fixedValues.sqlState.sqlDelete) {
        if (node.data.CR_EX) {
          crSum += node.data.CR_EX;
        }
        if (node.data.DR_EX) {
          drSum += node.data.DR_EX;
        }
      }
    });
    return crSum - drSum;

    //return Number( ( this.bottomTotalData.DR_EX - this.bottomTotalData.CR_EX ).toFixed(2));
  }

  deleteVoucherDtl(row): void {
    if (row.data.SQL_STATE == fixedValues.sqlState.sqlInsert) {
      this.grid.api.updateRowData({ remove: [row.data] });
      this.grid.api.psResetValidation();
    } else {
      row.data.SQL_STATE = fixedValues.sqlState.sqlDelete;
      this.grid.api.psRemove();
    }
  }

  onClickClearing(voucherDtl: VoucherDtl): void {
    this.grid.api.stopEditing();
    setTimeout(() => {
      if (this.voucher.MODULE != "Accounts") {
        this.toastService.warning("Module should be Accounts.", "Warning");
        return;
      }
      if (voucherDtl.MAP_ACC_NAME == null || voucherDtl.MAP_ACC_NAME == "") {
        this.toastService.warning("Map accout not found!", "Warning");
        return;
      }
      if (!this.voucher.V_NO) {
        this.toastService.warning("Please save the first!", "Warning");
        return;
      }

      if (voucherDtl.POST_DATE instanceof Date == false) {
        this.toastService.warning("Post Date not found!", "Warning");
        return;
      }
      this.modalShow = true;
      
      this.clearingVoucherDtl = Object.assign({}, voucherDtl);
    }, 500);
  }

  onClickPostVoucher() {
    this.grid.api.stopEditing();
    setTimeout(() => {
      let row = this.grid.api.psGetSelectedNode();
      if (row.data.V_ID) {
        this.toastService.warning("Already voucher created!", "Warning");
        return;
      }
      // let obj = {
      //   VTYPE_NO: this.clearingVoucherDtl.VTYPE_NO > 0 ? this.clearingVoucherDtl.VTYPE_NO : 28,
      //   POST_DATE: this.dateUtil.getYYYYMMDDDashFromDate(this.clearingVoucherDtl['POST_DATE']),
      //   V_NARRATION: this.clearingVoucherDtl.V_NARRATION ? this.clearingVoucherDtl.V_NARRATION : '',
      //   ACC_NO: this.clearingVoucherDtl.ACC_NO,
      //   COST_NO: this.clearingVoucherDtl.COST_NO,
      //   NARRATION: this.voucher.NARRATION ? this.voucher.NARRATION : '',
      //   EXCHANG_RATE: this.clearingVoucherDtl.EXCHANG_RATE,
      //   CUR_NO: this.clearingVoucherDtl.CUR_NO,
      //   DR: this.clearingVoucherDtl.DR ? this.clearingVoucherDtl.DR : 0,
      //   BA_NO: this.clearingVoucherDtl.BA_NO,
      //   REF_NO: this.clearingVoucherDtl.REF_NO,
      //   CR: this.clearingVoucherDtl.CR ? this.clearingVoucherDtl.CR : 0,
      //   V_NO: row.data.V_NO,
      //   V_ID: ''
      // }
      this.modalShow = false;
      // console.log('this.clearingVoucherDtl', this.clearingVoucherDtl);
      // console.log('obj', obj);

      this.clearingVoucherDtl["V_NARRATION"] = this.voucher.NARRATION;
      this.clearingVoucherDtl["VTYPE_NO"] =
        this.clearingVoucherDtl.VTYPE_NO > 0
          ? this.clearingVoucherDtl.VTYPE_NO
          : 28;
      this.clearingVoucherDtl[
        "POST_DATE"
      ] = this.dateUtil.getYYYYMMDDDashFromDate(
        this.clearingVoucherDtl["POST_DATE"]
      );
      this.clearingVoucherDtl["V_NO"] = row.data.V_NO;

      this.dataService.voucherClearining(this.clearingVoucherDtl).subscribe(
        result => {
          // debugger;
          // row.setDataValue("V_ID", result.body.VOUCHER_ID);
          row.setDataValue("REF_V_ID", result.body.VOUCHER_ID);
          row.data.REF_V_NO = result.body.N_VNO;
          row.data.VTYPE_NO = result.body.VTYPE_NO;
          // row.api.psSetCellValue
          // row.api.psSetCellValue();
          this.grid.api.refreshCells();
        },
        err => { }
      );
    }, 1000);
  }
  // On Change foucus in details gird of first firlds
  onChangeVoucherDate(){
    let res;    
    this.grid.api.psResetValidation();
    this.grid.api.stopEditing();
    setTimeout(() =>{
      res = this.grid.api.psGetSelectedNode();      
      this.grid.api.startEditingCell({        
        rowIndex: res.rowIndex,
        colKey: this.colObj[0].field
      });
    }, 50)    
  }

  onClickUnpostVoucher() {
    this.clearingVoucherDtl = null;
    this.modalShow = false;
  }

  onClickPreview() {
    if (this.voucher.V_NO) {
      this.commonService.getReportInfo("AC_3002").subscribe(result => {
        let X_Submenu_Id = globalVariables.menuInfo.MENU_ID;
        let subPart = X_Submenu_Id.substring(0, 2);
        let params = {
          baseUrl: globalVariables.paramsReportBaseUrl,
          rwservlet: result.body[0].REPORT_SERVER,
          desformat: result.body[0].REPORT_FORMAT,
          destype: "cache",
          report: `${globalVariables.reportPath}${subPart}/AC_3002`,
          X_Emp_Id: globalVariables.userInfo.emp_ID,
          X_Submenu_Id: "AC_3002",
          X_company_no: globalVariables.userInfo.company_NO,
          X_currency_format: result.body[0].SS_CURRENCY_FMT,
          X_date_format: result.body[0].SS_DT_FMT,
          X_time_format: result.body[0].SS_TIME_FMT,
          X_ROUND: this.model.roundlIist[0].F_ROUND,
          p_vno: this.voucher.V_NO,
          p_reppath: globalVariables.reportPath
        };

        this.utilityService.showReport(params);
      });
    }
  }

  onClickSearchModal() {    
    // if (this.voucher.PERIOD_NO && this.voucher.VTYPE_NO) {
    //   this.modal.createVoucherSearchComponent(this.container, this);      
    // }
  }

  onClickUpload() {
    this.dynamicModalService
      .openDialog("FileUploadModule", "file-upload", {
        title: "File Upload",
        data: {
          userPrivilege: this.model.userPrivilege,
          refTypeId: 7,
          refId: this.voucher.V_NO
        },
        settings: { modalClass: "lg" }
      })
      .then((modal: any) => {
        modal.closed = e => { };
        modal.success = result => {
          
        };
      });
  }

  onClickSaveVouchar(voucherValidation: any): void {
    this.grid.api.stopEditing();
    setTimeout(() => {    
      if (this.totalDifferent() != 0) {
        this.toastService.warning(
          this.langService.langData.totalDebitAndCreditdoesnmatch,
          "Warning"
        );
      }
      // else if (!this.voucher.V_NO && this.grid.api.psGridDataList().length <= 0) {
      //   this.toastService.warning(this.langService.langData.emptyTableDataMessage, 'Warning');
      // }
      else if (
        this.grid.api.psGetChangeList().length <= 0 &&
        !this.utilityService.psHasAnyChange(
          this.voucher,
          this.model.voucherBackup
        )
      ) {
        this.toastService.warning(
          this.langService.langData.noChangeFound,
          "Warning"
        );
      } else {
        this.commonService.getPostEditChk().subscribe(result => {
          if (
            (this.voucher.CHECK_FLAG == 1 || this.voucher.POST_FLG == 1) &&
            result.body[0].CHK == 0
          ) {
            this.commonService.getAllText().subscribe(data => {
              this.toastService.warning(data.body[0].ALT_TEXT, "Warning");
            });
          } else {
            
            // Use this code block according to user request
            // without business docs
            let getDataList = JSON.parse( JSON.stringify(  this.grid.api.psGetChangeList()));                   
            for(let i = 0;  i < getDataList.length; i++){
              if( getDataList[i].COST_FLG == 1 &&
                  getDataList[i].COST_SEL_TYPE !== 'O' &&
                  !getDataList[i].COST_NO  ){
                this.toastService.warning("Cost center is required field!", "Warning");
                break;
              }
            }

            let validationResult = voucherValidation.validate();
            let validationDtlResult = this.grid.api.psValidate();
            //console.log('validationDtlResult !!', validationDtlResult);
            if (!validationResult.isValid || !validationDtlResult.isValid) {
              this.toastService.warning("Validation failed!", "Warning");
            } else if (this.voucher.MODULE != "Accounts") {
              this.toastService.warning(
                "Module should be Accounts.",
                "Warning"
              );
            }
            
            else if (
              this.defaultObject.DATA_INSERT_ONLY == "1" &&
              this.voucher.V_NO
            ) {
              this.toastService.warning("You have no permission!", "Warning");
            }
            
            else if (
              this.bottomTotalData.CR_EX != this.bottomTotalData.DR_EX
            ) {
              this.toastService.warning(
                "Total Debit and Credit doesn't match!",
                "Warning"
              );
            } 
            
            else {
              let voucher = JSON.parse(JSON.stringify(this.voucher));
              let userName = globalVariables.userInfo.user_NAME;            
                // 1 mins posted 
                if(voucher.SQL_STATE == fixedValues.sqlState.sqlInsert){
                  voucher.POST_FLG = this.model.postCheckObj.IS_POST ? this.model.postCheckObj.IS_POST : 0;
                  voucher.CHECK_FLAG = this.model.postCheckObj.IS_POST ? this.model.postCheckObj.IS_POST : 0;
                }                                          
                voucher.POST_DATE = voucher.POST_FLG ? 
                this.dateUtil.getYYYYMMDDDashFromDate(this.voucher.V_DATE): null;               
                voucher.APPROVE_DATE = voucher.POST_DATE;                
                voucher.CHECK_DATE = voucher.POST_FLG ? 
                this.dateUtil.getYYYYMMDDDashFromDate(this.voucher.V_DATE): null;          
              voucher.PREPARED_DATE =  this.dateUtil.getYYYYMMDDDashFromDate(new Date());             
              voucher.PREPARED_BY = userName;
              voucher.CHECK_BY_NAME = userName;
              voucher.APPROVE_BY = userName;
                       
              if (
                this.utilityService.psHasAnyChange(
                  this.voucher,
                  this.model.voucherBackup
                ) &&
                voucher["SQL_STATE"] != fixedValues.sqlState.sqlInsert
              ) {
                voucher["SQL_STATE"] = fixedValues.sqlState.sqlUpdate;
              }

              if (this.saveNewVoucher) {
                voucher["SQL_STATE"] = fixedValues.sqlState.sqlInsert;
              }

              voucher["V_DATE"] = this.dateUtil.getYYYYMMDDDashFromDate(
                voucher.V_DATE
              );
              // voucher['APPROVE_DATE'] = this.dateUtil.getYYYYMMDDDashFromDate(new Date(voucher.APPROVE_DATE));
              // voucher['PREPARED_DATE'] = this.dateUtil.getYYYYMMDDDashFromDate(new Date(voucher.PREPARED_DATE));

              let list = [];
              list = JSON.parse(
                JSON.stringify(this.grid.api.psGetChangeList())
              ).map(elemment => {
                elemment.POST_DATE = this.dateUtil.getYYYYMMDDDashFromDate(
                  elemment.POST_DATE
                );
                elemment.CHK_REC_DATE = this.dateUtil.getYYYYMMDDDashFromDate(
                  elemment.CHK_REC_DATE
                );
                elemment.CHEQUE_DATE = this.dateUtil.getYYYYMMDDDashFromDate(
                  elemment.CHEQUE_DATE
                );
                elemment.CHK_DEP_DATE = this.dateUtil.getYYYYMMDDDashFromDate(
                  elemment.CHK_DEP_DATE
                );
                elemment.CHK_VOID_DATE = this.dateUtil.getYYYYMMDDDashFromDate(
                  elemment.CHK_VOID_DATE
                );
                elemment.VOID_FLAG =
                  elemment.VOID_FLAG == "Y" ? elemment.VOID_FLAG : "";
                return elemment;
              });
              // debugger;
              voucher.voucherDtlList = list;
              if (
                this.defaultObject.CREATE_VOUCHER_WITHOUT_CHIELD == "0" &&
                this.bottomTotalData.CR_EX <= 0 &&
                this.bottomTotalData.DR_EX <= 0 && 
                !this.voucher.V_NO

              ) {
                this.toastService.warning(
                  "Voucher cancnot save without child!",
                  "Warning"
                );
                return;
              }
              this.alertService
                .info("Do you want to save this Entry?", true)
                .then(data => {
                  if (data) {
                    this.dataService.saveVoucher(voucher).subscribe(
                      data => {

                        if (!this.utilityService.checkResp(data)) return;  

                        this.saveNewVoucher = false;
                        this.toastService.success(
                          "Saved Successfully",
                          "Success!"
                        );
                        const voucherDtlList = JSON.parse(
                          JSON.stringify(data.body.voucherDtlList)
                        );
                        if (voucherDtlList.length > 0) {
                          data.body.voucherDtlList.length = 0;
                          this.grid.api.psUpdateList(
                            voucherDtlList,
                            VoucherDtl
                          );
                        }
                        data.body["SQL_STATE"] =
                          fixedValues.sqlState.sqlUnchange;

                        this.voucher = new Voucher(data.body);
                        this.voucher.PREPARED_DATE = this.dateUtil.getDDMMYYYYSlashFromDate(voucher.PREPARED_DATE)
                        this.voucher.CHECK_DATE = this.dateUtil.getDDMMYYYYSlashFromDate(voucher.CHECK_DATE)
                        this.voucher.APPROVE_DATE = this.dateUtil.getDDMMYYYYSlashFromDate(voucher.APPROVE_DATE)
                        this.generateVoucherTypeAndPeriod();
                        this.model.voucherBackup = JSON.parse(
                          JSON.stringify(this.voucher)
                        );
                        this.model.voucherDtlBackup = JSON.parse(
                          JSON.stringify(this.grid.api.psGridDataList())
                        );
                      },
                      err => {
                        // try {
                        //   this.toastService.error(err.massage, 'Error');
                        // } catch (error) {
                        //   this.showlog(err);
                        // }
                      }
                    );
                  }
                });
            }
          }
        });
      }
    }, 500);
  }

  onClickResetVouchar() {
    this.grid.api.psResetValidation();
    this.grid.api.psClearFilter();
    this.grid.api.setRowData([]);
    this.voucher = new Voucher ( JSON.parse(JSON.stringify(this.model.voucherBackup)) );

    this.grid.api.setRowData(
      JSON.parse(JSON.stringify(this.model.voucherDtlBackup))
    );
  }

  onClickFilterReset() {
    this.grid.api.psResetValidation();
    this.grid.api.psClearFilter();
    this.grid.api.setRowData([]);
    this.init();
  }

  public onCellClicked(row): void {
    if (row.event.target != undefined) {
      let data = row.data;
      this.model.selectedVoucher.ACC_PATH = row.data.ACC_PATH;
      let actionType = row.event.target.getAttribute("data-action-type");

      switch (actionType) {
        case "checkbox":
          const check = row.event.target.checked ? 1 : 0;
          row.node.setDataValue("ACTIVE_STAT", check);
          return;
        case "account":
          this.onCellAccountCodeClicked(row, true);
          return;
        case "accountCode":
          this.onCellAccountCodeClicked(row, false);
          return;
        case "costCenter":
          this.onCellCostCenterClicked(row);
          return;
        case "businessUnit":
          this.onCellBuAreaClicked(row);
          return;
        case "referanceNo":
          this.onReferenceCellClicked(row);
          return;
        case "currencyName":
          this.onCurrencyNameCellClicked(row);
          return;
        case "voucherTypeName":
          this.onVoucherTypeCellClicked(row);
          return;
        case "clearing":
          this.onClickClearing(row.data);
          return;
        case "invoiceNO":
          this.reportPreview(row.data);
          return;
        case "delete":
          this.deleteVoucherDtl(row);
          return;
        case "creditCard":
          this.openBankAccount(row);
          return;
      }
    }
  }

  private onCellAccountCodeClicked(row, value?): void {
    let commonPolicyList = [];
    let commonConfigList;
    let commonBusinessAreaList = [];
    let promiseAll = [
      this.dataLoadService.load("FG_AC_COMM_POLICY_LIST"),
      this.dataLoadService.load("FG_AC_COMM_CONFIG/MAP"),
      this.dataLoadService.load("FG_AC1004_BA_LIST")
    ];
    forkJoin(promiseAll).subscribe(results => {
      commonPolicyList = results[0].body;
      commonConfigList = results[1].body;
      commonBusinessAreaList = results[0].body;

      let voucherObj = this.voucherTypeList.find(e => {
        return e.VTYPE_NO == this.voucherFilter.VTYPE_NO;
      });
     
      let P_QUERYOPTIONS;
      if (voucherObj != "undefined") {
        if (voucherObj.V_TYPE == "CT") {
          if (commonPolicyList.length > 0) {
            P_QUERYOPTIONS = 5;
          } else {
            P_QUERYOPTIONS = 4;
          }
        } else {
          if (commonPolicyList.length > 0) {
            P_QUERYOPTIONS = 3;
          } else {
            if (commonConfigList.MULTICOMPANY_CHART == 1) {
              P_QUERYOPTIONS = 2;
            } else {
              P_QUERYOPTIONS = 1;
            }
          }
        }
      }

      let costName = "";
      let costObj = this.payOrReceiveList.find(e => {
        return e.COST_NO == this.voucher.COST_NO;
      });

      if (costObj) {
        costName = costObj.COST_NAME;
      }

      let colDefs;
      if (value) {
        colDefs = [
          {
            headerName: "Account Name",
            filter: "agTextColumnFilter",
            field: "ACC_NAME",
            sortable: true,
            resizable: true,
            hide: false
          },
          {
            headerName: "Acc Path",
            field: "ACC_PATH",
            sortable: true,
            filter: false,
            resizable: true,
            hide: false,
            getQuickFilterText: function (params) {
              return false;
            }
          },
          {
            headerName: "Map Account",
            field: "MAP_ACC_NAME",
            sortable: true,
            filter: false,
            resizable: true,
            hide: false,
            getQuickFilterText: function (params) {
              return false;
            }
          }
        ];
      } else {
        colDefs = [
          {
            headerName: "Account Code",
            filter: "agTextColumnFilter",
            field: "ACC_CODE",
            sortable: true,
            resizable: true,
            hide: false
          },
          {
            headerName: "Acc Path",
            field: "ACC_PATH",
            sortable: true,
            filter: false,
            resizable: true,
            hide: false,
            getQuickFilterText: function (params) {
              return false;
            }
          },
          {
            headerName: "Map Account",
            field: "MAP_ACC_NAME",
            sortable: true,
            filter: false,
            resizable: true,
            hide: false,
            getQuickFilterText: function (params) {
              return false;
            }
          }
        ];
      }

      this.dynamicModalService
        .openDialog("CommonListModule", "list", {
          title: "Accounts",
          data: {
            gridId: "Ac1004DrCrTypeGrid",
            columnDefs: colDefs,
            api: "FG_AC1004_ACCOUNTS_COAD_LIST",
            params: {
              P_QUERYOPTIONS: P_QUERYOPTIONS,
              P_BA_NAME: P_QUERYOPTIONS == 1 ? costName : null,
              P_BA_NO: P_QUERYOPTIONS == 1 ? this.voucher.COST_NO : null
            }
          },
          settings: { modalClass: "lg" }
        })
        .then((modal: any) => {
          modal.closed = e => {
            row.api.psSetCellFocus();
          };
          modal.success = result => {
           
            // debugger;
            row.node.data.ACC_NO = result ? result.ACC_NO : null;
            row.node.setDataValue("ACC_CODE", result ? result.ACC_CODE : '');
            row.node.setDataValue("ACC_NAME", result ? result.ACC_NAME : '');
            //row.node.setDataValue("ACC_PATH", result ? result.ACC_PATH : '');
            row.node.setDataValue("MAP_ACC_NAME", result ? result.MAP_ACCOUNT : '');
            row.node.data.MAP_ACC_NO = result ? result.MAP_ACC_NO : null;

            row.node.data.COST_FLG = result ? result.COST_FLG : 0;
            row.node.data.BA_FLG = result ? result.BA_FLG : 0;
            row.node.data.COST_SEL_TYPE = result ? result.COST_SEL_TYPE : "O";
            row.node.data.BA_SEL_TYPE = result ? result.BA_SEL_TYPE : "O";
            
            // user out side the grid 
            this.model.selectedVoucher.ACC_PATH = result.ACC_PATH ? result.ACC_PATH : '';

            // debugger;
            // if (parseInt(row.node.data.SQL_STATE) == fixedValues.sqlState.sqlInsert && row.node.data.CUR_NO < 1) {
            //   row.node.data.CUR_NO = result.CUR_NO;
            //   const curObj = this.currencyList.find(x => x.CUR_NO == result.CUR_NO);
            //   if (curObj) {
            //     row.node.setDataValue('CUR_NAME', curObj.C_NAME);
            //     row.node.setDataValue('EXCHANG_RATE', curObj.EXCHANGE_RATE);
            //     if (this.defaultObject.CUR_NO == result.CUR_NO) {
            //       let different = this.totalDifferent();
            //       if (row.data.DR_CR == 'Dr' && different > 0) {
            //         row.node.setDataValue('DR', Math.abs(different));
            //       } else if (row.data.DR_CR == 'Cr' && different < 0) {
            //         row.node.setDataValue('CR', Math.abs(different));
            //       }

            //       // this.setDefaultCurrency(row, result);

            //     }
            //   }
            // }

            this.getCurrency(row);

            if (result.COST_FLG == 1 && result.COST_SEL_TYPE == "F")
              this.getCostCenter(row);

            if (result.BA_FLG == 1 && result.BA_SEL_TYPE == "F")
              this.getCostBusinessArea(row);
            row.value = row.data[row.colDef.field]; // optional
            row.api.psSetCellValue();
            this.calculateRate(row);
          };
        });
    });
  }

  private getCurrency(row): void {
    let couurncyObj = this.currencyList.find(e => {
      return e.CUR_NO == this.voucher.CUR_NO;
    });

    let currency = "";
    let exchangRate = null;

    if (couurncyObj) {
      currency = couurncyObj.C_NAME;
      exchangRate = couurncyObj.EXCHANGE_RATE;
    }
    this.dataLoadService
      .load("FG_AC1004_BASE_CURRENCY", {
        P_ACC_NO: row.data.ACC_NO,
        P_CURRENCY: currency,
        P_EXCHANGE_RATE: exchangRate,
        P_CURR_NO: this.voucher.CUR_NO
      })
      .subscribe(result => {
        if (this.voucher.CUR_NO) {
          const curObj = this.currencyList.find(
            x => x.CUR_NO == this.voucher.CUR_NO
          );
          if (curObj) {
            row.data.CUR_NO = this.voucher.CUR_NO;
            row.node.setDataValue("CUR_NAME", curObj.C_NAME);
            row.node.setDataValue("EXCHANG_RATE", curObj.EXCHANGE_RATE);
            if (
              parseInt(row.node.data.SQL_STATE) ==
              fixedValues.sqlState.sqlInsert &&
              row.node.data.CUR_NO
            ) {
              let different = this.totalDifferent();
              if (row.data.DR_CR == "Dr" && different > 0) {
                row.node.setDataValue(
                  "DR",
                  Math.abs(different / Number(curObj.EXCHANGE_RATE))
                );
              } else if (row.data.DR_CR == "Cr" && different < 0) {
                row.node.setDataValue(
                  "CR",
                  Math.abs(different / Number(curObj.EXCHANGE_RATE))
                );
              }
            }
            if (row.data.DR_CR == "Dr") {
              const DR_EX =
                row.data.DR_CR && row.data.DR_CR.toLowerCase() == "dr"
                  ? Number(row.data.DR) * Number(row.data.EXCHANG_RATE)
                  : null;
              row.node.setDataValue("DR_EX", DR_EX);
            } else {
              const CR_EX =
                row.data.DR_CR && row.data.DR_CR.toLowerCase() == "cr"
                  ? Number(row.data.CR) * Number(row.data.EXCHANG_RATE)
                  : null;
              row.node.setDataValue("CR_EX", CR_EX);
            }
            row.api.psSetCellValue();
          }
        } else if (result.body) {
          row.node.setDataValue("CUR_NAME", result.body[0].C_NAME);
          row.node.setDataValue("EXCHANG_RATE", result.body[0].EXCHANGE_RATE);
          row.node.data.CUR_NO = result.body[0].CUR_NO;
          if (
            parseInt(row.node.data.SQL_STATE) ==
            fixedValues.sqlState.sqlInsert &&
            row.node.data.CUR_NO
          ) {
            // debugger;
            let different = this.totalDifferent();
            if (row.data.DR_CR == "Dr" && different > 0) {
              row.node.setDataValue(
                "DR",
                Math.abs(different / Number(result.body[0].EXCHANGE_RATE))
              );
            } else if (row.data.DR_CR == "Cr" && different < 0) {
              row.node.setDataValue(
                "CR",
                Math.abs(different / Number(result.body[0].EXCHANGE_RATE))
              );
            }
          }
          if (row.data.DR_CR == "Dr") {
            const DR_EX =
              row.data.DR_CR && row.data.DR_CR.toLowerCase() == "dr"
                ? Number(row.data.DR) * Number(row.data.EXCHANG_RATE)
                : null;
            row.node.setDataValue("DR_EX", DR_EX);
          } else {
            const CR_EX =
              row.data.DR_CR && row.data.DR_CR.toLowerCase() == "cr"
                ? Number(row.data.CR) * Number(row.data.EXCHANG_RATE)
                : null;
            row.node.setDataValue("CR_EX", CR_EX);
          }
          row.api.psSetCellValue();
        } else {
          const curObj = this.currencyList.find(
            x => x.CUR_NO == this.defaultObject.CUR_NO
          );
          if (curObj) {
            row.data.CUR_NO = this.voucher.CUR_NO;
            row.node.setDataValue("CUR_NAME", curObj.C_NAME);
            row.node.setDataValue("EXCHANG_RATE", curObj.EXCHANGE_RATE);
            if (
              parseInt(row.node.data.SQL_STATE) ==
              fixedValues.sqlState.sqlInsert &&
              row.node.data.CUR_NO
            ) {
              let different = this.totalDifferent();
              if (row.data.DR_CR == "Dr" && different > 0) {
                row.node.setDataValue(
                  "DR",
                  Math.abs(different / Number(curObj.EXCHANGE_RATE))
                );
              } else if (row.data.DR_CR == "Cr" && different < 0) {
                row.node.setDataValue(
                  "CR",
                  Math.abs(different / Number(curObj.EXCHANGE_RATE))
                );
              }
            }
            if (row.data.DR_CR == "Dr") {
              const DR_EX =
                row.data.DR_CR && row.data.DR_CR.toLowerCase() == "dr"
                  ? Number(row.data.DR) * Number(row.data.EXCHANG_RATE)
                  : null;
              row.node.setDataValue("DR_EX", DR_EX);
            } else {
              const CR_EX =
                row.data.DR_CR && row.data.DR_CR.toLowerCase() == "cr"
                  ? Number(row.data.CR) * Number(row.data.EXCHANG_RATE)
                  : null;
              row.node.setDataValue("CR_EX", CR_EX);
            }
            row.api.psSetCellValue();
          }
        }
      });
  }
  private setDefaultCurrency(row, result): void {
    if (result.CUR_NO) {
      const curObj = this.currencyList.find(x => x.CUR_NO == result.CUR_NO);
      row.data.CUR_NO = result.CUR_NO;
      row.node.setDataValue("C_NAME", curObj.C_NAME);
      row.api.psSetCellValue();
    } else if (this.voucher.CUR_NO) {
      const curObj = this.currencyList.find(
        x => x.CUR_NO == this.voucher.CUR_NO
      );
      row.data.CUR_NO = this.voucher.CUR_NO;
      row.node.setDataValue("C_NAME", curObj.C_NAME);
      row.api.psSetCellValue();
    } else {
      const curObj = this.currencyList.find(
        x => x.CUR_NO == this.defaultObject.CUR_NO
      );
      row.data.CUR_NO = this.defaultObject.CUR_NO;
      row.node.setDataValue("C_NAME", curObj.C_NAME);
      row.api.psSetCellValue();
    }
  }

  private getCostCenter(row): void {
    this.dataLoadService
      .load("FG_AC1004_CHART_COSTLIST/MAP", { P_ACC_NO: row.data.ACC_NO })
      .subscribe(result => {
        if (result.body) {
          row.data.COST_NO = result.body.COST_NO;
          row.node.setDataValue("COST_NAME", result.body.COST_NAME);
          row.api.psSetCellValue();
        }
      });
  }

  private getCostBusinessArea(row): void {
    this.dataLoadService
      .load("FG_AC1004_CHART_BALIST/MAP", { P_ACC_NO: row.data.ACC_NO })
      .subscribe(result => {
        if (result.body) {
          row.data.BA_NO = result.body.BA_NO;
          row.node.setDataValue("BA_NAME", result.body.BA_NAME);
          row.api.psSetCellValue();
        }
      });

    // let promissAll = [
    //   this.dataLoadService.load('FG_AC1004_CHART_COSTLIST', { P_ACC_NO: ACC_NO }),
    //   this.dataLoadService.load('FG_AC1004_CHART_BALIST', { P_ACC_NO: ACC_NO }),
    // ]

    // forkJoin(promissAll).subscribe(resutls => {

    // })
  }

  private onCellCostCenterClicked(row): void {


    let colDefs = [
      {
        headerName: this.langService.langData.costCenter,
        field: "COST_NAME",
        sortable: true,
        resizable: true,
        hide: false
      }
    ];

    this.dynamicModalService
      .openDialog("CommonListModule", "list", {
        title: "Cost Center",
        data: {
          gridId: "Ac1004CostCenterGrid",
          columnDefs: colDefs,
          api: "FG_AC_COMM_COST_CENTERS",
          params: {
            P_QUERYOPTIONS: fixedValues.queryOptions.CostCenterNO,
            P_ACC_NO: row.node.data.ACC_NO
          }
        },
        settings: { modalClass: "sm" }
      })
      .then((modal: any) => {
        modal.closed = e => {
          row.api.psSetCellFocus();
        };
        modal.success = result => {      
          row.node.setDataValue(
            row.colDef.field,
            result ? result.COST_NAME : ""
          );
          row.node.data.COST_NO = result ? result.COST_NO : null;
          row.value = row.data[row.colDef.field]; // optional
          row.api.psSetCellValue();
        };
      });
  }

  private onCellBuAreaClicked(row): void {
    let colDefs = [
      {
        headerName: "Business Unit Name",
        field: "BA_NAME",
        sortable: true,
        filter: true,
        resizable: true,
        hide: false
      },
      {
        headerName: "Business Unit No",
        field: "BA_NO",
        sortable: true,
        filter: true,
        resizable: true,
        hide: false
      }
    ];

    this.dynamicModalService
      .openDialog("CommonListModule", "list", {
        title: "Business Area",
        data: {
          gridId: "Ac1004BusinessAreaGrid",
          columnDefs: colDefs,
          api: "FG_AC_COMM_BUSINESS_AREAS",
          params: {
            P_QUERYOPTIONS: fixedValues.queryOptions.BusinessAreaForAV,
            P_ACC_NO: row.node.data.ACC_NO,
            CTRL_BU_CHK: null
          }
        },
        settings: { modalClass: "lg" }
      })
      .then((modal: any) => {
        modal.closed = e => {
          row.api.psSetCellFocus();
        };
        modal.success = result => {
          row.node.setDataValue(row.colDef.field, result ? result.BA_NAME : "");
          row.node.data.BA_NO = result ? result.BA_NO : null;
          row.value = result ? result.BA_NO : null; // optional
          row.api.psSetCellValue();
        };
      });
  }

  private onReferenceCellClicked(row): void {
    let colDefs = [
      {
        headerName: "Reference Name",
        field: "REF_NAME",
        sortable: true,
        filter: true,
        resizable: true,
        hide: false
      },
      {
        headerName: "Reference No",
        field: "REF_NO",
        sortable: true,
        filter: true,
        resizable: true,
        hide: false
      }
    ];

    this.dynamicModalService
      .openDialog("CommonListModule", "list", {
        title: "Reference List",
        data: {
          gridId: "Ac1004ReferenceGrid",
          columnDefs: colDefs,
          api: "FG_AC_COMM_REFERENCES",
          params: {
            P_ACC_NO: row.node.data.ACC_NO
          }
        },
        settings: { modalClass: "lg" }
      })
      .then((modal: any) => {
        modal.closed = e => {
          row.api.psSetCellFocus();
        };
        modal.success = result => {
          row.node.setDataValue(
            row.colDef.field,
            result ? result.REF_NAME : ""
          );
          row.node.data.REF_NO = result ? result.REF_NO : null;
          row.value = result ? result.REF_NAME : ""; // optional
          row.api.psSetCellValue();
        };
      });
  }

  private onCurrencyNameCellClicked(row): void {
    const colDefs = [
      {
        headerName: "Currency Name",
        field: "C_NAME",
        sortable: true,
        filter: true,
        resizable: true,
        hide: false
      },
      {
        headerName: "Exchange Rate",
        field: "EXCHANGE_RATE",
        sortable: true,
        filter: true,
        resizable: true,
        hide: false
      }
    ];

    this.dynamicModalService
      .openDialog("CommonListModule", "list", {
        title: "Currency List",
        data: {
          gridId: "Ac1004CurrencyNameGrid",
          columnDefs: colDefs,
          api: "FG_AC_COMM_CURRENCIES",
          params: {
            P_V_DATE: this.toDate
          }
        },
        settings: { modalClass: "sm" }
      })
      .then((modal: any) => {
        modal.closed = e => {
          row.api.psSetCellFocus();
        };
        modal.success = result => {
          row.node.setDataValue(row.colDef.field, result ? result.C_NAME : "");
          row.node.data.CUR_NO = result ? result.CUR_NO : null;
          row.node.setDataValue(
            "EXCHANG_RATE",
            result ? result.EXCHANGE_RATE : null
          );
          row.value = result ? result.C_NAME : ""; // optional
          row.api.psSetCellValue();
          this.calculateRate(row);
        };
      });
  }

  private onVoucherTypeCellClicked(row): void {
    let colDefs = [
      {
        headerName: "Type Name",
        field: "TYPE_NAME",
        sortable: true,
        filter: true,
        resizable: true,
        hide: false
      }
    ];

    this.dynamicModalService
      .openDialog("CommonListModule", "list", {
        title: "Voucher Type",
        data: {
          gridId: "Ac1004VoucherTypeGrid",
          columnDefs: colDefs,
          api: "FG_AC_COMM_VOUCHER_TYPE_LIST",
          params: {}
        },
        settings: { modalClass: "sm d-block" }
      })
      .then((modal: any) => {
        modal.closed = e => {
          row.api.psSetCellFocus();
        };
        modal.success = result => {
          if (result) {
            row.node.setDataValue(
              row.colDef.field,
              result ? result.TYPE_NAME : ""
            );
            row.node.data.VTYPE_NO = result ? result.VTYPE_NO : null;
            row.value = result ? result.TYPE_NAME : ""; // optional
            row.api.psSetCellValue();
          }
        };
      });
  }

  calculateRate(params) {
    const DR_EX =
      params.node.data.DR_CR && params.node.data.DR_CR.toLowerCase() == "dr"
        ? Number(params.node.data.DR) * Number(params.node.data.EXCHANG_RATE)
        : null;
    const CR_EX =
      params.node.data.DR_CR && params.node.data.DR_CR.toLowerCase() == "cr"
        ? Number(params.node.data.CR) * Number(params.node.data.EXCHANG_RATE)
        : null;
    params.node.setDataValue("DR_EX", DR_EX);
    params.node.setDataValue("CR_EX", CR_EX);
    // this.setCRValue();
  }

  private setCRValue() {
    let count = 0;
    let total = 0;
    let nodeObj;
    this.grid.api.forEachNode(node => {
      total += node.data.DR ? Number(node.data.DR) : 0;
      if (node.data.DR_CR == "Cr") {
        count++;
        nodeObj = node;
      }
    });

    if (count > 1) return;

    if (nodeObj) {
      nodeObj.setDataValue("CR", total);
      nodeObj.setDataValue("CR_EX", total);
      this.grid.api.psSetCellValue();
    }    
  }

  /**
   * onClickDeleteVoucher
   */
  public onClickDeleteVoucher(): void {    
    if (!this.voucher.V_NO) {
      return;
    } else if (this.voucher.MODULE != "Accounts") {
      this.toastService.warning("Module should be Accounts.", "Warning");
    } else if (!this.model.postCheckObj.POST_DEL_CHK && this.voucher.POST_FLG == 1 ) {
      this.toastService.warning("Voucher already posted.", "Warning");
    } else if (!this.model.postCheckObj.POST_DEL_CHK && this.voucher.CHECK_FLAG == 1) {
      this.toastService.warning("Voucher already checked.", "Warning");
    } else {
      this.alertService
        .info("Do you want to delete voucher !!", true)
        .then(data => {          
          if (data) {
            this.dataService
              .deleteVoucher({ V_NO: this.voucher.V_NO })
              .subscribe(result => {
                this.toastService.success(
                  this.langService.langData.deleteSuccessMsg,
                  this.langService.langData.success
                );
                this.onChangeVoucherPeriod();
              });
          }
        });
    }
  }

  resetDebitCredit(params) {
    params.node.setDataValue("DR", null);
    params.node.setDataValue("CR", null);
    this.grid.api.psSetCellValue();
    this.calculateRate(params);
  }

  getExchangRate(_curNo: any, _currencyList: any) {
    return parseFloat(
      _currencyList
        .filter(x => x.CUR_NO == parseInt(_curNo))
        .map(x => x.EXCHANGE_RATE)
    );
  }

  onChangeVoidFlag(voidFlag: boolean) {
    this.commonService.getPostEditChk().subscribe(result => {
      if (
        (this.voucher.CHECK_FLAG == 1 || this.voucher.POST_FLG == 1) &&
        result.body[0].CHK == 0
      ) {
        this.commonService.getAllText().subscribe(data => {
          this.toastService.warning(data.body[0].ALT_TEXT, "Warning");
          this.voucher.VOID_FLAG = this.voucher.VOID_FLAG == "Y" ? "N" : "Y";
          return;
        });
      } else {
        this.checkVoidData();
      }
    });
  }

  private checkVoidData(): void {
    if (this.voucher.VOID_FLAG == "Y") {
      this.alertService
        .info("Do you want to save this Entry?", true)
        .then(data => {
          if (data) {
            this.dataService
              .saveVoidVoucher({ V_NO: this.voucher.V_NO })
              .subscribe(result => {
                this.grid.api.setRowData([]);
                const data = result.body.map(elem => {
                  return new VoucherDtl(elem);
                });
                this.grid.api.setRowData(data);
              });
          } else {
            this.voucher.VOID_FLAG = "N";
          }
        });
    } else {
      this.grid.api.forEachNode(node => {
        if (this.voucher.VOID_FLAG == "Y") {
          if (node.data.DR_CR.toLowerCase() == "dr") {
            let obj = JSON.parse(JSON.stringify(node.data));
            obj.DR_CR = "Cr";
            obj.CR = node.data.DR;
            obj.DR = null;
            obj.CR_EX =
              obj.DR_CR && obj.DR_CR.toLowerCase() == "cr"
                ? Number(obj.CR) * Number(obj.EXCHANG_RATE)
                : null;
            obj.DR_EX = null;
            obj.VOID_FLAG = "Y";
            // node.setDataValue('CR_EX', CR_EX);
            // node.setDataValue('DR_EX', null);
            obj.SQL_STATE = fixedValues.sqlState.sqlInsert;
            this.onClickAddVoucherDtlVoid(obj);
          } else {
            let obj = JSON.parse(JSON.stringify(node.data));
            obj.DR_CR = "Dr";
            obj.DR = node.data.CR;
            obj.CR = null;
            obj.DR_EX =
              obj.DR_CR && obj.DR_CR.toLowerCase() == "dr"
                ? Number(obj.DR) * Number(obj.EXCHANG_RATE)
                : null;
            obj.CR_EX = null;
            obj.SQL_STATE = fixedValues.sqlState.sqlInsert;
            obj.VOID_FLAG = "Y";
            this.onClickAddVoucherDtlVoid(obj);
          }
        } else {
          if (node.data.VOID_FLAG == "Y") {
            node.data.SQL_STATE = fixedValues.sqlState.sqlDelete;
          }
        }
      });

      setTimeout(() => {
        this.saveVoidData();
      }, 200);
    }
  }

  private saveVoidData() {
    this.saveNewVoucher = true;

    let voucher = JSON.parse(JSON.stringify(this.voucher));

    voucher.SQL_STATE = fixedValues.sqlState.sqlUpdate;
    let list = [];
    list = JSON.parse(JSON.stringify(this.grid.api.psGetChangeList())).map(
      elemment => {
        elemment.POST_DATE = this.dateUtil.getYYYYMMDDDashFromDate(
          elemment.POST_DATE
        );
        elemment.CHK_REC_DATE = this.dateUtil.getYYYYMMDDDashFromDate(
          elemment.CHK_REC_DATE
        );
        elemment.CHEQUE_DATE = this.dateUtil.getYYYYMMDDDashFromDate(
          elemment.CHEQUE_DATE
        );
        elemment.CHK_DEP_DATE = this.dateUtil.getYYYYMMDDDashFromDate(
          elemment.CHK_DEP_DATE
        );
        elemment.CHK_VOID_DATE = this.dateUtil.getYYYYMMDDDashFromDate(
          elemment.CHK_VOID_DATE
        );
        elemment.VOID_FLAG =
          elemment.VOID_FLAG == "Y" ? elemment.VOID_FLAG : "";
        return elemment;
      }
    );
    // debugger;
    voucher.voucherDtlList = list;
    this.alertService
      .info("Do you want to save this Entry?", true)
      .then(data => {
        if (data) {
          this.dataService.saveVoucher(voucher).subscribe(
            data => {
              this.saveNewVoucher = false;
              this.toastService.success("Saved Successfully", "Success!");
              const voucherDtlList = JSON.parse(
                JSON.stringify(data.body.voucherDtlList)
              );
              if (voucherDtlList.length > 0) {
                data.body.voucherDtlList.length = 0;
                this.grid.api.psUpdateList(voucherDtlList, VoucherDtl);
              }
              data.body["SQL_STATE"] = fixedValues.sqlState.sqlUnchange;
              this.voucher = new Voucher(data.body);
              this.generateVoucherTypeAndPeriod();
              this.model.voucherBackup = JSON.parse(
                JSON.stringify(this.voucher)
              );
              this.model.voucherDtlBackup = JSON.parse(
                JSON.stringify(this.grid.api.psGridDataList())
              );
            },
            err => {
              // try {
              //   this.toastService.error(err.massage, 'Error');
              // } catch (error) {
              //   this.showlog(err);
              // }
            }
          );
        } else {
          if (this.voucher.VOID_FLAG == "N") {
            this.voucher.VOID_FLAG = "Y";
            return;
          } else {
            this.voucher.VOID_FLAG = "N";
            let list = [];
            this.grid.api.forEachNode(node => {              
              if (node.data.SQL_STATE != fixedValues.sqlState.sqlInsert) {
                list.push(new VoucherDtl(node.data));
              }
            });
            this.grid.api.setRowData(list);
            this.model.voucherDtlBackup = JSON.parse(JSON.stringify(list));
          }
        }
      });
  }

  onClickAddVoucherDtlVoid(obj) {
    this.grid.api.stopEditing();
    this.grid.api.psClearFilter();
    setTimeout(() => {
      if (!this.voucherFilter.PERIOD_NO) return;

      const voucherObject = this.periodList.find(element => {
        return element.PERIOD_NO == this.voucherFilter.PERIOD_NO;
      });

      if (voucherObject) {
        if (
          new Date(voucherObject.START_PERIOD_DATE).getFullYear() !=
          new Date().getFullYear()
        ) {
          this.toastService.info(
            "You can only add voucher in the current year"
          );
          return;
        }
      }

      let validationResult = this.grid.api.psValidate();
      if (validationResult.isValid) {
        let res;
        res = this.grid.api.updateRowData({ add: [new VoucherDtl(obj)] });
        this.grid.api.ensureIndexVisible(res.add[0].rowIndex);
        res.add[0].setSelected(true);
      }
    }, 200);
  }

  onChangedrCrList(_voucherDtl: VoucherDtl) {
    _voucherDtl.DR = 0;
    _voucherDtl.CR = 0;
  }

  private remove() {
    this.dataService.delete().subscribe(
      data => {
        this.showlog(data);
      },
      err => {
        this.showlog(err);
      }
    );
  }

  getBasCurrencySymbol() {
    if (this.defaultObject.SYMBOL != null) {
      return " (" + this.defaultObject.SYMBOL + ")";
    } else return "";
  }


  getColumnDefs() {
    let that = this;
    return [
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
          psCallbackAfterChange: this.onGridAfterChange.bind(this)
        },
        pinnedRowCellRenderer: pin => {
          return;
        }
      },
      {
        // "ACC_NO",  "CUR_NO"
        headerName: this.langService.langData.accountCode,
        field: "ACC_CODE",
        sortable: false,
        filter: true,
        resizable: true,
        hide: false,
        width: 100,
        suppressSizeToFit: true,
        editable: this.isColumnEditable.bind(this),
        refferenceKey:"ACC_NO",
        copyAbleFields: [
         "ACC_NAME", "CUR_NAME",
          "EXCHANG_RATE"       
        ],
        cellEditor: "modalCellEditor",
        cellEditorParams: {
          psActionType: "accountCode",
          psAffectedCols: [
            "ACC_NAME",            
            "MAP_ACC_NAME",
            "CUR_NAME",
            "EXCHANG_RATE",
            "CR",
            "DR",
            "COST_NAME",
            "BA_NAME"
          ] // changed
        },
        pinnedRowCellRenderer: pin => {
          return;
        }
      },      
      {
        headerName: this.langService.langData.account,
        field: "ACC_NAME",
        sortable: false,
        filter: true,
        resizable: true,
        hide: false,
        width: 215,
        suppressSizeToFit: true,
        suppressKeyboardEvent: this.onCellKeyDown.bind(this),
        editable: this.isColumnEditable.bind(this),
        refferenceKey:"ACC_NO",
        copyAbleFields: [
          "ACC_NO", "ACC_CODE", "CUR_NO", 
          "CUR_NAME", "EXCHANG_RATE"
        ],
        cellEditor: "modalCellEditor",
        cellEditorParams: {
          psActionType: "account",
          psAffectedCols: [
            "ACC_CODE",            
            "MAP_ACC_NAME",
            "CUR_NAME",
            "EXCHANG_RATE",
            "CR",
            "DR",
            "COST_NAME",
            "BA_NAME"
          ]
        },
        pinnedRowCellRenderer: pin => {
          return;
        }
      },
      {
        headerName: this.langService.langData.narration,
        field: "NARRATION",
        sortable: false,
        filter: true,
        resizable: true,
        hide: false,
        width: 320,
        suppressSizeToFit: true,
        editable: this.isColumnEditable.bind(this),
        pinnedRowCellRenderer: pin => {
          return;
        }
      },
      {
        headerName: this.langService.langData.costCenter,
        field: "COST_NAME",
        sortable: false,
        filter: true,
        resizable: true,
        hide: false,
        width: 180,
        suppressSizeToFit: true,
        suppressKeyboardEvent: this.onCellKeyDown.bind(this),
        editable: this.isColumnEditable.bind(this),
        refferenceKey:"COST_NO",
        copyAbleFields: ["COST_NO"],
        cellEditor: "modalCellEditor",
        cellEditorParams: { psActionType: "costCenter" },
        pinnedRowCellRenderer: pin => {
          return;
        }
      },
      {
        headerName: this.langService.langData.businessArea,
        field: "BA_NAME",
        sortable: false,
        filter: true,
        resizable: true,
        hide: false,
        width: 80,
        suppressSizeToFit: true,
        editable: this.isColumnEditable.bind(this),
        refferenceKey:"BA_NO",
        copyAbleFields: ["BA_NO"],
        cellEditor: "modalCellEditor",        
        cellEditorParams: { psActionType: "businessUnit" },
        pinnedRowCellRenderer: pin => {
          return;
        }
      },
      {
        headerName: this.langService.langData.referenceNo,
        field: "REF_NAME",
        sortable: false,
        filter: true,
        resizable: true,
        hide: false,
        width: 80,
        suppressSizeToFit: true,
        editable: this.isColumnEditable.bind(this),
        refferenceKey:"REF_NO",
        copyAbleFields: ["REF_NO"],
        cellEditor: "modalCellEditor",
        cellEditorParams: { psActionType: "referanceNo" },
        pinnedRowCellRenderer: pin => {
          return;
        }
      },
      {
        headerName: this.langService.langData.currency,
        field: "CUR_NAME",
        sortable: false,
        filter: true,
        resizable: true,
        hide: false,
        width: 80,
        suppressSizeToFit: true,
        editable: this.isColumnEditable.bind(this),
        refferenceKey:"CUR_NO",
        copyAbleFields: ["CUR_NO", "EXCHANG_RATE"],
        cellEditor: "modalCellEditor",
        cellEditorParams: {
          psActionType: "currencyName",
          psAffectedCols: ["EXCHANG_RATE"]
        },
        pinnedRowCellRenderer: pin => {
          return;
        }
      },
      {
        headerName: this.langService.langData.exRate,
        field: "EXCHANG_RATE",
        sortable: false,
        filter: true,
        resizable: true,
        hide: false,
        width: 100,
        suppressSizeToFit: true,
        editable: this.isColumnEditable.bind(this),
        cellRenderer: "numberPipeRenderer",
        cellEditor: "decimalCellEditor",
        cellEditorParams: {
          psCallbackAfterChange: this.onGridAfterChange.bind(this)
        },
        pinnedRowCellRenderer: pin => {
          return;
        }
      },
      {
        headerName: this.langService.langData.mapAccounts,
        field: "MAP_ACC_NAME",
        sortable: false,
        filter: true,
        resizable: true,
        hide: false,
        width: 80,
        suppressSizeToFit: true,
        pinnedRowCellRenderer: pin => {
          return;
        }
      },
      /* {
        headerName: this.langService.langData.voucherType,
        field: "TYPE_NAME",
        sortable: false,
        filter: true,
        resizable: true,
        hide: false,
        width: 80,
        suppressSizeToFit: true,
        editable: this.isColumnEditable.bind(this),
        cellEditor: "modalCellEditor",
        cellEditorParams: { psActionType: 'voucherTypeName' },
        pinnedRowCellRenderer: pin => { return; }
      }, */
      {
        headerName: this.langService.langData.postDate,
        field: "POST_DATE",
        sortable: true,
        filter: true,
        width: 80,
        suppressSizeToFit: true,
        resizable: true,
        hide: false,
        editable: this.isColumnEditable.bind(this),
        cellRenderer: "datePipeRenderer",
        cellEditor: "dateCellEditor",
        pinnedRowCellRenderer: pin => {
          return;
        }
      },
      {
        headerName: "",
        field: "V_NO",
        sortable: true,
        filter: true,
        width: 80,
        suppressSizeToFit: true,
        resizable: true,
        hide: false,
        cellRenderer: function () {
          return (
            `<button type="button" data-action-type="clearing" class="btn btn-warning" >` +
            that.langService.langData.clearingQus +
            `</button>`
          );
        },
        pinnedRowCellRenderer: pin => {
          return;
        }
      },
      {
        headerName: this.langService.langData.voucher,
        field: "REF_V_ID",
        sortable: false,
        filter: true,
        resizable: true,
        hide: false,
        width: 80,
        suppressSizeToFit: true,
        editable: false,
        pinnedRowCellRenderer: pin => {
          return;
        },
        cellRenderer: "linkCellRenderer",
        cellEditorParams: {
          psActionType: "invoiceNO"
        }
      },
      {
        headerName: this.langService.langData.dr,
        field: "DR",
        sortable: false,
        filter: true,
        resizable: true,
        hide: false,
        width: 100,
        suppressSizeToFit: true,
        suppressKeyboardEvent: this.onCellKeyDown.bind(this),
        editable: this.isColumnEditable.bind(this),
        cellRenderer: "numberPipeRenderer",
        cellEditor: "decimalCellEditor",
        cellEditorParams: {
          psCallbackAfterChange: this.onGridAfterChange.bind(this),
          psReadonly: this.checkReadOnly.bind(this)
        },
        pinned: "right",
        pinnedRowCellRenderer: pin => {
          return;
        }
      },
      {
        headerName: this.langService.langData.cr,
        field: "CR",
        sortable: false,
        filter: true,
        resizable: true,
        hide: false,
        width: 100,
        suppressSizeToFit: true,
        suppressKeyboardEvent: this.onCellKeyDown.bind(this),
        editable: this.isColumnEditable.bind(this),
        cellRenderer: "numberPipeRenderer",
        cellEditor: "decimalCellEditor",
        cellEditorParams: {
          psCallbackAfterChange: this.onGridAfterChange.bind(this),
          psReadonly: this.checkReadOnly.bind(this)
          // psMax: '6,2'
        },
        pinned: "right",
        pinnedRowCellRenderer: pin => {
          return pin.data[pin.colDef.field];
        }
      },
      {
        headerName: this.langService.langData.dr + this.getBasCurrencySymbol(),
        field: "DR_EX",
        sortable: true,
        filter: true,
        width: 100,
        suppressSizeToFit: true,
        resizable: true,
        hide: false,
        cellRenderer: "numberPipeRenderer",
        pinned: "right"
      },
      {
        headerName: this.langService.langData.cr + this.getBasCurrencySymbol(),
        field: "CR_EX",
        sortable: true,
        filter: true,
        width: 100,
        suppressSizeToFit: true,
        resizable: true,
        hide: false,
        cellRenderer: "numberPipeRenderer",
        pinned: "right"
      },
      {
        headerName: '',
        field: "_creditCard",
        sortable: true,
        resizable: true,
        width: 50,
        hide: false,
        suppressSizeToFit: true,
        cellStyle: { textAlign: "center" },
        editable: false,
        cellRenderer: this.creditCard.bind(this),
        pinned: "right",
        pinnedRowCellRenderer: pin => {
          return;
        }
      },
      {
        headerName: this.langService.langData.action,
        field: "_action",
        sortable: true,
        resizable: true,
        width: 50,
        hide: false,
        suppressSizeToFit: true,
        cellStyle: { textAlign: "center" },
        editable: false,
        cellRenderer: this.checkDelete.bind(this),
        pinned: "right",
        pinnedRowCellRenderer: pin => {
          return;
        }
      }
    ];
  }

  trackByFn(index, item) {
    return index; // or item.id
  }

  checkReadOnly(params) {
    let result = false;
    switch (params.colDef.field) {
      case "DR":
        if (params.data.DR_CR != "Dr") {
          result = true;
        }
        break;
      case "CR":
        if (params.data.DR_CR != "Cr") {
          result = true;
        }
        break;

      default:
        break;
    }
    return result;
  }

  private checkDelete(params) {
    //console.log('this.defaultObject.DATA_INSERT_ONLY', this.defaultObject.DATA_INSERT_ONLY);

    // old login 
    // if (this.defaultObject.DATA_INSERT_ONLY == "1" && this.voucher.V_NO)
    //   return "";

    let result = `<div class="d-flex table-action-buttons">`;    
    if (this.model.userPrivilege.checkDeletePrev(params)) {      
      result += `<button type="button" data-action-type="delete" class="btn btn--squire text-danger border-0"><i class="ion-close" data-action-type="delete"></i></button>`;      
    }
    result += `</div>`;
    return result;
  }

  private creditCard(params) {    
    // old login 
    if (this.defaultObject.DATA_INSERT_ONLY == "1" && this.voucher.V_NO)
      return "";

    let result = `<div class="d-flex table-action-buttons">`;
    if (this.model.userPrivilege.checkEditButton(params)) {
      result += `<button type="button" data-action-type="creditCard" class="btn btn--squire text-primary border-0"><i class="fa fa-credit-card text-primary" data-action-type="creditCard"></i></button>`;
    }    
    result += `</div>`;
    return result;
  }

  onGridAfterChange(params) {
    switch (params.colDef.field) {
      case "EXCHANG_RATE":
        this.calculateRate(params);
        break;
      case "DR":
        this.calculateRate(params);        
        break;
      case "CR":
        this.calculateRate(params);
        break;
      case "DR_CR":
        this.resetDebitCredit(params);
        break;
      default:
        break;
    }
  }

  subMenuReportInfoList = [];
  voucherIdList = [];
  bankInfoList = [];
  reportPreview(data): any {
    let promiseAll = [
      this.commonService.getReportInfoBySubMenuId("AC_1004"),
      // this.commonService.getVouchersByViD(this.qJournal.V_ID),
      this.commonService.getReportInfo(globalVariables.menuInfo.MENU_ID)
    ];

    forkJoin(promiseAll).subscribe(
      results => {
        this.subMenuReportInfoList = results[0].body;
        // this.voucherIdList = results[1].body;
        this.bankInfoList = results[1].body;
        this.makeReport(data);
      },
      err => {
        console.log("Err", err);
      }
    );
  }

  makeReport(data) {
    let X_Submenu_Id = globalVariables.menuInfo.MENU_ID;
    let p_Submenu_Id;
    if (this.subMenuReportInfoList[0] == []) {
      p_Submenu_Id = "AC_1004";
    } else {
      p_Submenu_Id = "AC_3002";
    }
    let subPart = X_Submenu_Id.substring(0, 2);
    let params = {
      baseUrl: globalVariables.paramsReportBaseUrl,
      rwservlet: this.bankInfoList[0].REPORT_SERVER,
      desformat: this.bankInfoList[0].REPORT_FORMAT,
      destype: "cache",
      report: `${globalVariables.reportPath}${subPart}/${p_Submenu_Id}`,
      X_Emp_Id: globalVariables.userInfo.emp_ID,
      X_Submenu_Id: p_Submenu_Id,
      X_company_no: globalVariables.userInfo.company_NO,
      X_currency_format: this.bankInfoList[0].SS_CURRENCY_FMT,
      X_date_format: this.bankInfoList[0].SS_DT_FMT,
      X_time_format: this.bankInfoList[0].SS_TIME_FMT,
      X_ROUND: 2,
      P_VNO: data.REF_V_NO,
      P_VTYPE: data.VTYPE_NO
      // p_reppath: globalVariables.reportPath
    };

    this.utilityService.showReport(params);
  }

  isColumnEditable(params) {
    if (this.defaultObject.DATA_INSERT_ONLY == "1" && this.voucher.V_NO)
      return false;
    return (
      !params.node.rowPinned &&
      this.model.userPrivilege.checkEditablePrev(params)
    );
  }

  onCellKeyDown(e) {    
    let event = e.event;
    let suppress = false;
    if (event.key === "Tab") {     
      e.event.stopPropagation();
      e.event.preventDefault();
      let fieldName = e.column.colDef.field;
      let firstEditCol;
      if (
        (fieldName == 'ACC_NAME') ||
        (fieldName == 'COST_NAME') ||
        (fieldName == 'DR') ||
        (fieldName == 'CR')
      ) {
        suppress = true;
        if (fieldName == 'ACC_NAME') {
          firstEditCol = e.api.columnController.getAllDisplayedColumns()[4];
        }
        else if (fieldName == 'COST_NAME') {
          if (e.api.getSelectedRows()[0].DR_CR == 'Dr') {
            firstEditCol = e.api.columnController.getAllDisplayedColumns()[13];
            e.api.stopEditing();
            this.grid.api.startEditingCell({
              rowIndex: e.rowIndex,
              colKey: 'DR'
            });
          } else {
            firstEditCol = e.api.columnController.getAllDisplayedColumns()[14];
            e.api.stopEditing();
            this.grid.api.startEditingCell({
              rowIndex: e.rowIndex,
              colKey: 'CR'
            });
          }

        } else if (fieldName == 'DR') {
          firstEditCol = e.api.columnController.getAllDisplayedColumns()[3];
        } else if (fieldName == 'CR') {
          firstEditCol = e.api.columnController.getAllDisplayedColumns()[3];
        }
        e.api.setFocusedCell(e.rowIndex, firstEditCol);
      }
    }   
    return suppress;
  }
}
