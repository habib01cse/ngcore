/* angular stuff */
import { Injectable } from '@angular/core';

/* 3rd party libraries */


/* our own stuff */
import { CommonModel } from 'src/app/shared/models/common-model';
import { VoucherType } from '../../../models/voucher-type.model';
import { HeadIdentity } from '../../../models/head-identity.model';
import { Post } from '../../../models/model.post';
import { Config } from '../../../models/config.model';
import { DataService } from './data.service';
import { ConveyanceBill } from '../../../models/conveyance-bill.model';
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { VoucherReportConfig } from '../../../models/voucher-report-config';




@Injectable({
    providedIn: 'root'
})
export class ModelService {

    public voucherTypeList = new Array<VoucherType>();
    public voucherTypeListBackup = new Array<VoucherType>();

    public voucherSignatureList = new Array<VoucherReportConfig>();
    public voucherSignatureListBackup = new Array<VoucherReportConfig>();
    public copySignatureList = new Array<VoucherReportConfig>();

    public headIdentityList = new Array<HeadIdentity>();
    public headIdentityListBackup = new Array<HeadIdentity>();
    public postList = new Array<Post>();
    public postListBackup = new Array<Post>();
    public config: Config = new Config();
    public configBackUp: Config = new Config();
    public userPrivilege = new UserPrivileges();


    public voucherModeTypeList = [];
    public generationTypeList = [];

    public indentificationAccountTypeList = [];
    public headList: any[];

    public moduleList = [];
    public signatureList = [];
    public isIntegratedList = [];
    public isPostList = [];
    public postEditEnableList = [];
    public postDeleteEnableList = [];

    public nameCodeStyleTypeList: any[];
    public accountsBillVoucherTypeList = new Array<VoucherType>();

    public convBillVoucherTypeList = new Array<VoucherType>();
    public convProvisionAccountsList = [];
    public convExpenseAccountsList = [];
    public convPaymentVoucherTypeList = new Array<VoucherType>();

    public otherBillVoucherTypeList = new Array<VoucherType>();
    public otherProvisionAccountsList = [];
    public otherExpenseAccountsList = [];
    public otherPaymentVoucherTypeList = new Array<VoucherType>();
    public VTYPE_NO: any[];



    constructor(private dataSerice: DataService,
        private alertService: AlertService) { }

    // Get Voucher list

    addNewVoucher(voucherTypeList: any): void {
        this.voucherTypeList = voucherTypeList;
        this.voucherTypeList.push(new VoucherType());
    }

    saveVoucherType(voucherTypeList: any): void {
        this.dataSerice.saveVoucherTypes(voucherTypeList).subscribe(
            result => {
                this.voucherTypeListBackup.length = 0;
                this.voucherTypeListBackup = JSON.parse(JSON.stringify(this.voucherTypeList));
                this.alertService.success("Voucher List saved successfully");
                this.voucherTypeList = result.body;
            },
            err => {
                // Do stuff whith your error
                this.alertService.warning("Failed to save Voucher List!");
                this.displayError(err);
            },
            () => {
                // Do stuff after completion
            }
        )
    }

    addNewIdentity(headIdentityList: any): void {
        this.headIdentityList = headIdentityList;
        this.headIdentityList.push(new HeadIdentity());
    }

    saveIdentityType(headIdentityList: any): void {

        this.dataSerice.saveHeadIdentity(headIdentityList).subscribe(
            result => {
                this.headIdentityListBackup.length = 0;
                this.headIdentityListBackup = JSON.parse(JSON.stringify(this.headIdentityList));
                this.alertService.success("Identity List saved successfully");
            },
            err => {
                // Do stuff whith your error
                this.alertService.warning("Failed to save Identity List!");
                this.displayError(err);
            },
            () => {
                // Do stuff after completion
            }
        )
    }

    addIntegratedFeature(postList: any): void {
        this.postList = postList;
        this.postList.push(new Post());
    }

    saveIntegratedFeature(postList: any): void {
        this.postList = postList;
        let passingObj = {};
        passingObj['postList'] = this.postList;
        this.dataSerice.savePost(this.postList).subscribe(
            result => {
                // alert("successfully Save postList");
                this.postListBackup.length = 0;
                this.postListBackup = JSON.parse(JSON.stringify(this.postList));
                this.alertService.success("Post List saved successfully");
            },
            err => {
                this.alertService.warning("Failed to save Post List!");
                this.displayError(err);
            },
            () => {
                // Do stuff after completion
            }
        )
    }

    saveConfig(config: any): void {
        config.PROTECT_OTHER_SRC_JOURNAL = config.PROTECT_OTHER_SRC_JOURNAL ? 1 : 0;
        config.MULTICOMPANY_COST = config.MULTICOMPANY_COST ? 1 : 0;
        config.MULTICOMPANY_CHART = config.MULTICOMPANY_CHART ? 1 : 0;
        // this.config = config;
        // let passingObj = {};
        // passingObj['config'] = this.config;
        this.dataSerice.saveConfig(config).subscribe(
            result => {
                this.alertService.success("Configuration saved successfully");
            },
            err => {
                // Do stuff whith your error
                this.alertService.warning("Failed to save Configuration!");
                this.displayError(err);
            },
            () => {
                // Do stuff after completion
            }
        )
    }

    // displayError
    private displayError(ex): void {
        console.log(ex);
    }

    // // generationTypeList = [];
    // // accountList = [];
    // // headList: any[];
    // // moduleNameList: any[];
    // // isIntegrateList = [];
    // // isPostList: any[];
    // // postEditEnableList: any[];
    // // postDeleteEnableList: any[];
    // // nameCodeStyleList: any[];
    // // accountsBillVoucherList: any[];
    // // billVoucherList: any[];
    // // provisionAccountsList: any[];
    // // expenseAccountsList: any[];
    // // paymentVoucherList: any[];


    // public voucherMode = [];

    // public accountsList = [];
    // public costCenterList = [];
    // public refCenterList = [];
    // public postingStatusList = [];
    // public reportServerList = [];
    // public outputFormatList = [];
    // public accountTypeList = [];
    // public balanceTypeList = [];

    // public baSubAll: boolean = false;
    // public costCenterSubAll: boolean = false;
    // public refCenterSubAll: boolean = false;
    // public landscpae: boolean = false;
    // public withDescription: boolean = false;
    // public showRunningBalance: boolean = false;
    // public groupledgerReport: boolean = false;
    // public monthlyLedgerReport: boolean = false;
    // public monthlyStatement: boolean = false;
    // public basecurrency: boolean = false;
    // public multiCurrency: boolean = false;
    // public showDetails: boolean = false;
    // public suppressZero: boolean = false;
    // public opening: boolean = false;


}
