import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';

@Component({
  selector: 'ps-text-cell-renderer',
  template: `<input class="ps-grid-text-cell" (click)="onClick()" readonly type="text" style="width:100%;" #input value="{{value}}">`
})
export class TextCellRendererComponent implements ICellRendererAngularComp {

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
