import { BaseEntity } from 'src/app/core/models/base-entity';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { ReportSetUpDetails } from './report-set-up-details.model';

export class ReportSetUp extends BaseEntity {
 
    RP_NO: number;
    RP_NAME: string;
    DESCR: string;
    DESCR_BACKUP: string;
    REP_TYPE : string;
    RepositoryDtlList:ReportSetUpDetails[];

    constructor(options: any = {}) {
        /// Call the Base Entity Class
        super(options);

        /// RepSetUp class attribute
        this.RP_NO = options.RP_NO || null;
        this.RP_NAME = options.RP_NAME || null;
        this.DESCR = options.DESCR || null;
        this.REP_TYPE = options.REP_TYPE || '';
        this.RepositoryDtlList = (options.RepositoryDtlList)?options.RepositoryDtlList: new Array<ReportSetUpDetails>();
    }
}

