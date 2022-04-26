import { Component, ViewContainerRef, ViewChild } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { globalVariables } from 'src/app/core/constants/globalVariables';
@Component({
  selector: 'ps-number-pipe-renderer',
  template: `<input class="ps-grid-text-cell text-right" (click)="onClick()" readonly type="text" style="width:100%;" #input value="{{value | number:numberPrecision}}">`
})
export class NumberPipeRendererComponent implements ICellRendererAngularComp {

  @ViewChild('input', {read: ViewContainerRef, static: true}) public input;
  public numberPrecision = globalVariables.numberPrecision;
  params;
  label: string;
  public value: number = null;

  agInit(params): void {
    this.params = params;
    if (params.value !== undefined) {
      this.value = this.params.value;
    }
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

  onClick() {      
    this.input.element.nativeElement.focus();
    this.input.element.nativeElement.select();
  }

}
