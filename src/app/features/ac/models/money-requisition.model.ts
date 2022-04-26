
import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class MoneyRequisition extends BaseEntity {

 
    MONEYREQ_ID: string;
    REQ_FROM : string;
    JOBTITLE : string;
    PHONE_MOBILE : string;
    COST_NAME : string;
    BU_NAME : string;
    PAYMENT_TYPE : string;
    PRIORITY_LEVEL : string;
    FROM_BU_NAME : string;
    REQ_BY_NAME : string;
    REQ_BY : number;
    EMP_NAME : string;
    CUR_NAME : string;
    APP_STATUS : string;
    C_NAME : string;
    DESCRIPTION : string;
    MONEYREQ_NO : number;
    TO_BU_NAME : string;
    REQ_DATE : Date;
    EXPECTED_DATE : Date;
    EXPIRED_DATE : Date;
    REQ_TO: number;
    EMP_NO: number;
    BU_NO: number;
    PAYMENT_DAYS: number;
    EXCHANGE_RATE: number;
    CUR_NO: number;
    COST_NO : number;
    STATUS_NO : number;
    POSSIBLE_ADJDATE : Date;
    PREQ_LIST : string;
    PR_UNADJUSTED : number;
    CONDITIONS:string;
    APPROVE_FLAG: any;
    GRAND_TOTAL: number;
    STAT: string;
    _PK: string;
    _ID: string;
    

    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);
        /// CostCenter class attribute

        this.MONEYREQ_ID = options.MONEYREQ_ID || '';
        this.REQ_FROM = options.REQ_FROM  || '';
        this.JOBTITLE = options.JOBTITLE  || '';
        this.PHONE_MOBILE = options.PHONE_MOBILE  || '';
        this.FROM_BU_NAME = options.FROM_BU_NAME  || '';
        this.BU_NAME = options.BU_NAME  || '';
        this.PAYMENT_TYPE = options.PAYMENT_TYPE  || '';
        this.PRIORITY_LEVEL = options.PRIORITY_LEVEL  || '';
        this.REQ_BY_NAME = options.REQ_BY_NAME  || '';
        this.APP_STATUS = options.APP_STATUS  || '';
        this.EMP_NAME = options.EMP_NAME  || '';
        this.CUR_NAME = options.CUR_NAME  || '';
        this.C_NAME = options.C_NAME  || '';
        this.TO_BU_NAME = options.TO_BU_NAME  || '';
        this.DESCRIPTION = options.DESCRIPTION  || '';
        this.REQ_DATE = options.REQ_DATE ? new Date(options.REQ_DATE) : null;
        this.EXPECTED_DATE = options.EXPECTED_DATE ? new Date(options.EXPECTED_DATE) : null;
        this.POSSIBLE_ADJDATE = options.POSSIBLE_ADJDATE ? new Date(options.POSSIBLE_ADJDATE) : null;
        this.EXPIRED_DATE = options.EXPIRED_DATE ? new Date(options.EXPIRED_DATE) : null;
        this.COST_NAME = options.COST_NAME  || '';
        this.PREQ_LIST = options.PREQ_LIST  || '';
        
        this.REQ_TO = options.REQ_TO  || null;
        this.STATUS_NO  = options.STATUS_NO   || null;
        this.MONEYREQ_NO = options.MONEYREQ_NO  || null;
        this.EXCHANGE_RATE = options.EXCHANGE_RATE  || null;
        this.REQ_BY = options.REQ_BY  || null;
        this.CUR_NO = options.CUR_NO  || null;
        this.EMP_NO = options.EMP_NO  || null;
        this.PAYMENT_DAYS = options.PAYMENT_DAYS  || null;
        this.COST_NO = options.COST_NO  || null;
        this.BU_NO = options.BU_NO  || null;
        this.PR_UNADJUSTED = options.PR_UNADJUSTED  || null;
        this.CONDITIONS = options.CONDITIONS  || '';
        this.GRAND_TOTAL = options.GRAND_TOTAL || null;
        this.APPROVE_FLAG = options.APPROVE_FLAG  || '';
        this.STAT = options.STAT  || '';

        
        this._PK = "MONEYADJUST_NO";
        this._ID = "MONEYADJUST_ID";
    }
}
