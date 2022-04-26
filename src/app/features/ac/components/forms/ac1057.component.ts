// Angular Stuff
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

// Our own stuff
import { FormParam } from "../../models/form-param";
import { globalVariables } from 'src/app/core/constants/globalVariables';
import { LangService } from 'src/app/core/services/lang.service';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { GridService } from 'src/app/shared/services/grid.service';
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import { JobReason } from "../../models/job-reason.model";
import { ModelService } from './../../services/forms/job-reason-setup/model.service';
import { DataService } from './../../services/forms/job-reason-setup/data.service';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { ToastrService } from 'ngx-toastr';
import { WebStorageService } from 'src/app/core/services/web-storage.service';

@Component({
  selector: 'app-ac1057',
  templateUrl: './../../templates/forms/ac1057.component.html',
})
export class Ac1057Component implements OnInit {
    psDateFormat: any;
    formParam: FormParam;
    //AG grid Job Reason 
    columnDefsJobReason = [];
    colObjJobReason;
    gridJobReason: any;
    gridIdJobReason: string = "JobReasonSetupGridHR_1057"
    public rowSelectionJobReason = 'single';
    gridRequiredOptions: any = {
      "REASON": {
        "required": {
          "message": ''
        }
      },

    };
      

  constructor(public langService: LangService
    , public dataLoadService: DataLoadService
    , public model: ModelService
    , public gridService: GridService
    , private alertService: AlertService
    , public dataService: DataService
    , private toastr: ToastrService
    , private storageService: WebStorageService
    ) { 
      this.formParam = new FormParam();
      this.leveTableColumnDef();

    }

  ngOnInit() { 
    this.formParam.FORM_ID = 'AC_1057';  
    // Data get with localstorage
    let data = JSON.parse( this.storageService.getData( globalVariables.DAMI_PREVILIGE));
	  this.model.userPrivilege = new UserPrivileges(data);    
  }

  onGridReady(gridJobReason) {
    this.gridJobReason = gridJobReason;
    this.gridJobReason.api.setRowData([]);  
    //this.gridJobReason.api.sizeColumnsToFit();  
            
    let body = JSON.parse( this.storageService.getData( globalVariables.DAMI_JOB_REASON_LIST));  
    let jobReasonListTmp = body.map(element => {
      element['SQL_STATE'] = fixedValues.sqlState.sqlUnchange;
      return new JobReason(element);          
    });        
    this.gridJobReason.api.setRowData( jobReasonListTmp ); 
    this.model.jobReasonListBacup = JSON.parse(JSON.stringify( jobReasonListTmp ));  
    console.log('asdf asd !');

    // Data get with API
    // let promiseAll = [  
    //   this.dataLoadService.load('FG_SA_COMM_USER_PREVILAGE/MAP', {
    //     P_CURRFORM: this.formParam.FORM_ID}),
    //   this.dataLoadService.load('FG_HR_COMM_JOBREASON'),                    
    // ];
    // forkJoin(
    //   promiseAll
    // ).subscribe(results => {      
    //   this.model.userPrivilege = new UserPrivileges(results[0].body); 
    //   if(this.model.userPrivilege.canShowData()){ 
    //     let jobReasonListTmp       = results[1].body.map(element => {
    //       element['SQL_STATE'] = fixedValues.sqlState.sqlUnchange;
    //       return new JobReason(element);          
    //     });        
    //     this.gridJobReason.api.setRowData( jobReasonListTmp ); 
    //     this.model.jobReasonListBacup = JSON.parse(JSON.stringify( jobReasonListTmp ));  
    //   }  
    // });

  }

  public leveTableColumnDef() {
    this.colObjJobReason = [
      { headerName: this.langService.langData.reason, 
        field: 'REASON',
        sortable: true,
        filter: true,
        width: 400, 
        editable: this.isColumnEditable.bind(this),
        resizable: true,
        hide: false 
      },
      { headerName: this.langService.langData.description,
        field: 'DESCR',
        sortable: true,
        width: 600,
        editable: this.isColumnEditable.bind(this),
        resizable: true,
        hide: false
      },
      {
        headerName: this.langService.langData.action,
        field: '_delete',
        sortable: false,
        resizable: false,
        width: 50,
        hide: false,
       // pinned: "right",
        cellStyle: { textAlign: "center" }, 
        cellRenderer: this.checkDeletePrev.bind(this)
      },
    ];
    this.columnDefsJobReason = this.gridService.getColumnDefs(this.colObjJobReason, this.gridIdJobReason);
  }

  checkDeletePrev(params) {    
    if (this.model.userPrivilege.checkDeletePrev(params)) {
      return ` <button type="button" data-action-type="deleteJobReason" class="btn btn--squire text-danger border-0"><i class="ion-close" data-action-type="deleteJobReason"></i></button>`
    } else return '';
  }

 
  onCellClicked(e){
    let actionType = e.event.target.getAttribute("data-action-type");               
    if(actionType == 'deleteJobReason'){
      return this.onClickDeleteJobResoan(e);
    }
  }

  onClickDeleteJobResoan(row) { 
    
    // this code Alternative Generic Method.
    // @this.gridJobReason.api.psRemoveGrid(row) 

    // if (row.data.SQL_STATE == fixedValues.sqlState.sqlInsert) {
    //   this.gridJobReason.api.updateRowData({ remove: [row.data] });
    // } else {        
    //   row.data.SQL_STATE = fixedValues.sqlState.sqlDelete;       
    //   this.gridJobReason.api.psRemove();
    // }    
    
    let res = this.gridJobReason.api.psRemoveGrid(row);
    console.log('res', res);
  }


  
  onClickAddNewJobReason() {
    this.gridJobReason.api.psAddNewGrid(JobReason, {});     
  }

  onClickSaveJobReason(){    
    this.gridJobReason.api.stopEditing();
    let validationResult = this.gridJobReason.api.psValidate();    
    if ( !validationResult.isValid) { 
      return;
    }

    setTimeout(() => {
      if (this.gridJobReason.api.psGetChangeList().length == 0) {
        this.toastr.info(this.langService.langData.noChangeFound,'Info');
        return;
      }

      this.alertService.info(this.langService.langData.saveConfirmationMsg, true).then(data => {      
        if(data){
          let jobReasonListTmp = JSON.parse(JSON.stringify(this.gridJobReason.api.psGetChangeList())); 
          this.dataService.saveJobReason(jobReasonListTmp).subscribe(result => {           
            if( result.body ){
              this.toastr.success(this.langService.langData.saveSuccessMsg,'Success');
            }
            this.gridJobReason.api.psResetValidation();
            this.gridJobReason.api.psUpdateList(result.body, JobReason);              
            this.model.jobReasonListBacup = JSON.parse(JSON.stringify( this.gridJobReason.api.psGridDataList() ));            
          }, err => {
            console.log("err", err);
          });
        }
      })

    }, 100);  
      
  }

  isColumnEditable(params){
    return this.model.userPrivilege.checkEditablePrev(params)      
  }

  onClickReset(){    
    this.gridJobReason.api.psClearFilter();
    let jobReasonListTmp = Array<JobReason>();
    jobReasonListTmp = this.model.jobReasonListBacup.map(element => {
      element['SQL_STATE'] = fixedValues.sqlState.sqlUnchange;
      return new JobReason(element);          
    });           
    this.gridJobReason.api.setRowData( jobReasonListTmp ); 
  }
  
}
