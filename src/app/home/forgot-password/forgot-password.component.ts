import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm = this.fb.group({})
  emailParam: string
  success: boolean = false
  loading: boolean = false
  submitted: boolean = false


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }


  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.forgotPasswordForm.addControl(
        'email', this.fb.control(
          params.get('email'), [Validators.required, Validators.email])
      )
    })
  }


  submit() {
    this.submitted = true
    this.loading = true
    this.success = false

    this.authService.forgotPassword(this.email.value).subscribe(
      res => {
      this.loading = false
      this.success = true
    },
    
    error => {
      this.loading = false
      this.success = true
    })
  }


  get email() { return this.forgotPasswordForm.get('email') }
}
