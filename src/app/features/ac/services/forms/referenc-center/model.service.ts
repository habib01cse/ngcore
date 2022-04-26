/* angular stuff */
import { Injectable } from '@angular/core';

/* 3rd party libraries */
import * as $ from 'jquery';

/* our own stuff */
import { CommonModel } from 'src/app/shared/models/common-model';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { forkJoin } from 'rxjs';
import { globalVariables } from 'src/app/core/constants/globalVariables';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { CommonService } from '../../common.service';
import { DataService } from './data.service';
import { CostCenter } from '../../../models/cost-center.model';
import { CompanyName } from '../../../models/company-name.model';
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import { ToastrService } from 'ngx-toastr';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { LangService } from 'src/app/core/services/lang.service';

function getMenu(parentID, data) {
    let fnData = data;
    return fnData.filter(function (node) {
        return (node.PARENT == parentID);
    }).map(function (node) {
        var exists = fnData.some(function (childNode) {
            return childNode.PARENT == node.REF_NO;
        });
        var subMenu = (exists) ? '<ul class="dropdown">' + getMenu(node.REF_NO, fnData).join('') + '</ul>' : "";
        let jsonData = JSON.stringify(node).replace(/"/g, '##');
        if (node.CHK_LEAF === 0) {
            return '<li><a href="#" rel="' + node.REF_NO + '" class="tree-menu-text has-submenu leaf"><i class="fa fa-plus-square-o collapse-icon"></i><span class="tree-menu__text">' + node.REF_NAME + '</span></a>' + subMenu + '<div class="action-buttons"><a class="add-button" rel="' + jsonData + '"><i class="ion-plus"></i></a><a class="edit-button" rel="' + jsonData + '" ><i class="ion-edit"></i></a></div></li>';
        }
        else {
            return '<li><a href="#" class="tree-menu-text last-leaf leaf" rel="' + node.REF_NO + '" ><span class="tree-menu__text">' + node.REF_NAME + '</span></a><div class="action-buttons"><a class="add-button" rel="' + jsonData + '"><i class="ion-plus"></i></a><a class="edit-button" rel="' + jsonData + '" ><i class="ion-edit"></i></a></div></li>'
        }
    });
}

@Injectable({
    providedIn: 'root'
})
export class ModelService {


    public SERACH_NAME = '';
    public businessUnitList = [];
    public costCenter: CostCenter;
    public costCenterBack: CostCenter;
    public RefCompanyList: CompanyName[] = new Array<CompanyName>();
    public RefCompanyListBack: CompanyName[] = new Array<CompanyName>();

    public companyList = [];
    public parentCostCenterList = [];
    public mapCenterList = [];
    public mapPICenterList = [];

    public htmlStr = "";
    public leafObjectStr: string;
    public ccBaTypeList;

    constructor(private apiService: DataService,
        public langService: LangService,
        private alertService: AlertService,
        private commonService: CommonService,
        private toastr: ToastrService,
        private dataLoadService: DataLoadService,
        private utilityService: UtilityService) {
            this.costCenter = new CostCenter();
            this.costCenterBack = new CostCenter();
    }

    init(that) {
        // $(document).off('click', '.tree-menu li a.has-submenu, .tree-menu li a.last-leaf');
		// $(document).off('click', '.tree-menu li .add-button');
		// $(document).off('click', '.tree-menu li .edit-button');
		// $(document).off('click', '#refference-center-menu.tree-menu li .delete-button');
        

        this.costCenter = new CostCenter();
        this.apiService.getBusinessUnits('').subscribe(result => {
            this.htmlStr = getMenu(null, result.body).join('');
            let _this = this;
            setTimeout(function () {
                that.loadScript();
            }, 500);
        });


        let promiseAll = [
            this.apiService.getParentBU(),
            this.apiService.getReferenceInvoice(),
            this.apiService.getReferenceInvoicePI()
        ]

        forkJoin(promiseAll).subscribe(results => {
            this.parentCostCenterList = results[0].body;
            this.mapCenterList = results[1].body;
            this.mapPICenterList = results[2].body;
        })
    }
    menuTargetData(str: string) {
        return JSON.parse(str.replace(/##/g, '"'));
    }
    // loadScript() {
    //     let _this = this;
    //     $('.tree-menu li a.has-submenu, .tree-menu li a.last-leaf').on('click', function (e) {
    //         e.preventDefault();
    //         var $this = $(this);

    //         $('.tree-menu li .tree-menu-text').removeClass('open-menu');

    //         if ($this.hasClass('last-leaf')) {
    //             return;
    //         }

    //         if ($this.next().hasClass('menu-show')) {
    //             $this.next().removeClass('menu-show');
    //             //$this.removeClass('open-menu');
    //             $this.next().slideUp(350);
    //             $this.parent().find('.collapse-icon').removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
    //         } else {
    //             $this.parent().find('li .dropdown').removeClass('menu-show');
    //             //$this.addClass('open-menu');
    //             $this.parent().find('li .dropdown').slideUp(350);
    //             $this.find('.collapse-icon').addClass('fa-minus-square-o').removeClass('fa-plus-square-o');
    //             $this.next().toggleClass('menu-show');
    //             $this.next().slideToggle(350);
    //         }
    //     });
    //     $(document).on('click', '.tree-menu li .add-button', function (e) {
    //         e.preventDefault();
    //         var $this = $(this);

    //         _this.leafObjectStr = $(this).attr('rel');
    //         let leafObject = _this.menuTargetData(_this.leafObjectStr);
    //         _this.addNewCostCenter(leafObject);
    //         $('.tree-menu li .tree-menu-text').removeClass('open-menu');
    //         $this.parent().parent().children('.tree-menu-text').addClass('open-menu');
    //     });

    //     $('.tree-menu li .edit-button').on('click', function (e) {
    //         e.preventDefault();
    //         var $this = $(this);
    //         _this.leafObjectStr = $(this).attr('rel');
    //         let leafObject = _this.menuTargetData(_this.leafObjectStr);
    //         _this.getRepInfo(leafObject.REF_NO);
    //         $('.tree-menu li .tree-menu-text').removeClass('open-menu');
    //         $this.parent().parent().children('.tree-menu-text').addClass('open-menu');
    //     });

    //     // selected node background color
	// 	$(document).on('click', '#refference-center-menu.tree-menu li .edit-button, #refference-center-menu.tree-menu li .add-button', function (e) {
	// 		e.preventDefault();
	// 		$('#refference-center-menu.tree-menu').find('.tree-menu-text').removeClass('open-menu');
	// 		$(this).parent().siblings('.tree-menu-text').addClass('open-menu');
	// 	});

    // }

    getRepInfo(_REP_NO) {                    
        if( this.utilityService.psHasAnyChange(this.costCenterBack, this.costCenter) ){
            this.toastr.warning(this.langService.langData.pleaseSaveYourChanges, 'Warning');        
            return;
        }

        this.apiService.RefCompanyList(_REP_NO).subscribe(result => {
            this.costCenter = new CostCenter(result.body);
            this.dataLoadService.load('FG_AC1040_COMPANY_BY_REFNO',{P_REF_NO:_REP_NO})
            .subscribe(res => {
                console.log(res);
                this.costCenter.RefCompanyList = res.body;
                this.costCenterBack = JSON.parse(JSON.stringify(this.costCenter));
              });                        
        });
    }

    addNewCompanyDtl() {
        this.costCenter.RefCompanyList.push(new CompanyName());
    }

    removeCompanyDtl(index, _company: CompanyName) {
        if (_company.SQL_STATE == 1) {
            this.costCenter.RefCompanyList.splice(index, 1);
        }
        else {
            _company.SQL_STATE = fixedValues.sqlState.sqlDelete;
        }
    }

    saveCostCenter(): any {
        this.apiService.saveCostCenter(this.costCenter).subscribe(result => {
            if (!this.utilityService.checkResp(result)) return;
            this.costCenterBack = Object.assign({}, this.costCenter);
            this.RefCompanyListBack = JSON.parse(JSON.stringify(this.costCenter.RefCompanyList));
            // this.alertService.success("Cost Center saved successfully");
            this.toastr.success('Cost Center saved successfully', 'Success!');
            this.apiService.getBusinessUnits('').subscribe(result => {
                this.htmlStr = getMenu(null, result.body).join('');
                let _this = this;
                this.getTreeMenuData();
            });            
        });
    }

    getTreeMenuData(){
        //that.resetAllDomClickEvent();
        this.apiService.getBusinessUnits('').subscribe(result => {
            result.body.map(item => {
                item['SQL_STATE'] = fixedValues.sqlState.sqlUpdate;

            })
            this.htmlStr = getMenu(null, result.body).join('');
            let _this = this;
            setTimeout(() => {
                $('#refference-center-menu.tree-menu .dropdown').removeClass('menu-show');
                $('#refference-center-menu.tree-menu .tree-menu-text > span').each(function(){
                    //console.log($(this).text())
                    if($(this).text().replace(/ .*/, '') ==   _this.costCenter.REF_NAME){
                        console.log("inner - ", $(this))
                        console.log("inner - code ", $(this).text().replace(/ .*/, ''))
                        console.log("_this.chart.ACC_CODE ", _this.costCenter.REF_NAME);
                        //debugger;
                        $(this).parents('.dropdown').addClass('menu-show');
                        $(this).parent('.tree-menu-text').addClass('open-menu');
                        $(this).parents('.dropdown').slideDown(350);
                        $(this).siblings('.collapse-icon').addClass('fa-minus-square-o').removeClass('fa-plus-square-o');
                        $(this).parents('li').find('.collapse-icon').addClass('fa-minus-square-o').removeClass('fa-plus-square-o');
                    }
                })

            }, 500);
        });
    }

    addNewCostCenter(_options) {
        let options = {
            REF_NO_PARENT: _options.REF_NO,
            PARENT_BUSINESS_UNIT: _options.REF_NAME
        }
        this.costCenter = new CostCenter(options);
    }    
}
