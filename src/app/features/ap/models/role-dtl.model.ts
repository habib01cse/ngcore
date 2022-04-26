
import { NumberFilter } from "@ag-grid-community/core";
import { BaseEntity } from "src/app/core/models/base-entity";

export class RoleDtl extends BaseEntity {
    SUBMENU_NO : number;
    SUBMENU_NAME:string;
    CAN_VIEW: number;
    CAN_CREATE: number;
    CAN_MODIFY:number;
    CAN_REMOVE:number;
    COMPANY_NO:number;
    HIDE_FROM_MENU:number;
    PS_NODE_ID:number;
    ROLEDTL_NO:number;
    ROLE_NO:number;
    SQL_STATE:number;

    constructor(options: any = {}) {

        super();
        this.SUBMENU_NO = options.SUBMENU_NO || null;
        
        this.SUBMENU_NAME = options.SUBMENU_NAME || '';
        this.CAN_VIEW = options.CAN_VIEW || null;
        this.CAN_CREATE = options.CAN_CREATE || null;
        this.CAN_MODIFY = options.CAN_MODIFY || null;
        this.CAN_REMOVE = options.CAN_REMOVE || null;
        this.COMPANY_NO = options.COMPANY_NO || null;
        this.HIDE_FROM_MENU = options.HIDE_FROM_MENU || null;
        this.PS_NODE_ID = options.PS_NODE_ID || null;
        this.ROLEDTL_NO = options.ROLEDTL_NO || null;
        this.ROLE_NO = options.ROLE_NO || null;
        this.SQL_STATE = options.SQL_STATE || null;
        
    
    }



    
}