import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

/**
* Form name TS_Period(AC_1005).xlsx
* Hedding of file Model of AC_1004 Accounts Voucher
*/

/**
 * Database table name is AC_OPENPERIOD
 */

export class OpenPeriod extends BaseEntity {
    ACC_NO: number;
    ACC_NAME: string;
    COST_NO: number;
    COST_NAME: string;
    BA_NO: number;
    BA_NAME: string;
    OPEN_DATE: any;
    DR: number;
    CR: number;
    PERIOD_NO:any;
    OPENPERIOD_NO:any;
    GROUPPERIOD_NO:any;
    CURRENCY_NO:any;
    CURRENCY_NAME:any;
    EXCHANGE_RATE:any;
    DR_FC:any;
    CR_FC:any;
    SQL_STATE:any;

    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);

        /// OpenPeriod class attribute
        this.ACC_NO = options.ACC_NO || '';
        this.COST_NO = options.COST_NO || '';
        this.BA_NO = options.BA_NO || '';
        this.OPEN_DATE = (options.OPEN_DATE) ? new Date(options.OPEN_DATE) : new Date();
        this.DR = options.DR || '';
        this.CR = options.CR || '';

        this.ACC_NAME = options.ACC_NAME || '';
        this.COST_NAME = options.COST_NAME || '';
        this.BA_NAME = options.BA_NAME || '';
        this.PERIOD_NO = options.PERIOD_NO || '';
        this.OPENPERIOD_NO = options.OPENPERIOD_NO || '';
        this.GROUPPERIOD_NO = options.GROUPPERIOD_NO || null;
        this.CURRENCY_NO = options.CURRENCY_NO || null;
        this.EXCHANGE_RATE = options.EXCHANGE_RATE || null;
        this.DR_FC = options.DR_FC || null;
        this.CR_FC = options.CR_FC || null;
        this.CURRENCY_NAME = options.CURRENCY_NAME || null;
    }
 }
