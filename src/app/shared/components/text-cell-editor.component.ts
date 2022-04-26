import { ICellEditorAngularComp } from "@ag-grid-community/angular";
import {AfterViewInit, Component, ViewChild, ViewContainerRef, HostListener} from "@angular/core";



@Component({
    selector: 'ps-text-cell',
    template: `<input [attr.data-action-type]="psActionType" [readonly]="psReadonly" [psMax] = "psTextMax" type="text" style="width:100%;" class="text-left" #input (ngModelChange)="onChange($event)" [(ngModel)]="value">`,
})
export class TextCellEditorComponent implements ICellEditorAngularComp, AfterViewInit {
    private params: any;
    public psTextMax = 4000;
    public value: number;
    public psCellType = "text";
    public psAffectedCols = [];
    private psCallbackAfterChange;
    public psReadonly = false;
    public psActionType: string = "psActionType";
    @ViewChild('input', {read: ViewContainerRef, static: true}) public input;


    agInit(params: any): void {
        this.params = params;
        if (params.charPress) {
            this.value = params.charPress;
        } else if (params.value !== undefined) {
            this.value = params.value;
        };
        if (this.params.colDef.hasOwnProperty('cellEditorParams')) {
            if(this.params.colDef.cellEditorParams.hasOwnProperty('psAffectedCols')) {
                this.psAffectedCols = this.params.colDef.cellEditorParams.psAffectedCols;
            }
            if(this.params.colDef.cellEditorParams.hasOwnProperty('psMax')) {
                this.psTextMax = this.params.colDef.cellEditorParams.psMax;
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

    // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
    ngAfterViewInit() {
        window.setTimeout(() => {
            if(this.params.cellStartedEdit) {
                this.input.element.nativeElement.focus();
            }
        })
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
    }

    focusIn():boolean {
        this.input.element.nativeElement.focus();
        return true;
    }

    onChange(event) {
        this.params.value = this.value;
        this.params.node.setDataValue(this.params.colDef.field, this.value);
        if(this.psCallbackAfterChange instanceof Function) {
            this.psCallbackAfterChange(this.params);
        }
    }
}