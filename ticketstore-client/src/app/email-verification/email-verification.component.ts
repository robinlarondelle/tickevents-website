import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit, OnDestroy {

  alreadyVerifiedEmailError: boolean = false
  expiredTokenError: boolean = false
  tokenMismatchError: boolean = false
  tokenMissingError: boolean = false

  identityUserID: number
  token: string
  jwt: string
  private sub: any


  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.identityUserID = +params['userid']
      this.token = params['token']
      this.jwt = params['jwt']
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  confirmEmail() {    
    this.authService.sendVerification(this.identityUserID, this.token).subscribe(res => {
      if (res.message) {
        if (res.message.includes('AlreadyVerifiedEmailError')) this.alreadyVerifiedEmailError = true
        else if (res.message.includes('ExpiredTokenError')) this.expiredTokenError = true
        else if (res.message.includes('TokenMismatchError')) this.tokenMismatchError = true
        else if (res.message.includes('TokenMissingError')) this.tokenMismatchError = true
      } else {
        localStorage.setItem('token', this.token)
        console.log(`success`);
        
      }
      
    })
  }

  resendEmail() {
    console.log(`resend email`);
    
  }
}