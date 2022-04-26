/* angular stuff */
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

/* 3rd party libraries */
import * as $ from 'jquery';

// Our own stuff
import { LangService } from "src/app/core/services/lang.service";
import { DateService } from 'src/app/shared';
import { globalVariables } from "src/app/core/constants/globalVariables";
import { FormParam } from '../../models/form-param';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { GridService } from 'src/app/shared/services/grid.service';
import { DynamicModalService } from "dynamicModal";
import { DataService } from './../../services/forms/cost-center/data.service';
import { ModelService } from './../../services/forms/cost-center/model.service';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { ToastrService } from 'ngx-toastr';
import { CostCenter } from '../../models/cost-center.model';
import { CostCompany } from '../../models/cost-company.model';
import { CostModule } from '../../models/cost-module.model';
import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';
import { WebStorageService } from 'src/app/core/services/web-storage.service';

@Component({
  selector: 'app-ac1013',
  templateUrl: './../../templates/forms/ac1013.component.html',
})
export class Ac1013Component implements OnInit {
  psDateFormat: any;
  //public formParam: FormParam;
  public formParam: FormParam = new FormParam();

  
  constructor(public langService: LangService
    , private utilityService: UtilityService
    , public dataLoadService: DataLoadService
    , private alertService: AlertService
    , public model: ModelService
    , public modalService: DynamicModalService
    , public dataService: DataService
    , private dateService: DateService
    , public gridService: GridService
    , private toastr: ToastrService
	, private storageService: WebStorageService
    , private router: Router) {
    this.formParam.FORM_ID = 'AC_1013';  
	this.model.moduleList = fixedValues.moduleList;
	this.compColumnDef();
	this.modColumnDef();
  }

  // Comp grid
  compColumnDefs = [];
  compColObj;
  compGrid: any;
  compGridId: string = "compGrid_1013"
  compRowSelection = 'single';

  compGridValidation = {
    // "FIELD_NAME": {
    //   "required": {
    //     "message": ''
    //   }
    // }  
  }

  // Mod grid
  modColumnDefs = [];
  modColObj;
  modGrid: any;
  modGridId: string = "modGrid_1013"
  modRowSelection = 'single';
  
  modGridValidation = {
	// "FIELD_NAME": {
    //   "required": {
    //     "message": ''
    //   }
    // }  
  }

  ngOnInit() {
    this.psDateFormat = globalVariables.psDateFormat;  
    this.getUserPrivileges(); 
    
    this.model.init(this);
		let _this = this;
   
  }


  onCompGridReady(compGrid) {
    this.compGrid = compGrid;
    this.compGrid.api.setRowData([]);  
    //this.compGrid.api.sizeColumnsToFit();          
  }

  onModGridReady(modGrid) {
    this.modGrid = modGrid;
    this.modGrid.api.setRowData([]);  
    //this.modGrid.api.sizeColumnsToFit();          
  }

  getUserPrivileges(): void {
	// Without api  
	let data = JSON.parse( this.storageService.getData( globalVariables.DAMI_PREVILIGE));  
	this.model.userPrivilege = new UserPrivileges(data);
    this.onLoad();

	// With api
    // this.dataLoadService.load('FG_SA_COMM_USER_PREVILAGE/MAP', { P_CURRFORM: this.formParam.FORM_ID }).subscribe(result => {
    //   this.model.userPrivilege = new UserPrivileges(result.body);
    //   this.onLoad();
    // })

  }

  onLoad() {   
   
  }

