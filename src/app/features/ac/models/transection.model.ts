import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class Transaction {
  
    public COMPANY_NAME: string;
    public COST_CENTER: string;
    public DESCR: string;
    public ORDER_TYPE: string;
    public POSTED_BY: string;
    public REF_COMPANY_NAME: string;
    public REQ_ID: string;
    public SO_ID: string;
    public STORE: string;
    public TRANSACTION_TYPE: string;
    public TRN_DATE: Date;
    public TRN_ID: string;
    public TRN_NO: number;
    public TRN_TYPE: string;
    public V_ID: string;
    public V_NO: string;
    public WO_ID: string;
    public WO_TYPE: string;
    public CURR_BU: string;
    public POST_BY: string;
    public POST_DATE: Date;
    public POST_FLAG: number;
    public SHORT_TRN_ID: string;
    public REF_BU_NAME:any

    constructor(options: any = {}) {

       this.COMPANY_NAME = options.COMPANY_NAME || '';
       this.COST_CENTER = options.COST_CENTER || '';
       this.DESCR = options.DESCR || '';
       this.ORDER_TYPE = options.ORDER_TYPE || '';
       this.POSTED_BY = options.POSTED_BY || '';
       this.POST_BY = options.POST_BY || '';
       this.CURR_BU = options.CURR_BU || '';
       this.REF_COMPANY_NAME = options.REF_COMPANY_NAME || '';
       this.REQ_ID = options.REQ_ID || '';
       this.SO_ID = options.SO_ID || '';
       this.STORE = options.STORE || '';
       this.TRANSACTION_TYPE = options.TRANSACTION_TYPE || '';
       this.TRN_DATE = options.TRN_DATE || '';
       this.TRN_ID = options.TRN_ID || '';
       this.TRN_NO = options.TRN_NO || '';
       this.TRN_TYPE = options.TRN_TYPE || '';
       this.V_ID = options.V_ID || '';
       this.V_NO = options.V_NO || '';
       this.WO_ID = options.WO_ID || '';
       this.WO_TYPE = options.WO_TYPE || '';
       this.POST_DATE = options.POST_DATE ? new Date(options.POST_DATE) : null;
       this.POST_FLAG = options.POST_FLAG || null;
       this.SHORT_TRN_ID = options.SHORT_TRN_ID || '';
       this.REF_BU_NAME=options.REF_BU_NAME || null;
    }
}
