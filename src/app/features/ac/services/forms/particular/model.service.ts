/* angular stuff */
import { Injectable } from '@angular/core';
import { Bank } from '../../../models/bank.model';
import { BankDtl } from '../../../models/bank-dtl.model';
import { DataService } from './data.service';


/* 3rd party libraries */ 
import * as $ from 'jquery';
import { forkJoin } from 'rxjs';
import { CommonService } from '../../common.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { globalVariables } from 'src/app/core/constants/globalVariables';
import { ReportSetUp } from '../../../models/repsetup.model';
import { ReportSetUpDetails } from '../../../models/report-set-up-details.model';
import { BankName } from '../../../models/bank-info.model';
import { ChequeBook } from '../../../models/cheque-book.model';
import { ChequeBookList } from '../../../models/cheque-book-list.model';
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import { UserPrivileges } from 'src/app/core/models/user-privileges';

@Injectable({
    providedIn: 'root'
})
export class ModelService {

   public userPrivilege: UserPrivileges;
   particularList:any = [];

    constructor(
        private apiService: DataService,

    ) 
    {
        this.userPrivilege = new UserPrivileges();
    }

    



}
