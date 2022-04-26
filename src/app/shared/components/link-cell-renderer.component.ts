import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';

@Component({
    selector: 'ps-link-cell-renderer',
    template: `
    <div class="input-group">
        <input class="ps-grid-text-cell text-primary form-control" (click)="onClick()" readonly type="text" #input [(ngModel)]="value">
        <div class="input-group-append">
        <button type="button" [attr.data-action-type]="psReadonly?null:psActionType" [disabled]="psReadonly" class="btn hover-primary  btn--squire border-0"><i [attr.data-action-type]="psReadonly?null:psActionType" class="fa fa-link"></i></button>
        </div>
    </div>
  `
})
export class LinkCellRendererComponent implements ICellRendererAngularComp {

    @ViewChild('input', { read: ViewContainerRef, static: true }) public input;

    params;
    text: string;
    public value: any = null;
    public psReadonly = false;
    public psActionType: string = "psActionType";

    agInit(params): void {

        this.params = params;
        if (params.value !== undefined) {
            this.value = this.params.value;
        }
        if (this.params.colDef.hasOwnProperty('cellEditorParams')) {
            if (this.params.colDef.cellEditorParams.hasOwnProperty('psReadonly')) {
                let readOnly = this.params.colDef.cellEditorParams.psReadonly;
                if (readOnly instanceof Function) {
                    this.psReadonly = readOnly(this.params);
                } else this.psReadonly = readOnly;
            }

            if (this.params.colDef.cellEditorParams.hasOwnProperty('psActionType')) {
                this.psActionType = this.params.colDef.cellEditorParams.psActionType.toString();
            }
        }
    }

    refresh(params?: any): boolean {
        this.params = params;
        this.value = this.params.value;
        return true;
    }

    getValue(): any {
        return this.value;
    }

    onClick() {
        this.input.element.nativeElement.focus();
        this.input.element.nativeElement.select();
    }


}
