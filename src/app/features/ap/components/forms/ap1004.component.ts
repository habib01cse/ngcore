import { Component, OnInit } from '@angular/core';
// Our own stuff
import { LangService } from "src/app/core/services/lang.service";
import { globalVariables } from "src/app/core/constants/globalVariables";


import { DynamicModalService } from 'dynamicModal';
import { DateService, UtilityService } from 'src/app/shared';
import { GridService } from 'src/app/shared/services/grid.service';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { ToastrService } from 'ngx-toastr';
import { ModelService } from '../../services/forms/user-roles/model.services';
import { FormParam } from '../../models/form-param';
import { subMenuListColumnDef, totalInheritorLovColumnDef } from 'src/app/shared/constants/column-defs.enum';
import { DataService } from '../../services/forms/user-roles/data.services';
import { AlertService } from 'src/app/shared/popup/service/alert.service';
import { Role } from '../../models/role.model';
import { RoleDtl } from '../../models/role-dtl.model';
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
@Component({
  selector: 'app-ap1004',
  templateUrl: './../../templates/forms/ap1004.component.html',
})
export class Ap1004Component implements OnInit {



  rowSelectionType = 'multiple';
  public formParam: FormParam = new FormParam();

  constructor(public langService: LangService,
    private dateService: DateService,
    private modalService: DynamicModalService,
    public gridService: GridService,
    public dataLoadService: DataLoadService,
    public model: ModelService,
    private toastrService: ToastrService,
    public utilityService: UtilityService,
    public dataService: DataService,

    private alertService: AlertService) { }

  ngOnInit() {
   

    

  }
 

}
