import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

/**
* Form name TS_Period(AC_1005).xlsx
* Hedding of file Model of AC_1004 Accounts Voucher
*/

/**
 * Database table name is AC_PERIOD
 */

export class Period extends BaseEntity {
    public CLOSE_FLAG: any;
    public START_PERIOD_DATE: any;
    public END_PERIOD_DATE: any;
    public PERIOD_NO:any;
    public GROUPPERIOD_NO:any;
    public P_PERIOD_CHK:any;
    public P_OPN_PERIOD:any;
    public SQL_STATE:any;
    public SELECT_FLAG:boolean;
    public COMPANY_ALIAS:string;
    public PERIOD_RANGE:string;

    constructor(options: any = {}) {
        super();

        /// Period class attribute
        this.CLOSE_FLAG = options.CLOSE_FLAG || null;
        this.SQL_STATE = options.SQL_STATE || fixedValues.sqlState.sqlInsert;
        this.START_PERIOD_DATE = (options.START_PERIOD_DATE) ? new Date(options.START_PERIOD_DATE) : new Date();
        this.END_PERIOD_DATE = (options.END_PERIOD_DATE) ? new Date(options.END_PERIOD_DATE) : new Date();
        this.PERIOD_NO = options.PERIOD_NO || null;
        this.GROUPPERIOD_NO = options.GROUPPERIOD_NO || null;
        this.P_PERIOD_CHK = options.P_PERIOD_CHK || null;
        this.P_OPN_PERIOD = options.P_OPN_PERIOD || null;
        this.SELECT_FLAG = options.SELECT_FLAG || false;
        this.COMPANY_ALIAS = options.COMPANY_ALIAS || "";
        this.PERIOD_RANGE = options.PERIOD_RANGE || "";
    }
 }

