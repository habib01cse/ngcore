import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
/**
 * Model of AC_1012 Accounts Category
 */

export class Nature extends BaseEntity {
    NATURE_NO: number;
    NATURE_NAME: string;
    NATURE_CODE: string;
    NATURE_TYPE: string;
    SL_NO: any;
    SQL_STATE:number;

    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super();
        // this.SS_CREATOR = options.SS_CREATOR || 0;
        // this.SS_CREATED_ON = options.SS_CREATED_ON || null;
        // this.SS_MODIFIER = options.SS_MODIFIER || 0;
        // this.SS_MODIFIED_ON = options.SS_MODIFIED_ON || null;
        // this.SS_OG_NO = options.SS_OG_NO || 0;
        // this.COMPANY_NO = options.COMPANY_NO || 0;
        // this.SS_UPLOADED_ON = options.SS_UPLOADED_ON || null;
        // this.SS_IS_DELETED = options.SS_IS_DELETED || 0;

        this.SQL_STATE = options.SQL_STATE || fixedValues.sqlState.sqlInsert;

        this.SS_IS_UPLOADED = options.SS_IS_UPLOADED || 0;
        /// Bank Dlt class attribute
        this.NATURE_NO = options.NATURE_NO || null;
        this.NATURE_NAME = options.NATURE_NAME || null;
        this.NATURE_CODE = options.NATURE_CODE || null;
        this.NATURE_TYPE = options.NATURE_TYPE || null;
        this.SL_NO = options.SL_NO;
    }
}
