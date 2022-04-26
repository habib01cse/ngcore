import { Directive, Input, HostListener, Output, EventEmitter } from '@angular/core';

import { Validation } from './validation';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { element } from 'protractor';
import { ToastrService } from 'ngx-toastr';
import { LangService } from 'src/app/core/services/lang.service';
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import { globalVariables } from 'src/app/core/constants/globalVariables';
import { PageSizeService } from '../../services/page-size.service';
import { GridApi } from '@ag-grid-community/all-modules';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { Observable } from 'rxjs';

const _DEFAULT_RESULT = { isValid: true, validationSummaryMsgs: [] };

@Directive({
  selector: '[psValidateGrid]'
})
export class PsValidateGridDirective extends Validation {

  @Input("psValidateGrid") requiredOptions: any;
  @Input("psGridColumnTotals") totalColumns: any = [];

  @Output('psGridColumnTotalChanged') gridColumnTotalEmitter$: EventEmitter<any> = new EventEmitter();

  gridApi: GridApi;

  private validationResult = _DEFAULT_RESULT;
  constructor(
    private toast: ToastrService,
    public langService: LangService,
    private pageSizeService: PageSizeService,
    private alertService: AlertService,
    private dataLoadService: DataLoadService
  ) {
    super();
  }

  @HostListener('gridReady', ['$event'])
  onGridReady(event) {
    
    if (this.pageSizeService.getPageSize() == 'min') {
      event.api.gridCore.gridOptions.rowHeight = 20;
      event.api.gridCore.gridOptions.headerHeight = 22;
    }
    else if (this.pageSizeService.getPageSize() == 'md') {
      event.api.gridCore.gridOptions.rowHeight = 22;
      event.api.gridCore.gridOptions.headerHeight = 22;
    }

    event.api.gridCore.gridOptions.isExternalFilterPresent = this.isExternalFilterPresent.bind(this);
    event.api.gridCore.gridOptions.doesExternalFilterPass = this.doesExternalFilterPass.bind(this);
    event.api.gridCore.gridOptions.overlayNoRowsTemplate = '<span><i class="fa fa-info-circle"></i> No data available</span>';
    event.api['psRemove'] = this.psRemove.bind(this);
    event.api['psGetChangeList'] = this.getChangeList.bind(this);
    event.api['psUpdateList'] = this.updateList.bind(this);
    event.api['psGridDataList'] = this.getAllData.bind(this);
    event.api['psValidate'] = this.psValidate.bind(this);
    event.api['psResetValidation'] = this.psResetValidation.bind(this);
    event.api['psMarkAsChange'] = this.markAsChange.bind(this);
    event.api['psSetCellValue'] = this.setCellValue.bind(this);
    event.api['psSetChangedValues'] = this.setChangedValues.bind(this);
    event.api['psSetCellFocus'] = this.setCellFocus.bind(this);
    event.api['psClearFilter'] = this.clearFilters.bind(this);
    event.api['psHasChanged'] = this.hasChanged.bind(this);
    event.api['psGetSelectedNode'] = this.selectedNode.bind(this);
    event.api['psSetEditorReadonly'] = this.setReadonly.bind(this);
    event.api['psSetSelectedAfterRemove'] = this.setSelectedAfterRemove.bind(this);
    event.api['psAddNewGrid'] = this.addNewGrid.bind(this);
    event.api['psRemoveGrid'] = this.removeGrid.bind(this);
    event.api['psResetGrid'] = this.resetGrid.bind(this);
    event.api['psAddNewGridWithReturnObj'] = this.addNewGridWithReturnObj.bind(this);
    event.api['psRemoveIds'] = [];
    event.api['psErrors'] = {};
    const columnDefs = event.api.columnController.columnDefs;


    for (let index = 0; index < columnDefs.length; index++) {
      const element = columnDefs[index];

      if (element.hasOwnProperty('children')) {
        for (let i = 0; i < element.length; i++) {
          const elm = element[i];
          if (elm.hasOwnProperty('field')) {

            if (elm.hasOwnProperty('editable') && !elm.hasOwnProperty('cellEditor')) {
              event.api.getColumnDef(elm.field)['cellEditor'] = "textCellEditor";
              event.api.getColumnDef(element.field)['suppressKeyboardEvent'] = this.suppressCtrlArrow.bind(this);
            }
            if (!elm.hasOwnProperty('cellRenderer')) {
              event.api.getColumnDef(elm.field)['cellRenderer'] = "textCellRenderer";
              event.api.getColumnDef(element.field)['suppressKeyboardEvent'] = this.suppressCtrlArrow.bind(this);
            }
            if (elm.hasOwnProperty('cellEditor') && elm.cellEditor === "modalCellEditor") {
              event.api.getColumnDef(elm.field).suppressKeyboardEvent = this.suppressEnter.bind(this);
            }

            if (elm.hasOwnProperty('cellEditor') && elm.cellEditor === "dateCellEditor") {
              event.api.getColumnDef(elm.field).suppressKeyboardEvent = this.suppressEnterDatePicker.bind(this);
            }

            if (this.requiredOptions.hasOwnProperty(elm.field)) {
              event.api.getColumnDef(elm.field).cellClassRules = {
                "bg-danger": function (params) {
                  return (params['api']['psErrors'].hasOwnProperty(params.colDef.field) && params['api']['psErrors'][params.colDef.field].indexOf(params.node.id) >= 0);
                }
              }
              event.api['psErrors'][elm.field] = [];
            }

          }

        }

      } else if (element.hasOwnProperty('field')) {

        if (element.hasOwnProperty('editable') && !element.hasOwnProperty('cellEditor')) {
          event.api.getColumnDef(element.field)['cellEditor'] = "textCellEditor";
          event.api.getColumnDef(element.field)['suppressKeyboardEvent'] = this.suppressCtrlArrow.bind(this);
        }
        if (!element.hasOwnProperty('cellRenderer')) {
          event.api.getColumnDef(element.field)['cellRenderer'] = "textCellRenderer";
          event.api.getColumnDef(element.field)['suppressKeyboardEvent'] = this.suppressCtrlArrow.bind(this);
        }
        if (element.hasOwnProperty('cellEditor') && element.cellEditor === "modalCellEditor") {
          event.api.getColumnDef(element.field).suppressKeyboardEvent = this.suppressEnter.bind(this);
        }
        else if (element.hasOwnProperty('cellEditor') && element.cellEditor === "dateCellEditor") {
          event.api.getColumnDef(element.field).suppressKeyboardEvent = this.suppressEnterDatePicker.bind(this);
        }
        else if (element.hasOwnProperty('cellEditor') && element.cellEditor === "dateTimeCellEditor") {
          event.api.getColumnDef(element.field).suppressKeyboardEvent = this.suppressEnterDatePicker.bind(this);
        }

        if (this.requiredOptions.hasOwnProperty(element.field)) {
          event.api.getColumnDef(element.field).cellClassRules = {
            "bg-danger": function (params) {
              if (params['api'] && params['api'].hasOwnProperty('psErrors')){
                return (params['api']['psErrors'].hasOwnProperty(params.colDef.field) && params['api']['psErrors'][params.colDef.field].indexOf(params.node.id) >= 0);
              }
              
            }
          }
          event.api['psErrors'][element.field] = [];
        }
      }
    }
    this.gridApi = event.api;
    this.gridApi.onFilterChanged();
  }

