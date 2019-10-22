import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  submitted: boolean = false
  loading: boolean = false
  invalidCredentialsError: boolean = false
  emailValidationError: boolean = false
  defaultWarning: boolean = false
  successMessage: boolean = false
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })


  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }


  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || './home/welcome';
  }


  submit() {
    this.submitted = true

    if (this.loginForm.valid) {
      this.loading = true
      this.invalidCredentialsError = false
      this.defaultWarning = false

      this.authService.login(this.loginForm.value).subscribe(

        res => {
          this.router.navigate([this.returnUrl])
          this.loading = false
        },

        error => {
          switch (error.type) {
            case "InvalidCredentialsError":
              this.invalidCredentialsError = true
              break
            case "EmailValidationError":
              this.emailValidationError = true
              break
            default:
              this.defaultWarning = true
              this.submitted = false
          }
          this.loading = false
        }
      )
    }
  }


  resendVerificationEmail() {
    this.loading = true
    this.authService.resendVerificationEmail(this.email.value).subscribe(
      res => {
        console.log(res);
        this.successMessage = true
        this.loading = false
      },

      error => {
        console.log(error);
        this.loading = false
        
      }
    )
  }


  forgotPassword() {
    this.router.navigate(["forgot-password"], {
      relativeTo: this.route.parent,
      queryParams: {
        email: this.email.value
      }})
  }


  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }
}