  onKeyUpSearchField(value) {

		let filter = value.toUpperCase();

		// first label
		$("#targetSearchOne > li").removeClass("d-none");
		$("#targetSearchOne > li").removeClass("d-block");
		$("#targetSearchOne > li").each(function () {
			if ($(this).text().toUpperCase().search(new RegExp(filter, "i")) < 0 && !$(this).hasClass('d-block')) {
				$(this).addClass('d-none');
			} else {
				$(this).addClass('d-block');
				$(this).find(' ul > li').addClass('d-block');
			}
		});


		// first label
		$("#targetSearchOne > li > ul > li").removeClass("d-none");
		$("#targetSearchOne > li > ul > li").removeClass("d-block");
		$("#targetSearchOne > li > ul > li").each(function () {
			if ($(this).text().toUpperCase().search(new RegExp(filter, "i")) < 0 && !$(this).hasClass('d-block')) {
				$(this).addClass('d-none');
			} else {
				$(this).addClass('d-block');
				$(this).find('ul > li > ul > li').addClass('d-block');
			}
		});


		// first label
		$("#targetSearchOne > li > ul > li > ul > li").removeClass("d-none");
		$("#targetSearchOne > li > ul > li > ul > li").removeClass("d-block");
		$("#targetSearchOne > li > ul > li > ul > li").each(function () {
			if ($(this).text().toUpperCase().search(new RegExp(filter, "i")) < 0 && !$(this).hasClass('d-block')) {
				$(this).addClass('d-none');
			} else {
				$(this).addClass('d-block');
				$(this).find('ul > li > ul > li  > ul > li').addClass('d-block');
			}
		});


		let ul, li, a, i, txtValue;
		ul = document.getElementById("targetSearchOne");
		li = ul.getElementsByTagName('li');
		for (i = 0; i < li.length; i++) {
			a = $(li[i]).find("a")[0];
			txtValue = a.textContent.toUpperCase() || a.innerText.toUpperCase();
			if (txtValue.indexOf(filter) > -1) {
				if ($(a).hasClass('last-leaf')) {
					$(li[i]).removeClass('d-none').addClass('d-block');
				}
			} else {
				if ($(a).hasClass('last-leaf')) {
					$(li[i]).removeClass('d-block').addClass('d-none');
				}
			}
		}
		setTimeout(() => {
			if (filter.length >= 3) {
				$("#targetSearchOne li.d-block").parents('.dropdown').slideDown(350);
				$("#targetSearchOne li.d-block").find('.collapse-icon').addClass('fa-minus-square-o').removeClass('fa-plus-square-o');
  
				//$("#targetSearchOne li.d-none").parents('.dropdown').slideup(350);
				$("#targetSearchOne li.d-none").find('.collapse-icon').removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
			}

		}, 200);

		//$(a).parents('li.d-block').find('.collapse-icon').addClass('fa-minus-square-o').removeClass('fa-plus-square-o');
	}

  onClickCollapseButton() {
		$('#targetSearchOne.tree-menu .dropdown').removeClass('menu-show');
		$('#targetSearchOne.tree-menu .dropdown').hide();
		$('#targetSearchOne.tree-menu').find('.collapse-icon').removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
	}
	onlickAddNewCost() {
		//this.model.init();		
		this.addNewCost();		
		$('#targetSearchOne.tree-menu li .add-button').parent().parent().removeClass('currentMenu');
		$('#targetSearchOne.tree-menu').addClass('currentMenu');
		this.onClickCollapseButton();
	}

	addNewCost(){
		this.model.costDtl = new CostCenter();	
		this.model.costDtl.PARENT_COST_NAME = this.model.costMst.COST_NAME;
		this.model.costDtl.COST_NO_PARENT = this.model.costMst.COST_NO;
		this.model.costDtl.ACC_CODE_NAME = this.model.costMst.ACC_CODE_NAME;
		this.model.costDtl.ACC_NO = this.model.costMst.ACC_NO;
		this.compGrid.api.setRowData([]);
		this.modGrid.api.setRowData([]);  
	}

