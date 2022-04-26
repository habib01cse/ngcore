import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class BankReconciliation extends BaseEntity {

    BALANCE: string;
    BALANCE_ENTER: string;
    BANK_DATE: Date;
    CHEQUE_DATE: Date;
    CHEQUE_NO: string;
    CR: string;
    DESCR: string;
    DR: string;
    NARRATION: string;
    VDTL_NO: number;
    V_DATE: Date;
    V_ID: string;
    V_NO: number;

    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);

        /// RepSetUp class attribute
        this.BALANCE = options.BALANCE || '';
        this.BALANCE_ENTER = options.BALANCE_ENTER || '';
        this.BANK_DATE = options.BANK_DATE ? new Date(options.BANK_DATE): null;
        this.CHEQUE_DATE = options.CHEQUE_DATE || null;
        this.CHEQUE_NO = options.CHEQUE_NO || '';
        this.CR = options.CR || '';
        this.DR = options.DR || '';
        this.DESCR = options.DESCR || '';
        this.NARRATION = options.NARRATION || '';
        this.VDTL_NO = options.VDTL_NO || null;
        this.V_DATE = options.V_DATE || null;
        this.V_ID = options.V_ID || '';
        this.V_NO = options.V_NO || null;
    }
}

