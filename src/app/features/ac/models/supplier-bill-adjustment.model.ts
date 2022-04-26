
import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class SupplierBillAdjustment extends BaseEntity {

   
    MONEYADJUST_DATE: Date;
    ADJUST_VALUE: number;
    BILL_NO:number;
    STAT: string;
    STATUS_NO: number;
    NEXT_STATUS_NO: number;
    APPSET_NO: number;
    APPROVE_BY: number;
    APPROVE_DATE: Date;
    APPROVE_FLAG: number;
    V_NO: number;

    _PK: string;
    _ID: string;
    

    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);
        /// CostCenter class attribute
        this.V_NO = options.V_NO || null;
        this.BILL_NO = options.BILL_NO || null;
        this.ADJUST_VALUE = options.ADJUST_VALUE || null;
        this.STATUS_NO = options.STATUS_NO || null;
        this.NEXT_STATUS_NO = options.NEXT_STATUS_NO || null;
        this.APPSET_NO = options.APPSET_NO || null;
        this.APPROVE_BY = options.APPROVE_BY || null;
        this.APPROVE_DATE = (options.APPROVE_DATE) ? new Date(options.APPROVE_DATE) : null;
        this.STAT = options.STAT || '';
        this.MONEYADJUST_DATE = (options.MONEYADJUST_DATE) ? new Date(options.MONEYADJUST_DATE) : null;
        this._PK = "MONEYADJUST_NO";
        this._ID = "MONEYADJUST_ID";
    }
}
