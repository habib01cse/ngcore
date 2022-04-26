import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class ChequeAuthoritySetup extends BaseEntity{
    EMP_NO: number;
    EMP_NAME_ID: string;
    JOBTITLE: string;
    PAY_TO_NAME: string;
    LBL_ACC: string;
    ACC_NO: number;
    ACC_NAME: string;
    LBL_COST: number;
    COST_NAME: string;
    LBL_BA: string;
    BA_NO: number;
    BA_NAME: string;
    DESCR: string;
    CHECK_AMT: number;
    CTRL_AMT: number;
    CTRL_PATH: string;
    SPELLOUT: string;
    //CHECK_AMT: string;
    STATUS: string;
    CHECK_STAT_NO: number;
    CHEQUE_AUTHO_NO: number;
 
    constructor(options: any = {}) {
        super(options);
        this.EMP_NO = options.EMP_NO || null;
        this.EMP_NAME_ID = options.EMP_NAME_ID || '';
        this.JOBTITLE = options.JOBTITLE || '';
        this.PAY_TO_NAME = options.PAY_TO_NAME || '';
        this.LBL_ACC = options.LBL_ACC || '';
        this.ACC_NO = options.ACC_NO || null;
        this.ACC_NAME = options.ACC_NAME || '';
        this.LBL_COST = options.LBL_COST || null;
        this.COST_NAME = options.COST_NAME || '';
        this.LBL_BA = options.LBL_BA || '';
        this.BA_NO = options.BA_NO || null;
        this.BA_NAME = options.BA_NAME || '';
        this.DESCR = options.DESCR || '';
        this.CHECK_AMT = options.CHECK_AMT || null;
        this.CTRL_AMT = options.CTRL_AMT || null;
        this.CTRL_PATH = options.CTRL_PATH || '';
        this.SPELLOUT = options.SPELLOUT || '';
        //this.CHECK_AMT = options.CHECK_AMT || '';
        this.STATUS = options.STATUS || '';
        this.CHECK_STAT_NO = options.CHECK_STAT_NO || null;
        this.CHEQUE_AUTHO_NO = options.CHEQUE_AUTHO_NO || null;

    }
}

