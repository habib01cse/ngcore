
/* angular stuff */
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';


/* 3rd party libraries */

import { forkJoin } from 'rxjs';

/* our own stuff */
import { config } from 'src/app/core/core.config';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { CommonService } from '../../services/common.service';
import { DataService } from '../../services/forms/configuration/data.service';
import { ModelService } from '../../services/reports/Print Voucher/model.service';
import { FormParam } from '../../models/form-param';
import { globalVariables } from 'src/app/core/constants/globalVariables';
import { LangService } from 'src/app/core/services/lang.service';
@Component({
  selector: 'app-ac3000',
  templateUrl: './../../templates/reports/ac3000.component.html',
  providers: [DatePipe]
})
export class Ac3000Component implements OnInit {

  public formParam: FormParam = new FormParam();
  public reportUrl: string = '';
  psDateFormat: any;
  public sliderHide = false;
  constructor(public model: ModelService
    , private dataService: DataService
    , private comService: CommonService
    , private utilityService: UtilityService
    , private datePipe: DatePipe
    , public langService: LangService) { }

  //ngOnInit
  public ngOnInit(): void {

    this.psDateFormat = globalVariables.psDateFormat;
    this.formParam.VTYPE_NO = null;
    this.formParam.V_NO = null;

    let promiseAll = [
      this.comService.getVoucherTypes(fixedValues.queryOptions.VoucherTypeForTC),
      this.comService.getReportServers(),
      this.comService.getOutputFormats(),
      this.comService.getDefaultReportServer(globalVariables.menuInfo.MENU_ID),// will be changed later
      this.comService.getReportInfo(globalVariables.menuInfo.MENU_ID),
      this.comService.getRound()
    ];

    // calling all methods and return all is backed
    forkJoin(
      promiseAll
    ).subscribe(results => {

      // getting from server
      this.model.voucherTypeList = results[0].body;
      this.model.reportServerList = results[1].body;
      this.model.outputFormatList = results[2].body;
      this.model.reportInfoList = results[4].body;
      this.model.roundlIist = results[5].body;

      // // getting from enum
      this.model.printTypeList = fixedValues.printTypeList;
      this.formParam.SERVER_NAME = results[3].body[0].DEF_REPORT_SERVER;
      this.model.defaultServer = this.formParam.SERVER_NAME;
      this.formParam.FORMAT_SHORT_NAME = config.defaultOutputFormat;
      this.formParam.PRINT_TYPE = fixedValues.printTypeList[0].VALUE;
      this.model.defaultPrintType = this.formParam.PRINT_TYPE;
    }, error => {
      this.displayError(error);
    });
  }

  // onChangeFormParams
  public onChangeFormParams() {
    // parameters settings

    this.formParam.V_NO = null;
    let params = {
      P_QUERYOPTIONS: fixedValues.queryOptions.VoucherForPV,
      P_V_NO: null,
      P_FROM_DATE: null,
      P_TO_DATE: null,
      P_VTYPE_NO: this.formParam.VTYPE_NO || '',
      P_BU_NO: null,
      P_MODULE_NO: null,
      P_POST_FLAG: null,
      P_CHECK_FLAG: null
    };

    // get vouchers for search
    this.comService.getVouchers(params).subscribe(
      results => {
        this.model.voucherList = results.body;
      },
      err => {
        // Do stuff whith your error
        this.displayError(err);
      },
      () => {
        // Do stuff after completion
      });


  }

  public onChangeVoucherNo() {
    if (!this.formParam.V_NO) {
      // get vouchers for search
      this.comService.getVouchersByVNo(this.formParam.V_NO).subscribe(
        results => {
          this.model.vaucherDateList = results.body;
          this.formParam.START_DATE = new Date(this.model.vaucherDateList[0].V_DATE);
          this.formParam.END_DATE = new Date(this.model.vaucherDateList[0].V_DATE);
        },
        err => {
          // Do stuff whith your error
          this.displayError(err);
        },
        () => {
          // Do stuff after completion
        });
    }
  }

  public onPrint(): void {
    // console.log('Hi- I am in the print page');
  }

  public onPreview(generalLedgerValidation: any): void {

    let validationResult = generalLedgerValidation.validate();
    if (!validationResult.isValid) {
      return;
    }

    // Check value is null or not
    let startDate
    if (!this.formParam.START_DATE || this.formParam.START_DATE == null) {
      startDate = '';
    } else {
      startDate = this.transformDate(this.formParam.START_DATE);
    }

    let endDate
    if (!this.formParam.END_DATE || this.formParam.END_DATE == null) {
      endDate = '';
    } else {
      endDate = this.transformDate(this.formParam.END_DATE);
    }


    let p_Submenu_Id: any;

    if (this.formParam.PRINT_TYPE == fixedValues.printTypeList[0].VALUE) {
      if (this.formParam.CTRL_SHOWPATH === false) {
        p_Submenu_Id = 'AC_3002';
      } else {
        p_Submenu_Id = 'AC_3003';
      }
    } else if (this.formParam.PRINT_TYPE == fixedValues.printTypeList[1].VALUE) {
      p_Submenu_Id = 'AC_3001';
    } else if (this.formParam.PRINT_TYPE == fixedValues.printTypeList[2].VALUE) {
      p_Submenu_Id = 'AC_3008';
    }

    let X_Submenu_Id = globalVariables.menuInfo.MENU_ID;
    let subPart = X_Submenu_Id.substring(0, 2);


    let params = {
      baseUrl: globalVariables.paramsReportBaseUrl,
      rwservlet: this.formParam.SERVER_NAME,
      desformat: this.formParam.FORMAT_SHORT_NAME,
      destype: 'cache',
      report: `${globalVariables.reportPath}${subPart}/${p_Submenu_Id}`,
      X_Emp_Id: globalVariables.userInfo.emp_ID,
      X_Submenu_Id: p_Submenu_Id,
      X_company_no: globalVariables.userInfo.company_NO,
      X_currency_format: this.model.reportInfoList[0].SS_CURRENCY_FMT,
      X_date_format: this.model.reportInfoList[0].SS_DT_FMT,
      X_time_format: this.model.reportInfoList[0].SS_TIME_FMT,
      X_ROUND: this.model.roundlIist[0].F_ROUND,
      p_vno: !this.formParam.V_NO ? '' : this.formParam.V_NO || '',
      p_st_date: !this.formParam.START_DATE || this.formParam.START_DATE == null ? '' : this.transformDate(this.formParam.START_DATE),
      p_end_date: !this.formParam.END_DATE || this.formParam.END_DATE == null ? '' : this.transformDate(this.formParam.END_DATE),
      p_vtype: !this.formParam.VTYPE_NO ? '' : this.formParam.VTYPE_NO || '',
      p_reppath: globalVariables.reportPath
    }

    this.showReport(params);
  }

