import { ICellEditorAngularComp } from "@ag-grid-community/angular";
import {AfterViewInit, Component, ViewChild, ViewContainerRef, HostListener} from "@angular/core";

import { globalVariables } from 'src/app/core/constants/globalVariables';

@Component({
    selector: 'ps-date-cell',
    template: `
    <input [attr.data-action-type]="psActionType" disabled #input type="text" class="form-control" 
        [(ngModel)]="value"
        (ngModelChange)="onChange($event)"
        [bsConfig]="psDateTimeFormat" 
        [isOpen]="isOpen"
        psDatepicker autocomplete="off">
    `,
})
// readonly]="psReadonly"
export class DateTimeCellEditorComponent implements ICellEditorAngularComp, AfterViewInit {
    private params: any;
    public value: any;
    public isOpen: boolean;
    public psDateTimeFormat:string= globalVariables.psDateTimeFormat;
    public psCellType = "date";
    public psAffectedCols = [];
    private psCallbackAfterChange;
    public psReadonly = false;
    public psActionType: string = "psActionType";

    @ViewChild('input', {read: ViewContainerRef, static: true}) public input;


    agInit(params: any): void {
        this.params = params;        
        if (params.value !== undefined) {
            this.value = params.value;
        }
        
        if(this.params.colDef.hasOwnProperty('cellEditorParams')) {
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

    isCancelBeforeStart(): boolean {
        return false;
        // return this.cancelBeforeStart;
    }

    onKeyDown(event): void {
        console.warn(event, this.isKeyPressedNumeric(event));
        
        if (this.isKeyPressedNavigation(event)) {
            event.stopPropagation();
        }
    }

    onChange(event) {
        this.value = event;
        this.params.value = this.value;
        if(this.psCallbackAfterChange instanceof Function) {
            this.psCallbackAfterChange(this.params);
        }
        this.input.element.nativeElement.focus();
        
    }

    stopEditing() {
        this.params.api.stopEditing();
    }

    @HostListener('paste', ['$event']) blockPaste(event) {

        try {
            if(!this.isCharNumeric(event.clipboardData.getData('text'))) {
                if (event.preventDefault) event.preventDefault();
            }
        } catch (error) {
            event.preventDefault();
        }
    }

    // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
    ngAfterViewInit() {        
        window.setTimeout(() => {
            if(this.params.cellStartedEdit) 
            {
                this.input.element.nativeElement.focus();
                this.isOpen = true;
            }
        })
    }
    
    isPopup(): boolean {
        return false;
    }

    setCellValue(): any {
        this.value= this.params.data[this.params.colDef.field];
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
        this.isOpen = true;
        return true;
    }

    focusOut(): boolean {
        this.isOpen = false;
        return true;
    }

    private getCharCodeFromEvent(event): any {
        event = event || window.event;
        return (typeof event.which == "undefined") ? event.keyCode : event.which;
    }

    private isCharNumeric(charStr): boolean {
        return !!/\d/.test(charStr);
    }

    private isKeyPressedNumeric(event): boolean {
        const charCode = this.getCharCodeFromEvent(event);
        const charStr = event.key ? event.key : String.fromCharCode(charCode);
        return this.isCharNumeric(charStr);
    }

    private isKeyPressedNavigation (event): boolean {
        return event.keyCode===13
    };
}