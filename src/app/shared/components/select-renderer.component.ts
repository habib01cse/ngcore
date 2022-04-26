import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';

@Component({
  selector: 'app-select-renderer',
  template: `<input class="ps-grid-text-cell" (click)="onClick()" readonly type="text" style="width:100%;" #input [(ngModel)]="text">`
})
export class SelectRendererComponent implements ICellRendererAngularComp {

  @ViewChild('input', { read: ViewContainerRef, static: true }) public input;

  params;
  text: string;
  public value: any = null;
  public optionList: any = [];

  agInit(params): void {

    this.params = params;
    if (params.value !== undefined) {
      this.value = this.params.value;
    }
    // this.label = this.params.label || null;
    if (this.params.colDef.hasOwnProperty('params')) {
      this.optionList = this.params.colDef.params;
    }
    if (this.params.colDef.hasOwnProperty('cellEditorParams')) {
      if (this.params.colDef.cellEditorParams.hasOwnProperty('list')) {
        this.optionList = this.params.colDef.cellEditorParams.list;
      }
    }
    this.onChange();
  }

  refresh(params?: any): boolean {
    this.params = params;
    this.value = this.params.value;
    this.onChange();
    return true;
  }

  getValue(): any {
    return this.value;
  }

  onChange() {
    const el = this.optionList.find(x => {
      return this.value == x.VALUE;
    });
    this.text = (el && el.hasOwnProperty('TEXT')) ? el.TEXT : '';
  }

  onClick() {
    this.input.element.nativeElement.focus();
    this.input.element.nativeElement.select();
  }
}
