import { BaseEntity } from "src/app/core/models/base-entity";

export class BudgetDtl extends BaseEntity {
    ACC_NAME: string;
    APPROVE_AMT: number;
    CONSUMED_AMT: number;
    BALANCE_AMT: number;
    constructor(options: any = {}) {
        super(options);
        this.ACC_NAME = options.ACC_NAME;
        this.APPROVE_AMT = options.APPROVE_AMT;
        this.CONSUMED_AMT = options.CONSUMED_AMT;
        this.BALANCE_AMT = options.BALANCE_AMT;
    }
}
