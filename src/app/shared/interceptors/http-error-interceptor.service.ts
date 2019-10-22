import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor,HttpRequest,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';
import { ServerError } from "../models/server-error.model";
 
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor() {}
 
    intercept(req: HttpRequest<any>, next: HttpHandler): 
        Observable<HttpEvent<any>> {
 
          return next.handle(req).pipe(
             catchError( (error) => {

              if(error instanceof HttpErrorResponse) {
                if (error instanceof ErrorEvent) {
                  console.log("ErrorEvent");
                  console.log(error);
                  
                } else {
                  let serverError = new ServerError(error.error)
                  error = serverError
                }
              }
               return throwError(error);
          })
        )
    }
}