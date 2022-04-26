import { Component, AfterViewInit, ViewContainerRef } from '@angular/core';
import { ICellEditorAngularComp } from '@ag-grid-community/angular';
import { ViewChild } from '@angular/core';

@Component({
    selector: 'ps-select-cell-editor',
    template: `
        <select [attr.data-action-type]="psActionType" [disabled]="psReadonly" #select [(ngModel)]="value" (change)="onChange($event)" class="form-control grid-editor-select">
        <option
            *ngFor="let item of optionList; let i = index; trackBy:trackByFn;"
            [value]="item.VALUE">{{item.TEXT}}
        </option>
      </select>
  `
})
export class SelectCellEditorComponent implements ICellEditorAngularComp, AfterViewInit {

    @ViewChild('select', { read: ViewContainerRef, static: true }) public select;

    params;
    // label: string;
    public value: any;
    public optionList: any = [];
    public psCellType = "select";
    public psAffectedCols = [];
    private psCallbackAfterChange;
    public psReadonly = false;
    public psActionType: string = "psActionType";

    agInit(params): void {

        this.params = params;
        if (params.value !== undefined) {
            this.value = this.params.value;
        }
        if(this.params.colDef.hasOwnProperty('params')) {
            this.optionList = this.params.colDef.params;
        }
        if(this.params.colDef.hasOwnProperty('cellEditorParams')) {
            if(this.params.colDef.cellEditorParams.hasOwnProperty('list')) {
                this.optionList = this.params.colDef.cellEditorParams.list;
            }
            if(this.params.colDef.cellEditorParams.hasOwnProperty('psAffectedCols')) {
                this.psAffectedCols = this.params.colDef.cellEditorParams.psAffectedCols;
            }
            if(this.params.colDef.cellEditorParams.hasOwnProperty('psCallbackAfterChange')) {
                this.psCallbackAfterChange = this.params.colDef.cellEditorParams.psCallbackAfterChange;
            }
            if(this.params.colDef.cellEditorParams.hasOwnProperty('psReadonly')) {
                let readOnly = this.params.colDef.cellEditorParams.psReadonly;
                if (readOnly instanceof Function) {
                    this.psReadonly = readOnly(this.params);
                } else this.psReadonly = readOnly;
            }
            if(this.params.colDef.cellEditorParams.hasOwnProperty('psActionType')) {
                this.psActionType = this.params.colDef.cellEditorParams.psActionType.toString();
            }
        }
    }

    getValue(): any {
        return this.value;
    }

    onChange(event) {
        this.params.value = this.value;
        this.params.node.setDataValue(this.params.colDef.field, this.value);
        if(this.psCallbackAfterChange instanceof Function) {
            this.psCallbackAfterChange(this.params);
        }
    }

    setCellValue(): any {
        this.value=this.params.data[this.params.colDef.field];
        this.params.value = this.value;
        if(this.params.colDef.hasOwnProperty('cellEditorParams')) {
            if(this.params.colDef.cellEditorParams.hasOwnProperty('psReadonly')) {
                let readOnly = this.params.colDef.cellEditorParams.psReadonly;
                if (readOnly instanceof Function) {
                    this.psReadonly = readOnly(this.params);
                } else this.psReadonly = readOnly;
            }
        }
    }

    ngAfterViewInit() {
        window.setTimeout(() => {
            if(this.params.cellStartedEdit) {
                this.select.element.nativeElement.focus();
            }
        })
    }

    focusIn():boolean {
        this.select.element.nativeElement.focus();        
        return true;
    }

    trackByFn(index, item) {
        return index; // or item.id
    }
}