	loadScript() {
		let _this = this;
		/*** =====================================
		* 	Tree Menu
		* =====================================***/
		$(document).on('click', '#targetSearchOne.tree-menu li a.has-submenu, #targetSearchOne.tree-menu li a.last-leaf', function (e) {
			e.preventDefault();
			var $this = $(this);
			$('#targetSearchOne.tree-menu li .tree-menu-text').removeClass('menu-show');
			$this.siblings(".action-buttons").find('.edit-button').click();

			if ($this.hasClass('last-leaf')) {
				return;
			}
			if ($this.hasClass('delete-button')) {
				return;
			}

			if ($this.next().hasClass('menu-show')) {
				$this.next().removeClass('menu-show');
				//$this.removeClass('open-menu');
				$this.next().slideUp(350);
				$this.parent().find('.collapse-icon').removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
			} else {
				$this.parent().find('li .dropdown').removeClass('menu-show');
				//$this.addClass('open-menu');
				$this.parent().find('li .dropdown').slideUp(350);
				$this.find('.collapse-icon').addClass('fa-minus-square-o').removeClass('fa-plus-square-o');
				$this.next().toggleClass('menu-show');
				$this.next().slideToggle(350);


			}

		});
		$(document).on('click', '#targetSearchOne.tree-menu li .add-button', function (e) {
			e.preventDefault();
			var $this = $(this);

			// _this.model.leafObjectStr = $(this).attr('rel');
			// let leafObject = _this.model.menuTargetData(_this.model.leafObjectStr);

			// COST_NO
			// let natureNo = leafObject.NUM;

			// if (leafObject.LEVEL == 1) {
			// 	natureNo = natureNo.replace(/^P/, "");
			// }
			// let promiseAll = [
			// 	_this.apiService.getAccountCode(natureNo, leafObject.ACC_NO, leafObject.LEVEL),
			// 	_this.commonService.getMapAccount(leafObject.ACC_NO),
			// ];

			// if (_this.model.userPrivilege.canShowNew()) {
			// 	forkJoin(promiseAll).subscribe(results => {
			// 		results[0].body.ACC_NAME = '';
			// 		_this.model.chart = new Chart(results[0].body);
			// 		_this.model.mapAccList = results[1].body;

			// 	});
			// }

			_this.addNewCost();
			if ($(this).parent().siblings('.tree-menu-text').hasClass('last-leaf')) {
				_this.model.isLastLeaf = true;
				$('#targetSearchOne.tree-menu').removeClass('currentMenu');
				$('#targetSearchOne.tree-menu li .add-button').parent().siblings('ul').removeClass('currentMenu');
				$(this).parent().parent().addClass('currentMenu');
			} else {
				_this.model.isLastLeaf = false;
				$('#targetSearchOne.tree-menu').removeClass('currentMenu');
				$('#targetSearchOne.tree-menu li .add-button').parent().siblings('ul').removeClass('currentMenu');
				$(this).parent().siblings('ul').addClass('currentMenu');

			}

		});

		$(document).on('click', '#targetSearchOne.tree-menu li .edit-button', function (e) {			
			e.preventDefault();

			// Change detetion 
			// if(_this.hasAnyChange){
			// 	_this.toastr.warning(_this.langService.langData.pleaseSaveYourChanges, 'Warning');        
        	// 	return;
			// }

			_this.model.leafObjectStr = $(this).attr('rel');

			let leafObject = _this.model.menuTargetData(_this.model.leafObjectStr);
			_this.model.leafMstObj = JSON.parse(JSON.stringify(leafObject));
			
			_this.dataService.getCostCenterDtl(leafObject.COST_NO).subscribe(result => {

				_this.model.costDtl = new CostCenter(result[0].body);
    			_this.model.costDtlBackup = JSON.parse(JSON.stringify(_this.model.costDtl));
				_this.model.costMst = JSON.parse(JSON.stringify(_this.model.costDtl));

				// Company Grid in data assing 
				let tmpCostCompList : any = [];
				tmpCostCompList = result[1].body.map(el => {
					el['SQL_STATE'] = fixedValues.sqlState.sqlUnchange
					return new CostCompany(el);
				});

				_this.model.costCompListBackup = JSON.parse(JSON.stringify(tmpCostCompList));
				if(tmpCostCompList && tmpCostCompList.length > 0){
					_this.compGrid.api.setRowData(tmpCostCompList); 
				}else{
					_this.compGrid.api.setRowData([]);
				}

				// Module Grid in data assing 
				let tmpModuleList : any = [];
				tmpModuleList = result[2].body.map(el => {
					el['SQL_STATE'] = fixedValues.sqlState.sqlUnchange
					return new CostModule(el);
				});
				_this.model.moduleListBackup = JSON.parse(JSON.stringify(tmpModuleList));
				if(tmpModuleList && tmpModuleList.length > 0){
					_this.modGrid.api.setRowData(tmpModuleList); 
				}else{
					_this.modGrid.api.setRowData([]);
				}

			});

			// Old logic 
			// if (leafObject.LEVEL != 1 && _this.model.userPrivilege.canShowData(leafObject.SQL_STATE)) {

			// }			
		});

		$(document).on('click', '#targetSearchOne.tree-menu li .delete-button', function (e) {
			e.preventDefault();
			var $this = $(this);
			_this.model.leafObjectStr = $(this).attr('rel');
			let leafObject = _this.model.menuTargetData(_this.model.leafObjectStr);
			if (_this.model.userPrivilege.canShowDelete()) {
				$('#targetSearchOne.tree-menu li').removeClass('target-to-delete');
				$(this).parent().parent().addClass('target-to-delete');
				_this.alertService.danger("Are you sure do want to delete this bank?", true).then(data => {
					if (data) {
						_this.dataService.removeCostCenter(leafObject.COST_NO).subscribe(result => {
							if(result.status == 200){
								_this.toastr.success(_this.langService.langData.deleteSuccessMsg, 'Success');
								_this.clearCost();
							}else{
								_this.toastr.error(result.message, _this.langService.langData.error);
								return;
							}							
							$('#targetSearchOne.tree-menu .target-to-delete').addClass('d-none').removeClass('d-block');
						}, err => {
							this.toastr.error(err.message, this.langService.langData.error);
						})
					}
				})
			}
		});

		// selected node background color
		$(document).on('click', '#targetSearchOne.tree-menu li .edit-button, #targetSearchOne.tree-menu li .add-button', function (e) {
			e.preventDefault();
			$('#targetSearchOne.tree-menu').find('.tree-menu-text').removeClass('open-menu');
			$(this).parent().siblings('.tree-menu-text').addClass('open-menu');
		});

	}

