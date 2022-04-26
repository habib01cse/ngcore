/* angular stuff */
import { Injectable } from '@angular/core';

/* 3rd party libraries */
import * as $ from 'jquery';

/* our own stuff */
import { Nature } from "../../../models/nature.model";
import { Chart } from "../../../models/chart.model";
import { CommonModel } from 'src/app/shared/models/common-model';
import { DataService } from './data.service';
import { CommonService } from '../../common.service';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { forkJoin } from 'rxjs';
import { globalVariables } from 'src/app/core/constants/globalVariables';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { FormParam } from '../../../models/form-param';
import { ToastrService } from 'ngx-toastr';
import { LangService } from 'src/app/core/services/lang.service';


function getMenu(parentID, data) {
    let fnData = data;
    return fnData.filter(function (node) {
        return (node.PARENT === parentID);
    }).map(function (node) {
        var exists = fnData.some(function (childNode) {
            return childNode.PARENT === node.NUM;
        });
        var subMenu = (exists) ? '<ul class="dropdown">' + getMenu(node.NUM, fnData).join('') + '</ul>' : "";
        let jsonData = JSON.stringify(node).replace(/"/g, '##');

        if (node.CHK_LEAF === 0) {
            if (node.LEVEL === 1) {
                return '<li><a href="#" class="tree-menu-text has-submenu leaf"><i class="fa fa-plus-square-o collapse-icon"></i><span>' + node.ACC_NAME + '</span></a>' + subMenu + '<div class="action-buttons"><a class="add-button" rel="' + jsonData + '"><i class="ion-plus"></i></a></div></li>';
            }
            else {
                return '<li><a href="#" class="tree-menu-text has-submenu leaf"><i class="fa fa-plus-square-o collapse-icon"></i><span>' + node.ACC_NAME + '</span></a>' + subMenu + '<div class="action-buttons"><a class="edit-button" rel="' + jsonData + '" ><i class="ion-edit"></i></a><a class="add-button" rel="' + jsonData + '" ><i class="ion-plus"></i></a><a class="delete-button" rel="' + jsonData + '" ><i class="ion-trash-a"></i></a></div></li>';
            }
        }
        else {
            return '<li><a href="#" class="tree-menu-text last-leaf leaf" ><span>' + node.ACC_NAME + '</span></a><div class="action-buttons"><a class="edit-button" rel="' + jsonData + '" ><i class="ion-edit"></i></a><a class="add-button" rel="' + jsonData + '" ><i class="ion-plus"></i></a><a class="delete-button" rel="' + jsonData + '" ><i class="ion-trash-a"></i></a></div></li>'
        }
    });
}

@Injectable({
    providedIn: 'root'
})
export class ModelService {
    public formParam: FormParam = new FormParam();
    public chart: Chart;
    public chartBackup: Chart;
    public chartCompnayListBackup: any = [];

    public categoryList = [];
    public parentList = [];
    public defaultCurrencyList = [];
    public mapAccList = []
    public businessUnitList = [];
    public allocateCostCenterList: any[];

    public companyList: any[];
    public htmlStr = "";
    public leafObjectStr: string;
    public ccBaTypeList;

    public isLastLeaf = false;
    public costCenterList: any[];
    public userPrivilege = new UserPrivileges();

    public costAllocationListBackup: any = [];
    public companyListBackup: any = [];
    public totalAllocation = 0;

    constructor(private apiService: DataService,
        private commonService: CommonService,
        private toastr: ToastrService,
        public langService: LangService,
        private alertService: AlertService,
        private utilityService: UtilityService) {
        this.allocateCostCenterList = this.utilityService.getEnumList(fixedValues.allocateCostCenters);
        this.companyList = globalVariables.companyList;

    }

    init(that) {
        
        this.formParam.FORM_ID = 'AC_1001';
        this.chart = new Chart();
        this.chartBackup = new Chart();
        this.commonService.getUserPrivileges(this.formParam.FORM_ID).subscribe(results => {
            this.userPrivilege = new UserPrivileges(results.body);
        });
        this.ccBaTypeList = this.utilityService.getEnumList(fixedValues.ccBaType);

        this.apiService.getCOATree().subscribe(result => {
            result.body.map(item => {
                item['SQL_STATE'] = fixedValues.sqlState.sqlUpdate;

            })
            this.htmlStr = getMenu(null, result.body).join('');
            let _this = this;
            setTimeout(function () {
                that.loadScript();
            }, 500);
        });

        let promiseAll = [
            this.commonService.getDeafultCurrency(),
            this.commonService.getBusinessUnit()
        ]

        forkJoin(promiseAll).subscribe(results => {
            this.defaultCurrencyList = results[0].body;
            this.businessUnitList = results[1].body;
        })
    }
    menuTargetData(str: string) {
        return JSON.parse(str.replace(/##/g, '"'));
    }
   
    removeCostCenter(index, costCenter) {
        if (costCenter.SQL_STATE == 1) {
            this.chart.chartCostList.splice(index, 1);
        }
        else {
            costCenter.SQL_STATE = fixedValues.sqlState.sqlDelete;
        }
    }
    removeBusinessArea(index, businessArea) {
        if (businessArea.SQL_STATE == 1) {
            this.chart.chartBaList.splice(index, 1);
        }
        else {
            businessArea.SQL_STATE = fixedValues.sqlState.sqlDelete;
        }
    }

    addNewCompany() {
        let _company = { "COMPANY_NO": null, "SQL_STATE": fixedValues.sqlState.sqlInsert };
        this.chart.companyList.push(_company);
    }
    addCostAllocation() {
        let _costAllocation = {
            "ACC_NO": null,
            "ALLOCATION_NO": null,
            "ALLOCATION_PER": null,
            "COST_NAME": '',
            "COST_NO": null,
            "SQL_STATE": fixedValues.sqlState.sqlInsert
        };
        this.chart.costAllocationList.push(_costAllocation);
    }
    removeCostAllocation(index, costCenter) {
        if (costCenter.SQL_STATE == 1) {
            this.chart.costAllocationList.splice(index, 1);
        }
        else {
            costCenter.SQL_STATE = fixedValues.sqlState.sqlDelete;
        }
    }

    removeCompany(index, company) {
        if (company.SQL_STATE == 1) {
            this.chart.companyList.splice(index, 1);
        }
        else {
            company.SQL_STATE = fixedValues.sqlState.sqlDelete;
        }
    }

    saveChartOfAccount() {

        if (this.chart.SQL_STATE == 1) {
            this.chart.PARENT_ACC_NO = this.chart.ACC_NO;
            this.chart.ACC_NO = null;
        }
        this.apiService.saveChartOfAccount(this.chart)
            .subscribe(result => {
                this.chart = new Chart(result.body);
                this.chartBackup = JSON.parse(JSON.stringify(this.chart)) // backup
                this.chartCompnayListBackup = [];
                this.chartCompnayListBackup = JSON.parse(JSON.stringify(this.chart.companyList)); // backup
                this.toastr.success(this.langService.langData.saveSuccessMsg, 'Success');


                let chatOfAccount;
                if (this.isLastLeaf) {
                    chatOfAccount = '<ul class="dropdown"><li><a href="#" class="tree-menu-text last-leaf leaf"><span>' + result.body.ACC_CODE + ' ' + result.body.ACC_NAME + '</span></a><div class="action-buttons"><a class="edit-button" rel="{##LEVEL##:' + result.body.LVL + ',##ACC_NAME##:##' + result.body.ACC_NAME + '##,##NUM##:##' + result.body.ACC_NO + '##,##PARENT##:##' + result.body.PARENT_ACC_NO + '##,##ACC_NO##:' + result.body.ACC_NO + ',##CHK_LEAF##:1}"><i class="ion-edit"></i></a><a class="add-button" rel="{##LEVEL##:' + result.body.LVL + ',##ACC_NAME##:##' + result.body.ACC_NAME + '##,##NUM##:##' + result.body.ACC_NO + '##,##PARENT##:##' + result.body.PARENT_ACC_NO + '##,##ACC_NO##:' + result.body.ACC_NO + ',##CHK_LEAF##:1}"><i class="ion-plus"></i></a><a class="delete-button" rel="{##LEVEL##:' + result.body.LVL + ',##ACC_NAME##:##' + result.body.ACC_CODE + ' ' + result.body.ACC_NAME + '##,##NUM##:##' + result.body.ACC_NO + '##,##PARENT##:##' + result.body.PARENT_ACC_NO + '##,##ACC_NO##:' + result.body.ACC_NO + ',##CHK_LEAF##:1}"><i class="ion-trash-a"></i></a></div></li></ul>'

                    $('#targetSearchOne.tree-menu .currentMenu .tree-menu-text').after(chatOfAccount);
                    $('#targetSearchOne.tree-menu .currentMenu').children('.tree-menu-text').removeClass('last-leaf').addClass('has-submenu');
                    $('#targetSearchOne.tree-menu .currentMenu').children('.tree-menu-text').prepend('<i class="fa collapse-icon fa-plus-square-o"></i>');
                } else {
                    chatOfAccount = '<li><a href="#" class="tree-menu-text last-leaf leaf"><span>' + result.body.ACC_CODE + ' ' + result.body.ACC_NAME + '</span></a><div class="action-buttons"><a class="edit-button" rel="{##LEVEL##:' + result.body.LVL + ',##ACC_NAME##:##' + result.body.ACC_CODE + ' ' + result.body.ACC_NAME + '##,##NUM##:##' + result.body.ACC_NO + '##,##PARENT##:##' + result.body.PARENT_ACC_NO + '##,##ACC_NO##:' + result.body.ACC_NO + ',##CHK_LEAF##:1}"><i class="ion-edit"></i></a><a class="add-button" rel="{##LEVEL##:' + result.body.LVL + ',##ACC_NAME##:##' + result.body.ACC_CODE + ' ' + result.body.ACC_NAME + '##,##NUM##:##' + result.body.ACC_NO + '##,##PARENT##:##' + result.body.PARENT_ACC_NO + '##,##ACC_NO##:' + result.body.ACC_NO + ',##CHK_LEAF##:1}"><i class="ion-plus"></i></a><a class="delete-button" rel="{##LEVEL##:' + result.body.LVL + ',##ACC_NAME##:##' + result.body.ACC_CODE + ' ' + result.body.ACC_NAME + '##,##NUM##:##' + result.body.ACC_NO + '##,##PARENT##:##' + result.body.PARENT_ACC_NO + '##,##ACC_NO##:' + result.body.ACC_NO + ',##CHK_LEAF##:1}"><i class="ion-trash-a"></i></a></div></li>'

                    $('#targetSearchOne.tree-menu .currentMenu').append(chatOfAccount);
                }


                
                this.costAllocationListBackup = JSON.parse(JSON.stringify(this.chart.costAllocationList));
                this.companyListBackup = JSON.parse(JSON.stringify(this.chart.companyList));

                this.getTreeMenuData();
                
            });
    }

    getTreeMenuData(){
        this.apiService.getCOATree().subscribe(result => {
            result.body.map(item => {
                item['SQL_STATE'] = fixedValues.sqlState.sqlUpdate;

            })
            this.htmlStr = getMenu(null, result.body).join('');
            let _this = this;
            console.log(this.chart.ACC_NAME);
            var $this = $(this);
            setTimeout(() => {
                $('#targetSearchOne.tree-menu .dropdown').removeClass('menu-show');
                $('#targetSearchOne.tree-menu .tree-menu-text > span').each(function(){
                    if($(this).text().replace(/ .*/, '') ==   _this.chart.ACC_CODE){
                        $(this).parents('.dropdown').addClass('menu-show');
                        $(this).parent('.tree-menu-text').addClass('open-menu');
                        $(this).parents('.dropdown').slideDown(350);
                        $(this).siblings('.collapse-icon').addClass('fa-minus-square-o').removeClass('fa-plus-square-o');
                        $(this).parents('li').find('.collapse-icon').addClass('fa-minus-square-o').removeClass('fa-plus-square-o');
                    }
                })

            }, 800);
        });
    }

    totalAllocationSum() {
        this.totalAllocation = 0;
        for (const iterator of this.chart.costAllocationList) {
            if ((typeof iterator.ALLOCATION_PER !== 'undefined' && iterator.SQL_STATE != fixedValues.sqlState.sqlDelete) && (this.userPrivilege.CAN_VIEW || iterator.SQL_STATE == fixedValues.sqlState.sqlInsert)) {
                this.totalAllocation += isNaN(Number(iterator.ALLOCATION_PER)) ? 0 : Number(iterator.ALLOCATION_PER);
            }
        }
    }

}
