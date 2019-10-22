import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService : AuthService,
    private router : Router) {}
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const status = this.authService.isLoggedIn.value
      
      if (status) {        
        return true //authorized
        
      } else {        
        this.authService.logout()
        
        //return to url after login
        this.router.navigate(['/home/login'], { queryParams: { returnUrl: state.url }});
        return false; //unauthorized
      }
    }
}
