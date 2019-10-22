import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { IdentityUser } from '../../shared/models/identityUser.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.component.html',
  styleUrls: ['./create-new-password.component.css']
})
export class CreateNewPasswordComponent implements OnInit {
  identityUser: IdentityUser
  token: string
  identityUserIDParam: number
  newPasswordForm = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    newPasswordConf: ['', [Validators.required]]
  })

  loading = false
  submitted = false
  successMessage = false
  passwordsDontMatchError = false
  tokenExpiredError = true
  defaultError = true


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.token = params['token']
      this.identityUserIDParam = params["identityUserID"]

      this.userService.getIdentityUserById(this.identityUserIDParam, this.token).subscribe(idUser => {
        this.identityUser = idUser

        this.newPasswordForm.addControl('token', this.fb.control(this.token))
        this.newPasswordForm.addControl('identityUserID', this.fb.control(this.identityUser.identityUserID))
      })
    })
  }


  submit() {
    this.submitted = true
    this.loading = true
    this.passwordsDontMatchError = false

    if (this.newPassword.value !== this.newPasswordConf.value) {
      this.loading = false
      this.passwordsDontMatchError = true
    }

    this.authService.postNewPassword(this.newPasswordForm).subscribe(
      res => {
        this.loading = false
        this.successMessage = true
      },

      error => {
        this.loading = false
        switch(error.type) {
          case "TokenExpiredError": this.tokenExpiredError = true
          default: this.defaultError = true
        }
      }
    )
  }

  
  get newPassword() {return this.newPasswordForm.get('newPassword')}
  get newPasswordConf() {return this.newPasswordForm.get('newPasswordConf')}

}