	clearCost(){
		this.model.costDtl = new CostCenter();	
		this.compGrid.api.setRowData([]);
		this.modGrid.api.setRowData([]);  
	}


	onSubmit(costValidation: any) {
		let validationResult = costValidation.validate();
		if (!validationResult.isValid) {
			return;
		}

		this.compGrid.api.stopEditing();
		this.modGrid.api.stopEditing();

		setTimeout(() => {
			if (!(this.utilityService.psHasAnyChange( this.model.costDtl , this.model.costDtlBackup))
				&& (this.compGrid.api.psGetChangeList().length == 0) 
				&& (this.modGrid.api.psGetChangeList().length == 0)) {
				this.toastr.info(this.langService.langData.noChangeFound, 'Info');
				return;
			}
	
			this.alertService.info(this.langService.langData.saveConfirmationMsg, true).then(data => {				
				if (data) {
							
					let dtlList = this.compGrid.api.psGetChangeList();    
					let moduleDtlList = this.modGrid.api.psGetChangeList(); 
					        
					let mstObj = JSON.parse(JSON.stringify(this.model.costDtl));    
					mstObj['DTL_LIST'] = dtlList;
					mstObj['MODULE_DTL_LIST'] = moduleDtlList;     					
					
					this.dataService.saveCostCenter(mstObj).subscribe(result => { 
						if (!this.utilityService.checkResp(result)) return;

						this.toastr.success(this.langService.langData.saveSuccessMsg, 'Success');									
						let DTL_LIST = result.body.DTL_LIST;
						//result.body.DTL_LIST = null; 

						let MODULE_DTL_LIST = result.body.MODULE_DTL_LIST;
						//result.body.MODULE_DTL_LIST = null; 		
						
						this.model.costDtl = new CostCenter( result.body );                    
						this.model.costDtlBackup = new CostCenter(result.body);                   
						this.compGrid.api.psUpdateList(DTL_LIST, CostCompany);  
						this.modGrid.api.psUpdateList(MODULE_DTL_LIST, CostModule); 

						let costCenter;
						let jsonData;
						let LEV: any;
							LEV = this.model.leafMstObj.PARENT ? this.model.leafMstObj.LEVEL + 1 : 1;
						jsonData = '{##LEVEL##:' + LEV + ',##COST_NAME##:##' +
							result.body.COST_NAME + '##,##COST_NO##:' +
							result.body.COST_NO + ',##PARENT##:' +
							result.body.COST_NO_PARENT + ',##CHK_LEAF##:1}';	
						
						if (this.model.isLastLeaf) {													
							costCenter = '<ul class="dropdown"><li><a href="#" class="tree-menu-text last-leaf leaf"><span>' + result.body.COST_NAME + '</span></a><div class="action-buttons"><a class="edit-button" rel="'+ jsonData +'"><i class="ion-edit"></i></a><a class="add-button" rel="'+ jsonData +'"><i class="ion-plus"></i></a><a class="delete-button" rel="'+ jsonData +'"><i class="ion-trash-a"></i></a></div></li></ul>'
	
							$('#targetSearchOne.tree-menu .currentMenu .tree-menu-text').after(costCenter);
							$('#targetSearchOne.tree-menu .currentMenu').children('.tree-menu-text').removeClass('last-leaf').addClass('has-submenu');
							$('#targetSearchOne.tree-menu .currentMenu').children('.tree-menu-text').prepend('<i class="fa collapse-icon fa-plus-square-o"></i>');
						} else {														
							costCenter = '<li><a href="#" class="tree-menu-text last-leaf leaf"><span>' + result.body.COST_NAME + '</span></a><div class="action-buttons"><a class="edit-button" rel="'+ jsonData +'"><i class="ion-edit"></i></a><a class="add-button" rel="'+ jsonData +'"><i class="ion-plus"></i></a><a class="delete-button" rel="'+ jsonData +'"><i class="ion-trash-a"></i></a></div></li>'		
							$('#targetSearchOne.tree-menu .currentMenu').append(costCenter);
						}

						this.compGrid.api.psResetValidation();                  
						this.modGrid.api.psResetValidation();                  
						this.model.costCompListBackup = JSON.parse(JSON.stringify(this.compGrid.api.psGridDataList())); 
						this.model.moduleListBackup = JSON.parse(JSON.stringify(this.modGrid.api.psGridDataList()));         
						
					});
				}
			})
		}, 100);


	}






