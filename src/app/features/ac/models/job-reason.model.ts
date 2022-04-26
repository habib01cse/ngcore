import { BaseEntity } from '../../../core/models/base-entity';

export class JobReason extends BaseEntity {

	REASON_NO: number;
	REASON: string;
	DESCR: string;	
	_PK:string;
    _ID:string;
	constructor(options: any = {}) {
		/// Call the Base Entity Class
		super(options);

		/// JobReason class attribute
		this.REASON_NO = options.REASON_NO || (options.REASON_NO === 0 ? 0 : null);
		this.REASON = options.REASON || '';
		this.DESCR = options.DESCR || '';
		this._PK = "REASON_NO";
        this._ID = "REASON_ID";				
	}
}

