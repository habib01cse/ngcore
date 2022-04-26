
import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

/**
 * Form name TS_Configuration(AC_1002).xlsx
 * Hedding of file Model of AC_1004 Accounts Voucher
 */

/**
 * Database table name is AC_VOUCHERTYPE
 */

export class VoucherType extends BaseEntity {

    TYPE_NAME: string;
    ALIAS: string;
    V_TYPE: string;
    DESCR: string;
    V_DEFAULT: number;
    AUTOGEN_FLAG: number;
    GEN_TYPE: string;
    GEN_FLAG: number;
    VTYPE_NO: number;

    constructor(options: any = {}) {
        super(options);
        this.TYPE_NAME = options.TYPE_NAME || null;
        this.VTYPE_NO = options.VTYPE_NO || null;
        this.ALIAS = options.ALIAS || null;
        this.V_TYPE = options.V_TYPE || null;
        this.DESCR = options.DESCR || null;
        this.V_DEFAULT = options.V_DEFAULT || 0;
        this.AUTOGEN_FLAG = options.AUTOGEN_FLAG || 0;
        this.GEN_TYPE = options.GEN_TYPE || null;
        this.GEN_FLAG = options.GEN_FLAG || 0;
    }
}
