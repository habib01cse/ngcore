import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpParams } from '@angular/common/http';

const maxAge = 30000;
@Injectable()
export class RequestCache  {

  cache = new Map();

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    let paramsString = this.getRequestParams(req);
    const url = req.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }
    if(paramsString != cached.params) {
      return undefined;
    }

    const isExpired = cached.lastRead < (Date.now() - maxAge);
    const expired = isExpired ? 'expired ' : '';
    return cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    let paramsString = this.getRequestParams(req);
    const url = req.url;
    const entry = { url, response, lastRead: Date.now(), params: paramsString };
    this.cache.set(url, entry);

    const expired = Date.now() - maxAge;
    this.cache.forEach(expiredEntry => {
      if (expiredEntry.lastRead < expired) {
        this.cache.delete(expiredEntry.url);
      }
    });
  }

  getRequestParams(req: HttpRequest<any>) {
    if(req.body instanceof HttpParams) {
      return JSON.stringify(req.body['updates'])
    }
    else if(typeof(req.body) === "string") {
      return req.body;
    }
    else {
      return JSON.stringify(req.body);
    }
  }
}