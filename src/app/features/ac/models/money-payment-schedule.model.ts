
import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class MoneyPaymentSchedule extends BaseEntity {

    MONEYSCHEDULE_NO: number;
    MONEYREQ_NO: number;
    PAYABLE_AMOUNT: number;
    COMPANY_NO: number;
    MONEYREQDTL_NO: number;
    MONEYSCHEDULE_ID: string;
    SCHEDULE_DATE: Date;
    _PK: string;
    _ID: string;
    

    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);
        /// CostCenter class attribute
        this.MONEYSCHEDULE_NO = options.MONEYSCHEDULE_NO || null;
        this.MONEYREQ_NO = options.MONEYREQ_NO || null;
        this.SCHEDULE_DATE = (options.SCHEDULE_DATE) ? new Date(options.SCHEDULE_DATE) : null;
        this.PAYABLE_AMOUNT = options.PAYABLE_AMOUNT || null;
        this.COMPANY_NO = options.COMPANY_NO || null;
        this.MONEYREQDTL_NO = options.MONEYREQDTL_NO || null;
        this.MONEYSCHEDULE_ID = options.MONEYSCHEDULE_ID || null;
        this._PK = "MONEYSCHEDULE_NO";
        this._ID = "MONEYSCHEDULE_ID";
    }
}
