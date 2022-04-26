export class VoucherSearch {    

    BA_NO: number;
    BA_NAME: string;
    NARRATION: string;
    FILTER_ST_DATE: any;
    ACC_NO: string;
    ACC_NAME: number;
    CHEQUE: string;
    FILTER_END_DATE: any;
    V_ID: string;
    COST_NO: number;
    COST_NAME: string;
    BANK_NAME: string;
    ST_DATE: any;
    END_DATE: any;
    VTYPE_NO: number;

    constructor(options: any = {}) {
        //
        this.BA_NO = options.BA_NO || null;
        this.BA_NAME = options.BA_NAME || null;
        this.NARRATION = options.NARRATION || null;
        this.FILTER_ST_DATE = (options.FILTER_ST_DATE)? new Date(options.FILTER_ST_DATE): new Date();
        this.ACC_NO = options.ACC_NO || null;
        this.ACC_NAME = options.ACC_NAME || null;
        this.CHEQUE = options.CHEQUE || null;
        this.FILTER_END_DATE = (options.FILTER_END_DATE)? new Date(options.FILTER_END_DATE): new Date();
        this.V_ID = options.V_ID || null;
        this.COST_NO = options.COST_NO || null;
        this.COST_NAME = options.COST_NAME || null;
        this.BANK_NAME = options.BANK_NAME || null;
        this.ST_DATE = options.ST_DATE || null;
        this.END_DATE = options.END_DATE || null;
        this.VTYPE_NO = options.VTYPE_NO || null;
    }
}
