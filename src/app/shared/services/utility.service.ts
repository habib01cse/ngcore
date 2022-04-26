import { Injectable } from '@angular/core';
import { Navigation, NavigationExtras, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { globalVariables } from "src/app/core/constants/globalVariables";
import { CommonModel } from '../models/common-model';
import { count } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DataLoadService } from './data-load.service';
const coreUrl = globalVariables.ERP_URL.adminApiUrl + 'core/file/';

@Injectable({
    providedIn: 'root',
})
export class UtilityService {
    constructor(private router: Router
        , public dataLoadService: DataLoadService        
        , public toastr: ToastrService) { 
    }

    public getEnumList(enumEntity): any {

        const enumList: CommonModel[] = [];
        for (const prop in enumEntity) {

            const comObj = new CommonModel();
            comObj.VALUE = enumEntity[prop];
            comObj.TEXT = (prop.toUpperCase() === prop)?prop:this.spaceWithCamel(prop);
            enumList.push(comObj);

            // let isValueProperty = parseInt(enumMember) >= 0;
            // if (!isValueProperty) {
            //     let newObject = new DdlModel();
            //     newObject.VALUE = myEnum[enumMember];
            //     newObject.TEXT = this.spaceWithCamel(enumMember);
            //     enumList.push(newObject);
            // }
        }
        return enumList;

    }

    // showReport
    public showReport(params, f?: any): void {
        let counter = 1;
        let report_url ="";
        for (var param in params) {
            // console.log(params[param], 'report_url');
            if (counter <= 2) {
                report_url += params[param];
                counter++;

            } else {
                report_url += "&" + param + "=" + params[param];
                counter++;
            }
        }

        // let uri=encodeURI(report_url)
        // console.log(uri);
        //const win = window.open(report_url, '_blank');
        // Open with new window
        const win = window.open(report_url, "_blank");
        if (win) {
            // Browser has allowed it to be opened
            win.focus();
        } else {
            // Browser has blocked it
            alert('Please allow popups for this website');
        }
    }

    /*private methods*/
    private spaceWithCamel(text): any {
        return text
            // insert a space before all caps
            .replace(/([A-Z])/g, ' $1')
            // uppercase the first character
            .replace(/^./, function (str) { return str.trim(); });
    }

    //Compare Objects
    public psHasAnyChange(a:any, b:any) {
        const a_string = (typeof(a) === "object")? JSON.stringify(a):a;
        const b_string = (typeof(b) === "object")? JSON.stringify(b):b;
        return a_string!==b_string;
    }

    // public getDateFormat(date: any, format: any) {
    //     return this.datePipe.transform(date, format);
    // }

    public async psForkJoin(promiseList:Observable<any>[]) {
        let results = [];
        for (let index = 0; index < promiseList.length; index++) {
            const element = promiseList[index];
            try {
                results[index] = await element.toPromise();
                
            } catch (error) {
                console.log('Error', error);
                
            }            
        }
        return results;
    }
    
    public openIntForm(url:string, sKey?:string, sParams?:any){
        sessionStorage.setItem( sKey, JSON.stringify(sParams) );
        var cPath = window.location.pathname;
        console.log(cPath);
        window.open( window.location.origin + cPath + "#" + url, '_blank');
    }


    public getExtras(router: Router, sKey: any){
        let _navigation = this.router.getCurrentNavigation();
        
        if ( _navigation != null && _navigation.extras.state ){
            return _navigation;
        } else{

            let tmpVal = sessionStorage.getItem(sKey);
            console.log("tmpVal:"+ tmpVal);

            if( !tmpVal ){ // if null
                return this.router.getCurrentNavigation();
            }

            let obj = {replaceUrl : true};
            obj = JSON.parse(tmpVal);
            obj = Object.assign(obj, {replaceUrl:true});
            console.log('obj', obj);

            let extras: NavigationExtras;
            extras = obj;

            let navigation = this.router.getCurrentNavigation();
            navigation.extras = extras;

            sessionStorage.removeItem(sKey);

            return navigation;
        }
        
    }
    //add days with date
    public addDays(_date: Date, nDay: any){
        let newDate = new Date();
        var days = _date.getDate();

        newDate.setDate(_date.getDate());
        newDate.setMonth(_date.getMonth());
        newDate.setFullYear(_date.getFullYear());

        days += Number(nDay+"");
        newDate.setDate(days);
        
        return newDate;
    }

    public domExcel(res:any, fname:string){
        var blob = new Blob([res]);
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fname.split(' ').join('_');
        link.click();
    }


    public checkResp(result:any){
        let st = false;
        if (result.status == globalVariables.respStatus200) {
            return st = true;
        } else {
            this.toastr.error(result.message, 'Error');
            return st = false;
        }

    }

}
