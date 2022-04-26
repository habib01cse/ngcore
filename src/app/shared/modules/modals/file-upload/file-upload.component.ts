import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef } from '@angular/core';
import { LangService } from 'src/app/core/services/lang.service';
import { GridService } from 'src/app/shared/services/grid.service';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { ToastrService } from 'ngx-toastr';
import { BaseDataService } from 'src/app/core/services';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { globalVariables } from 'src/app/core/constants/globalVariables';
const coreUrl = globalVariables.ERP_URL.adminApiUrl + 'core/file/';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
})
export class FileUploadComponent implements OnInit {


  @Input('data')
  data: any = {};

  @Input('modalShow')
  modalShow: boolean = true;

  @Output()
  actionController$: EventEmitter<any> = new EventEmitter<any>();

  public userPrivilege = new UserPrivileges();
  public refTypeId;
  public refId;

  public currentTabNumber: number = 1;
  fileLabel: string;
  imageLabel: string;
  fileToUpload: File = null;
  imageToUpload: File = null;


  // Grid Variables 
  columnDefs = [];
  imageColumnDefs = [];

  grid: any;
  imageGrid: any;

  gridId: string = "AC_1004_document";
  imageGridId: string = "AC_1004_image";

  rowSelectionType = 'single';
  gridRequiredOptions: any = {
    "TITLE": {
      "required": {
        "message": "",
      }
    },
    "NOTE": {
      "required": {
        "message": "",
      }
    },
  }

  constructor(
    public langService: LangService
    , private dataLoadService: DataLoadService
    , private apiService: BaseDataService
    , private toaster: ToastrService
    , public alertService: AlertService
    , public gridService: GridService) {
    this.fileLabel = langService.langData.chooseAFile;
    this.imageLabel = langService.langData.chooseAFile;
  }

  ngOnInit() {
    this.userPrivilege = new UserPrivileges(this.data.userPrivilege);
    this.columnDefs = this.getColumnDefs();
    this.imageColumnDefs = this.getImageColumnDefs();
    this.refTypeId = this.data.refTypeId ? this.data.refTypeId : null;
    this.refId = this.data.refId ? this.data.refId : null;
    if (this.refTypeId && this.refId) {
      this.apiService.executeQuery(coreUrl + 'get-files', { DOCUMENT_REF_TYPE_ID: this.refTypeId, DOCUMENT_REF_ID: this.refId, DOCUMENT_TYPE: 'doc' }).subscribe(result => {
        let files = result.body.map(elem => {
          elem['SQL_STATE'] = fixedValues.sqlState.sqlUnchange;
          return elem;
        });
        this.grid.api.setRowData(files);
      });
      this.apiService.executeQuery(coreUrl + 'get-files', { DOCUMENT_REF_TYPE_ID: this.refTypeId, DOCUMENT_REF_ID: this.refId, DOCUMENT_TYPE: 'img' }).subscribe(result => {
        let files = result.body.map(elem => {
          elem['SQL_STATE'] = fixedValues.sqlState.sqlUnchange;
          return elem;
        });
        this.imageGrid.api.setRowData(files);
      });
    }
  }

  getColumnDefs() {
    return [     
      { headerName: 'Title', field: 'TITLE', sortable: false, filter: true, resizable: true, hide: false, editable: this.isColumnEditable.bind(this) },
      { headerName: 'Note', field: 'NOTE', sortable: false, filter: true, resizable: true, hide: false, editable: this.isColumnEditable.bind(this) },
      { headerName: 'Size', field: 'FILE_SIZE', sortable: false, filter: true, resizable: true, hide: false },
      {
        headerName: '', field: '_download', sortable: false, filter: false, resizable: false, hide: false, width: 50, pinned: "right",
        suppressSizeToFit: true,
        cellStyle: { textAlign: "center" },
        editable: false,
        cellRenderer: this.checkDownload.bind(this),
      },
      {
        headerName: '', field: '_delete', sortable: false, filter: false, resizable: false, hide: false, width: 50, pinned: "left",
        suppressSizeToFit: true,
        cellStyle: { textAlign: "center" },
        editable: false,
        cellRenderer: this.checkDelete.bind(this),
      }

    ]
  }

