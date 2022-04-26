import { BaseEntity } from "src/app/core/models/base-entity";
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';

export class Role extends BaseEntity {
    ROLE_NAME: string;
    ACTIVE_STAT: number;
    COMPANY_NO:number;
    DESCR: string;
    ROLE_ID: number;
    ROLE_NO:number;
    MENU_NO:number;
    SUBMENU_TYPE:string;
    LIST_MENU:string;
    PS_NODE_ID:number;
    SQL_STATE:number;
    


    constructor(options: any = {}) {

        super();
        this.ACTIVE_STAT = options.ACTIVE_STAT || null;
        
        this.DESCR = options.DESCR || '';
        this.ROLE_ID = options.ROLE_ID || null;
        this.ROLE_NAME = options.ROLE_NAME || '';
        this.SUBMENU_TYPE = options.SUBMENU_TYPE || '';
        this.LIST_MENU = options.LIST_MENU || '';
        this.ROLE_NO = options.ROLE_NO || null;
        this.MENU_NO = options.MENU_NO || null;
        this.COMPANY_NO = options.COMPANY_NO || null;
        this.PS_NODE_ID = options.PS_NODE_ID || null;
        this.SQL_STATE = options.SQL_STATE || null;
    
    }
} 