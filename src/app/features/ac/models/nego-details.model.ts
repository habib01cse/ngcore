import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class NegoDetails extends BaseEntity{
    DOC_ID: string;
    DOC_NO: number;
    DOC_REF_ID: string;
    NEGODOCDTL_NO: number;
    NEGOTIATION_NO: number;
    MATURITY_DATE: any;
    DELAYED_DAY: number;

    TOTAL_BASE_VALUE: number;
    TOTAL_VALUE: number;

    constructor(options: any = {}) {
        super();
        this.SQL_STATE = options.SQL_STATE || fixedValues.sqlState.sqlInsert;
        
        this.DOC_ID = options.DOC_ID || '';
        this.DOC_NO = options.DOC_NO || null;
        this.DOC_REF_ID = options.DOC_REF_ID || '';
        this.NEGODOCDTL_NO = options.NEGODOCDTL_NO || null;
        this.NEGOTIATION_NO = options.NEGOTIATION_NO || null;
        this.MATURITY_DATE =  options.MATURITY_DATE ? new Date(options.MATURITY_DATE) : null; 
        this.DELAYED_DAY =  options.DELAYED_DAY || null; 
        this.TOTAL_BASE_VALUE = options.TOTAL_BASE_VALUE || null;
        this.TOTAL_VALUE = options.TOTAL_VALUE || null;
    }
}
