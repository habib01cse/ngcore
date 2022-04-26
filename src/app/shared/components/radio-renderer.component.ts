import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';

@Component({
  selector: 'app-radio-renderer',
  template: `
    <div class="grid-custom-control-wrapper">
        <div class="grid-custom-control-overlay"></div>
        <label class="custom-control custom-radio custom-control--without-label">
            <input class="custom-control-input" [checked]="value === checkedData" type="radio">
            <span class="custom-control-label text-nowrap"></span>
        </label>
    </div>
`
})
export class RadioRendererComponent implements ICellRendererAngularComp {

  params;
  public value: any = null;
  public checkedData: any;

  agInit(params): void {

    this.params = params;
    if (params.value !== undefined) {
      this.value = this.params.value.toString();
    }
    if (this.params.colDef.hasOwnProperty('cellEditorParams')) {
      if (this.params.colDef.cellEditorParams.hasOwnProperty('psCheckedData')) {
        this.checkedData = this.params.colDef.cellEditorParams.psCheckedData.toString();
      }
    }

  }

  refresh(params?: any): boolean {
    this.params = params;
    this.value = this.params.value.toString();
    return true;
  }

  getValue(): any {
    return this.value;
  }
}
