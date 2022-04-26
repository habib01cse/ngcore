import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
/**
 * Model of AC_1012 Accounts Category
 */

export class Company extends BaseEntity {
    COMPANY_NO: number;
    COMPANY_NAME: string;
    IS_CHECKED: boolean;
    USER_NAME: string;
    COMPANY_WEBSITE: string;

    constructor(options: any = {}) {
        super();

        this.COMPANY_NO = options.COMPANY_NO || 0;
        this.COMPANY_NAME = options.COMPANY_NAME || null;
        this.IS_CHECKED = options.IS_CHECKED || false;
        this.USER_NAME = options.USER_NAME || null;
        this.COMPANY_WEBSITE = options.COMPANY_WEBSITE || null;
    }
}
