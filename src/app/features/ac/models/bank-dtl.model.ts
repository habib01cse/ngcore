import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

/**
 * Model of AC_1003 Bank information
 * Data Base Table name:AC_BANKDTL
 */

export class BankDtl extends BaseEntity {
    BANK_NO:number;
    BANKDTL_NO: number;
    BANK_ACC_TYPE: any;
    BANK_ACC_NO: any;
    ACC_NO: string;
    GL_ACCOUNT: string;
    SALES_ACC_NO: string;
    SALES_ACCOUNT: string;
    IMPORT_GROUP_COST_NAME:string;
    EXPORT_GROUP_COST_NAME:string;
    EXPORT_GROUP_COST_NO:number;
    IMPORT_GROUP_COST_NO:number;
    BANK_OPEN_BALANCE:any;
    CHECK_BOOK: any;
    LC_ADVISING: any;
    SQL_STATE:number;

    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);

        /// Bank Dlt class attribute
        this.BANK_NO = options.BANK_NO ||(options.BANK_NO === 0 ? 0 : null);
        this.BANKDTL_NO = options.BANKDTL_NO || (options.BANKDTL_NO === 0 ? 0 : null);
        this.BANK_ACC_TYPE = options.BANK_ACC_TYPE || '';

        this.IMPORT_GROUP_COST_NAME = options.IMPORT_GROUP_COST_NAME || '';
        this.EXPORT_GROUP_COST_NAME=options.EXPORT_GROUP_COST_NAME|| '';
        this.EXPORT_GROUP_COST_NO=options.EXPORT_GROUP_COST_NO||(options.EXPORT_GROUP_COST_NO === 0 ? 0 : null);
        this.IMPORT_GROUP_COST_NO=options.IMPORT_GROUP_COST_NO||(options.IMPORT_GROUP_COST_NO === 0 ? 0 : null);
        this.BANK_ACC_NO =  options.BANK_ACC_NO || (options.BANK_ACC_NO === 0 ? 0 : null);
        this.ACC_NO = options.ACC_NO || (options.ACC_NO === 0 ? 0 : null);
        this.GL_ACCOUNT = options.GL_ACCOUNT || '';
        this.SALES_ACCOUNT = options.SALES_ACCOUNT || '';
        this.SALES_ACC_NO = options.SALES_ACC_NO || (options.SALES_ACC_NO === 0 ? 0 : null);
        this.BANK_OPEN_BALANCE = options.BANK_OPEN_BALANCE || (options.BANK_OPEN_BALANCE === 0 ? 0 : null);
        this.CHECK_BOOK = options.CHECK_BOOK || (options.CHECK_BOOK === 0 ? 0 : 0);
        this.LC_ADVISING = options.LC_ADVISING || (options.LC_ADVISING === 0 ? 0 : 0);
    }
}

