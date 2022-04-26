import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class QJournalDtls extends BaseEntity{

     QJDTL_NO: number;
     QJDTL_ID: string;
     QJ_NO: number;
     ACC_NO: number;
     ACC_NAME: string;
     NARRATION: string;
     DR: number;
     CR: number;
     COST_NO: number;
     COST_NAME: string;
     CUR_NO: number;
     EXCHANG_RATE: number;
     UPD_REC_FLG: number;
     REF_NO: number;
     REF_NAME: string;
     BA_NO: number; 
     DR_CR: string;
     BA_NAME: string; 
     DR_EX: number;
     CR_EX: number;
     CUR_NAME: string;
     DR_CR_TYPE: string;
     _PK:string;
     _ID:string;

    constructor(options: any = {}) {

        /// RepSetUp class attribute
        super(options);
        this.QJDTL_NO = options.QJDTL_NO || null;
        this.QJDTL_ID = options.QJDTL_ID || '';
        this.QJ_NO = options.QJ_NO || null;
        this.ACC_NO = options.ACC_NO || null;
        this.ACC_NAME = options.ACC_NAME || '';
        this.BA_NAME = options.BA_NAME || '';
        this.COST_NAME = options.COST_NAME || '';
        this.REF_NAME = options.REF_NAME || '';
        this.NARRATION = options.NARRATION || '';
        this.CUR_NAME = options.CUR_NAME || '';
        this.DR = options.DR || null;
        this.CR = options.CR || null;
        this.COST_NO = options.COST_NO || null;
        this.CUR_NO = options.CUR_NO || 1;
        this.EXCHANG_RATE = options.EXCHANG_RATE || null;
        this.UPD_REC_FLG = options.UPD_REC_FLG || 0;
        this.REF_NO = options.REF_NO || null;
        this.BA_NO = options.BA_NO || null;
        this.DR_CR = options.DR_CR || "Dr";
        this.DR_EX = (options.DR_CR && options.DR_CR.toLowerCase() == 'dr')?(options.DR * options.EXCHANG_RATE):null;
        this.CR_EX = (options.DR_CR && options.DR_CR.toLowerCase() == 'cr')?(options.CR * options.EXCHANG_RATE):null;
        this.DR_CR_TYPE = options.DR_CR_TYPE ? options.DR_CR_TYPE.toLowerCase() == 'dr' ? "DR" : "CR" : "DR";
        this._PK = "QJDTL_NO";
        this._ID = "QJDTL_ID";
        // qJournalDtls
    }
}

