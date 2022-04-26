import { Component } from '@angular/core';
import { ICellEditorAngularComp, ICellRendererAngularComp } from '@ag-grid-community/angular';

@Component({
  selector: 'app-button-renderer',
  template: `<button [class]="psClasses" [tabindex]="pxTabIndex" [type]="psType" [disabled]="psReadonly" [attr.data-action-type]="psActionType">{{ psLableText }}</button>`
})
export class ButtonCellEditorComponent implements ICellEditorAngularComp {

  params;
  label: string;
  public value: any;
  public valueType: any;
  public psCellType = "decimal";
	public psAffectedCols = [];
	private psCallbackAfterChange;
	public psReadonly = false;
  public psActionType: string = "psActionType";
  public psClasses:string = 'btn btn--squire border-0 test-class';
  public psType:string = 'button';
  public pxTabIndex:number = -1;
  public psLableText = "+"
  
  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;

    if (this.params.colDef.cellEditorParams.hasOwnProperty('psActionType')) {
      this.psActionType = this.params.colDef.cellEditorParams.psActionType.toString();
    }
    if (this.params.colDef.cellEditorParams.hasOwnProperty('psClasses')) {
      this.psClasses = this.params.colDef.cellEditorParams.psClasses.toString();
    }
    if (this.params.colDef.cellEditorParams.hasOwnProperty('psLableText')) {
      this.psLableText = this.params.colDef.cellEditorParams.psLableText.toString();
    }
    if (this.params.colDef.cellEditorParams.hasOwnProperty('psType')) {
      this.psType = this.params.colDef.cellEditorParams.psType.toString();
    }
    if (this.params.colDef.cellEditorParams.hasOwnProperty('pxTabIndex')) {
      this.pxTabIndex = Number(this.params.colDef.cellEditorParams.pxTabIndex);
    }
  }
  getValue(): any {
    if(this.valueType === 'number') {
        return parseInt(this.value);
    }
    return this.value;
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
      this.params.onClick(params);

    }
  }
}
