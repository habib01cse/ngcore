import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { QJournalDtls } from './q-journam-dtl.model';

export class QJournalSetup {

    DESCR: string;
    QJ_NAME: string;
    QJ_NO: number;
    TYPE_NAME: string;
    V_DATE: Date;
    V_ID: string;
    SQL_STATE: number
    VTYPE_NO: number;
    qJournalDtls: QJournalDtls[];

    constructor(options: any = {}) {

        /// RepSetUp class attribute
        this.V_ID = options.V_ID || '';
        this.V_DATE = (options.V_DATE) ? new Date(options.V_DATE) : null;
        this.TYPE_NAME = options.TYPE_NAME || '';
        this.QJ_NO = options.QJ_NO || null;
        this.QJ_NAME = options.QJ_NAME || '';
        this.DESCR = options.DESCR || ''; 
        this.VTYPE_NO = parseInt(options.VTYPE_NO) || null;
        this.qJournalDtls = (options.qJournalDtls)?options.qJournalDtls: new Array<QJournalDtls>();
        this.SQL_STATE = options.SQL_STATE || fixedValues.sqlState.sqlInsert;

        // qJournalDtls
    }
}

