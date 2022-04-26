import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { BankLoneDtl } from './bank-loan-details.model';

export class BankLone {
    ACC_NO: string;
    ACC_NAME: string;
    ANNUAL_INTAREST_RATE: number;
    APPROVED_STATUS: number;
    BANKLOAN_ID: string
    BANKLOAN_NO: number;
    BANK_NAME: string;
    BANK_NO: number;
    CATEGORY_DIS: string;
    COMPANY_NO: number;
    CONTRACT_NO: string;
    COST_CENTER_NO: string;
    COST_NAME: string;
    EXPORT_LC_DATE: Date;
    IMPORT_LC_DATE: Date;
    IMPORT_LC_NO: string;
    INTEREST_TYPE_DIS: string;
    INTEREST_TYPE: number;
    LEDGER: string;
    LOAN_CATEGORY: string;
    LOAN_COST_NO: string;
    LOAN_ID: string;
    LOAN_NATURE: string;
    LOAN_NATURE_DIS: string;
    LOAN_NO: number;
    LOAN_PERIOD: number;
    LOAN_START_DATE: Date;
    LOAN_TYPE: string;
    LOAN_TYPE_NO: string;
    NO_OF_PAYMENT_PER_YEAR: number;
    PAYMENT_POLICY : number;
    PRINCIPAL_AMOUTN: number;
    PAYMENT_POLICY_DIS: string;
    SQL_STATE: number;
    PAYMENT_POLICY_NO: number;
    bankLoanDtl: BankLoneDtl[];
    LC_DOCUMENT_ID:any;
   

    constructor(options: any = {}) {

        this.ACC_NO = options.ACC_NO || '';
        this.ACC_NAME = options.ACC_NAME || '';
        this.BANKLOAN_NO = options.BANKLOAN_NO || null;
        this.ANNUAL_INTAREST_RATE = options.ANNUAL_INTAREST_RATE || null;
        this.APPROVED_STATUS = options.APPROVED_STATUS || null;
        this.PAYMENT_POLICY_NO = options.PAYMENT_POLICY_NO || null;
        this.BANKLOAN_ID = options.BANKLOAN_ID || '';
        this.BANK_NAME = options.BANK_NAME || '';
        this.BANK_NO = options.BANK_NO || '';
        this.CATEGORY_DIS = options.CATEGORY_DIS || '';
        this.COMPANY_NO = options.COMPANY_NO || null;
        this.CONTRACT_NO = options.CONTRACT_NO || '';
        this.COST_CENTER_NO = options.COST_CENTER_NO || '';
        this.COST_NAME = options.COST_NAME || '';
        this.EXPORT_LC_DATE = options.EXPORT_LC_DATE ? new Date(options.EXPORT_LC_DATE) : null;
        this.IMPORT_LC_DATE = options.IMPORT_LC_DATE ? new Date(options.IMPORT_LC_DATE) : null;
        this.IMPORT_LC_NO = options.IMPORT_LC_NO || '';
        this.INTEREST_TYPE_DIS = options.INTEREST_TYPE_DIS || '';
        this.INTEREST_TYPE = options.INTEREST_TYPE || null;
        this.LEDGER = options.LEDGER || '';
        this.LOAN_CATEGORY = options.LOAN_CATEGORY || null;
        this.LOAN_COST_NO = options.LOAN_COST_NO || '';
        this.LOAN_ID = options.LOAN_ID || null;
        this.LOAN_NATURE = options.LOAN_NATURE || null;
        this.LOAN_NO = options.LOAN_NO || null;
        this.LOAN_PERIOD = options.LOAN_PERIOD || null;
        this.LOAN_START_DATE =  options.LOAN_START_DATE ? new Date(options.LOAN_START_DATE) : null;
        this.LOAN_TYPE = options.LOAN_TYPE || null;
        this.LOAN_TYPE_NO = options.LOAN_TYPE_NO || null;
        this.NO_OF_PAYMENT_PER_YEAR = options.NO_OF_PAYMENT_PER_YEAR || null;
        this.PAYMENT_POLICY  = options.PAYMENT_POLICY  || null;
        this.PAYMENT_POLICY_DIS  = options.PAYMENT_POLICY_DIS  || '';
        this.PRINCIPAL_AMOUTN = options.PRINCIPAL_AMOUTN || null;
        this.SQL_STATE =  options.SQL_STATE || fixedValues.sqlState.sqlInsert;
        this.bankLoanDtl = (options.bankLoanDtl) ? options.bankLoanDtl : new Array<BankLoneDtl>();
        this.LC_DOCUMENT_ID=options.LC_DOCUMENT_ID || null;

    }
}
