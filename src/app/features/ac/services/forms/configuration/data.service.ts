import { Injectable } from '@angular/core';
import { BaseDataService } from 'src/app/core/services/base-data.service';
import { acConfig } from '../../../ac.config';
import { DataLoadService } from 'src/app/shared/services/data-load.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverPath = acConfig.url.apiUrl + 'ac1002';

  constructor(private apiService: BaseDataService
    , private dataLoadService: DataLoadService) { }

  // getVoucherTypes
  public getVoucherTypes(): any {
    return this.dataLoadService.load("FG_AC1002_VOUCHER_TYPES")
  }

  // getVoucherSignatureSetup
  public getVoucherReportConfig(VTYPE_NO): any {
    let paramObj = {
      P_VTYPE_NO: VTYPE_NO
    }
    return this.dataLoadService.load("FG_AC1002_VOUCHER_REPORTCONFIG", JSON.parse(JSON.stringify(paramObj)))
  }

  // getHeadIndentity
  public getHeadIndentities(): any {
    return this.dataLoadService.load("FG_AC1002_HEAD_IDENTITIES ");
  }

  // getPost
  public getPosts(): any {
    return this.dataLoadService.load("FG_AC1002_GET_POST");
  }

  // getConfig
  public getConfigs(): any {
    return this.dataLoadService.load("FG_AC1002_GET_CONFIGS");
  }

  // getProvConvEmployees
  public getProvConvEmployeess(): any {
    return this.dataLoadService.load("FG_AC1002_PROV_CONV_EMPLOYEES");
  }

  // getExpConvEmployees
  public getExpConvEmployees(): any {
    return this.dataLoadService.load("FG_AC1002_EXP_CONV_EMPLOYEES")
  }

  // getBMBillProvEmpAccounts
  public getBMBillProvEmpAccounts(LOOKUPDTL_NO): any {
    let paramObj = {
      P_LOOKUPDTL_NO: LOOKUPDTL_NO
    }
    return this.dataLoadService.load("FG_AC1002_BM_BILL_PROV_EMP_ACC", JSON.parse(JSON.stringify(paramObj)))
  }

  // getBMBillEmpExpAccounts
  public getBMBillEmpExpAccounts(LOOKUPDTL_NO): any {
    let paramObj = {
      P_LOOKUPDTL_NO: LOOKUPDTL_NO
    }

    return this.dataLoadService.load("FG_AC1002_BM_BILL_EMP_EXP_ACC", JSON.parse(JSON.stringify(paramObj)))
  }

  // saveVoucherType
  public saveVoucherTypes(params): any {
    return this.apiService.save<any>(`${this.serverPath}/save-voucher-types`, params);
  }

  // saveVoucherType
  public saveVoucherTypesSignature(params): any {
    return this.apiService.save<any>(`${this.serverPath}/save-voucher-signature-set-up`, params);
  }

  // removeVoucherType
  public removeVoucherType(): any {
    return this.apiService.executeQuery<any>(`${this.serverPath}/remove-voucher-type`);
  }

  // saveHeadIdentity
  public saveHeadIdentity(params): any {
    return this.apiService.save<any>(`${this.serverPath}/save-head-indentities`, params);
  }

  // removeHeadIdentity
  public removeHeadIdentity(): any {
    return this.apiService.executeQuery<any>(`${this.serverPath}/remove-head-identity`);
  }

  // savePost
  public savePost(params): any {
    return this.apiService.save<any>(`${this.serverPath}/save-posts`, params);
  }

  // removePost
  public removePost(): any {
    return this.apiService.executeQuery<any>(`${this.serverPath}/remove-post`);
  }

  // saveConfig
  public saveConfig(params): any {
    return this.apiService.save<any>(`${this.serverPath}/save-config`, params);
  }

  // removeConfig
  public removeConfig(): any {
    return this.apiService.executeQuery<any>(`${this.serverPath}/remove-config`);
  }
  // Get getEmployees by vouter type
  public getEmployeesByVTypeNo(VTYPE_NO) {
    let paramObj = {
      P_VTYPE_NO: VTYPE_NO
    };
    return this.dataLoadService.load("FG_AC1002_EMP_VOUCHER_LIST", JSON.parse(JSON.stringify(paramObj)))
  }

  // Get User info account policy
  public getUserInfoAccountPolicy() {
    return this.dataLoadService.load("FG_AC1002_USER_INFO_ACC_POLICY");
  }

  // Get getEmployees by vouter type
  public getBuInfoByUser(ACC_NO) {
    let paramObj = {
      P_BU_ACC_NO: ACC_NO
    };
    return this.dataLoadService.load("FG_AC1002_BU_INFO_BY_USER", JSON.parse(JSON.stringify(paramObj)));
  }

  public saveAccPolicy(params): any {
    return this.apiService.save<any>(`${this.serverPath}/save-acc-policy`, params);
  }

  // saveVoucherType
  public saveBillProv(params): any {
    return this.apiService.save<any>(`${this.serverPath}/save-bill-prov`, params);
  }
  // saveBillEmp
  public saveBillEmp(params): any {
    return this.apiService.save<any>(`${this.serverPath}/save-bill-emp`, params);
  }

  // saveProvisionEmployee
  public saveProvisionEmployee(params): any {
    return this.apiService.save<any>(`${this.serverPath}/save-prov-emp`, params);
  }

  // saveProvisionEmployee
  public saveExpenseAccouts(params): any {
    return this.apiService.save<any>(`${this.serverPath}/save-conv-emp`, params);
  }

  
  // saveEmpVouchgerList
  public saveEmpVouchgerList(params): any {
    return this.apiService.save<any>(`${this.serverPath}/save-emp-voucher-list`, params);
  }

    // removePolicy 
    public removePolicy(BU_ACC_NO): any {
      let obj = {
        BU_ACC_NO: BU_ACC_NO
      }
      return this.apiService.executeQuery<any>(`${this.serverPath}/remove-policy`, obj);
    }

}
