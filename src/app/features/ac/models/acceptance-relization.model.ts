

export class AcceptanceRelization {

    ACCEPTANCE_DATE: string;
    ACCEPT_AMOUNT: number;
    BILL_DATE: Date;
    BILL_ID: string;
    COST_NAME: string;
    CUR_ID: string;
    EXCHANGE_RATE: number
    GL_POSTING_DATE: Date;
    LC_DATE: Date;
    PURCONTRACT_NO: number;
    PURDOCUMENT_ID: string;
    SUPPLIER: string;
    V_ID: string;
    EMP_NAME_ID: string;
    V_NO: string;

    constructor(options: any = {}) {
        /// Call the Base Entity Class
        // super();

        /// RepSetUp class attribute
        this.ACCEPTANCE_DATE = options.ACCEPTANCE_DATE || '';
        this.ACCEPT_AMOUNT = options.ACCEPT_AMOUNT || null;
        this.BILL_DATE = options.BILL_DATE ? new Date(options.BILL_DATE): null;
        this.BILL_ID = options.BILL_ID || '';
        this.COST_NAME = options.COST_NAME || null;
        this.GL_POSTING_DATE = options.GL_POSTING_DATE ? new Date(options.GL_POSTING_DATE) : null;
        this.CUR_ID = options.CUR_ID || null;
        this.EXCHANGE_RATE = options.EXCHANGE_RATE || null;
        this.LC_DATE = options.LC_DATE ? new Date(options.LC_DATE) : null;
        this.PURCONTRACT_NO = options.PURCONTRACT_NO || null;
        this.PURDOCUMENT_ID = options.PURDOCUMENT_ID || '';
        this.SUPPLIER = options.SUPPLIER || '';
        this.V_ID = options.V_ID || '';
        this.EMP_NAME_ID = options.EMP_NAME_ID || '';
        this.V_NO = options.V_NO || '';

    }
}

