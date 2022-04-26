import { Component, OnInit, Input, Output, EventEmitter, HostListener, OnDestroy } from "@angular/core";
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
          <app-ag-grid-filter (enterKeyEvent)="enterKeyEvent($event)" [isItemSelect]="true" [gridId]="data.gridId" [grid]="grid" [isSetting]="false" [isFocus]="true"
          ></app-ag-grid-filter>
        </div>
      </div>
      <!-- psValidateGrid -->
      <ag-grid-angular
        style="width: 100%; height: 80vh;"
        class="ag-theme-balham"
        [rowData]="dataList"
        [columnDefs]="columnDefs"
        (gridReady)="onGridReady($event)" 
        [rowSelection]="rowSelection"                     
        [pagination]="true"
        (cellKeyDown)="itemKeyPress($event)"
        (rowDoubleClicked)="itemClick($event.data)"
        [frameworkComponents]="gridService.frameworkComponents"
      >
      </ag-grid-angular>
    </div>
  `
})
export class CommonListComponent implements OnInit, OnDestroy {
  @Input()
  data: any = {};

  @Output() actionController$ = new EventEmitter<any>();

  dataList: any[] = [];
  rowSelection = 'single';
  columnDefs = [];
  grid: any;
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    console.log("keborad event", event); 
  }

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
    const params = (this.data.params)?this.data.params:{};

    this.dataService.load(this.data.api, params).subscribe(result => {
      this.dataList = result.body;                  
    });  
  }

  itemClick(_item) {    
    this.actionController$.next(_item);
  }
  itemKeyPress(e) {   
    if( e.event.key != "Enter" )return;    
    let _item = {};   
    _item = e.data
    if( e.event.key == "Enter" ){
      this.actionController$.next(_item);
    }   
  }

  onClickSetEmptyValue(){
    let obj = {}
    let key;
    if( this.dataList.length > 0 ) {
      obj = this.dataList[0]
    }else{
      return;
    }
    for (key in obj) {
      obj[key] = typeof obj[key] == "string" ? "" : null;
    }

    this.actionController$.next(obj);  
  }

  // assing item filter of selected item 
  enterKeyEvent(event){
    console.log("Enter event - ", event);
    if(!this.grid){
      return ;
    }
    this.actionController$.next(event);
  }
  ngOnDestroy(){
   
  }

}
