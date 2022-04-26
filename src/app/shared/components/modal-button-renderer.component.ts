import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';

@Component({
  selector: 'app-modal-button-renderer',
  templateUrl: './../templates/modal-button-renderer.component.html'
})
export class ModalButtonRendererComponent implements ICellRendererAngularComp {

  params;
  label: string;
  value:any = null;

  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
    if (params.value !== undefined) {
      this.value = this.params.value;
    }
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      //this.params.colDef.params[0];

      this.params.onClick(params);
    }
    var b = this.params.colDef.params[1];
    this.params.colDef.params[0].openGridModal(this.params.colDef.params[1]);
  }
}
