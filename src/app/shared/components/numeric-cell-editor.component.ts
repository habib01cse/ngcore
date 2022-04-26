import { AfterViewInit, Component, ViewChild, ViewContainerRef, HostListener } from "@angular/core";

import { ICellEditorAngularComp } from "@ag-grid-community/angular";

@Component({
	selector: 'ps-numeric-cell',
	template: `<input [attr.data-action-type]="psActionType" ps-select-all-focus [readonly]="psReadonly" type="text" [ps-number]="psNumericMax" style="width:100%;" class="text-right" #input (ngModelChange)="onChange($event)" [(ngModel)]="value">`,
})
export class NumericCellEditorComponent implements ICellEditorAngularComp, AfterViewInit {
	private params: any;
	public value: number;
	public psNumericMax = "16";

	@ViewChild('input', { read: ViewContainerRef, static: true }) public input;

	public psCellType = "numeric";
	public psAffectedCols = [];
	private psCallbackAfterChange;
	public psReadonly = false;
	public psActionType: string = "psActionType";


	agInit(params: any): void {
		this.params = params;
		if (this.isCharNumeric(params.charPress)) {
			this.value = Number(params.charPress);
		} else {
			if (params.value !== undefined) {
				this.value = params.value;
			}
		}

		if (this.params.colDef.hasOwnProperty('cellEditorParams')) {
			if (this.params.colDef.cellEditorParams.hasOwnProperty('psAffectedCols')) {
				this.psAffectedCols = this.params.colDef.cellEditorParams.psAffectedCols;
			}
			if (this.params.colDef.cellEditorParams.hasOwnProperty('psMax')) {
				this.psNumericMax = this.params.colDef.cellEditorParams.psMax;
			}
			if (this.params.colDef.cellEditorParams.hasOwnProperty('psCallbackAfterChange')) {
				this.psCallbackAfterChange = this.params.colDef.cellEditorParams.psCallbackAfterChange;
			}
			if (this.params.colDef.cellEditorParams.hasOwnProperty('psReadonly')) {
				let readOnly = this.params.colDef.cellEditorParams.psReadonly;
				if (readOnly instanceof Function) {
					this.psReadonly = readOnly(this.params);
				} else this.psReadonly = readOnly;
			}
			if (this.params.colDef.cellEditorParams.hasOwnProperty('psActionType')) {
				this.psActionType = this.params.colDef.cellEditorParams.psActionType.toString();
			}
		}

	}

	getValue(): any {
		if (this.value) {
			return Number(this.value);
		}
		return this.value;
	}

	// dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
	ngAfterViewInit() {
		window.setTimeout(() => {
			if (this.params.cellStartedEdit) {
				this.input.element.nativeElement.focus();
			}
		})
	}

	private isCharNumeric(charStr): boolean {
		return !!/\d/.test(charStr);
	}

	setCellValue(): any {
		this.value = this.params.data[this.params.colDef.field];
		this.params.value = this.value;
		if (this.params.colDef.hasOwnProperty('cellEditorParams')) {
			if (this.params.colDef.cellEditorParams.hasOwnProperty('psReadonly')) {
				let readOnly = this.params.colDef.cellEditorParams.psReadonly;
				if (readOnly instanceof Function) {
					this.psReadonly = readOnly(this.params);
				} else this.psReadonly = readOnly;
			}
		}
	}

	focusIn(): boolean {
		this.input.element.nativeElement.focus();
		return true;
	}

	onChange(event) {
		if (this.psCallbackAfterChange instanceof Function) {
			this.psCallbackAfterChange(this.params);
		}
	}
}