  public suppressCtrlArrow(params) {
    var KEY_ENTER = "ArrowDown";
    var event = params.event;
    var key = event.which;
    var suppress = (event.key === 'ArrowDown' && event.ctrlKey === true);
    return suppress;
  }

  // @HostListener('rowEditingStarted', ['$event']) 
  // private onRowEditingStarted(event){
  //   console.log('Row editing', event);
  //   console.log('ChangeList', this.getChangeList());
  //   if(this.getChangeList().length> 0) {

  //   }



  // }

  @HostListener('cellValueChanged', ['$event'])
  private onCellValueChanged(event) {
    if (event.rowPinned) return;
    if (event.oldValue === event.newValue) return;
    if (event.data.hasOwnProperty('SQL_STATE') && parseInt(event.data.SQL_STATE) === fixedValues.sqlState.sqlUnchange) {
      event.data.SQL_STATE = fixedValues.sqlState.sqlUpdate;
    }

    if (this.totalColumns && this.totalColumns.indexOf(event.colDef.field) > -1) {
      this.onModelUpdated(event)
    }
    if (!this.requiredOptions.hasOwnProperty(event.colDef.field)) return;

    if (event.colDef.hasOwnProperty('cellEditorParams')) {
      if (event.colDef.cellEditorParams.hasOwnProperty('psAffectedCols')) {
        const psAffectedCols = event.colDef.cellEditorParams.psAffectedCols;
        for (let index = 0; index < psAffectedCols.length; index++) {
          const element = psAffectedCols[index];
          if (!this.requiredOptions.hasOwnProperty(element)) continue;
          this._value = event.node.data[element];
          const _result_ = this.callValidation(element, event.node);
          if (_result_.isValid) {
            const index = event['api']['psErrors'][element].indexOf(event.node.id);
            if (index >= 0) {
              event['api']['psErrors'][element].splice(index, 1);
            }
          } else {
            event['api']['psErrors'][element].push(event.node.id);
          }
          event.api.refreshCells({ rowNodes: [event.node], columns: [element] });

        }
      }
    }

    this._value = event.newValue;
    const _result_ = this.callValidation(event.colDef.field, event.node);
    if (_result_.isValid) {
      const index = event['api']['psErrors'][event.colDef.field].indexOf(event.node.id);
      if (index >= 0) {
        event['api']['psErrors'][event.colDef.field].splice(index, 1);
      }
    } else {
      event['api']['psErrors'][event.colDef.field].push(event.node.id);
    }
    event.api.refreshCells({ rowNodes: [event.node], columns: [event.colDef.field] });

  }
  suppressEnterDatePicker(params) {
    let KEY_ENTER = 13;
    let event = params.event;
    let key = event.which;
    let suppress = false;
    let isEnterKey = key === KEY_ENTER;

    if (isEnterKey) {
      event.stopPropagation(); // without this if enter key then call twice
      event.preventDefault();
      if (params.editing) {
        suppress = true;


        let currentCell = params.api.getFocusedCell();
        if (!currentCell) {
          return true;
        }
        let currentfield = currentCell.column.colId;
        let currentFieldIndex = null;

        let fieldList = params.api.columnController.columnDefs.map((element, index) => {
          if (element.field == currentfield) {

            currentFieldIndex = index;
          }
          return element.field;
        })

        params.api.tabToNextCell();
        params.api.setFocusedCell(currentCell.rowIndex, fieldList[currentFieldIndex], null);
        params.api.stopEditing();
      }
    }
    if (!suppress) {
      this.suppressCtrlArrow(params);
    }
    return suppress;



  }

