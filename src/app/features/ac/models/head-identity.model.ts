import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

/**
 * Form name TS_Configuration(AC_1002).xlsx
 * Hedding of file Model of AC_1004 Accounts Voucher
 */

 /**
 * Database table name is AC_HEADIDENTITY
 */

export class HeadIdentity extends BaseEntity {
    
    ACC_TYPE: string;
    ACC_NO: number;
    ACC_NAME: string;
    ACC_CODE: string;
    DESCR: string;
    HEADENTITY_NO: number;

    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);
        this.ACC_TYPE = options.ACC_TYPE || null;
        this.HEADENTITY_NO = options.HEADENTITY_NO || null;
        this.ACC_NO = options.ACC_NO || 0;
        this.ACC_NAME = options.ACC_NAME || null;
        this.ACC_CODE = options.ACC_CODE || null;
        this.DESCR = options.DESCR || null;
    }
}

