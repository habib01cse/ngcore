import { Injectable } from "@angular/core";

/* 3rd party libraries */
import * as $ from 'jquery';

/* our own stuff */
import { UserPrivileges } from "src/app/core/models/user-privileges";
import { Chart } from "../../../models/chart.model";
import { CommonModel } from 'src/app/shared/models/common-model';
import { DataService } from './data.service';
import { CommonService } from '../../common.service';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { forkJoin } from 'rxjs';
import { globalVariables } from 'src/app/core/constants/globalVariables';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import { FormParam } from '../../../models/form-param';
import { ToastrService } from 'ngx-toastr';
import { LangService } from 'src/app/core/services/lang.service';
import { CostCenter } from "../../../models/cost-center.model";
import { CostCompany } from "../../../models/cost-company.model";
import { CostModule } from "../../../models/cost-module.model";

function getMenu(parentID, data) {
  let fnData = data;
  return fnData.filter(function (node) {
      return (node.PARENT === parentID);
  }).map(function (node) {
      var exists = fnData.some(function (childNode) {
          return childNode.PARENT === node.COST_NO;
      });
      var subMenu = (exists) ? '<ul class="dropdown">' + getMenu(node.COST_NO, fnData).join('') + '</ul>' : "";
      let jsonData = JSON.stringify(node).replace(/"/g, '##');

      if (node.CHK_LEAF === 0) {
          if (node.LEVEL === 1) {
              return '<li><a href="#" class="tree-menu-text has-submenu leaf"><i class="fa fa-plus-square-o collapse-icon"></i><span>' + node.COST_NAME + '</span></a>' + subMenu + '<div class="action-buttons"><a class="add-button" rel="' + jsonData + '"><i class="ion-plus"></i></a></div></li>';
          }
          else {
              return '<li><a href="#" class="tree-menu-text has-submenu leaf"><i class="fa fa-plus-square-o collapse-icon"></i><span>' + node.COST_NAME + '</span></a>' + subMenu + '<div class="action-buttons"><a class="edit-button" rel="' + jsonData + '" ><i class="ion-edit"></i></a><a class="add-button" rel="' + jsonData + '" ><i class="ion-plus"></i></a><a class="delete-button" rel="' + jsonData + '" ><i class="ion-trash-a"></i></a></div></li>';
          }
      }
      else {
          return '<li><a href="#" class="tree-menu-text last-leaf leaf" ><span>' + node.COST_NAME + '</span></a><div class="action-buttons"><a class="edit-button" rel="' + jsonData + '" ><i class="ion-edit"></i></a><a class="add-button" rel="' + jsonData + '" ><i class="ion-plus"></i></a><a class="delete-button" rel="' + jsonData + '" ><i class="ion-trash-a"></i></a></div></li>'
      }

  });
}

@Injectable({
  providedIn:'root'
})

export class ModelService{
  public formParam: FormParam = new FormParam();

  public htmlStr = "";
  public leafObjectStr: string;
  public leafMstObj: any = {};
  public isLastLeaf = false;

  public moduleList: any = [];

  public costDtl: CostCenter;
  public costDtlBackup: CostCenter;
  public costMst: CostCenter;




  // public P_INTERNAL_PROCESS: number = null;
  // public adminPriv: any;
  // public getConfigInfo: any = [];
  // public itemCategory: ItemCategory;
  // public itemCategoryBackup: ItemCategory;
  // public itemCategoryList = Array<GengatePassDtl>();

  public costCompListBackup = Array<CostCompany>();
  public moduleListBackup = Array<CostModule>();



  public userPrivilege: UserPrivileges;

  constructor(
    private apiService: DataService,
        private commonService: CommonService,
        private toastr: ToastrService,
        public langService: LangService,
        private alertService: AlertService,
        private utilityService: UtilityService
  ) {    
    this.userPrivilege = new UserPrivileges();
    
    // this.costDtl = new CostCenter();
    // this.costDtlBackup = new CostCenter();

  }

  init(that) {
        
    this.formParam.FORM_ID = 'AC_1013';
    this.costDtl = new CostCenter();
    this.costDtlBackup = new CostCenter();
    this.costMst = new CostCenter();
    this.commonService.getUserPrivileges(this.formParam.FORM_ID).subscribe(results => {
        this.userPrivilege = new UserPrivileges(results.body);
    });
    //this.ccBaTypeList = this.utilityService.getEnumList(fixedValues.ccBaType);

    this.apiService.getCostCenterTree().subscribe(result => {
        result.body.map(item => {
            item['SQL_STATE'] = fixedValues.sqlState.sqlUpdate;
        })
        this.htmlStr = getMenu(null, result.body).join('');
        let _this = this;
        setTimeout(function () {
            that.loadScript();
        }, 500);
    });

    // let promiseAll = [
    //     this.commonService.getDeafultCurrency(),
    //     this.commonService.getBusinessUnit()
    // ]

    // forkJoin(promiseAll).subscribe(results => {
    //     this.defaultCurrencyList = results[0].body;
    //     this.businessUnitList = results[1].body;
    // })
  }
  menuTargetData(str: string) {
    return JSON.parse(str.replace(/##/g, '"'));
}

  getTreeMenuData(){
    this.apiService.getCostCenterTree().subscribe(result => {
        result.body.map(item => {
            item['SQL_STATE'] = fixedValues.sqlState.sqlUpdate;

        })
        this.htmlStr = getMenu(null, result.body).join('');
        let _this = this;
        //console.log(this.chart.ACC_NAME);
        var $this = $(this);
        setTimeout(() => {
            $('#targetSearchOne.tree-menu .dropdown').removeClass('menu-show');
            $('#targetSearchOne.tree-menu .tree-menu-text > span').each(function(){
                // if($(this).text().replace(/ .*/, '') ==   _this.chart.ACC_CODE){
                //     $(this).parents('.dropdown').addClass('menu-show');
                //     $(this).parent('.tree-menu-text').addClass('open-menu');
                //     $(this).parents('.dropdown').slideDown(350);
                //     $(this).siblings('.collapse-icon').addClass('fa-minus-square-o').removeClass('fa-plus-square-o');
                //     $(this).parents('li').find('.collapse-icon').addClass('fa-minus-square-o').removeClass('fa-plus-square-o');
                // }
            })

        }, 800);
    });
}


}