  suppressEnter(params) {
    let KEY_ENTER = 13;
    let event = params.event;
    let key = event.which;
    let suppress = false;
    let isEnterKey = key === KEY_ENTER;

    if (isEnterKey) {
      event.stopPropagation(); // without this if enter key then call twice
      event.preventDefault();
      if (params.editing) {
        suppress = true;
        const selectedField = params.colDef.field;
        let selectedInstance = this.gridApi.getCellEditorInstances().find(x => {
          if (x.hasOwnProperty('_params') && x.hasOwnProperty('_agAwareComponent')) {
            return (x['_agAwareComponent'].params.colDef.field === selectedField)
          }
        });
        if (selectedInstance['_agAwareComponent'].psModalClick instanceof Function) {
          selectedInstance['_agAwareComponent'].psModalClick();
        }
      }
    }
    if (!suppress) {
      this.suppressCtrlArrow(params);
    }
    return suppress;
  }


  @HostListener('modelUpdated', ['$event'])
  private onModelUpdated(params) {
    if (this.totalColumns.length > 0 && params.api.pinnedRowModel.pinnedBottomRows.length > 0) {
      let totalColsObject = this.convertToTotalObject(this.totalColumns);
      params.api.forEachNodeAfterFilter(targetNode => {
        this.totalColumns.map(el => {
          totalColsObject[el] += (targetNode.data[el] && typeof (targetNode.data[el]) === 'number') ? targetNode.data[el] : 0;
        })
      });
      this.gridColumnTotalEmitter$.next(totalColsObject);
      this.totalColumns.forEach(element => {
        params.api.pinnedRowModel.pinnedBottomRows[0].setDataValue(element, totalColsObject[element]);
      });
    }
  }

