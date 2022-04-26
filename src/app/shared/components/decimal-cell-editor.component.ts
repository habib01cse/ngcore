import { AfterViewInit, Component, ViewChild, ViewContainerRef, HostListener } from "@angular/core";

import { ICellEditorAngularComp } from "@ag-grid-community/angular";
import { globalVariables } from 'src/app/core/constants/globalVariables';

@Component({
	selector: 'ps-decimal-cell',
	template: `<input [attr.data-action-type]="psActionType" ps-select-all-focus [readonly]="psReadonly" type="text" style="width:100%;" class="text-right" #input [ps-decimal]="psDecimalMax" (ngModelChange)="onChange($event)" [(ngModel)]="value">`,
})
export class DecimalCellEditorComponent implements ICellEditorAngularComp, AfterViewInit {
	private params: any;
	public value;
	private oldValue: number;
	private cancelBeforeStart: boolean = false;
	public psDecimalMax = "16,2";
	public psCellType = "decimal";
	public psAffectedCols = [];
	private psCallbackAfterChange;
	public psReadonly = false;
	public psActionType: string = "psActionType";

	@ViewChild('input', { read: ViewContainerRef, static: true }) public input;


	agInit(params: any): void {
		this.params = params
		if (this.isCharDecimal(params.charPress)) {
			this.value = params.charPress;
		} else {
			if (params.value !== undefined) {
				this.value = params.value;
			}
		};

		if (this.params.colDef.hasOwnProperty('cellEditorParams')) {
			if (this.params.colDef.cellEditorParams.hasOwnProperty('psAffectedCols')) {
				this.psAffectedCols = this.params.colDef.cellEditorParams.psAffectedCols;
			}

			if (this.params.colDef.cellEditorParams.hasOwnProperty('psMax')) {
				this.psDecimalMax = this.params.colDef.cellEditorParams.psMax;
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
			if (this.params.colDef.cellEditorParams.hasOwnProperty('psAlwaysReadonly')) {
				this.psReadonly = this.params.colDef.cellEditorParams.psAlwaysReadonly;
				
			}

			if (this.params.colDef.cellEditorParams.hasOwnProperty('psActionType')) {
				this.psActionType = this.params.colDef.cellEditorParams.psActionType.toString();
			}

		}

		// only start edit if key pressed is a number, not a letter
		this.cancelBeforeStart = params.charPress && ('1234567890.'.indexOf(params.charPress) < 0);
	}

	getValue(): any {
		if (this.value) {
			return parseFloat(this.value);
		}
		return this.value;
	}

	isCancelBeforeStart(): boolean {
		return this.cancelBeforeStart;
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

	ngAfterViewInit() {
		window.setTimeout(() => {
			if (this.params.cellStartedEdit) {
				this.input.element.nativeElement.focus();
			}
		})
	}

	onChange(event) {
		if (this.params.value !== event) {
			this.params.value = event;
			this.params.node.setDataValue(this.params.colDef.field, event);
			if (this.psCallbackAfterChange instanceof Function) {
				this.psCallbackAfterChange(this.params);
			}
		}
	}

	private getCharCodeFromEvent(event): any {
		event = event || window.event;
		return (typeof event.which == "undefined") ? event.keyCode : event.which;
	}

	private isCheckPass(charStr) {
		return !!/\d|\./.test(charStr)
	}

	private isCharDecimal(charStr): boolean {
		return (this.firstCheck(charStr) || this.secondCheck(charStr));
	}


	private firstCheck(charStr) {
		return !!/^\d+(\.\d{1,2})?$/.test(charStr)
	}
	private secondCheck(charStr) {
		return !!/^(\.\d{1,2})?$/.test(charStr)
	}

	focusIn(): boolean {
		this.input.element.nativeElement.focus();
		return true;
	}
}