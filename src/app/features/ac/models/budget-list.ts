import { BaseEntity } from "src/app/core/models/base-entity";

export class BudgetList extends BaseEntity{
    ACC_NAME: string;
    TITLE: string;
    APPROVE_AMT: number;
    CONSUMED_AMT: number;
    BALANCE_AMT: number;
    Q_BALANCE: number;
    constructor(options: any = {}) {
        super(options);
        this.ACC_NAME = options.ACC_NAME || '';
        this.TITLE = options.TITLE || '';
        this.APPROVE_AMT = options.APPROVE_AMT || null;
        this.CONSUMED_AMT = options.CONSUMED_AMT || null;
        this.BALANCE_AMT = options.BALANCE_AMT || null;
        this.Q_BALANCE = options.Q_BALANCE || null;
    }
}