  private convertToTotalObject(totalColsObject) {
    let resultObject = {};
    totalColsObject.map(el => {
      resultObject[el] = 0;
    });
    return resultObject;

  }

  // @HostListener('cellClicked', ['$event'])
  // private onCellClicked(params) {

  //   let event = params.event;
  //   const selectedField = params.colDef.field;    
  //   if( !params.data[selectedField] && this.gridApi.getCellEditorInstances().length > 0 && event.target.matches('.ps-modal-open-wrapper__text') ) {
  //     event.stopPropagation();
  //     event.preventDefault();
  //     let selectedInstance = this.gridApi.getCellEditorInstances().find(x=> {
  //       if(x.hasOwnProperty('_params') && x.hasOwnProperty('_agAwareComponent') ) {
  //         return (x['_agAwareComponent'].params.colDef.field === selectedField)
  //       }
  //     });
  //     if (selectedInstance['_agAwareComponent'].psModalClick instanceof Function) {
  //       selectedInstance['_agAwareComponent'].psModalClick();
  //     }
  //   }

  // }

  @HostListener('keydown', ['$event']) onKeyDown(event) {        
    if (event.key === 'ArrowUp' && event.ctrlKey === true ){
      event.stopPropagation();
      event.preventDefault();
      if (this.gridApi.getSelectedNodes().length == 0)
        return;

      let node = this.gridApi.getSelectedNodes()[this.gridApi.getSelectedNodes().length-1];
      let rowIndex = node.rowIndex;
      if (node.data.SQL_STATE == fixedValues.sqlState.sqlInsert) {
        this.gridApi.updateRowData({ remove: [node.data] });
      } else {
        node.data.SQL_STATE = fixedValues.sqlState.sqlDelete;
        this.gridApi['psRemove']();
      }
      if (this.gridApi.getDisplayedRowAtIndex(rowIndex)){
        this.gridApi.getDisplayedRowAtIndex(rowIndex).setSelected(true);
      }
    }
    if (event.key === 'ArrowDown' && event.ctrlKey === true) {
      event.stopPropagation();
      event.preventDefault();
     
      let faPlus = event.target.closest('.card').querySelector('.btn--add-new-grid');
      if (!faPlus) {
        faPlus = event.target.closest('.card').closest('.parent-card').querySelector('.btn--add-new-grid')
      }
      if (faPlus) {
        faPlus.click();
      }
    }
    if (event.key === 'F5' && event.shiftKey === true) {
      event.stopPropagation();
      event.preventDefault();
      if (this.gridApi['psGridDataList']().length <= 1 || this.gridApi.getSelectedNodes().length == 0) {
        return;
      }
      let selectRowIndex = this.gridApi.getSelectedNodes()[0].rowIndex;
      if (selectRowIndex == 0) {
        return;
      }

      // if (this.gridApi.getFocusedCell().column['colDef'].cellEditor === "modalCellEditor" || this.gridApi.getFocusedCell().column['colDef'].cellEditor === "selectCellEditor") {
      //   this.toast.info("Feature is not implement this field ", "Info");
      //   return;
      // }

      let nodeList = [];
      this.gridApi.forEachNode(node => {
        nodeList.push(node);
      });

      let selectedNode = this.gridApi.getSelectedNodes()[0];
      let copyFormNode = nodeList.find(node => {
        if (node.rowIndex == this.gridApi.getSelectedNodes()[0].rowIndex - 1) {
          return node;
        }
      });
      
      let columnName = this.gridApi.getFocusedCell().column['colDef'].field;
      if (this.gridApi.getFocusedCell().column['colDef'].cellEditor === "modalCellEditor" || this.gridApi.getFocusedCell().column['colDef'].cellEditor === "selectCellEditor") {
        let fieldList = this.gridApi.getFocusedCell().column['colDef']['copyAbleFields'] || [];                       
        fieldList.forEach(selectedNo => {          
          this.gridApi['columnController'].columnDefs.forEach(el =>{
            if( el.field == selectedNo ){              
              selectedNode.setDataValue(selectedNo, copyFormNode.data[selectedNo]);
            }else{
              selectedNode.data[selectedNo] = copyFormNode.data[selectedNo];
            }
          });
          // selectedNode.data[selectedNo] = copyFormNode.data[selectedNo];
          // selectedNode.setDataValue(selectedNo, copyFormNode.data[selectedNo]); 
        });
        this.gridTotalColumnUpdate(selectedNode);
      }

      selectedNode.setDataValue(columnName, copyFormNode.data[columnName]);
      this.gridApi['psSetCellValue']();
      
    }

    if (event.key === 'F6' && event.shiftKey === true) {
      event.stopPropagation();
      event.preventDefault();
      this.gridApi.stopEditing();
      setTimeout(() => {
        if (this.gridApi['psGridDataList']().length <= 1 || this.gridApi.getSelectedNodes().length == 0) {
          return;
        }
        let lastNodeIndex = this.gridApi.getSelectedNodes()[0].id;
        let selectRowIndex = this.gridApi.getSelectedNodes()[0].rowIndex;

        // this.gridApi.forEachNode(node=>{
        //   lastNodeIndex = node.id;
        // });
        let node = this.gridApi.getRowNode(lastNodeIndex);
        if (node.data.SQL_STATE != 1) {
          return;
        }
        this.gridApi.updateRowData({ remove: [node.data] });
        this.gridApi.getDisplayedRowAtIndex(selectRowIndex - 1).setSelected(true);
        let data = Object.assign({}, this.gridApi.getSelectedRows()[0]);
        if (data.hasOwnProperty('_PK') && data.hasOwnProperty('_ID')) {
          let _pk = data._PK;
          let _id = data._ID;
          data[_pk] = null;
          data[_id] = null;
          data['SQL_STATE'] = fixedValues.sqlState.sqlInsert;
          let deletedItem = 0;
          this.gridApi.forEachNode(node => {
            if ((node.data.SQL_STATE == fixedValues.sqlState.sqlDelete) && (selectRowIndex > node.rowIndex)) {
              deletedItem++;
            }
          });
          let validationResult = this.psValidate();
          if (validationResult.isValid) {
            let obj;
            if (this.gridApi.getSelectedNodes().length > 0) {
              obj = this.gridApi.updateRowData({ add: [data], addIndex: Number(this.gridApi.getSelectedNodes()[0].rowIndex) + ++deletedItem });
            } else {
              obj = this.gridApi.updateRowData({ add: [data] });
            }
            this.gridApi.ensureIndexVisible(obj.add[0].rowIndex);
            this.gridApi.getDisplayedRowAtIndex(obj.add[0].rowIndex).setSelected(true);
            let selectedColumndef = this.gridApi['columnController'].columnDefs.find(x => {

              if (x.editable != false) {
                return x;
              }
            });
            if (selectedColumndef) {
              setTimeout(() => {
                this.gridApi.startEditingCell({
                  rowIndex: obj.add[0].rowIndex,
                  colKey: selectedColumndef.field
                });
              }, 100);
            }
          }

        } else {
          this.toast.warning(this.langService.langData.featureIsNotImplementThisForm, this.langService.langData.warning);
        }
      }, 100);
    }
    return;
  }
  private gridTotalColumnUpdate(params) {
    if (this.totalColumns.length > 0 && params.gridApi.pinnedRowModel.pinnedBottomRows.length > 0) {
      let totalColsObject = this.convertToTotalObject(this.totalColumns);
      params.gridApi.forEachNodeAfterFilter(targetNode => {
        this.totalColumns.map(el => {
          totalColsObject[el] += (targetNode.data[el] && typeof (targetNode.data[el]) === 'number') ? targetNode.data[el] : 0;
        })
      });
      this.gridColumnTotalEmitter$.next(totalColsObject);
      this.totalColumns.forEach(element => {
       params.gridApi.pinnedRowModel.pinnedBottomRows[0].setDataValue(element, totalColsObject[element]);
      });
    }
  }

