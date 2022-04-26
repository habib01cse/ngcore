/* angular stuff */
import { Injectable } from '@angular/core';

/* 3rd party libraries */


/* our own stuff */
import { Voucher } from '../../../models/voucher.model';
import { VoucherDtl } from '../../../models/voucher-dtl.model';
import { UserPrivileges } from 'src/app/core/models/user-privileges';

@Injectable({
    providedIn: 'root'
})
export class ModelService {

    public NARRATION: String;
    public selectedVoucher: any = {};

    public moduleList = [];
    public voucherTypeList = [];
    public costCenterList = [];
    public businessAreaList = [];
    public userList = [];
    public fvoucherList = [];
    public coaList = [];
    public roundlIist = [];
    public status = {
        CHECK_STATUS: 1,
        UNCHECK_STATUS: 0
    };
    public ctrlStatus = {
        CHECK_STATUS: 1,
        UNCHECK_STATUS: 0
    };

    public approveStatus = {
        YES_APPROVED_STATUS: 1,
        NO_APPROVED_STATUS: 0
    };

    public postingOn = {
        TRANSCATION_DATE: 1,
        APPROVAL_DATE: 0
    };


    public voucherList = [];
    public voucherDtlList = [];
    public voucherDtlListBackup = new Array<VoucherDtl>();

    public selectdVoucherIndex;

    public totalBaseDrAmount;
    public totalBaseCrAmount;
    public selectedAccountPath;
    userPrivilege = new UserPrivileges();

    constructor() { }

    // checkUncheckAll
    public checkUncheckAll(isChecked: boolean): void {
        if(isChecked) {
            for (const voucher of this.voucherList) {
                voucher.POST_FLG = 1;
            }
        }
    }
    voucherBaseDRSum(list){
        let totalAmout = 0;
        for (const iterator of list) {
            if( (typeof iterator.BASE_DR !== 'undefined' )){
                totalAmout += isNaN(Number(iterator.BASE_DR)) ? 0 : Number(iterator.BASE_DR);
            }
        }
        return totalAmout;
    }
    voucherBaseCRSum(list){
        let totalAmout = 0;
        for (const iterator of list) {
            if( (typeof iterator.BASE_CR !== 'undefined')){
                totalAmout += isNaN(Number(iterator.BASE_CR)) ? 0 : Number(iterator.BASE_CR);
              }
        }
        return totalAmout;
    }
}
