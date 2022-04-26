import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { globalVariables } from 'src/app/core/constants/globalVariables';
@Component({
  selector: 'app-date-time-pipe-renderer',
  template: '<input class="ps-grid-text-cell" (click)="onClick()" readonly type="text" style="width:100%;" #input value="{{ value | date:dateTimeFormat }}">'
})
export class DateTimePipeRendererComponent implements ICellRendererAngularComp {

  @ViewChild('input', { read: ViewContainerRef, static: true }) public input;

  public dateTimeFormat = globalVariables.dateFormat.dateTimeFormat;

  params;
  label: string;
  public value = null;

  agInit(params): void {
    this.params = params;
    if (params.value !== undefined) {
      this.value = this.params.value;
    }
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    this.params = params;
    if (params.value !== undefined) {
      this.value = this.params.value;
    }
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
