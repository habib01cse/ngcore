import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class ChequeRelated extends BaseEntity {
    ACTIVE_STAT: number;
    CHECK_NO: string;
    CHECK_ID: string;
    CHECK_DATE: any;
    POST_DATE: any;
    STATUS: string;
    CHECK_AMT: number;
    SETTLEMENT: string;
    PAY_TO_NAME: string;
    CLOSE_BAL: number;
    CTRL_ACT_CLBAL: number;
    EXCHANGE_RATE: number;
    constructor(options: any = {}) {
        super();
        this.ACTIVE_STAT = options.ACTIVE_STAT || null;
        this.CHECK_NO = options.CHECK_NO || null;
        this.CHECK_ID = options.CHECK_ID || '';
        this.CHECK_DATE = options.CHECK_DATE || '';
        this.POST_DATE = options.POST_DATE || '';
        this.STATUS = options.STATUS || '';
        this.CHECK_AMT = options.CHECK_AMT || null;
        this.SETTLEMENT = options.SETTLEMENT || '';
        this.PAY_TO_NAME = options.PAY_TO_NAME || '';
        this.CLOSE_BAL = options.CLOSE_BAL || null;
        this.CTRL_ACT_CLBAL = options.CTRL_ACT_CLBAL || null;
        this.EXCHANGE_RATE = options.EXCHANGE_RATE || null;
        this.SQL_STATE = options.SQL_STATE || fixedValues.sqlState.sqlInsert;
    }
}

