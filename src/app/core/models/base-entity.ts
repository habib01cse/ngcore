import { fixedValues } from "src/app/shared/constants/fixed-values.enum";

/**
 * This is a base Interface is implememnted by all models.
 */
export class BaseEntity {
    SQL_STATE: number;
    PS_NODE_ID: number;
    SS_CREATOR: number;
    SS_CREATED_ON: string;
    SS_MODIFIER: number;
    SS_MODIFIED_ON: string;
    SS_OG_NO: number;
    COMPANY_NO: number;
    SS_UPLOADED_ON: string;
    SS_IS_DELETED: number;
    SS_IS_UPLOADED: number;
    _PK:string;
    _ID:string;
    constructor(options: any = {}) {
        this.PS_NODE_ID = (options.PS_NODE_ID===null || options.PS_NODE_ID=== undefined)?null: options.PS_NODE_ID;
        this.SQL_STATE = options.SQL_STATE || (options.SQL_STATE === fixedValues.sqlState.sqlUnchange ? fixedValues.sqlState.sqlUnchange : fixedValues.sqlState.sqlInsert);
    }
}
