import { AfterViewInit, Component, ViewChild, ViewContainerRef, HostListener, ElementRef } from "@angular/core";

import { ICellEditorAngularComp } from "@ag-grid-community/angular";
import { globalVariables } from 'src/app/core/constants/globalVariables';

@Component({
    selector: 'ps-time-cell',
    template: `
    <timepicker [attr.data-action-type]="psActionType" [readonlyInput]="psReadonly" (keydown)="onKeyDown($event)" [(ngModel)]="value" [mousewheel]="false" (ngModelChange)="onChange($event)" [showMeridian]="isMeridian"></timepicker>
    `,
})
export class TimeCellEditorComponent implements ICellEditorAngularComp, AfterViewInit {
    private params: any;
    public value: any;
    public isOpen: boolean;
    public psDateFormat: string = globalVariables.psDateFormat;
    public psCellType = "time";
    public psAffectedCols = [];
    public isMeridian: boolean = false;
    private psCallbackAfterChange;
    public psReadonly = false;
    public psActionType: string = "psActionType";
    public rowPinned;

    @ViewChild('input', { read: ViewContainerRef, static: true }) public input;

    constructor(private el: ElementRef) {

    }


    agInit(params: any): void {
        this.params = params;

        if (params.value !== undefined) {
            this.value = params.value;
        }

        if (this.params.colDef.hasOwnProperty('cellEditorParams')) {
            if(this.params.colDef.cellEditorParams.hasOwnProperty('psAffectedCols')) {
                this.psAffectedCols = this.params.colDef.cellEditorParams.psAffectedCols;
            }
            if(this.params.colDef.cellEditorParams.hasOwnProperty('psCallbackAfterChange')) {
                this.psCallbackAfterChange = this.params.colDef.cellEditorParams.psCallbackAfterChange;
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
        // Allow: Delete, backspace, tab, escape, enter, end, home, left, right
        if ([46, 8, 27, 35, 36, 37, 39].indexOf(event.keyCode) !== -1 ||
            // Allow: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) ||
            // Allow: Ctrl+C
            (event.keyCode == 67 && event.ctrlKey === true) ||
            // Allow: Ctrl+V
            (event.keyCode == 86 && event.ctrlKey === true) ||
            // Allow: Ctrl+X
            (event.keyCode == 88 && event.ctrlKey === true)) {
            return;
        }
        if(event.keyCode == 9) {
            if(event.target.placeholder == "HH") {
                event.stopPropagation();
            }
            return;
        }

        if (this.isKeyPressedNavigation(event)) {
            event.stopPropagation();
        }

        if(!this.isKeyPressedNumeric(event)) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    onChange(event) {
        // console.warn('onchange', event);
        this.value = event;
        this.params.value = this.value;
        // this.input.element.nativeElement.focus();
        if(this.psCallbackAfterChange instanceof Function) {
            this.psCallbackAfterChange(this.params);
        }
    }

    stopEditing() {
        this.params.api.stopEditing();
    }

    @HostListener('paste', ['$event']) blockPaste(event) {

        try {
            if (!this.isCharNumeric(event.clipboardData.getData('text'))) {
                if (event.preventDefault) event.preventDefault();
            }
        } catch (error) {
            event.preventDefault();
        }
    }

    // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
    ngAfterViewInit() {
        window.setTimeout(() => {
            if (this.params.cellStartedEdit) {
                // this.input.element.nativeElement.focus();
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

    isPopup(): boolean {
        return false;
    }

    focusIn(): boolean {
        // this.input.element.nativeElement.focus();
        return true;
    }

    focusOut(): boolean {
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
        const charStr = event.key ;
        return this.isCharNumeric(charStr);
    }

    private isKeyPressedNavigation(event): boolean {
        return event.keyCode === 13
    };
    @HostListener('focusin', ['$event']) onFocus(event){
        event.target.select();
    }
}