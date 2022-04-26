import { Component, OnInit, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import { IHeaderAngularComp } from '@ag-grid-community/angular';

@Component({
  selector: 'ps-checkbox-cell-header',
  template: `<div class="d-flex justify-content-center">
  <label class="custom-control custom-checkbox custom-control--without-label">
   <input #input class="custom-control-input" (click)="onClick($event)" (change)="onChange($event.target.checked)" [checked]="value === psCheckedData" type="checkbox">
     <span class="custom-control-label"></span>
  </label>
 </div>`
})
export class CheckboxCellHeaderComponent implements OnInit, IHeaderAngularComp, OnDestroy {
  @ViewChild('input', { read: ViewContainerRef, static: true }) public input;
  params;
  public value: any;
  public psCheckedData = '1';
  private checkedValue = '1';
  private uncheckedValue = '0';
  public psCellType: string = "checkbox";
  private valueType: string = "number"
  public psAffectedCols = [];

  constructor() { }

  ngOnInit() {
  }

  agInit(params): void {
    console.log(params);
    this.params = params;
    

    if (this.params.column.colDef.hasOwnProperty('cellEditorParams')) {
      if (this.params.column.colDef.cellEditorParams.hasOwnProperty('psCheckedData')) {
        this.psCheckedData = this.params.column.colDef.cellEditorParams.psCheckedData.toString();
      }
      if (this.params.column.colDef.cellEditorParams.hasOwnProperty('psAffectedCols')) {
        this.psAffectedCols = this.params.column.colDef.cellEditorParams.psAffectedCols;
      }
    }
    this.valueType = typeof (this.psCheckedData);
    switch (this.psCheckedData.toLowerCase()) {
      case 'y':
        this.checkedValue = 'Y';
        this.uncheckedValue = 'N'
        break;
      case '1':
        this.checkedValue = '1';
        this.uncheckedValue = '0';
        break;
      default:
        break;
    }
    this.value = this.uncheckedValue;
    this.params.api.addEventListener("cellValueChanged", this.columnValueChangedListener.bind(this));
    this.params.api.addEventListener("filterChanged", this.filterChangedListener.bind(this));
    this.params.api.addEventListener("rowDataChanged", this.rowDataChangedListener.bind(this));
    this.getTotalRow();
    
  }

  columnValueChangedListener(_params) {
    if(_params && _params.hasOwnProperty('colDef')) {
      if(_params.colDef.field !== this.params.column.colDef.field) {
        return;
      }
      console.log('Changed found for this column', _params);
    }
  }

  rowDataChangedListener(logs) {
    this.getTotalRow();
    console.log('rowDataChangedListener', logs);
  }

  filterChangedListener(logs) {
    this.getTotalRow();
    console.log('filterChangedListener', logs);
  }

  onClick(event) {
    this.getTotalRow();
    
    if(this.params.api.getCellEditorInstances().length > 0) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  getTotalRow() {
    const total = this.params.api.paginationGetRowCount();
    console.log(`Total Row:${total}`);
    return total;
    
  }

  onChange(value) {
    console.log(this.params, value);
    
  }

  ngOnDestroy() {
    this.params.api.removeEventListener("columnValueChanged", this.columnValueChangedListener);
    this.params.api.removeEventListener("filterChanged", this.filterChangedListener);
  }
  

}
