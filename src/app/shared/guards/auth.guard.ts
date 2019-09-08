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
      console.log('is logged in ' + this.authService.isLoggedIn());
      

      if (this.authService.isLoggedIn()) {
        console.log('authorized');
        
        return true //authorized

      } else {
        console.log('not authorized');
        
        this.authService.logout()

        //return to url after login
        this.router.navigate(['/home/login'], { queryParams: { returnUrl: state.url }});
        return false; //unauthorized
      }
    }
}