	// On Click Comp grid  
	onClickCompGrid(e){
		if (e.event.target !== undefined) {      
		let actionType = e.event.target.getAttribute("data-action-type");
			switch (actionType) {               
				case "deleteAction":
				return this.onCellClickedDeleteComp(e);  
				case "companyModAction":    
				return this.onClickOpenCompnayModal(e);
				default:
			}
		}
	}

	// Delete Comp gitd row
	private onCellClickedDeleteComp(row): void {
		if (row.data.SQL_STATE == fixedValues.sqlState.sqlInsert) {
			this.compGrid.api.updateRowData({ remove: [row.data] });
		} else {
			row.data.SQL_STATE = fixedValues.sqlState.sqlDelete;
			this.compGrid.api.psRemove();
		}
	}

	// On Click Mod grid  
	onClickModGrid(rowNode){
		if (rowNode.event.target !== undefined) {      
		  let actionType = rowNode.event.target.getAttribute("data-action-type");
		  switch (actionType) {               
			case "deleteAction":
			  return this.onCellClickedDeleteMod(rowNode);      
		  default:
		  }
		} else {
			//
		}
	}
	
	// Delete Model gitd row
	private onCellClickedDeleteMod(row): void {
		if (row.data.SQL_STATE == fixedValues.sqlState.sqlInsert) {
			this.compGrid.api.updateRowData({ remove: [row.data] });
		} else {
			row.data.SQL_STATE = fixedValues.sqlState.sqlDelete;
			this.compGrid.api.psRemove();
		}
	}

	// Comp action
	onClickAddNewComp(){
		this.compGrid.api.psAddNewGrid(CostCompany, { COST_NO: this.model.costDtl.COST_NO });         
	}

	onClickResetComp(){
		this.compGrid.api.psClearFilter();
		this.compGrid.api.psResetValidation();
	
		let compList = JSON.parse(JSON.stringify(this.model.costCompListBackup)); 
		this.compGrid.api.setRowData(compList);
	
	}

	// Mod action
	onClickAddNewMod(){
		this.modGrid.api.psAddNewGrid(CostModule, { COST_NO: this.model.costDtl.COST_NO });
	}

	onClickResetMod(){
		this.modGrid.api.psClearFilter();
		this.modGrid.api.psResetValidation();

		let modList = JSON.parse(JSON.stringify(this.model.moduleListBackup)); 
		this.modGrid.api.setRowData(modList);
	}

	onClickResetCost() {
		this.model.costDtl = new CostCenter (JSON.parse(JSON.stringify(this.model.costDtlBackup)));		
		this.compGrid.api.setRowData(this.model.costCompListBackup);  
		this.modGrid.api.setRowData(this.model.moduleListBackup);		
	}





	// Parent Cost center modal open 
	onClickOpenParentCostModal(e) {
		let gridColumnDefs = [
		  { headerName: this.langService.langData.costName, field: 'PARENT_COST_NAME', Filter: true }      
		];
	
		this.modalService.openDialog("CommonListModule", "list", {
		  title: this.langService.langData.costCenterList,
		  data: {
			gridId: "inCommItemCategory",
			columnDefs: gridColumnDefs,
			api: "FG_AC1013_PARENT_LIST",
			params: {
				P_COST_NO: this.model.costDtl.COST_NO
			}
		  },
		  settings: { modalClass: 'sm' }
		}).then((modal: any) => {
		  modal.closed = () => { console.log("closed"); }
		  modal.success = (result) => {			
			this.model.costDtl.PARENT_COST_NAME = result.PARENT_COST_NAME;
			this.model.costDtl.COST_NO_PARENT = result.COST_NO;
		  }
		});
	}

