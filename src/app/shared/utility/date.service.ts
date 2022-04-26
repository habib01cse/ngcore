import { Injectable } from '@angular/core';
const SHORTMONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const SHORTDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

@Injectable({
  providedIn: 'root'
})
export class DateService {
  constructor() { }

  public getPrideTodayDDMMYYYYSlash() {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1; // January is 0!
    const yyyy = today.getFullYear();

    // if (dd < 10) {
    //     dd = "0" + dd.toString()
    // }
    // if (mm < 10) {
    //     mm = "0" + mm.toString()
    // }
    // return dd + "/" + mm + "/" + yyyy;
  }

  public getPrideTodayAndTime() {
    return new Date().toLocaleString();
  }

  public getPsTime(date) {
    if (date === '' || date === null) {
      return '';
    }
    try {
      const dateObj = new Date(date);
      const getTime = dateObj.getHours() + ":"
        + dateObj.getMinutes() + ":"
        + dateObj.getSeconds();
      return getTime;

    } catch (error) {
      console.log(error);
      return '';
    }

  }

  public getDDMMYYYYSlashFromDate(date) {
    // var today = new Date();
    if (date === '' || date === null) {
      return '';
    }
    try {
      const dateObj = new Date(date);
      const dd = dateObj.getDate();
      const mm = dateObj.getMonth() + 1; // January is 0!
      const yyyy = dateObj.getFullYear().toString();
      let rDd = dd.toString();
      let rMm = mm.toString();
      if (dd < 10) {
        rDd = '0' + dd.toString();
      }
      if (mm < 10) {
        rMm = '0' + mm.toString();
      }
      return rDd + '/' + rMm + '/' + yyyy;
    } catch (error) {
      console.log(error);
      return '';
    }
  }

  public getDDMMYYSlashFromDate(date) {
    // var today = new Date();
    if (date === '' || date === null) {
      return '';
    }
    try {
      const dateObj = new Date(date);
      const dd = dateObj.getDate();
      const mm = dateObj.getMonth() + 1; // January is 0!
      const yy = dateObj.getFullYear().toString().substring(2);
      let rDd = dd.toString();
      let rMm = mm.toString();
      if (dd < 10) {
        rDd = '0' + dd.toString();
      }
      if (mm < 10) {
        rMm = '0' + mm.toString();
      }
      return rDd + '/' + rMm + '/' + yy;
    } catch (error) {
      console.log(error);
      return '';
    }
  }

  public getMMDDYYYYSlashFromDate(date) {
    // var today = new Date();
    if (date === '' || date === null) {
      return '';
    }
    try {
      const dateObj = new Date(date);
      const dd = dateObj.getDate();
      const mm = dateObj.getMonth() + 1; // January is 0!
      const yyyy = dateObj.getFullYear().toString();
      let rDd = dd.toString();
      let rMm = mm.toString();
      if (dd < 10) {
        rDd = '0' + dd.toString();
      }
      if (mm < 10) {
        rMm = '0' + mm.toString();
      }
      return rMm + '/' + rDd + '/' + yyyy;
    } catch (error) {
      console.log(error);
      return '';
    }
  }


