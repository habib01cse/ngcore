import { Component, AfterViewInit, ViewContainerRef } from '@angular/core';
import { ICellEditorAngularComp } from '@ag-grid-community/angular';
import { ViewChild } from '@angular/core';

@Component({
    selector: 'ps-modal-cell-editor',
    template: `<div class="ps-modal-open-wrapper">
    <input #input (click)="onClicked()" class="ps-modal-open-wrapper__text form-control" type="text" readonly [value]="value">
    <div class="ps-modal-open-wrapper__button">
      <button (click)="onModalButtonClcik($event)" [disabled]="psReadonly" #button type="button" class="btn btn--squire" [attr.data-action-type]="psReadonly?null:psActionType"><i class="fa fa-folder-open-o"  [attr.data-action-type]="psReadonly?null:psActionType"></i></button>
    </div>
  </div>`
})
export class ModalCellEditorComponent implements ICellEditorAngularComp, AfterViewInit {

    @ViewChild('button', { read: ViewContainerRef, static: true }) public button;
    @ViewChild('input', { read: ViewContainerRef, static: true }) public input;
    public psActionType: string = "psActionType";

    params;
    public value: any;
    public psCellType = "modal";
    public psAffectedCols = [];
    public psReadonly = false;

    agInit(params): void {
        this.params = params;
        if (params.value !== undefined) {
            this.value = this.params.value;
        }
        if(this.params.colDef.hasOwnProperty('cellEditorParams')) {
            this.psActionType = params.colDef.cellEditorParams.psActionType;
            if(this.params.colDef.cellEditorParams.hasOwnProperty('psActionType')) {
                this.psActionType = this.params.colDef.cellEditorParams.psActionType.toString();
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
        }
        // this.label = this.params.label || null;
    }

    getValue(): any {
        return this.value;
    }

    setCellValue(): any {

        this.value = this.params.data[this.params.colDef.field];
        this.params.value = this.value;
        
        if(this.params.colDef.hasOwnProperty('cellEditorParams')) {
            if(this.params.colDef.cellEditorParams.hasOwnProperty('psReadonly')) {
                let readOnly = this.params.colDef.cellEditorParams.psReadonly;
                if (readOnly instanceof Function) {
                    this.psReadonly = readOnly(this.params);
                } else this.psReadonly = readOnly;
            }
        }
        if(this.params.colDef.field === this.params.api.getFocusedCell()['column']['colDef'].field) {
            window.setTimeout(() => {
                this.setCellFocus();
            }, 100);
        }
    }

    setCellFocus() {
        this.params.api.setFocusedCell(this.params.rowIndex, this.params.colDef.field);
        this.input.element.nativeElement.select();
    }

    onChange($event) {
        this.params.setValue(this.value)
        if (this.params.onChange instanceof Function) {
            // put anything into params u want pass into parents component
            const params = {
                event: $event,
                rowData: this.params.node.data
                // ...something
            }
            this.params.onChange(params);

        }
    }
    
    ngAfterViewInit() {
        window.setTimeout(() => {
            if (this.params.cellStartedEdit) {
                this.setCellFocus();
            }
        })
    }

    public onClicked() {
        if(!this.value) {
            this.psModalClick();
        } else {
            this.setCellFocus();
        }
    }

    public psModalClick() {
        if(!this.psReadonly) this.button.element.nativeElement.click();
        
    }

    onModalButtonClcik($event) {        
        if(this.psReadonly) {
            $event.stopPropagation();
            $event.preventDefault();
        }
        return;
    }

    focusIn():boolean {
        this.input.element.nativeElement.select();
        return true;
    }
}
