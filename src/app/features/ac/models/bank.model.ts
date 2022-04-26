
import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { BankDtl } from './bank-dtl.model';

/**
 * Model of AC_1003 Bank information
 * Data Base Table name:AC_BANK
 */

export class Bank extends BaseEntity {

    BANK_NO: number;
    SUBBANK_OF: number;
    BANK_NAME: string;
    BRANCH_NAME: string;
    ALIAS: string;
    BRANCH_ADDR: string;
    DIST_STATE: number;
    DTL_NAME: string;
    PHONE1: string;
    PHONE2: string;
    PHONE3: string;
    PHONE4: string;
    FAX: string;
    SWIFT_CODE: string;
    ROUTING_NO: string;
    TELEX: string;
    EMAIL: String;
    WEB: string;
    DESCR: string;
    SQL_STATE:number;
    bankDtls:BankDtl[];

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
        // this.SS_IS_UPLOADED = options.SS_IS_UPLOADED || 0;

        /// Bank class attribute
        this.BANK_NO = options.BANK_NO || null;
        this.SUBBANK_OF = options.SUBBANK_OF || null;
        this.BANK_NAME = options.BANK_NAME || null;
        this.BRANCH_NAME = options.BRANCH_NAME || null;
        this.ALIAS = options.ALIAS || null;
        this.BRANCH_ADDR = options.BRANCH_ADDR || null;
        this.DIST_STATE = options.DIST_STATE || null;
        this.DTL_NAME = options.DTL_NAME || null;
        this.PHONE1 = options.PHONE1 || null;
        this.PHONE2 = options.PHONE2 || null;
        this.PHONE3 = options.PHONE3 || null;
        this.PHONE4 = options.PHONE4 || null;
        this.FAX = options.FAX || null;
        this.SWIFT_CODE = options.SWIFT_CODE || null;
        this.ROUTING_NO = options.ROUTING_NO || null;        
        this.TELEX = options.TELEX || null;
        this.EMAIL = options.EMAIL || null;
        this.WEB = options.WEB || null;
        this.DESCR = options.DESCR || null;
        this.bankDtls = (options.bankDtls)?options.bankDtls: new Array<BankDtl>();
        this.SQL_STATE = options.SQL_STATE || fixedValues.sqlState.sqlInsert;
    }
}
