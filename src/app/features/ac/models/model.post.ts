import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { NumberToWordsPipe } from 'src/app/shared/pipes/number-to-words.pipe';

/**
 * Form name TS_Configuration(AC_1002).xlsx
 * Hedding of file Model of AC_1004 Accounts Voucher
 */

/**
 * Database table name is AC_POST
 */

export class Post extends BaseEntity {
    MODULE: string;
    IS_INTEGRATE: number;
    IS_POST: number;
    POST_EDT_CHK: number;
    POST_DEL_CHK: number;
    POST_NO: number;

    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);
        // this.SS_CREATOR = options.SS_CREATOR || 0;
        // this.SS_CREATED_ON = options.SS_CREATED_ON || null;
        // this.SS_MODIFIER = options.SS_MODIFIER || 0;
        // this.SS_MODIFIED_ON = options.SS_MODIFIED_ON || null;
        // this.SS_OG_NO = options.SS_OG_NO || 0;
        // this.COMPANY_NO = options.COMPANY_NO || 0;
        // this.SS_UPLOADED_ON = options.SS_UPLOADED_ON || null;
        // this.SS_IS_DELETED = options.SS_IS_DELETED || 0;
        // this.SS_IS_UPLOADED = options.SS_IS_UPLOADED || 0;

        /// Post attribute
        this.MODULE = options.MODULE || null;
        this.POST_NO = options.POST_NO || null;
        this.IS_INTEGRATE = options.IS_INTEGRATE || 0;
        this.IS_POST = options.IS_POST || 0;
        this.POST_EDT_CHK = options.POST_EDT_CHK || 0;
        this.POST_DEL_CHK = options.POST_DEL_CHK || 0;
    }
}