  public onClickOpen(generalLedgerValidation: any): void {

    let validationResult = generalLedgerValidation.validate();
    if (!validationResult.isValid) {
      return;
    }

    // Check value is null or not
    let startDate
    if (!this.formParam.START_DATE || this.formParam.START_DATE == null) {
      startDate = '';
    } else {
      startDate = this.transformDate(this.formParam.START_DATE);
    }

    let endDate
    if (!this.formParam.END_DATE || this.formParam.END_DATE == null) {
      endDate = '';
    } else {
      endDate = this.transformDate(this.formParam.END_DATE);
    }


    let p_Submenu_Id: any;

    if (this.formParam.PRINT_TYPE == fixedValues.printTypeList[0].VALUE) {
      if (this.formParam.CTRL_SHOWPATH === false) {
        p_Submenu_Id = 'AC_3002';
      } else {
        p_Submenu_Id = 'AC_3003';
      }
    } else if (this.formParam.PRINT_TYPE == fixedValues.printTypeList[1].VALUE) {
      p_Submenu_Id = 'AC_3001';
    } else if (this.formParam.PRINT_TYPE == fixedValues.printTypeList[2].VALUE) {
      p_Submenu_Id = 'AC_3008';
    }

    let X_Submenu_Id = globalVariables.menuInfo.MENU_ID;
    let subPart = X_Submenu_Id.substring(0, 2);


    let params = {
      baseUrl: globalVariables.paramsReportBaseUrl,
      rwservlet: this.formParam.SERVER_NAME,
      desformat: this.formParam.FORMAT_SHORT_NAME,
      destype: 'cache',
      report: `${globalVariables.reportPath}${subPart}/${p_Submenu_Id}`,
      X_Emp_Id: globalVariables.userInfo.emp_ID,
      X_Submenu_Id: p_Submenu_Id,
      X_company_no: globalVariables.userInfo.company_NO,
      X_currency_format: this.model.reportInfoList[0].SS_CURRENCY_FMT,
      X_date_format: this.model.reportInfoList[0].SS_DT_FMT,
      X_time_format: this.model.reportInfoList[0].SS_TIME_FMT,
      X_ROUND: this.model.roundlIist[0].F_ROUND,
      p_vno: !this.formParam.V_NO ? '' : this.formParam.V_NO || '',
      p_st_date: !this.formParam.START_DATE || this.formParam.START_DATE == null ? '' : this.transformDate(this.formParam.START_DATE),
      p_end_date: !this.formParam.END_DATE || this.formParam.END_DATE == null ? '' : this.transformDate(this.formParam.END_DATE),
      p_vtype: !this.formParam.VTYPE_NO ? '' : this.formParam.VTYPE_NO || '',
      P_MULTI_VOUCHER: this.formParam.MULTIPLE_CODE == null ? '' : this.formParam.MULTIPLE_CODE || '',
      p_reppath: globalVariables.reportPath
    }

    this.utilityService.showReport(params);
  }

  public showReport(params): void {
    let counter = 1;
    this.reportUrl = '';
    let reportUrlStr = "";
    setTimeout(() => {
      for (var param in params) {
        if (counter <= 2) {
          reportUrlStr += params[param];
          counter++;

        } else {
          reportUrlStr += "&" + param + "=" + params[param];
          counter++;
        }
      }
      this.reportUrl = reportUrlStr;
    });
  }

  transformDate(date) {
    // return this.datePipe.transform(date, 'yyyy-MM-dd');
    return this.datePipe.transform(date, 'dd-MMM-yy');
  }

  public onReset(): void {
    this.formParam.START_DATE = new Date();
    this.formParam.END_DATE = new Date();
    this.formParam.VTYPE_NO = null;
    this.formParam.V_NO = null;
    this.formParam.CTRL_SHOWPATH = false;
    this.formParam.MULTIPLE_CODE = '';

    this.formParam.PRINT_TYPE = this.model.defaultPrintType;
    this.formParam.SERVER_NAME = this.model.defaultServer;
    this.formParam.FORMAT_SHORT_NAME = config.defaultOutputFormat;

    this.reportUrl = '';


  }

  // displayError
  private displayError(ex): void {
    console.log(ex);
  }

  private PrintVoucherOptions: any = {
    "printType": {
      "required": {
        "message": "Print Type required",
      }
    },
    "reportServer": {
      "required": {
        "message": "Report Server required",
      }
    },
    "outputFormat": {
      "required": {
        "message": "Output format required",
      }
    }
  }

  trackByFn(index, item) {
    return index; // or item.id
  }

}
