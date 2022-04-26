import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class Negofund extends BaseEntity{
    ACC_NO: number;
    NEGOTIATION_NO: number;
    ACC_NAME: string;
    COST_NO: number;
    COST_NAME: string;
    BA_NO: number;

    BA_NAME: string;
    CURRENCY_NO: number;
    C_NAME: string;
    EXCHANGE_RATE: number;
    DR: number;

    CR: number;
    CR_E: number;
    DR_E: number;
    FUND_DISTRIBUTION_NO: number;
    PROMPT: string;

    constructor(options: any = {}) {
        super(options);
       
        this.ACC_NO = options.ACC_NO || null;
        this.NEGOTIATION_NO = options.NEGOTIATION_NO || null;
        this.ACC_NAME = options.ACC_NAME || '';
        this.COST_NO = options.COST_NO || null;
        this.COST_NAME = options.COST_NAME || '';
        this.BA_NO = options.BA_NO || null;

        this.BA_NAME = options.BA_NAME ||'';
        this.CURRENCY_NO = options.CURRENCY_NO || 0;
        this.C_NAME = options.C_NAME || '';
        this.EXCHANGE_RATE  = options.EXCHANGE_RATE || null;
        this.DR  = options.DR || null;
        
        this.CR  = options.CR || null;
        this.CR_E  = options.CR_E || (options.CR_E === 0 ? 0 : null);
        this.DR_E  = options.DR_E || (options.DR_E === 0 ? 0 : null);
        this.FUND_DISTRIBUTION_NO  = options.FUND_DISTRIBUTION_NO || null;
        this.PROMPT  = options.PROMPT || "Dr";
    }
}