  // need to remove;
  public rowCopyBackupFunction(event) {
    if (event.key === 'F6' && event.shiftKey === true) {
      event.stopPropagation();
      event.preventDefault();
      this.clearFilters();
      this.gridApi.stopEditing();
      if (!this.gridApi.getSelectedRows()) {
        return;
      }
      let data = Object.assign({}, this.gridApi.getSelectedRows()[0]);
      if (data.hasOwnProperty('_PK') && data.hasOwnProperty('_ID')) {
        let _pk = data._PK;
        let _id = data._ID;
        data[_pk] = null;
        data[_id] = null;
        data['SQL_STATE'] = fixedValues.sqlState.sqlInsert;
        setTimeout(() => {
          let validationResult = this.psValidate();
          if (validationResult.isValid) {
            let obj = this.gridApi.updateRowData({ add: [data] });
            this.gridApi.ensureIndexVisible(obj.add[0].rowIndex);
            this.gridApi.getDisplayedRowAtIndex(obj.add[0].rowIndex).setSelected(true);
          }
        }, 100);
      } else {
        this.toast.warning(this.langService.langData.featureIsNotImplementThisForm, this.langService.langData.warning);
      }
    }
  }



  public psValidate() {
    this.validationResult["validationSummaryMsgs"].length = 0;
    this.validationResult.isValid = true;
    const validationKeys = Object.keys(this.requiredOptions);
    for (let index = 0; index < validationKeys.length; index++) {
      const element = validationKeys[index];
      this.gridApi['psErrors'][element] = [];
    }
    this.gridApi.forEachNode(node => {
      if (node.data.hasOwnProperty('SQL_STATE') && (parseInt(node.data.SQL_STATE) === fixedValues.sqlState.sqlDelete)) { }
      else {
        for (let index = 0; index < validationKeys.length; index++) {
          const element = validationKeys[index];
          if (node.data.hasOwnProperty(element)) {
            this._value = node.data[element];
            const _result_ = this.callValidation(element, node);
            if (_result_.isValid) {
              const index = this.gridApi['psErrors'][element].indexOf(node.id);
              if (index >= 0) {
                this.gridApi['psErrors'][element].splice(index, 1);
              }
            } else {
              this.validationResult["validationSummaryMsgs"].push(_result_);
              this.validationResult.isValid = false;
              this.gridApi['psErrors'][element].push(node.id);
            }
            this.gridApi.refreshCells({ rowNodes: [node], columns: [element] })
          }
        }
      }

    });
    return this.validationResult;

  }

