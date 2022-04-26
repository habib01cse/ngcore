import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class BankReconciled {

    P_BA_SUMCR: number;  
    P_BA_SUMDR: number;  
    P_BK_BAL: number; 
    P_BK_NOT_BAL: number;  
    P_BK_SUMCR: number;  
    P_BK_SUMDR: number;  
    P_CR_DIFF: number;  
    P_DR_DIFF: number; 
    P_SUM_BAL: number;  
    P_STATEMENT1: number;  
    P_STATEMENT2: number;  
    P_STATEMENT_BALANCE: number;  
    P_DIFF_STATEMENT: number;  
    P_CLOSING_BALANCE: number; 
    P_OPENING_BALANCE: number;   
    P_PARTICULAR: string;   
     IS_UN_RECONCILED_RECORD: number;
    constructor(options: any = {}) {
        /// Call the Base Entity Class
        // super();

        /// RepSetUp class attribute
        this.P_BA_SUMCR = options.P_BA_SUMCR ||null;
        this.P_BA_SUMDR = options.P_BA_SUMDR || null;
        this.P_BK_BAL = options.P_BK_BAL || null;
        this.P_BK_NOT_BAL = options.P_BK_NOT_BAL || null;
        this.P_BK_SUMCR = options.P_BK_SUMCR || null;
        this.P_BK_SUMDR = options.P_BK_SUMDR || null;
        this.P_CR_DIFF = options.P_CR_DIFF || null;
        this.P_DR_DIFF = options.P_DR_DIFF || null;
        this.P_SUM_BAL = options.P_SUM_BAL || null; 

        this.P_STATEMENT1 = options.P_STATEMENT1 || null;
        this.P_STATEMENT2 = options.P_STATEMENT2 || null; 
        this.P_DIFF_STATEMENT = options.P_DIFF_STATEMENT || null; 
        this.P_CLOSING_BALANCE = options.P_CLOSING_BALANCE || null; 
        this.P_OPENING_BALANCE = options.P_OPENING_BALANCE || null; 
        this.P_PARTICULAR = options.P_PARTICULAR || null; 
        this.IS_UN_RECONCILED_RECORD = options.IS_UN_RECONCILED_RECORD || 0;
        
    }
}

