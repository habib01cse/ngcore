import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class BankName {
    ACC_NAME: string;
    ACC_NO: number;
    ACC_CODE: string;
    BANKDTL_NO: number;
    BRANCH_ADDR: string;
    BRANCH_NAME: string;
    BANK_ACC_NO: string;
    CHECKBOOK_ID: any;
    ALIAS: string;

    constructor(options: any = {}) {

        /// RepSetUp class attribute
        this.ACC_NAME = options.ACC_NAME || '';
        this.ACC_NO = options.ACC_NO || null;
        this.ACC_CODE = options.ACC_CODE || '';
        this.BANKDTL_NO = options.BANKDTL_NO || null;
        this.BRANCH_ADDR = options.BRANCH_ADDR || '';
        this.BRANCH_NAME = options.BRANCH_NAME || '';
        this.BANK_ACC_NO = options.BANK_ACC_NO || '';
        this.CHECKBOOK_ID = options.CHECKBOOK_ID || null;
        this.ALIAS = options.ALIAS || '';
    }
}

