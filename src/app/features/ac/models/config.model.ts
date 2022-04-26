import { BaseEntity } from 'src/app/core/models/base-entity';
import { NgIf } from '@angular/common';

/**
 * Form name TS_Configuration(AC_1002).xlsx
 * Hedding of file Model of AC_1004 Accounts Voucher
 */
/**
 * Database table name is Accounts AC_CONFIG
 */

export class Config extends BaseEntity {

    PROTECT_OTHER_SRC_JOURNAL: number;
    MULTICOMPANY_CHART: number;
    MULTICOMPANY_COST: number;
    AUTO_CHECKBOOK_ID: number;    
    NAME_CODE_STYLE: string;
    BILL_VOUCHER: number;
    CONV_BILL_VOUCHER: number;
    CONV_LBL_ACC_NO: number;
    CONV_DR_ACC_NO: number;
    CONV_PAY_VOUCHER: number;
    OTHER_BILL_VOUCHER: number;
    OTHER_LBL_ACC_NO: number;
    OTHER_DR_ACC_NO: number;
    OTHER_PAY_VOUCHER: number;
    CONVEYANCE_PROVISION_ACCOUNTS: string;
    CONVEYANCE_BILL_VOUCHER: string;
    COFIG_NO: number;

    constructor(options: any = {}) {

        super(options);
  
        /// Config class attribute
        this.PROTECT_OTHER_SRC_JOURNAL = options.PROTECT_OTHER_SRC_JOURNAL || 0;
        this.MULTICOMPANY_CHART = options.MULTICOMPANY_CHART || 0;
        this.MULTICOMPANY_COST = options.MULTICOMPANY_COST || 0;
        this.AUTO_CHECKBOOK_ID = options.AUTO_CHECKBOOK_ID || 0;
        this.COFIG_NO = options.COFIG_NO || null;
        this.NAME_CODE_STYLE = options.NAME_CODE_STYLE || null;
        this.CONVEYANCE_BILL_VOUCHER = options.CONVEYANCE_BILL_VOUCHER || '';
        this.CONVEYANCE_PROVISION_ACCOUNTS = options.CONVEYANCE_PROVISION_ACCOUNTS || null;
        this.BILL_VOUCHER = parseInt(options.BILL_VOUCHER) || null;
        this.CONV_BILL_VOUCHER = parseInt(options.CONV_BILL_VOUCHER) || null;
        this.CONV_LBL_ACC_NO = parseInt(options.CONV_LBL_ACC_NO) || null;
        this.CONV_DR_ACC_NO = parseInt(options.CONV_DR_ACC_NO) || null;
        this.CONV_PAY_VOUCHER = parseInt(options.CONV_PAY_VOUCHER) || null;
        this.OTHER_BILL_VOUCHER = parseInt(options.OTHER_BILL_VOUCHER) || null;
        this.OTHER_LBL_ACC_NO = parseInt(options.OTHER_LBL_ACC_NO) || null;
        this.OTHER_DR_ACC_NO = parseInt(options.OTHER_DR_ACC_NO) || null;
        this.OTHER_PAY_VOUCHER = parseInt(options.OTHER_PAY_VOUCHER) || null;
    }
}
