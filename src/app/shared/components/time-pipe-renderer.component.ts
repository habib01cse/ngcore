import { Component, ViewContainerRef, ViewChild } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { globalVariables } from 'src/app/core/constants/globalVariables';
@Component({
    selector: 'ps-time-pipe-renderer',
    template: `<input class="ps-grid-text-cell" (click)="onClick()" readonly type="text" style="width:100%;" #input value="{{value | date:'shortTime'}}">`
})
export class TimePipeRendererComponent implements ICellRendererAngularComp {

    @ViewChild('input', { read: ViewContainerRef, static: true }) public input;
    public dateFormat = globalVariables.dateFormat.dateTimeFormat;

    params;
    label: string;
    public value: any = null;
    public isMeridian: boolean = false;

    agInit(params): void {
        //debugger;
        this.params = params;
        if (params.value !== undefined) {
            this.value = this.params.value;
        }
        // console.log(this.value)
        this.label = this.params.label || null;
    }

    refresh(params?: any): boolean {
        this.params = params;
        this.value = this.params.value;
        return true;
    }

    getValue(): any {
        return this.value;
    }

    onChange() {
        this.params.setValue(this.value);
    }

    onClick() {
        this.input.element.nativeElement.focus();
        this.input.element.nativeElement.select();
    }


}