  getImageColumnDefs() {
    return [      
      {
        headerName: 'Preview', field: '_image', sortable: false, filter: false, resizable: false, hide: false, width: 150, pinned: "left",
        suppressSizeToFit: true,
        cellStyle: { textAlign: "center" },
        editable: false,
        cellRenderer: this.imagePreview.bind(this),
      },
      { headerName: 'Title', field: 'TITLE', sortable: false, filter: true, resizable: true, hide: false, editable: this.isColumnEditable.bind(this) },
      { headerName: 'Note', field: 'NOTE', sortable: false, filter: true, resizable: true, hide: false, editable: this.isColumnEditable.bind(this) },
      { headerName: 'Size', field: 'IMAGE_SIZE', sortable: false, filter: true, resizable: true, hide: false },
      {
        headerName: '', field: '_download', sortable: false, filter: false, resizable: false, hide: false, width: 50, pinned: "right",
        suppressSizeToFit: true,
        cellStyle: { textAlign: "center" },
        editable: false,
        cellRenderer: this.checkDownload.bind(this),
      },
      {
        headerName: '', field: '_delete', sortable: false, filter: false, resizable: false, hide: false, width: 50, pinned: "left",
        suppressSizeToFit: true,
        cellStyle: { textAlign: "center" },
        editable: false,
        cellRenderer: this.checkDelete.bind(this),
      }
    ]
  }

  onClickSave() {
    if (this.currentTabNumber == 1) {
      this.grid.api.stopEditing();
      setTimeout(() => {
        if (this.grid.api.psGridDataList().length <= 0) {
          this.toaster.warning(this.langService.langData.emptyTableDataMessage, 'Warning');
        } else if (this.grid.api.psGetChangeList().length <= 0) {
          this.toaster.warning(this.langService.langData.noChangeFound, 'Warning');
        } else {
          this.alertService.info("Do you want to save this Entry?", true).then(result => {
            if (result) {
              const data = { data: this.grid.api.psGetChangeList(), doc_type: 'doc' }
              this.apiService.save(coreUrl + 'save-contents', data).subscribe(result => {
                this.grid.api.psUpdateList(result.body);
              });
            }
          });
        }

      }, 100);
    }
    else {
      this.imageGrid.api.stopEditing();
      setTimeout(() => {
        if (this.imageGrid.api.psGridDataList().length <= 0) {
          this.toaster.warning(this.langService.langData.emptyTableDataMessage, 'Warning');
        } else if (this.imageGrid.api.psGetChangeList().length <= 0) {
          this.toaster.warning(this.langService.langData.noChangeFound, 'Warning');
        } else {
          this.alertService.info("Do you want to save this Entry?", true).then(result => {
            if (result) {
              const data = { data: this.imageGrid.api.psGetChangeList(), doc_type: 'img' }
              this.apiService.save(coreUrl + 'save-contents', data).subscribe(result => {
                this.imageGrid.api.psUpdateList(result.body);
              });
            }
          });
        }

      }, 100);
    }
  }

  private checkDelete(params) {
    let result = `<div class="d-flex table-action-buttons">`;
    if (this.userPrivilege.checkDeletePrev(params)) {
      result += `<button type="button" data-action-type="delete" class="btn btn--squire text-danger border-0"><i class="ion-close" data-action-type="delete"></i></button>`
    }
    result += `</div>`;
    return result;
  }

  private imagePreview(params) {
    let result = `<div class="image-upload">`;
    result += `  <i class="fa fa-picture-o fa-2x" aria-hidden="true"></i>`
    result += `</div>`;
    return result;
  }

  private checkDownload(params) {
    let result = `<div class="d-flex table-action-buttons">`;
    if (this.userPrivilege.canShowButton()) {
      result += `<button type="button" data-action-type="download" class="btn btn--squire text-primary border-0"><i data-action-type="download" class="fa fa-download fa-2x" aria-hidden="true"></i></button>`
    }
    result += `</div>`;
    return result;
  }

  onClickTabItem(tabNumber) {
    this.currentTabNumber = tabNumber;
  }

  handleFileInput(event, type) {
    console.log(event);
    if (event.target.files.length <= 0) return;
    switch (type) {
      case "doc":
        this.fileLabel = event.target.files.item(0).name;
        this.fileToUpload = event.target.files.item(0);
        break;
      case "img":
        this.imageLabel = event.target.files.item(0).name;
        this.imageToUpload = event.target.files.item(0);
        break;
      default:
        break;
    }

  }

