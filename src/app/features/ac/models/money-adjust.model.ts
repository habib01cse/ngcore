
import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class MoneyAdjustment extends BaseEntity {

    MONEYADJUST_NO: number;
    MONEYADJUST_ID: string;
    MONEYADJUST_DATE: Date;
    MONEYSCHEDULE_NO: number;
    MONEYSCHEDULE_ID: string;
    STAT: string;
    BILL_NO: number;
    V_NO: number;
    ADVANCE_AMOUNT: number;

    MONEYREQ_ID:string;
    ADJUST_VALUE:number;

    _PK: string;
    _ID: string;
    

    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);
        /// CostCenter class attribute
        this.MONEYADJUST_NO = options.MONEYADJUST_NO || null;
        this.V_NO = options.V_NO || null;
        this.ADVANCE_AMOUNT = options.ADVANCE_AMOUNT || null;
        this.MONEYSCHEDULE_NO = options.MONEYSCHEDULE_NO || null;
        this.BILL_NO = options.BILL_NO || null;
        this.ADJUST_VALUE = options.ADJUST_VALUE || null;
        this.MONEYADJUST_ID = options.MONEYADJUST_ID || '';
        this.STAT = options.STAT || '';
        this.MONEYSCHEDULE_ID = options.MONEYSCHEDULE_ID || '';
        this.MONEYREQ_ID = options.MONEYREQ_ID || '';
        this.MONEYADJUST_DATE = (options.MONEYADJUST_DATE) ? new Date(options.MONEYADJUST_DATE) : null;
        this._PK = "MONEYADJUST_NO";
        this._ID = "MONEYADJUST_ID";
    }
}
