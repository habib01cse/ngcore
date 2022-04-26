import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { LangService } from "src/app/core/services/lang.service";
import { GridService } from "src/app/shared/services/grid.service";
import { DataLoadService } from "src/app/shared/services/data-load.service";

@Component({
  selector: "app-common-grid-list",
  template: `
    <div class="ag-table-wrapper" style="width: 100%;">
      <div class="row">
        <div class="col-md-6">
          <button class="btn btn-primary mb-base" (click)="onClickSetEmptyValue()">Set empty value</button>
        </div>
        <div class="col-md-6">
          <app-ag-grid-filter (enterKeyEvent)="enterKeyEvent($event)" [isItemSelect]="true" [gridId]="data.gridId" [grid]="grid" [isSetting]="false" [isFocus]="true"></app-ag-grid-filter>
        </div>
      </div>
      <ag-grid-angular
        style="width: 100%; height: 80vh;"
        class="ag-theme-balham"
        [columnDefs]="columnDefs"
        (gridReady)="onGridReady($event)"
        [pagination]="true"
        (cellKeyPress)="itemClick($event.data)"
        (rowDoubleClicked)="itemClick($event.data)"
        [frameworkComponents]="gridService.frameworkComponents"
      >
      </ag-grid-angular>
    </div>
  `
})
export class CommonImmutableListComponent implements OnInit {
  @Input()
  data: any = {};

  @Output() actionController$ = new EventEmitter<any>();

  dataList: any[] = [];

  columnDefs = [];
  grid: any;

  constructor(
    public langService: LangService,
    private dataService: DataLoadService,
    public gridService: GridService
  ) { }

  ngOnInit() {
    let langData = this.langService.langData;
    let defObj = this.data.columnDefs.map(elm=> {
      if(langData[elm.headerName]) {
        elm.headerName = langData[elm.headerName];
      }
      return {...elm, filter: true, sortable: true, resizable: true, hide: false}
    });
    this.columnDefs = this.gridService.getColumnDefs(defObj, this.data.gridId);
  }

  onGridReady(grid) {
    this.grid = grid;
    this.gridService.sizeColumnsToFit(grid, this.data.gridId);

    this.grid.api.setRowData(this.data.list);



  }

  itemClick(_item) {
    this.actionController$.next(_item);
  }
  onClickSetEmptyValue(){
    this.actionController$.next(null);
  }

   // assing item filter of selected item 
   enterKeyEvent(event){
    console.log("Enter event - ", event);
    if(!this.grid){
      return ;
    }
    this.actionController$.next(event);
  }


}
