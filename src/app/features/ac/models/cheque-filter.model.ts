export class ChequeFilter {
    FILTER_OPTION: any;
    ACC_NO: number;
    ACC_NAME: string;
    STATUS: number;
    CHEQUE_NO: any;
    CHEQUE_NO_ALL: number;
    CHEQUE_DATE_FORM:any
    CHEQUE_DATE_TO:any
    PREPARE_DATE_FORM:any
    PREPARE_DATE_TO:any
    RB_POST:any
    DATE_TYPE:string
    ACC_CODE: string

    constructor(options: any = {}) {

        /// RepSetUp class attribute
        this.FILTER_OPTION = options.FILTER_OPTION || null;;
        this.ACC_NO = options.ACC_NO || null;
        this.ACC_NAME = options.ACC_NAME || '';
        this.STATUS = options.STATUS || null;
        this.CHEQUE_NO = options.CHEQUE_NO || null;
        this.CHEQUE_NO_ALL = options.CHEQUE_NO_ALL || null;
        this.CHEQUE_DATE_FORM = (options.CHEQUE_DATE_FORM) ? new Date(options.CHEQUE_DATE_FORM) : null;
        this.CHEQUE_DATE_TO = (options.CHEQUE_DATE_TO) ? new Date(options.CHEQUE_DATE_TO) : null;
        this.PREPARE_DATE_FORM = (options.PREPARE_DATE_FORM) ? new Date(options.PREPARE_DATE_FORM) : null;
        this.PREPARE_DATE_TO = (options.PREPARE_DATE_TO) ? new Date(options.PREPARE_DATE_TO) : null;
        this.RB_POST = options.RB_POST || null;
        this.DATE_TYPE = options.DATE_TYPE || null;
        this.ACC_CODE = options.ACC_CODE || '';
    }
}

