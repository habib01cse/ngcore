import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
/**
 * Model  Budget Details
 */

export class BudgetDetail extends BaseEntity {
    B_SL_NO: number;
    BUDGETDLT_NO: number;
    QUARTER_NO: number;
    TITLE: string;
    QTY: number;
    RCV_AMT: number;
    APPROVE_AMT: number;
    DESCR: string;    

    

    constructor(options: any = {}) {
        super(options);
        this.B_SL_NO = options.B_SL_NO || null;
        this.BUDGETDLT_NO = options.BUDGETDLT_NO || null;
        this.QUARTER_NO = options.QUARTER_NO || null;
        this.TITLE = options.TITLE || '';
        this.QTY = options.QTY || null;
        this.RCV_AMT = options.RCV_AMT || null;
        this.APPROVE_AMT = options.APPROVE_AMT || null;
        this.DESCR = options.DESCR || '';
    }
}
