import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class ChequeBookList extends BaseEntity {

    ACTIVE_STAT: number;
    BANKDTL_NO: number;
    CHECKBOOK_ID: string;
    CHECK_ID: string;
    CHECK_NO: number;
    CHEQUE_TYPE: string;
    DESCR: string;
    PREPARE_DATE: Date;
    SETTLEMENT_TYPE: string;
    VTYPE_NO: number;
    AUTO_CHECKBOOK_ID: number;
    BANK_ACC_NO: string;
    ALIAS: string;

    constructor(options: any = {}) {
        super(options);
        /// RepSetUp class attribute
        this.ACTIVE_STAT = options.ACTIVE_STAT  || 0;
        this.BANKDTL_NO = options.BANKDTL_NO || null;
        this.CHECKBOOK_ID = options.CHECKBOOK_ID || null;
        this.CHECK_ID = options.CHECK_ID || null;
        this.CHECK_NO = options.CHECK_NO || null;
        this.CHEQUE_TYPE = options.CHEQUE_TYPE || null;
        this.DESCR = options.DESCR || null;
        this.PREPARE_DATE = options.PREPARE_DATE || null;
        this.SETTLEMENT_TYPE = options.SETTLEMENT_TYPE || null;
        this.VTYPE_NO = options.VTYPE_NO || null;
        this.AUTO_CHECKBOOK_ID = options.AUTO_CHECKBOOK_ID || null;
        this.ALIAS = options.ALIAS || null;
    }
}