  public isExternalFilterPresent() {
    return true;
  }

  public doesExternalFilterPass(node) {
    if (node.data.hasOwnProperty('SQL_STATE') && (parseInt(node.data.SQL_STATE) === fixedValues.sqlState.sqlDelete)) return false;
    else return true;
  }

  clearFilters() {
    this.gridApi.setFilterModel(null);
    this.gridApi.onFilterChanged();

  }

  public psRemove() {
    this.gridApi.onFilterChanged();
  }

  public psResetValidation() {
    const validationKeys = Object.keys(this.requiredOptions);
    for (let index = 0; index < validationKeys.length; index++) {
      const element = validationKeys[index];
      this.gridApi['psErrors'][element] = [];
      this.gridApi.refreshCells({ columns: [element] })
    }

  }

  public markAsChange(data) {
    if (data.hasOwnProperty('SQL_STATE') && (parseInt(data.SQL_STATE) === fixedValues.sqlState.sqlUnchange)) {
      data.SQL_STATE = fixedValues.sqlState.sqlUpdate;
    };
    return data;
  }

  public getChangeList() {
    let list = [];
    this.gridApi['psRemoveIds'] = [];
    this.gridApi.forEachNode(node => {
      if (parseInt(node.data.SQL_STATE) === fixedValues.sqlState.sqlDelete) {
        this.gridApi['psRemoveIds'].push(node.id);
      }
      if (parseInt(node.data.SQL_STATE) !== fixedValues.sqlState.sqlUnchange) {
        node.data['PS_NODE_ID'] = node.id;
        list.push(node.data);
      }
    });
    return list;
  }

  public resetGrid(entityModel, dataList) {
    this.gridApi['psClearFilter']();
    this.gridApi.stopEditing();
    setTimeout(() => {

      let list = Array<typeof entityModel>();
      list = dataList.map(element => {
        element['SQL_STATE'] = fixedValues.sqlState.sqlUnchange;
        return new entityModel(element);
      });
      this.gridApi.setRowData( list );

    }, 10);
  }

