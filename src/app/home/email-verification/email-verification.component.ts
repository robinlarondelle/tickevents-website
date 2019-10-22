import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { IdentityUser } from 'src/app/shared/models/identityUser.model';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit, OnDestroy {
  identityUser: IdentityUser
  identityUserID: number
  token: string
  private sub: any
  
  tokenExpiredError: boolean = false
  defaultError: boolean = false  
  successMessage: boolean = false
  submitted: boolean = false
  loading: boolean = false


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }


  ngOnInit() {
    this.loading = true
    this.sub = this.route.params.subscribe(params => {
      this.identityUserID = params['userid']
      this.token = params['token']

      this.userService.getIdentityUserById(this.identityUserID, this.token).subscribe(
        res => {
          this.identityUser = res
          this.loading = false
        },

        error => {
          this.router.navigate(["404"])
        }
      )
    })
  }


  verifyEmail() {
    this.loading = true
    this.defaultError = false

    this.authService.sendVerification(this.identityUserID, this.token).subscribe(
      res => {
        this.loading = false
        this.router.navigate(["dashboard"])
      },

      error => {
        this.defaultError = true
        this.loading = false
      }
    )
  }

  resendEmail() {
    this.loading = true

    this.authService.resendVerificationEmail(this.identityUser.email).subscribe(
      res => {
        this.loading = false
        this.successMessage = true
      },

      error => {
        this.loading = false
      }
    )
  }


  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}