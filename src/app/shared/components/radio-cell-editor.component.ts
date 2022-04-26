import { Component, AfterViewInit, ViewContainerRef } from '@angular/core';
import { ICellEditorAngularComp } from '@ag-grid-community/angular';
import { ViewChild } from '@angular/core';

@Component({
    selector: 'ps-radio-cell-editor',
    template: `<label class="custom-control custom-radio custom-control--without-label">
                    <input [attr.data-action-type]="psActionType" [disabled]="psReadonly" #input class="custom-control-input" (change)="onChange($event.target.checked)" [checked]="value === psCheckedData" type="radio">
                    <span class="custom-control-label text-nowrap"></span>
                </label>`
})
export class RadioCellEditorComponent implements ICellEditorAngularComp, AfterViewInit {
    params;
    public value: any;
    public psCheckedData: string | number = '1';
    public psCellType = "radio";
    public psAffectedCols = [];
    public psReadonly = false;
    public psActionType: string = "psActionType";
    @ViewChild('input', { read: ViewContainerRef, static: true }) public input;

    agInit(params): void {

        this.params = params;
        if (params.value !== undefined) {
            this.value = this.params.value.toString();
        }
        if(this.params.colDef.hasOwnProperty('cellEditorParams')) {
            if(this.params.colDef.cellEditorParams.hasOwnProperty('psCheckedData')) {
                this.psCheckedData = this.params.colDef.cellEditorParams.psCheckedData.toString();
            }
            if(this.params.colDef.cellEditorParams.hasOwnProperty('psAffectedCols')) {
                this.psAffectedCols = this.params.colDef.cellEditorParams.psAffectedCols;
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

    onChange(value) {
        
        this.value = (value)? this.psCheckedData: '';
        this.params.value = this.value;        
        // psSetChangedValues
    }

    setCellValue(): any {
        this.value=this.params.data[this.params.colDef.field].toString();
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
        // window.setTimeout(() => {
        //     this.select.element.nativeElement.focus();
        // })
    }

    trackByFn(index, item) {
        return index; // or item.id
    }

    focusIn():boolean {
        this.input.element.nativeElement.focus();
        return true;
    }
}
