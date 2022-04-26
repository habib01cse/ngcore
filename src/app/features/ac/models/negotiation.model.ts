import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { Negofund } from './negofund.model';
import { NegoDetails } from './nego-details.model';

export class Negotiation extends BaseEntity{
    DOC_AMENDMENT: string;
    CUSTOMER_NAME: string;
    COST_NO: number;
    SALESCONTRACT_NO: number;
    NEG_CURRENCY_NO: number; 

    EXCHANGE_RATE: number;
    CUSTOMER_NO: number;
    COST_NAME: string;
    OWN_BANKDTL_NO: number;
    CUR_NO: number;

    NEG_CURRENCY: string;
    C_NAME: string;
    CURRENCY: string;
    NEG_AMT: number;
    BANK_REF_NO: string;
    NEGOTIATION_DATE: Date;

    NEG_EXCHANGE_RATE: number;
    NEGOTIATION_DESCR: string;
    DISPLAY: string;
    RISD_AMT: number;
    REALIZATION_DATE: Date;

    GL_POST_REALDATE: Date;
    CURRENCY_NO: number;
    APPLICATION_DATE: Date;
    FILE_NAME: string;

    GR_FLAG: number;
    LC_VALUE: number;
    NEGOTIATION_NO: number;
    NEGO_ATTACHME: number;
    NEGO_VNO: number;

    NEGO_V_ID_MODULE: string;
    OWN_BANKDTL: string;
    PO_VALUE: number;
    REAL_CURRENC: string;
    TRN_TYPE: string;

    NEG_BASE_AMT:number;
    REAL_V_ID_MODULE:string;
    VTYPE_NO:string;
    V_ID:string;
    V_NO:number;

    REAL_CURRENCY:string;
    NEG_CURRENC:string;
    MODULE:string;
    GL_POST_NEGODATE:Date;
    NEG_RISD_AMT:number;

    ACC_NO:number;
    VOUCHER_POST_FLAG:any;
    GL_CHECK:number;
    AMOUNT_IN_TK:number;
    NEGO_ATTACHMENT:string;

    LOAN_TYPE:string;
    PCT_OF:number;
    BANKREF_LIST: string;

    negoFundList:Array<Negofund>;
    negoDtl:Array<NegoDetails>;


    constructor(options: any = {}) {
        super(options);
        //this.SQL_STATE = options.SQL_STATE || fixedValues.sqlState.sqlInsert;

        this.DOC_AMENDMENT = options.DOC_AMENDMENT || '';
        this.CUSTOMER_NAME = options.CUSTOMER_NAME || '';
        this.COST_NO = options.COST_NO || null;
        this.SALESCONTRACT_NO = options.SALESCONTRACT_NO || null;
        this.NEG_CURRENCY_NO = options.NEG_CURRENCY_NO || null;

        this.EXCHANGE_RATE = options.EXCHANGE_RATE || null;
        this.CUSTOMER_NO = options.CUSTOMER_NO || null;
        this.COST_NAME = options.COST_NAME || '';
        this.OWN_BANKDTL_NO  = options.OWN_BANKDTL_NO  || null;
        this.CUR_NO  = options.CUR_NO  || null;

        this.C_NAME  = options.C_NAME  || null;
        this.NEG_CURRENCY  = options.NEG_CURRENCY  || '';
        this.CURRENCY  = options.CURRENCY  || '';
        this.NEG_AMT  = options.NEG_AMT  || null;
        this.BANK_REF_NO  = options.BANK_REF_NO  || '';
        this.NEGOTIATION_DATE  = options.NEGOTIATION_DATE ? new Date(options.NEGOTIATION_DATE) : null; 

        this.NEG_EXCHANGE_RATE  = options.NEG_EXCHANGE_RATE || null;
        this.NEGOTIATION_DESCR  = options.NEGOTIATION_DESCR || '';
        this.DISPLAY  = options.DISPLAY || '';
        this.RISD_AMT  = options.RISD_AMT || null;
        this.REALIZATION_DATE  = options.REALIZATION_DATE ? new Date(options.REALIZATION_DATE) : null;

        this.GL_POST_REALDATE  = options.GL_POST_REALDATE ? new Date(options.GL_POST_REALDATE) : null;
        this.CURRENCY_NO  = options.CURRENCY_NO  || null;
        this.APPLICATION_DATE  = options.APPLICATION_DATE ? new Date(options.APPLICATION_DATE) : null;
        
        this.FILE_NAME  = options.FILE_NAME || '';

        this.GR_FLAG  = options.GR_FLAG || null;
        this.LC_VALUE  = options.LC_VALUE || null;
        this.NEGOTIATION_NO  = options.NEGOTIATION_NO || null; 
        this.NEGO_ATTACHME  = options.NEGO_ATTACHME || '';
        this.NEGO_VNO  = options.NEGO_VNO || null;

        this.NEGO_V_ID_MODULE  = options.NEGO_V_ID_MODULE || '';
        this.OWN_BANKDTL  = options.OWN_BANKDTL || '';
        this.PO_VALUE  = options.PO_VALUE || null;
        this.REAL_CURRENC  = options.REAL_CURRENC || '';
        this.TRN_TYPE  = options.TRN_TYPE || '';

        this.NEG_BASE_AMT  = options.NEG_BASE_AMT || null;
        this.REAL_V_ID_MODULE  = options.REAL_V_ID_MODULE || '';
        this.VTYPE_NO  = options.VTYPE_NO || '';
        this.V_ID  = options.V_ID || '';
        this.V_NO  = options.V_NO || null;

        this.REAL_CURRENCY  = options.REAL_CURRENCY || '';
        this.NEG_CURRENC  = options.NEG_CURRENC || '';
        this.MODULE  = options.MODULE || '';
        this.GL_POST_NEGODATE  = options.GL_POST_NEGODATE ? new Date(options.GL_POST_NEGODATE) : null;
        this.NEG_RISD_AMT = options.NEG_RISD_AMT || null;

        this.ACC_NO = options.ACC_NO || null;
        this.VOUCHER_POST_FLAG = options.VOUCHER_POST_FLAG || false;
        this.GL_CHECK = options.GL_CHECK || 0;
        this.AMOUNT_IN_TK = options.AMOUNT_IN_TK || null;
        this.NEGO_ATTACHMENT = options.NEGO_ATTACHMENT || '';

        this.LOAN_TYPE = options.LOAN_TYPE || '';
        this.PCT_OF = options.PCT_OF || (options.PCT_OF === 0 ? 0 : null);
        this.BANKREF_LIST = options.BANKREF_LIST || '';

        this.negoFundList = options.negoFundList || [];
        this.negoDtl = options.negoDtl || [];
        
    }
}
