import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(
    private injector: Injector
  ) { }
  
  intercept (req, next) {
    //this is not the normal way of importing a service, but because there is a chance of a injector-issue, this approach is used to inject the service
    let authService = this.injector.get(AuthService)


    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    })

    return next.handle(tokenizedReq)
  }
}
