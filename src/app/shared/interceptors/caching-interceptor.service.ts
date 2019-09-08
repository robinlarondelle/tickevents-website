import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';
import { RequestCache } from '../services/request-cache.service';


/*
* CURRENTLY NOT ACTIVATED
*/


@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cache: RequestCache) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('intercept called');
    
    const cachedResponse = this.cache.get(req);
    console.log('cached response: ' + cachedResponse);
    
    return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next, this.cache);
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    cache: RequestCache): Observable<HttpEvent<any>> {

      console.log('sendRequest called');
      
      return next.handle(req).pipe(
        tap(event => {
          console.log(`event: `);
          console.log(event);
          
          if (event instanceof HttpResponse) {  
            cache.put(req, event);
          }
        })

    );
  }
}