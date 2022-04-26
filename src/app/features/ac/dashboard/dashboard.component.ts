import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DataLoadService } from 'src/app/shared/services/data-load.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { DatePipe } from '@angular/common';
import { FormParam } from '../models/form-param';
import { forkJoin } from 'rxjs';
import { LangService } from 'src/app/core/services/lang.service';
import { globalVariables } from 'src/app/core/constants/globalVariables';
import { DatePickerComponent } from 'src/app/shared/vendor';
import { DateService, MasterActionService } from 'src/app/shared';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { Observable } from 'rxjs';
import { AcDashboardService } from './ac-dashboard.service';



@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [DatePipe,AcDashboardService]
})

export class DashboardComponent implements OnInit {

    // data1:any=[];
    // constructor (private user :UserServiceService)
    // {
    //   this.user.getData().subscribe(data=>
    //     {
    //       console.log(data);
    //       this.data1=data;
  
    //     })
  
    // }
    


    psDateFormat: any;
    public reportUrl: string = '';
    public sliderHide = false;
    formParam: FormParam;
    
    //   title = 'myHighchart';

    //  data = [{
    //          name: 'ItSolutionStuff.com',
    //          data: [500, 700, 555, 444, 777, 877, 944, 567, 666, 789, 456, 654]
    //       },{
    //          name: 'Nicesnippets.com',
    //          data: [677, 455, 677, 877, 455, 778, 888, 567, 785, 488, 567, 654]
    //       }];



    //  chartOptions = {   
    //    chart: {
    //       type: "column"
    //    },
    //    title: {
    //       text: "Monthly Site Visitor"
    //    },
    //    xAxis:{
    //       categories:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    //    },
    //    yAxis: {          
    //       title:{
    //          text:"Visitors"
    //       } 
    //    },
    //    series: this.data
    //  };
    data1 : any =[];
    max: number = 100;
    value: number = 25;
    companyList:any;
    acdash :any=[];
    
    constructor(public langService: LangService, public dataLoadService: DataLoadService  , public datePipe: DatePipe,private dateService: DateService,private utilityService: UtilityService,private acDashboard : AcDashboardService ) { this.formParam = new FormParam()}

        // this.acDashboard.getData().subscribe(dataseries=>
        //     {
        //       console.log(dataseries);
        //       this.data1=dataseries;
      
        //     })
    
    

    ngOnInit() {
        this.psDateFormat = globalVariables.psDateFormat;
         
      this.data1 = this.acDashboard.getData();
      console.log(this.data1);
      this.chartOptions.series=this.data1;
    
      
        
    let promiseAll = [
        this.dataLoadService.load('FG_SA_COMM_EMP_COMPANY'),
      ]
     
      forkJoin(promiseAll).subscribe(results => {
     
        this.companyList = results[0].body;
        console.log('this.companyList',this.companyList)
       
        this.setDefaultData();
    
      })


    }
    highcharts = Highcharts;
    chartOptions = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Browser market shares. January, 2018'
        },
        subtitle: {
            text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total percent market share'
            }

        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0, 
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: this.data1
        
    }
    setDefaultData() {

        this.formParam.COMPANY_NO = globalVariables.userInfo.company_NO;
      
        // this.formParam.START_DATE = null;
        // this.formParam.END_DATE = null;
      } 
      
  

    
    
    
    
   
      onClickFilterDateModal() {
        console.log(this.chartOptions.series);
        debugger;
     
      }
    
    
  
}



