/* angular stuff */
import { Injectable } from '@angular/core';

/* our own stuff */
import { fixedValues } from 'src/app/shared/constants/fixed-values.enum';
import { AccountsBalanceDisplay } from '../../../models/account-balance-display';
import { FormParam } from '../../../models/form-param';
import { DateService } from 'src/app/shared';
import { CommonService } from '../../common.service';
import { UserPrivileges } from 'src/app/core/models/user-privileges';
import { acConfig } from '../../../ac.config';
import { BaseDataService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root'
})

export class ModelService {
  public accountDisplay: AccountsBalanceDisplay = new AccountsBalanceDisplay();
  public natureList = new Array<AccountsBalanceDisplay>();
  public headList = new Array<AccountsBalanceDisplay>();
  public chartList=[];
  public filterAbleChartList;
  public testdataList = [];
  public activeStatus: any = [];

  public filterActive = null;
  public userPrivilege = new UserPrivileges();
  public formParam: FormParam = new FormParam();
  public endDate = this.dateUtil.getYYYYMMDDDashFromDate(this.formParam.END_DATE);

  public rptHelpingObj = {
    selectedNatureName: '',
    selectedAccName: ''
  }
  //activeStatus: any = [];
  
  //public activeStatus = Object.keys(fixedValues.activeType).map(e => { return { type: e, name: fixedValues.activeType[e] } });

  constructor(
    private dateUtil: DateService,
    private commonService: CommonService,
    private apiService: BaseDataService
  ) {
    this.onScroll({start:0,end:0});

    // this.activeStatus = [
    //   { VALUE: null, TEXT: "All" },
    //   { VALUE: 1, TEXT: "Yes" },
    //   { VALUE: 0, TEXT: "No" },     
    // ];
  }

  getNatureName() {
    let natureNo = this.accountDisplay.NATURE_NO;
    let natureObj: any;
    if (natureNo != 0 || !isNaN(natureNo)) {
      natureObj = this.natureList.find(ba => {
        return ba.NATURE_NO == natureNo;
      });
    }
    if (typeof natureObj !== 'undefined') {
      this.rptHelpingObj.selectedNatureName = natureObj.NATURE_NAME == "null" ? '' : natureObj.NATURE_NAME || '';
    }
  }
  getSelectedAccName(){
    let accNo =  Number(this.accountDisplay.ACC_NO);
    let accObj: any;
    if (accNo != 0) {
      accObj = this.headList.find(ac => {
        return Number(ac.ACC_NO) == accNo;
      });
    }
    if (typeof accObj !== 'undefined') {
      this.rptHelpingObj.selectedAccName = accObj.ACC_NAME == "null" ? '' : accObj.ACC_NAME || '';
    }
  }

  //// Model check up

  photos = [];
  photosBuffer = [];
  bufferSize = 2;
  numberOfItemsFromEndBeforeFetchingMore = 10;
  loading = false;

  getTestData(NATURE_NO) {
    this.commonService.getNatures1(NATURE_NO ? NATURE_NO : 0).subscribe(result => {
      this.photos = result.body;
      this.photosBuffer = this.photos.slice(0, this.bufferSize);
    })
  }

  onScrollToEnd() {
    // this.fetchMore(end);
  }

  onScroll({ start, end }) {

    // here 5943 is the total number of element of of the array
    if (this.photosBuffer.length >= 5943) {
      return;
    }else {
      if (end + this.numberOfItemsFromEndBeforeFetchingMore >= this.photosBuffer.length) {
        this.commonService.getNatures1(end).subscribe(result => {
          this.photosBuffer = this.photosBuffer.concat(result.body);
        })
      }
    }
  

  }

  // onScroll({ start, end }) {

  //   if (this.loading || this.photos.length === this.photosBuffer.length) {
  //       return;
  //   }

  //   if (end + this.numberOfItemsFromEndBeforeFetchingMore >= this.photosBuffer.length) {
  //       this.fetchMore(end);
  //   }
  // }


  private fetchMore(end) {
    // const len = this.photosBuffer.length;
    // const more = this.photos.slice(len, this.bufferSize + len);
    // this.loading = true;
    // // using timeout here to simulate backend API delay
    // setTimeout(() => {
    //     this.loading = false;
    //     this.photosBuffer = this.photosBuffer.concat(more);
    // },200)

    this.commonService.getNatures1(end).subscribe(result => {
      this.photosBuffer = this.photosBuffer.concat(result.body);
      // this.photos = result.body;
      // this.photosBuffer = this.photos.slice(0, this.bufferSize);
    })
  }
  private serverPath = acConfig.url.apiUrl + 'ac1034';


  public updateStatus(params){
    return this.apiService.save<any>(`${this.serverPath}/save-chart`, params);
  }

}