  public addNewGrid(classObject, dataObj, fieldPosition?) {
    this.gridApi['psClearFilter']();
    this.gridApi.stopEditing();
    setTimeout(() => {
      let validationResult = this.gridApi['psValidate']();
      let deletedItem = 0;
      this.gridApi.forEachNode(node => {
        if ((node.data.SQL_STATE == fixedValues.sqlState.sqlDelete) && ((this.gridApi.getSelectedNodes().length && this.gridApi.getSelectedNodes()[0].rowIndex) > node.rowIndex)) {
          deletedItem++;
        }
      })

      if (validationResult.isValid) {
       // debugger;
        let obj;
        if (this.gridApi.getSelectedNodes().length > 0) {
          let addIndex = Number(this.gridApi.getSelectedNodes()[0].rowIndex) + ++deletedItem;
          console.log("posIndex", addIndex);
          obj = this.gridApi.updateRowData({ add: [new classObject(dataObj)], addIndex: addIndex});
        } else {
          obj = this.gridApi.updateRowData({ add: [new classObject(dataObj)] });
        }

        this.gridApi.ensureIndexVisible(obj.add[0].rowIndex);
        this.gridApi.getDisplayedRowAtIndex(obj.add[0].rowIndex).setSelected(true);
        console.log("obj", obj);
        setTimeout(() => {
          this.gridApi.startEditingCell({
            rowIndex: obj.add[0].rowIndex,
            colKey: this.gridApi['columnController'].columnDefs[fieldPosition ? fieldPosition : 0].field
          });

        }, 100);
      }
    }, 100);
  }

  // Remove row in sited the Grid 
  public removeGrid(row) {   
    let status = false;
    if (row.data.SQL_STATE == fixedValues.sqlState.sqlInsert) {
      this.gridApi.updateRowData({ remove: [row.data] });
    } else {        
      row.data.SQL_STATE = fixedValues.sqlState.sqlDelete;       
      this.gridApi['psRemove']();
      status = true;
    } 
    return status;  
  }

  public addNewGridWithReturnObj(classObject, dataObj, fieldPosition?) {
    var promise = new Promise((resolve, reject) => {
      this.gridApi['psClearFilter']();
      this.gridApi.stopEditing();

      setTimeout(() => {
        let validationResult = this.gridApi['psValidate']();
        let deletedItem = 0;
        this.gridApi.forEachNode(node => {
          if ((node.data.SQL_STATE == fixedValues.sqlState.sqlDelete) && (this.gridApi.getSelectedNodes()[0].rowIndex > node.rowIndex)) {
            deletedItem++;
          }
        })

        if (validationResult.isValid) {
          let obj;
          if (this.gridApi.getSelectedNodes().length > 0) {
            obj = this.gridApi.updateRowData({ add: [new classObject(dataObj)], addIndex: Number(this.gridApi.getSelectedNodes()[0].rowIndex) + ++deletedItem });
          } else {
            obj = this.gridApi.updateRowData({ add: [new classObject(dataObj)] });
          }
          this.gridApi.ensureIndexVisible(obj.add[0].rowIndex);
          this.gridApi.getDisplayedRowAtIndex(obj.add[0].rowIndex).setSelected(true);
          setTimeout(() => {
            this.gridApi.startEditingCell({
              rowIndex: obj.add[0].rowIndex,
              colKey: this.gridApi['columnController'].columnDefs[fieldPosition ? fieldPosition : 0].field
            });
            resolve(obj.add[0]);
          }, 100);
        }
      }, 100);
    });
    return promise;
  }

  public updateList(list, classObject?: any) {
    for (let index = 0; index < this.gridApi['psRemoveIds'].length; index++) {
      const element = this.gridApi['psRemoveIds'][index];
      const data = this.gridApi.getRowNode(element).data;
      this.gridApi.updateRowData({ remove: [data] });
    }

    for (let index = 0; index < list.length; index++) {
      let element = list[index];
      try {
        element['SQL_STATE'] = fixedValues.sqlState.sqlUnchange;
        if (classObject) {
          try {
            element = new classObject(element);
          } catch (error) { }
        }
        this.gridApi.getRowNode(element['PS_NODE_ID']).updateData(element);
      } catch (error) { }
    }
  }

  public getAllData() {
    let list = [];
    this.gridApi.forEachNode(node => {
      list.push(node.data);
    });
    return list;
  }