  onClickUpload(type) {
    switch (type) {
      case 'doc':
        if (!this.fileToUpload) break;
        this.uploadFile();
        break;
      case 'img':
        if (!this.imageToUpload) break;
        this.uploadImage();
        break;

      default:
        break;
    }

  }

  onClickFileCancel(type) {
    switch (type) {
      case "doc":
        this.fileLabel = this.langService.langData.chooseAFile;
        this.fileToUpload = null;
        break;
      case "img":
        this.imageLabel = this.langService.langData.chooseAFile;
        this.imageToUpload = null;
        break;
      default:
        break;
    }
  }

  private uploadFile() {
    let formData = new FormData();
    formData.append('DOCUMENT_REF_TYPE_ID', this.refTypeId);
    formData.append('DOCUMENT_REF_ID', this.refId);
    formData.append('DOCUMENT_TYPE', 'doc');
    formData.append('NOTE', '');
    formData.append('file', this.fileToUpload);
    this.apiService.saveFile(coreUrl + 'upload', formData).subscribe(result => {
      console.log(result);
      const data = {
        ID: result.body['ID'],
        TITLE: result.body['TITLE'],
        NOTE: '',
        FILE_SIZE: result.body['SIZE'],
        SQL_STATE: fixedValues.sqlState.sqlUnchange,
      };
      this.grid.api.updateRowData({ add: [data] });
      this.onClickFileCancel('doc');

    })
  }
  private uploadImage() {
    let formData = new FormData();
    formData.append('DOCUMENT_REF_TYPE_ID', this.refTypeId);
    formData.append('DOCUMENT_REF_ID', this.refId);
    formData.append('DOCUMENT_TYPE', 'img');
    formData.append('NOTE', '');
    formData.append('file', this.imageToUpload);
    this.apiService.saveFile(coreUrl + 'upload', formData).subscribe(result => {
      console.log(result);
      const data = {
        ID: result.body['ID'],
        TITLE: result.body['TITLE'],
        NOTE: '',
        FILE_SIZE: result.body['SIZE'],
        SQL_STATE: fixedValues.sqlState.sqlUnchange,
      };
      this.imageGrid.api.updateRowData({ add: [data] });
      this.onClickFileCancel('img');

    })
  }

  // onGridReady()
  public onGridReady(grid): void {
    console.log(grid);
    this.grid = grid;
    this.grid.api.setRowData([]);
    this.grid.api.sizeColumnsToFit();
  }

  // onGridReady()
  public onImageGridReady(grid): void {
    console.log(grid);
    this.imageGrid = grid;
    this.imageGrid.api.setRowData([]);
    this.imageGrid.api.sizeColumnsToFit();
  }

  public onCellClicked(row): void {
    if (row.event.target != undefined) {
      let data = row.data;
      let actionType = row.event.target.getAttribute("data-action-type");

      switch (actionType) {
        case "delete":
          row.data.SQL_STATE = fixedValues.sqlState.sqlDelete;
          this.grid.api.psRemove();
          break;
        case "download":
          const url = `${coreUrl}get-file?FILE_ID=${row.data.ID}&DOCUMENT_TYPE=doc`;
          window.open(url);
          // this.apiService.downloadFile(coreUrl + 'get-file', row.data.ID, 'doc').subscribe(response => {
          //   console.log(response);
          //   this.downLoadFile(response)
          // });
          break;
      }
    }
  }

  public onImageCellClicked(row): void {
    if (row.event.target != undefined) {
      let data = row.data;
      let actionType = row.event.target.getAttribute("data-action-type");

      switch (actionType) {
        case "delete":
          row.data.SQL_STATE = fixedValues.sqlState.sqlDelete;
          this.imageGrid.api.psRemove();
          break;
        case "download":
          const url = `${coreUrl}get-file?FILE_ID=${row.data.ID}&DOCUMENT_TYPE=img`;
          window.open(url);
          // this.apiService.downloadFile(coreUrl + 'get-file', row.data.ID, 'img').subscribe(response => {
          //   console.log(response);            
          //   this.downLoadFile(response)
          // });
          break;
      }
    }
  }

  downLoadFile(response: any) {
    let blob = new Blob([response]);
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      console.warn('Please disable your Pop-up blocker and try again.');
    }
  }

  isColumnEditable(params) {
    return (!params.node.rowPinned) && (this.userPrivilege.checkEditablePrev(params));
  }



}
