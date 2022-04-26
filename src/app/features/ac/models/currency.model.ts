export class Currency {
    CUR_NO: number;
    CUR_NAME: string;
    CUR_ID: string;
    SYMBOL: string;
    ISO_CODE: string;
    BASE_FLAG: string;
    UNIT_NAME: string;
    BASE_FLAG_LC: number;

    constructor(options: any = {}) {
        this.CUR_NO = options.CUR_NO;
        this.CUR_NAME = options.CUR_NAME;
        this.CUR_ID = options.CUR_ID;
        this.SYMBOL = options.SYMBOL;
        this.ISO_CODE = options.ISO_CODE;
        this.BASE_FLAG = options.BASE_FLAG;
        this.UNIT_NAME = options.UNIT_NAME;
        this.BASE_FLAG_LC = options.BASE_FLAG_LC;
    }
}