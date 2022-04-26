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
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { FormParam } from '../../../models/form-param';
import { ToastrService } from 'ngx-toastr';
import { LangService } from 'src/app/core/services/lang.service';

/* our own stuff */
function getMenu(parentID, data) {
    let fnData = data;
    return fnData.filter(function (node) {
        return (node.PARENT === parentID);
    }).map(function (node) {
        var exists = fnData.some(function (childNode) {
            return childNode.PARENT === node.BANK_NO;
        });
        var subMenu = (exists) ? '<ul class="dropdown">' + getMenu(node.BANK_NO, fnData).join('') + '</ul>' : "";
        let jsonData = JSON.stringify(node).replace(/"/g, '##');
        if (node.CHK_LEAF === 0) {
            return '<li><a href="#" rel="' + node.BANK_NO + '" class="tree-menu-text has-submenu leaf"><i class="fa fa-plus-square-o collapse-icon"></i><span class="tree-menu__text">' + node.BANK_NAME + '</span></a>' + subMenu + '<div class="action-buttons"><a class="add-button" rel="' + jsonData + '"><i class="ion-plus"></i></a><a class="edit-button" rel="' + jsonData + '" ><i class="ion-edit"></i></a><a class="delete-button" rel="' + jsonData + '" ><i class="ion-trash-a"></i></a></div></li>';
        }
        else {
            return '<li><a href="#" class="tree-menu-text last-leaf leaf" rel="' + node.BANK_NO + '" ><span class="tree-menu__text">' + node.BANK_NAME + '</span></a><div class="action-buttons"><a class="edit-button" rel="' + jsonData + '" ><i class="ion-edit"></i></a><a class="delete-button" rel="' + jsonData + '" ><i class="ion-trash-a"></i></a></div></li>'
        }
    });
}


@Injectable({
    providedIn: 'root'
})
export class ModelService {

    bank: Bank;
    bankBackup: Bank;
    bankDtlList: BankDtl[] = new Array<BankDtl>();
    bankDtlListBackup: BankDtl[] = new Array<BankDtl>();
    districtList: any[];
    typeList: any[];
    gLAccoutnList: any[];
    salesAccountList: any[];
    htmlStr: any;
    selectedBank: any;
    public leafObjectStr: string;
    userPrivilege = new UserPrivileges();
    formParam: FormParam;

    public FORM_ID = 'AC_1003'

    constructor(private apiService: DataService,
        private commonService: CommonService,
        private alertService: AlertService,
        public langService: LangService,
        private toastr: ToastrService,
        private utilityService: UtilityService) {
        this.formParam = new FormParam();
    }

    init(that) {
        this.bank = new Bank();
        this.bankBackup = new Bank();
        let promiseAll = [
            this.apiService.getTreeBankNames(),
            this.apiService.getDistricts(),
            this.apiService.getAccountTypes(),
            this.commonService.getUserPrivileges(this.FORM_ID)
        ];
        forkJoin(promiseAll).subscribe(results => {
            this.htmlStr = getMenu(null, results[0].body).join('');
            setTimeout(function () {
                that.loadScript();
            }, 500);
            this.districtList = results[1].body;
            this.typeList = results[2].body;
            this.userPrivilege = new UserPrivileges(results[3].body)
        });
    }

    addNewBank(_options) {
        this.bank = new Bank(_options);
    }
    removeBankDtl(index, _bankDtl: BankDtl) {
        if (_bankDtl.SQL_STATE == 1) {
            this.bank.bankDtls.splice(index, 1);
        }
        else {
            _bankDtl.SQL_STATE = fixedValues.sqlState.sqlDelete;
        }
    }

    menuTargetData(str: string) {
        return JSON.parse(str.replace(/##/g, '"'));
    }

    getBankInfo(_BANK_NO, grid) {
        this.apiService.getBanksInfo(_BANK_NO).subscribe(result => {
            if( grid.api.psGetChangeList().length > 0 || this.utilityService.psHasAnyChange(this.bankBackup, this.bank)){                
                this.toastr.info(this.langService.langData.pleaseSaveYourChanges, 'Info');
                return;     
            }
            this.bank = new Bank(result[0].body);
            this.bankBackup = JSON.parse( JSON.stringify(this.bank));
            let list = result[1].body.map(element => {
                element['SQL_STATE'] = fixedValues.sqlState.sqlUnchange;
                return new BankDtl(element)
            });
            grid.api.setRowData(list);
            this.bankDtlListBackup = JSON.parse( JSON.stringify(list));
        });
    }

    saveBank(grid) {
        this.bank.bankDtls = grid.api.psGetChangeList();
        
        this.apiService.saveBank(this.bank).subscribe(result => {
                       
            if(result.body){
                this.toastr.success(this.langService.langData.saveSuccessMsg, 'Success');
                // Old Code
                //this.bankBackup = new Bank();
                //this.bankBackup = Object.assign({}, this.bank);

                let bankDtls = result.body.bankDtls;
                result.body.bankDtls = null;                
                this.bank =  new Bank(result.body);
                this.bankBackup =  new Bank(result.body);
                grid.api.psResetValidation();
                grid.api.psUpdateList(bankDtls, BankDtl);
                this.bankDtlListBackup = JSON.parse(JSON.stringify(grid.api.psGridDataList()));
                // Old Code
                // var jsonData = '{##PARENT##:' + result.body.SUBBANK_OF + ',##LEVEL##:2,##BANK_NAME##:##' + result.body.BRANCH_NAME + '##,##BANK_NO##:' + result.body.BANK_NO + ',##CHK_LEAF##:1}';
                // var bank = '<li><a href="#" class="tree-menu-text last-leaf leaf open-menu" rel="' + result.body.BANK_NO + '"><span class="tree-menu__text">' + result.body.BRANCH_NAME + '</span></a><div class="action-buttons"><a class="edit-button" rel="' + jsonData + '" ><i class="ion-edit"></i></a><a class="delete-button" rel="' + jsonData + '" ><i class="ion-trash-a"></i></a></div></li>'

                var jsonData = '{##PARENT##:' + result.body.SUBBANK_OF + ',##LEVEL##:2,##BANK_NAME##:##' + result.body.ALIAS + '##,##BANK_NO##:' + result.body.BANK_NO + ',##CHK_LEAF##:1}';
                var bank = '<li><a href="#" class="tree-menu-text last-leaf leaf open-menu" rel="' + result.body.BANK_NO + '"><span class="tree-menu__text">' + result.body.ALIAS + '</span></a><div class="action-buttons"><a class="edit-button" rel="' + jsonData + '" ><i class="ion-edit"></i></a><a class="delete-button" rel="' + jsonData + '" ><i class="ion-trash-a"></i></a></div></li>'
                // Old Code
                //$('ul.currentMenu').append(bank);
                $('#targetSearchTwo.tree-menu ul.currentMenu').append(bank);
               
                // Protect appen after Add new item when you any record Update  
                setTimeout(() => {
                    $('#targetSearchTwo.tree-menu .dropdown').removeClass('currentMenu');
                }, 50);

                // This function is optionl
                //this.getTreeMenuData();
            }else{
                if(result.status == 500){
                    this.toastr.error(result.message, 'Error');    
                }
            } 
                        
        });
    }

    // getTreeMenuData(){
    //     this.apiService.getTreeBankNames().subscribe(result => {
    //         result.body.map(item => {
    //             item['SQL_STATE'] = fixedValues.sqlState.sqlUpdate;

    //         })
    //         this.htmlStr = getMenu(null, result.body).join('');
    //         let _this = this;           
    //         var $this = $(this);
    //         setTimeout(() => {
    //             $('#targetSearchTwo.tree-menu .dropdown').removeClass('menu-show');
    //             $('#targetSearchTwo.tree-menu .tree-menu-text > span').each(function(){
    //                 if($(this).text().replace(/ .*/, '') ==   _this.bank.ALIAS){
    //                     $(this).parents('.dropdown').addClass('menu-show');
    //                     $(this).parent('.tree-menu-text').addClass('open-menu');
    //                     $(this).parents('.dropdown').slideDown(350);
    //                     $(this).siblings('.collapse-icon').addClass('fa-minus-square-o').removeClass('fa-plus-square-o');
    //                     $(this).parents('li').find('.collapse-icon').addClass('fa-minus-square-o').removeClass('fa-plus-square-o');
    //                 }
    //             })

    //         }, 800);
    //     });
    // }

}
