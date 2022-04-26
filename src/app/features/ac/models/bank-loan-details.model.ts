
import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class BankLoneDtl extends BaseEntity {

    AMOUNT: number;
    BANKLOAN_NO: number;
    CLOSING_BALANCE: number;
    COMPANY_NO: number;
    CUMULATIVE_INTEREST: number;
    EXTRA_PAYMENT: string;
    INTEREST: number;
    LOANDTL_NO: number;
    OPENING_BALANCE: number;
    PAYMENT_DATE: Date;
    SCHEDULE_PAYMENT: number;
    TOTAL_PAYMENT: number;


    constructor(options: any = {}) {
        /// CostCenter class attribute
        super(options);
        this.AMOUNT= options.AMOUNT || null;
        this.BANKLOAN_NO= options.BANKLOAN_NO || null;
        this.CLOSING_BALANCE= options.CLOSING_BALANCE || null;
        this.COMPANY_NO= options.COMPANY_NO || null;
        this.CUMULATIVE_INTEREST= options.CUMULATIVE_INTEREST || null;
        this.EXTRA_PAYMENT= options.EXTRA_PAYMENT || '';
        this.INTEREST= options.INTEREST || null;
        this.LOANDTL_NO= options.LOANDTL_NO || null;
        this.OPENING_BALANCE= options.OPENING_BALANCE || null;
        this.PAYMENT_DATE= options.PAYMENT_DATE ? new Date(options.PAYMENT_DATE) : null;
        this.SCHEDULE_PAYMENT= options.SCHEDULE_PAYMENT || null;
        this.TOTAL_PAYMENT= options.TOTAL_PAYMENT || null;
    }
}