  public getYYYYMMDDDashFromDate(date) {
    // var today = new Date();
    if (!date) return null;
    try {
      const dateObj = new Date(date);
      const dd = dateObj.getDate();
      const mm = dateObj.getMonth() + 1; // January is 0!
      const yyyy = dateObj.getFullYear().toString();
      let rDd = dd.toString();
      let rMm = mm.toString();
      if (dd < 10) {
        rDd = '0' + dd.toString();
      }
      if (mm < 10) {
        rMm = '0' + mm.toString();
      }
      return yyyy + '-' + rMm + '-' + rDd;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  public getZeroHourZeroMinute(d) {
    if (!d) return null;
    try {
      var MyDate = new Date(d);
      var MyDateString;
      MyDate.setDate(MyDate.getDate() + 20);
      MyDateString = ('0' + MyDate.getDate()).slice(-2) + '/'
                   + ('0' + (MyDate.getMonth()+1)).slice(-2) + '/'
                   + MyDate.getFullYear();
                   console.log("MyDateString", MyDateString);
      return MyDateString;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public getSecound(date): number {
    if (!date) return null;
    try {
      const dateObj = new Date(date);
      return dateObj.getHours() * 60 * 60 + dateObj.getMinutes() * 60 + dateObj.getSeconds();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public isTodateFromDate(date) {
    return new Date().toLocaleString().split(',')[0] === new Date(date).toLocaleString().split(',')[0];
  }

  public shortMonthDate(a) {
    console.log('abab', a);
    a = a.substr(0,5)+SHORTMONTHS[+a.substr(5,2)-1]+a.substr(7);
    console.log('aaa', a);
    
    return new Date(a);
  }

  public getDifferentBetweenTwoDate(dateString, nowDate) {
    var now = new Date(nowDate);
  
    var yearNow = now.getFullYear();
    var monthNow = now.getMonth();
    var dateNow = now.getDate();
  
    var dob = new Date(dateString);
  
    var yearDob = dob.getFullYear();
    var monthDob = dob.getMonth();
    var dateDob = dob.getDate();
    var age = {
    years: null,
    months: null,
    days: null
    };
    var ageString = "";
    var yearString = "";
    var monthString = "";
    var dayString = "";
  
  
    var yearAge = yearNow - yearDob;
  
    if (monthNow >= monthDob)
      var monthAge = monthNow - monthDob;
    else {
      yearAge--;
      var monthAge = 12 + monthNow -monthDob;
    }
  
    if (dateNow >= dateDob)
      var dateAge = dateNow - dateDob;
    else {
      monthAge--;
      var dateAge = 31 + dateNow - dateDob;
  
      if (monthAge < 0) {
        monthAge = 11;
        yearAge--;
      }
    }
  
    age = {
        years: yearAge,
        months: monthAge,
        days: dateAge
        };
  
    if ( age.years > 1 ) yearString = " years";
    else yearString = " year";
    if ( age.months> 1 ) monthString = " months";
    else monthString = " month";
    if ( age.days > 1 ) dayString = " days";
    else dayString = " day";
  
  
    if ( (age.years > 0) && (age.months > 0) && (age.days > 0) )
      ageString = age.years + yearString + ", " + age.months + monthString + ", and " + age.days + dayString + " .";
    else if ( (age.years == 0) && (age.months == 0) && (age.days > 0) )
      ageString = "Only " + age.days + dayString + " !";
    else if ( (age.years > 0) && (age.months == 0) && (age.days == 0) )
      ageString = age.years + yearString;
    else if ( (age.years > 0) && (age.months > 0) && (age.days == 0) )
      ageString = age.years + yearString + " and " + age.months + monthString + " .";
    else if ( (age.years == 0) && (age.months > 0) && (age.days > 0) )
      ageString = age.months + monthString + " and " + age.days + dayString + " .";
    else if ( (age.years > 0) && (age.months == 0) && (age.days > 0) )
      ageString = age.years + yearString + " and " + age.days + dayString + " .";
    else if ( (age.years == 0) && (age.months > 0) && (age.days == 0) )
      ageString = age.months + monthString + " .";
    else ageString = "Oops! Could not calculate age!";
  
    return ageString;
  }

  toDate(date) {
    if (!date) return null;
    return new Date(date);
  }

  public toDateTimeString(date) {
    if (!date) return null;

    try {
      const dateObj = new Date(date);
      const h = this.pad(dateObj.getHours(), 2);
      const m = this.pad(dateObj.getMinutes(), 2);
      const s = this.pad(dateObj.getSeconds(), 2);
      const ms = this.pad(dateObj.getMilliseconds(), 3);
      const dd = this.pad(dateObj.getDate(), 2);
      const mm = this.pad(dateObj.getMonth() + 1, 2); // January is 0!
      const yyyy = dateObj.getFullYear().toString();
      const zone = dateObj.toString().match(/([-\+][0-9]+)\s/)[1];
      return `${yyyy}-${mm}-${dd}T${h}:${m}:${s}.${ms}${zone}`;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public toDateTimeStringStringMongth(date) {
    if (!date) return null;

    try {
      const dateObj = new Date(date);
      const h = this.pad(dateObj.getHours(), 2);
      const m = this.pad(dateObj.getMinutes(), 2);
      const s = this.pad(dateObj.getSeconds(), 2);
      const ms = this.pad(dateObj.getMilliseconds(), 3);
      const dd = this.pad(dateObj.getDate(), 2);
      const mm = SHORTMONTHS[(dateObj.getMonth())]; // January is 0!
      const yyyy = dateObj.getFullYear().toString();
      const zone = dateObj.toString().match(/([-\+][0-9]+)\s/)[1];
      return `${yyyy}-${mm}-${dd}T${h}:${m}:${s}.${ms}${zone}`;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public pad(num, size)
  {
    return ('000000000' + num).substr(-size);
  }

  durationOfDays(d1, d2) {
    if (d1 && d2) {
      let date1 = new Date(d1).getTime();
      let date2 = new Date(d2).getTime();
      let diffTime = Math.abs(date1 - date2);
      let durDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      //console.log('dur Days :', durDays);
      return durDays;
    } else {
      return null;
    }
  }

  hasBetweenDate( checkDt, startDt, endDt){    
    // Date form mate masebe "02/05/2013"
    let chkDt = this.getDDMMYYYYSlashFromDate(new Date(checkDt));
    let stDt = this.getDDMMYYYYSlashFromDate(new Date(startDt));
    let enDt = this.getDDMMYYYYSlashFromDate(new Date(endDt));
  
    let sdt:any = stDt.split("/");
    let edt:any = enDt.split("/");
    let cdt:any = chkDt.split("/");

    var start = new Date(sdt[2], parseInt(sdt[1]) - 1, sdt[0]);  // -1 because months are from 0 to 11
    var end = new Date(edt[2], parseInt(edt[1]) - 1, edt[0]);
    var check = new Date(cdt[2], parseInt(cdt[1]) - 1, cdt[0]);
    //console.log(check > start && check < end)
    return check > start && check < end;
  }


  dateAddition(d, day:number) {    
    return this.dtCal(d, day, this.dtAdd);
  }
  dateSubtraction(d, day:number){  
    return this.dtCal(d, day, this.dtSub)
  }
  dtCal(d, day, dtFunc){
    if (!d) return null;
    try {   
      let dt = new Date(d);   
      return dtFunc(dt, day);     
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  dtAdd(dt, day){    
    dt.setDate(dt.getDate() + day);
    return dt;
  }
  dtSub(dt, day) {   
    dt.setDate(dt.getDate() - day);
    return dt;
  }

}


