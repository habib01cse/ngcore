

export class InvoiceStatus {

    public BILL_DATE: string;
    public BILL_ID: string;
    public CUR_ID: string;
    public EMP_NAME_ID: string;
    public EXCHANGE_RATE: number;
    public GL_POSTING_DATE: Date;
    public GRAND_TOTAL: number;
    public PURCONTRACT_DATE: Date;
    public PURDOCUMENT_ID: string;
    public SUPPLIER: string;
    public TRN_DATE: Date;
    public TRN_ID: string;
    public V_ID: string;
    public V_NO: string;
    public BILL_NO: number;
    public WO_NO : number;
    public PURCONTRACT_NO: number;
    public CONTRACT_NO: number;

    constructor(options: any = {}) {
        /// Call the Base Entity Class
        // super();

        /// RepSetUp class attribute
        this.BILL_DATE = options.BILL_DATE || '';
        this.BILL_ID = options.BILL_ID || '';
        this.CUR_ID = options.CUR_ID || '';
        this.BILL_NO = options.BILL_NO || null;
        this.WO_NO = options.WO_NO || null;
        this.PURCONTRACT_NO = options.PURCONTRACT_NO || null;
        this.CONTRACT_NO = options.CONTRACT_NO || null;
        // this.EMP_NAME_ID = options.EMP_NAME_ID ? new Date(options.EMP_NAME_ID): null;
        this.EMP_NAME_ID = options.EMP_NAME_ID || '';
        this.EXCHANGE_RATE = options.EXCHANGE_RATE || null;
        this.GL_POSTING_DATE = options.GL_POSTING_DATE ? new Date(options.GL_POSTING_DATE) : null;
        this.GRAND_TOTAL = options.GRAND_TOTAL || null;
        this.PURCONTRACT_DATE = options.PURCONTRACT_DATE ? new Date(options.PURCONTRACT_DATE) : null;
        this.PURDOCUMENT_ID = options.PURDOCUMENT_ID || '';
        this.SUPPLIER = options.SUPPLIER || '';
        this.TRN_DATE = options.TRN_DATE ? new Date(options.TRN_DATE) : null;
        this.TRN_ID = options.TRN_ID || '';
        this.V_ID = options.V_ID || '';
        this.V_NO = options.V_NO || '';
    }
}

