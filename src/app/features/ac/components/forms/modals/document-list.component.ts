
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { CommonService } from '../../../services/common.service';
import { LangService } from 'src/app/core/services/lang.service';
import { GridService } from 'src/app/shared/services/grid.service';

@Component({
  selector: 'app-cost-center-list',
  templateUrl: './../../../templates/forms/modals/document-list.component.html',
})
export class DocumentListComponent implements OnInit {
  @Input()
  modalShow: boolean = true;

  @Output()
  submit: EventEmitter<any> = new EventEmitter<any>();
  
  dataObj: any;

  documentList = [];
  columnDefs = [];
  colObj;
  grid: any;
  gridId: string = "DocumentListGrid";

  searchFields: any[] = ['DOC_AMENDMENT', 'BANK_REF_NO', 'CUSTOMER_NAME', 'OWN_BANKDTL'];
  public searchString;
  constructor(private dataService: CommonService,
    public langService: LangService,
    public gridService: GridService) {
    this.colObj = [
      { headerName: 'Document : Amendment', field: 'DOC_AMENDMENT', sortable: true, filter: true, resizable: true, hide: false },
      { headerName: 'Bank Ref No', field: 'BANK_REF_NO', sortable: true, filter: true, resizable: true, hide: false },
      { headerName: 'Customer Name', field: 'CUSTOMER_NAME', sortable: true, filter: true, resizable: true, hide: false },
      { headerName: 'Bank Info.', field: 'OWN_BANKDTL', sortable: true, filter: true, resizable: true, hide: false },
    ];
  }


  ngOnInit() {
    this.columnDefs = this.gridService.getColumnDefs(this.colObj, this.gridId);
  }
  onGridReady(grid) {
    this.grid = grid;
    this.gridService.sizeColumnsToFit(grid, this.gridId);

    this.dataService.getDocuments()
      .subscribe(arg => { this.documentList = arg.body });
  }

  itemClick(_item) {
    this.modalShow = false;
    this.dataObj = _item;
    this.submit.next();
  }

  itemKeyPress(e) { 
    console.log('cellKeyDown e', e);
    if( e.event.key != "Enter" )return;    
    let _item = {};   
    _item = e.data
    if( e.event.key == "Enter" ){      
      this.itemClick(_item);
    }   
  }

  // assing item filter of selected item 
  enterKeyEvent(event){
  console.log("Enter event document: ", event);  
  if(!this.grid){
    return ;
  }  
  this.itemClick(event);
  }

}


