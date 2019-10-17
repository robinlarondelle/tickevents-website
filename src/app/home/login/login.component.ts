import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/shared/services/token.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ServerError } from 'src/app/shared/models/server-error.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  loading: boolean = false
  invalidCredentialsError: boolean = false
  defaultWarning: boolean = false


  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || './home/welcome';
  }

  submit() {
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
          default:
            this.defaultWarning = true;
          }
          this.loading = false
      }
    ) 
  }
}
