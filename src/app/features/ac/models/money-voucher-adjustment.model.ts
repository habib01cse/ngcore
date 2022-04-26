
import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class MoneyVoucherAdjustment extends BaseEntity {

    BILL_NO: number;
    V_NO: number;
    ADJUST_VALUE: number;
    STAT: string;
    STATUS_NO: number;

    V_ID:string;
    V_DATE:Date;
    MONEYADJUST_DATE:Date;
    COST_NAME:string;
    DR:number;
    PENDING_VALUE:number;

    NEXT_STATUS_NO: number;
    APPSET_NO: number;
    APPROVE_BY: number;
    APPROVE_DATE: Date;
    APPROVE_FLAG: number;
    MONEYREQ_ID: string;

    MONEYADJUST_ID: string;
    MONEYSCHEDULE_NO: number;
    MONEYSCHEDULE_ID: string;


    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);
        /// CostCenter class attribute
   
        this.V_NO = options.V_NO || null;
        this.DR = options.DR || null;
        this.MONEYSCHEDULE_NO = options.MONEYSCHEDULE_NO || null;
        this.MONEYSCHEDULE_ID = options.MONEYSCHEDULE_ID || '';
        this.PENDING_VALUE = options.PENDING_VALUE || null;
        this.V_ID = options.V_ID || '';
        this.COST_NAME = options.COST_NAME || '';
        this.MONEYADJUST_ID = options.MONEYADJUST_ID || '';
        this.ADJUST_VALUE = options.ADJUST_VALUE || null;
        this.STATUS_NO = options.STATUS_NO || null;
        this.NEXT_STATUS_NO = options.NEXT_STATUS_NO || null;
        this.APPSET_NO = options.APPSET_NO || null;
        this.APPROVE_BY = options.APPROVE_BY || null;
        this.APPROVE_DATE = (options.APPROVE_DATE) ? new Date(options.APPROVE_DATE) : null;
        this.MONEYADJUST_DATE= (options.MONEYADJUST_DATE) ? new Date(options.MONEYADJUST_DATE                ) : null;
        this.V_DATE = (options.V_DATE) ? new Date(options.V_DATE) : null;
        this.STAT = options.STAT || '';
        this.MONEYREQ_ID = options.MONEYREQ_ID || '';
  
    }
}
