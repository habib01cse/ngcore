/* angular stuff */
import { Injectable } from '@angular/core';

/* 3rd party libraries */


/* our own stuff */
import { CommonModel } from 'src/app/shared/models/common-model';
import { VoucherType } from '../../../models/voucher-type.model';
import { HeadIdentity } from '../../../models/head-identity.model';
import { Post } from '../../../models/model.post';
import { Config } from '../../../models/config.model';
import { LangService } from 'src/app/core/services/lang.service';
import { Nature } from '../../../models/nature.model';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { DataService } from './data.service';
import { DateService } from 'src/app/shared';
import { CommonService } from '../../common.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ModelService {
    public fixedValues = fixedValues;
    public accountCategoryList = new Array<Nature>();
    public accountCategoryListBackup = new Array<Nature>();
    public accountCategoryRemoveList = new Array<Nature>();
    public accountTypeList = [];
    public userPrivilege: UserPrivileges;

    constructor(public langService: LangService
        , private dataService: DataService
        , private comService: CommonService
        , private alertService: AlertService
        , private dateUtil: DateService
        , private toastr: ToastrService
        , private utilityService: UtilityService) {
        this.accountTypeList = this.utilityService.getEnumList(fixedValues.accountType);
        this.userPrivilege = new UserPrivileges();

    }

    // get account category
    public getAccountCategories(): void {
        this.dataService.getNatures().subscribe(
            results => {
                this.accountCategoryList = results.body;
                this.accountCategoryListBackup = JSON.parse(JSON.stringify(this.accountCategoryList));
            },
            err => {
                // Do stuff whith your error
                this.displayError(err);
            },
            () => {
                // Do stuff after completion
            });
    }    

    onClickAdNature(natureValidation) {
        if (natureValidation.validate().isValid) {
            this.accountCategoryList.push(new Nature({ SL_NO: (this.accountCategoryList.length + 1) }));
        } else return;
    }

    moveNature(arr, old_index, new_index) {
        while (old_index < 0) {
            old_index += arr.length;
        }
        while (new_index < 0) {
            new_index += arr.length;
        }
        if (new_index >= arr.length) {
            var k = new_index - arr.length;
            while ((k--) + 1) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        this.organizeNatureSerial();
        //  return arr;
    }

    removeNature(old_index) {       
        let removeObj = this.accountCategoryList.splice(old_index, 1)[0];
        removeObj.SQL_STATE = fixedValues.sqlState.sqlDelete;
        this.accountCategoryRemoveList.push(removeObj)
        this.organizeNatureSerial();        
    }

    organizeNatureSerial() {
        this.accountCategoryList.forEach((element, key) => {
            element.SL_NO = (key + 1);
        });
    }

    saveNatures() {
        //let passingObj = {};
        let accCatList = this.accountCategoryList.slice();       
        ///passingObj['accountCategories'] = accCatList.concat(this.accountCategoryRemoveList);

        let newObjArr = accCatList.concat(this.accountCategoryRemoveList);

        let bacupString = JSON.stringify(this.accountCategoryListBackup);
        let newString = JSON.stringify(accCatList.concat(this.accountCategoryRemoveList));       
        if( newString === bacupString ){
            this.toastr.info(this.langService.langData.noChangeFound, 'Info');
            return;
        }
       
        this.alertService.info(this.langService.langData.saveConfirmationMsg, true).then(data => {
            if (data) {
                this.dataService.saveNatures(accCatList.concat(this.accountCategoryRemoveList)).subscribe(result => {
                    this.getAccountCategories();
                    this.accountCategoryListBackup.length = 0;
                    this.accountCategoryListBackup = JSON.parse(JSON.stringify(this.accountCategoryList));
                    this.toastr.success(this.langService.langData.saveSuccessMsg,"Success");
                }, error => {
                    this.toastr.warning(this.langService.langData.saveFailedMsg, "Warning");
                });
            }
        })        
    }

    // displayError
    private displayError(ex): void {
        console.log(ex);
    }

}
