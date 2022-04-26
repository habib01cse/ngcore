import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HeaderProviderService } from './header-provider.service';

@Injectable({
  providedIn: 'root'
})

export class BaseDataService {
  private httpOptions: any;

  // constructor
  constructor(private http: HttpClient, private headerProvd: HeaderProviderService) {
    this.httpOptions = headerProvd.getHeader('application/x-www-form-urlencoded');
  }

  // formatErrors
  private formatErrors(error: any) {
    return throwError(error.error);
  }

  // executeQuery
  public executeQuery<T>(path: string, params: any = {}): Observable<any> {
    const _params = this.headerProvd.getHttpParamsByData(params);
    return this.http.post<T>(
      `${path}`,
      _params,
      this.httpOptions
    ).pipe(catchError(this.formatErrors));
  }

  // save
  public save<T>(path: string, entity: any): Observable<any> {
    // const _params = this.headerProvd.getHttpParamsByData(entity);
    return this.http.post<T>(
      `${path}`,
      JSON.stringify(entity),
      this.headerProvd.getHeader('application/json')
    ).pipe(catchError(this.formatErrors));
  }

  // download
  public download<T>(path: string, entity: any): Observable<any> {
    //var queryString = Object.keys(entity).map(key => key + '=' + encodeURIComponent(entity[key]) ).join('&');
    //var url = `${path}` + "?"+ queryString;
    //console.log(url);
    return this.http.post<T>(
      `${path}`, 
      JSON.stringify(entity), 
      this.headerProvd.getHeader('application/octet-stream')
      ).pipe(catchError(this.formatErrors));
  }

  // download
  public xlsxDownload<T>(path: string, entity: any): Observable<any> {    
    return this.http.post<T>(
      `${path}`,
      JSON.stringify(entity),
      this.headerProvd.getHeader('application/octet-stream')
    ).pipe(catchError(this.formatErrors));
  }

  // delete
  public delete<T>(path: string): Observable<any> {
    return this.http.delete<T>(
      `${path}`
    ).pipe(catchError(this.formatErrors));
  }

  // get data from file
  public getFileData(filePath: any): Observable<any> {
    return this.http.get(filePath);
  }

  // save file
  public saveFile(path: string, formData: FormData): Observable<any> {

    return this.http.post(`${path}`, formData).pipe(catchError(this.formatErrors));
  }

  downloadFile(path: string, fileId, fileType: string): Observable<any> {
    return this.http.get(`${path}?FILE_ID=${fileId}&DOCUMENT_TYPE=${fileType}`, { responseType: 'blob' })
  }

  // get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
  //   return this.http.get(`${path}`, { params })
  //     .pipe(catchError(this.formatErrors));
  // }

  // post(path: string, entity:any): Observable<any> {
  //   return this.http.post(
  //     `${path}`,
  //     JSON.stringify(entity)
  //     ).pipe(catchError(this.formatErrors));
  //   }

  // put(path: string, entity:any): Observable<any> {
  //   return this.http.put(
  //     `${path}`,
  //     JSON.stringify(entity)
  //   ).pipe(catchError(this.formatErrors));
  // }

  // get( url:string ) {}
  // post( url:string, entity:object ) {}
  // put( url:string, entity:object ) {}
  // patch( url:string, entity:object ) {}

}
