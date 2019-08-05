import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

const maxAge = 30000;
@Injectable()
export class RequestCache  {

  cache = new Map();

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    console.log('RequestCache get called');
    
    const url = req.urlWithParams;
    const cached = this.cache.get(url);

    console.log('cached: ');
    console.log(cached);
    
    

    if (!cached) {
      return undefined;
    }

    const isExpired = cached.lastRead < (Date.now() - maxAge);
    const expired = isExpired ? 'expired ' : '';

    console.log('cached response: ');
    console.log(cached.response);
    
    return cached.response;
  }



  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    console.log('RequestCache put called');
    
    const url = req.url;
    const entry = { url, response, lastRead: Date.now() };

    console.log('entry: ');
    console.log(entry);
    
    
    this.cache.set(url, entry);

    const expired = Date.now() - maxAge;
    this.cache.forEach(expiredEntry => {
      console.log('expired entry: ');
      console.log(expiredEntry);
      
      
      if (expiredEntry.lastRead < expired) {
        this.cache.delete(expiredEntry.url);
      }
    });
  }
}