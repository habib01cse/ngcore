import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class ChequeBook {
    ACTIVE_STAT: number;
    IN_ACTIVE_STAT: number;
    ALIAS: string;
    CHECKBOOK_ID: string;
    COUNTCKID: number;
    MAX_CKID: string;
    MIN_CKID: number;
    TYPE_NAME: string;
    VTYPE_NO: number;
    IN_ACTIVE_REASON:string;

    constructor(options: any = {}) {

        /// RepSetUp class attribute
        this.ACTIVE_STAT = options.ACTIVE_STAT || 0;
        this.IN_ACTIVE_STAT = options.IN_ACTIVE_STAT || 1;
        this.ALIAS = options.ALIAS || '';
        this.CHECKBOOK_ID = options.CHECKBOOK_ID || '';
        this.COUNTCKID = options.COUNTCKID || null;
        this.MAX_CKID = options.MAX_CKID || null;
        this.MIN_CKID = options.MIN_CKID || null;
        this.TYPE_NAME = options.TYPE_NAME || '';
        this.VTYPE_NO = options.VTYPE_NO || null;
        this.IN_ACTIVE_REASON = options.IN_ACTIVE_REASON || '';
    }
}