  private callValidation(_validationKey, node): any {
    const _option = this.requiredOptions[_validationKey];
    this._errorText = "";
    let _valid = true;
    if (!this._isUndefinedOrNull(_option)) {
      if (this._value !== undefined && this._value !== null && this._value.toString().length > 0) {
        if (_option.hasOwnProperty("email")) {
          _valid = (_valid && this.validateEmail(this._value));
        }
        if (_option.hasOwnProperty("size")) {
          _valid = (_valid && this.sizeValidator(_option["size"]));
        }
        if (_option.hasOwnProperty("range")) {
          _valid = (_valid && this.rangeValidator(_option["range"]));
        }
        if (_option.hasOwnProperty("pattern")) {
          _valid = (_valid && this.patternValidator(_option["pattern"]));
        }
      }
      else if (_option.hasOwnProperty("required")) {
        _valid = (_valid && this.requiredValidator(_option["required"]));
      }

      if (_option.hasOwnProperty("custom")) {
        _valid = (_valid && this.customValidator(_option["custom"], node));
      }
    }
    this._result.fieldName = _validationKey;
    this._result.isValid = _valid;
    this._result.validationSummary = this._errorText;
    return this._result;
  }

  private _isUndefinedOrNull(_option): boolean {
    return (_option === undefined || _option === null);
  }

  public hasChanged(rowIndex) {
    const node = this.selectedNode();
    if (node) {
      return this.getChangeList().length > 0 && rowIndex !== node.rowIndex;
    }
    return false;
  }

  public selectedNode() {
    const sltdList = this.gridApi.getSelectedNodes();
    if (sltdList.length > 0) {
      return sltdList[0];
    }
    return null;
  }

  public getCellEditorInstance(column) {
    const node = this.selectedNode();
    if (node) {
      let instArr = this.gridApi.getCellEditorInstances({ columns: [column] });
      if (instArr.length > 0) {
        return instArr[0];
      }
    }
    return null;
  }

  public setReadonly(column, value) {
    const node = this.selectedNode();
    if (node) {
      const inst = this.getCellEditorInstance(column);
      if (inst) {
        inst['_agAwareComponent'].psReadonly = value;
        return true;
      }
    }
    return false;
  }

  public setSelectedAfterRemove(result?): boolean {
    if (result && result.hasOwnProperty('remove') && result['remove'].length > 0) {
      const removedNode = result['remove'][0];
      const rowNode = this.gridApi.getModel().getRow(removedNode.rowIndex);
      if (rowNode) {
        rowNode.setSelected(true);
        return true;
      }
    }
    return false;
  }

  public setCellValue() {
    // this.setCellFocus(); // depericated focused on set value
    this.setChangedValues();
  }

  public setChangedValues() {
    const selectedField = this.gridApi.getFocusedCell()['column']['colDef'].field;
    let selectedInstance = this.gridApi.getCellEditorInstances({ columns: [selectedField] }).find(x => {
      if (x.hasOwnProperty('_params') && x.hasOwnProperty('_agAwareComponent')) {
        return (x['_agAwareComponent'].params.colDef.field === selectedField)
      }
      return false;
    });

    if (selectedInstance) {
      if (selectedInstance['_agAwareComponent'].setCellValue instanceof Function) {
        selectedInstance['_agAwareComponent'].setCellValue();
      }
      const psAffectedCols = selectedInstance['_agAwareComponent'].psAffectedCols;
      if (psAffectedCols.length > 0) {
        this.gridApi.getCellEditorInstances({ columns: psAffectedCols }).forEach(x => {
          if (x.hasOwnProperty('_params') && x.hasOwnProperty('_agAwareComponent')) {
            if (x['_agAwareComponent'].setCellValue instanceof Function) {
              x['_agAwareComponent'].setCellValue();
            }
          }
        });
      }
    }
  }

  public setCellFocus() {
    const selectedField = this.gridApi.getFocusedCell()['column']['colDef'].field;
    let selectedInstance = this.gridApi.getCellEditorInstances().find(x => {
      if (x.hasOwnProperty('_params') && x.hasOwnProperty('_agAwareComponent')) {
        return (x['_agAwareComponent'].params.colDef.field === selectedField)
      }
      return false;
    });

    if (selectedInstance && selectedInstance.hasOwnProperty('_agAwareComponent') && selectedInstance['_agAwareComponent'].setCellFocus instanceof Function) {
      selectedInstance['_agAwareComponent'].setCellFocus();
    }
  }
}
