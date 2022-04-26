import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class AccountsVoucherDisplay {
    BA_NO: number;
    BA_NAME: string;
    ACC_NO: number;
    ACC_NAME: string;
    ACC_CODE: string;
    V_ID: string;
    V_NO: number;
    COST_NO: number;
    COST_NAME: string;
    CHEQUE_NO: number;
    BANK_NAME: string;
    NARRATION:string;
    SQL_STATE: number;
    constructor(options: any = {}) {
        this.SQL_STATE = options.SQL_STATE || fixedValues.sqlState.sqlInsert;
        this.BA_NO = options.BA_NO || 0;
        this.BA_NAME = options.BA_NAME || null;
        this.ACC_NO = options.ACC_NO || null;
        this.ACC_NAME = options.ACC_NAME || null;
        this.ACC_CODE = options.ACC_CODE || null;
        this.V_ID = options.V_ID || null;
        this.V_NO = options.V_NO || null;
        this.COST_NO = options.COST_NO || null;
        this.COST_NAME = options.COST_NAME || null;
        this.CHEQUE_NO = options.CHEQUE_NO || null;
        this.BANK_NAME = options.BANK_NAME || null;
    }
}
