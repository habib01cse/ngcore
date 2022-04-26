import { Component, ViewChild, ViewContainerRef, ElementRef } from '@angular/core';
import { ICellRendererAngularComp, IHeaderAngularComp } from '@ag-grid-community/angular';
import { AlertService } from '../popup/service/alert.service';
import * as $ from "jquery";

@Component({
    selector: 'ps-header-custom-checkbox-renderer',
    template: `
    <div class="header-checkbox-wrapper text-center mt3" >
    <label class="custom-control custom-checkbox d-inline-block ">
          <input class="custom-control-input" type="checkbox" [name]="name"  #input  [(ngModel)]="value"
        (ngModelChange)="onChange($event)" >
    <span class="custom-control-label">{{ label }}</span>
        </label>
    </div>
  `
})
export class HeaderCustomCheckboxRenderer implements IHeaderAngularComp {

    //@ViewChild('input', { read: ViewContainerRef, static: true }) public input;
    params;
    text: string;
    public value = false;
    public label = '';
    public name = 'checkbox';
    public field = '';
    public confirmation = false;
    private psCallbackAfterChange;
    public confirmationText = '';
    public condition = true;
    constructor(private alertService: AlertService) {

    }

    agInit(params): void {
        this.params = params;
        //  console.log("this.params", this.params);
        this.value = params.value;
        if (this.params.hasOwnProperty('field')) {
            this.field = this.params.field;
        }
        if (this.params.hasOwnProperty('label')) {
            this.label = this.params.label;
        }
        if (this.params.hasOwnProperty('confirmation')) {
            this.confirmation = this.params.confirmation;
        }
        if (this.params.hasOwnProperty('confirmationText')) {
            this.confirmationText = this.params.confirmationText;
        }
        if (this.params.hasOwnProperty('psCallbackAfterChange')) {
            this.psCallbackAfterChange = this.params.psCallbackAfterChange;
        }
        if (this.params.hasOwnProperty('condition')) {
            this.condition = this.params.condition;
            console.log("this.condition", this.condition);
        }


    }
    onChange(event) {
        // console.log("this.params", this.params);
        // console.log("this.value", this.value);
        console.log(this.condition)
        this.value = event;
        this.params.api.stopEditing();
        setTimeout(() => {
            this.params.api.forEachNode(node => {
                node.setDataValue(this.field, this.value ? 1 : 0);
            })
            if (this.confirmation) {
                this.alertService.info(this.confirmationText, true).then(data => {
                    if (data) {
                        this.params.value = this.value;
                        if (this.psCallbackAfterChange instanceof Function) {
                            this.psCallbackAfterChange(this.params.value);
                        }
                    } else {
                        this.value = !this.value;
                        this.params.value = this.value;
                    }
                })
            } else {
                this.params.value = this.value;
                if (this.psCallbackAfterChange instanceof Function) {
                    if (this.psCallbackAfterChange instanceof Function) {
                        this.psCallbackAfterChange(this.params.value);
                    }
                }
            }
        }, 100);
    }


    // need to remove, testing function
    checkboxCheckedCondition() {
        // console.log("this.params.api", this.params.api);
        // console.log("this.params", this.params);

        let totalRow = this.params.api.psGridDataList().length;
        let count = 0;
        //console.log("this.params.api.psGridDataList()", this.params.api.psGridDataList());
        this.params.api.psGridDataList().map(element => {
            // element[this.field] == 1;
            //console.log("element[this.field]", element[this.field]);
            if (element[this.field] == 1) {
                ++count;
                // console.log("count", count);
            }
        });
        // console.log("Total count", count);
        // console.log("totalRow", totalRow);
        if (totalRow == count) {
            this.value = true;
        } else {
            this.value = false;
        }


    }
}
