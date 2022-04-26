import { Component, AfterViewInit, ViewContainerRef, ViewChild, HostListener } from '@angular/core';
import { ICellEditorAngularComp } from '@ag-grid-community/angular';

@Component({
    selector: 'ps-checkbox-cell-editor',
    template: `<div class="d-flex justify-content-center">
    <label class="custom-control custom-checkbox custom-control--without-label">
     <input [attr.data-action-type]="psActionType" [disabled]="psReadonly" #input class="custom-control-input" (change)="onChange($event.target.checked)" [checked]="value === psCheckedData" type="checkbox">
       <span class="custom-control-label"></span>
    </label>
   </div>`
})
export class CheckboxCellEditorComponent implements ICellEditorAngularComp, AfterViewInit {

    @ViewChild('input', { read: ViewContainerRef, static: true }) public input;

    params;
    public value: any;
    public psCheckedData: string | number = '1';
    private checkedValue:string | number = '1';
    private uncheckedValue:string | number = '0';
    public psCellType: string = "checkbox";
    private valueType: string = "number"
    public psAffectedCols = [];
    private psCallbackAfterChange;
    public psReadonly = false;
    public psActionType: string = "psActionType";

    agInit(params): void {

        this.params = params;
        if (params.value !== undefined) {
            this.valueType = typeof(this.params.value);
            this.value = this.params.value.toString();
        }
        switch (this.value.toLowerCase) {
            case 'y':
                this.checkedValue = 'Y';
                this.uncheckedValue = 'N'
                break;
            case 'n':
                this.checkedValue = 'N';
                this.uncheckedValue = 'Y'
                break;
            case '1':
                this.checkedValue = '1';
                this.uncheckedValue = '0';
                break;
            case '0':
                this.checkedValue = '0';
                this.uncheckedValue = '1';
                break;
            default:
                break;
        }
        
        if(this.params.colDef.hasOwnProperty('cellEditorParams')) {
            if(this.params.colDef.cellEditorParams.hasOwnProperty('psCheckedData')) {
                this.psCheckedData = this.params.colDef.cellEditorParams.psCheckedData.toString();
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
        if(this.valueType === 'number') {
            return parseInt(this.value);
        }
        return this.value;
    }

    onChange(value) {
        
        this.value = (value)? this.checkedValue: this.uncheckedValue;
        this.params.value = this.value;
        if(this.psCallbackAfterChange instanceof Function) {
            this.psCallbackAfterChange(this.params);
        }
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
        window.setTimeout(() => {
            if(this.params.cellStartedEdit) {
                this.input.element.nativeElement.focus();
            }
        })
    }


    focusIn():boolean {
        this.input.element.nativeElement.focus();
        return true;
    }
}