	// Module Cost center modal open 
	onClickOpenModuleCostModal(e) {
		let gridColumnDefs = [
		  { headerName: this.langService.langData.accCode, field: 'ACC_CODE', Filter: true },
		  { headerName: this.langService.langData.accName, field: 'ACC_NAME', Filter: true },
		  { headerName: this.langService.langData.accPath, field: 'ACC_PATH'},      
		];
	
		this.modalService.openDialog("CommonListModule", "list", {
		  title: this.langService.langData.costCenterList,
		  data: {
			gridId: "inCommItemCategory",
			columnDefs: gridColumnDefs,
			api: "FG_AC1013_MAP_ACC_LIST",
			params: {}
		  },
		  settings: { modalClass: 'md' }
		}).then((modal: any) => {
		  modal.closed = () => { console.log("closed"); }
		  modal.success = (result) => {			
			this.model.costDtl.ACC_CODE_NAME = result.ACC_CODE_NAME;
			this.model.costDtl.ACC_NO = result.ACC_NO;
		  }
		});
	}

	// Open Company modal
	onClickOpenCompnayModal(row) {
		
		let gridColumnDefs = [
		  { headerName: this.langService.langData.companyName, field: 'COMPANY_NAME', Filter: true },
		];
		this.modalService.openDialog('CommonListModule', 'list', {
		  title: this.langService.langData.hrType,
		  data: {
			gridId: "HRJobTypeListGridId",
			columnDefs: gridColumnDefs,
			api: 'FG_AC1013_COMPANY_LIST',
			params: {}
		  }, settings: { modalClass: 'sm' }
		}).then((modal: any) => {
			modal.closed = () => {			
				row.api.psSetCellFocus();
			};
		  modal.success = (result) => {		
				row.node.setDataValue("COMPANY_NAME", result.COMPANY_NAME);
				row.node.data.COMPANY_NO = result.COMPANY_NO;
			  	row.api.psSetCellValue();			
		  	};
		});
	}

	checkDeletePrev(params) {
		if (this.model.userPrivilege.checkDeletePrev(params)) {
			return ` <button type="button" data-action-type="deleteAction" class="btn btn--squire text-danger border-0"><i class="ion-close" data-action-type="deleteAction"></i></button>`
		} else return '';
	} 

	// Company grid Column 
	public compColumnDef() {
		this.compColObj = [  
			{
				headerName: this.langService.langData.companyName,
				field: 'COMPANY_NAME',
				sortable: true, resizable: true,
				hide: false,
				filter: true,
				width: 250,
				editable: this.isColumnEditable.bind(this),
				cellEditor: "modalCellEditor",
				refferenceKey: "COMPANY_NO",
				copyAbleFields: [
				  "COMPANY_NO"
				],
				cellEditorParams: { psActionType: 'companyModAction' }
				
			},   		  
			{
				headerName: this.langService.langData.action,
				field: '_DELETE',
				sortable: false,
				width: 50,
				resizable: false,
				hide: false,
				pinned: "right",
				cellStyle: { textAlign: "center" },
				cellRenderer: this.checkDeletePrev.bind(this)
			}

		];
		this.compColumnDefs = this.gridService.getColumnDefs(this.compColObj, this.compGridId);
	  }

	  // Company grid Column 
	public modColumnDef() {
		this.modColObj = [  
			{
				headerName: this.langService.langData.module,
				field: 'MODULE',
				sortable: true, 
				resizable: true,
				hide: false,
				filter: true,
				width: 250,
				editable: this.isColumnEditable.bind(this),
				cellRenderer: "selectRenderer",
				cellEditor: 'selectCellEditor',
				params: this.model.moduleList
		
			  },   		  
			{
				headerName: this.langService.langData.action,
				field: '_DELETE',
				sortable: false,
				width: 50,
				resizable: false,
				hide: false,
				pinned: "right",
				cellStyle: { textAlign: "center" },
				cellRenderer: this.checkDeletePrev.bind(this)
			}

		];
		this.modColumnDefs = this.gridService.getColumnDefs(this.modColObj, this.modGridId);
	  }
	
	  isColumnEditable(params) {
		return this.model.userPrivilege.checkEditablePrev(params);
	  }

	
  
 

}
