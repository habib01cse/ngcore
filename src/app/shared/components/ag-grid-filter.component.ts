import { Component, Input, Output, OnChanges, SimpleChanges, ViewChild, ElementRef, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ag-grid-filter',
  templateUrl: './../templates/ag-grid-filter.component.html'
})
export class AgGridFilterComponent implements OnChanges, OnInit {
  @ViewChild('searchInputRef', {static: true}) searchInputRef: ElementRef;

  @Input('grid') grid;
  @Input('gridId') gridId='columnDefs';
  @Input('isSetting') isSettingBtnVisible = true;
  @Input('isFocus') isFocusEnable = false;
  @Input('isItemSelect') isFilterItemSelectEnable = false;

  // @Output() enterKeyEvent = new EventEmitter<any>();

  @Output() enterKeyEvent = new EventEmitter<any>();

  private gridApi;
  private gridColumnApi;
  private gridColumns;
  public filterText: any;
  public sidebarColumnControl = false;
  public downloadDataControl = false;
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {

    if(changes.grid.currentValue) {
      this.gridApi = this.grid.api;
      this.gridColumnApi = this.grid.columnApi;
      this.gridColumns = this.grid.columnApi.columnController.gridColumns;
      this.gridApi['psClearFilter'] = this.onClickClearFilters.bind(this);
    }
  }

  ngOnInit() {
    let _this = this;
    console.log("enterKeyEvent", this);
    console.log("enterKeyEvent this", typeof(this.enterKeyEvent));
    _this.searchInputRef.nativeElement.addEventListener("keydown", function (event) {
      // code for tab key
      var tabKeyCode = 40;

      if(event.keyCode === 13 && _this.gridApi.getDisplayedRowCount() && _this.isFilterItemSelectEnable ){
        event.preventDefault();
        // console.log("filter enter", event);
        _this.grid.api.getDisplayedRowAtIndex(0).setSelected(true);
        
        _this.enterKeyEvent.emit(_this.grid.api.getSelectedRows()[0]);
        
      }else if(event.keyCode !== tabKeyCode){
         return;
      }else{
        // prevents tabbing into the url section
        event.preventDefault();

        // scrolls to the first row
        _this.grid.api.ensureIndexVisible(0);

        // scrolls to the first column
        let firstCol = _this.grid.columnApi.getAllDisplayedColumns()[0];

        _this.grid.api.ensureColumnVisible(firstCol);

        // sets focus into the first grid cell
        _this.grid.api.setFocusedCell(0, firstCol);        
      }
    }, true);
    if(this.isFocusEnable){
      setTimeout(()=> {
        _this.searchInputRef.nativeElement.focus();
        // console.log("isFilterItemSelectEnable", _this.isFilterItemSelectEnable);  
      });
    }  
  }

  onFilterTextBoxChanged(text) {         
    // User for data filter   
    if(!this.gridApi)
      return ;
    
    this.gridApi.setQuickFilter(text);

    // console.log("this.gridApi ", this.gridApi);

    // if(this.isFilterItemSelectEnable){
    //   //On time filter grid of first row selected
    //   try{
    //     setTimeout(() => {  
    //       let rowNode = this.grid.api.getRowNode(0);           
    //       if( typeof rowNode != 'undefined' && typeof this.grid.api.getDisplayedRowAtIndex(rowNode.rowIndex) != 'undefined'){  
    //         this.grid.api.getDisplayedRowAtIndex(rowNode.rowIndex).setSelected(true);                   
    //       } else{         
    //         return;            
    //       }                                              
    //     },50);
    //   } catch (error){
    //     console.log(error);
    //     return;
    //   }
    // }
       
  }

  onClickSetting() {
    this.sidebarColumnControl = !this.sidebarColumnControl;
  }
  onClickDownload(){
    this.downloadDataControl = !this.downloadDataControl;
  }

  onClickResetSetting() {
    // this.gridColumnApi.setColumnState(this.gridColumnApi.columnController.columnDefs);
    this.gridApi.refreshHeader();
  }

  onClickSaveSetting() {
    localStorage.setItem(this.gridId, JSON.stringify(this.gridColumnApi.getColumnState()));
  }

  onClickClearFilters() {
    this.filterText = null;
    this.gridApi.setQuickFilter(null);
    this.gridApi.setFilterModel(null);
    this.gridApi.onFilterChanged();
  }

  getParams() {
    return {
      allColumns: this.getBooleanValue('#allColumns'),
      // columnGroups: this.getBooleanValue('#columnGroups'),
      // columnKeys: this.getBooleanValue('#columnKeys') && ['country', 'bronze'],
      onlySelected: this.getBooleanValue('#onlySelected'),
      // onlySelectedAllPages: this.getBooleanValue('#onlySelectedAllPages'),
      // shouldRowBeSkipped:
      // this.getBooleanValue('#shouldRowBeSkipped') && only20YearOlds,
      skipFooters: this.getBooleanValue('#skipFooters'),
      // skipGroups: this.getBooleanValue('#skipGroups'),
      skipHeader: this.getBooleanValue('#skipHeader'),
      skipPinnedTop: this.getBooleanValue('#skipPinnedTop'),
      skipPinnedBottom: this.getBooleanValue('#skipPinnedBottom'),
    };
  }
  onClickExportDataAsCsv(){
    this.gridApi.exportDataAsCsv(this.getParams())
  }
  onClickExportDataAsExcel(){
    // console.log(this.gridApi);
    // console.log("this.getParams()", this.getParams());
    this.gridApi.exportDataAsExcel(this.getParams())
  }
  
  private getBooleanValue(checkboxSelector) {
    return document.querySelector(checkboxSelector).checked === true;
  }

}
