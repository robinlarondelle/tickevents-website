import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  returnUrl: string;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['./home/welcome'])
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || './home/welcome';
  }

  onSubmit(form: any) {
    this.authService.login(form.value).subscribe(res => {
      this.router.navigate([this.returnUrl])
    },
      error => {
        this.alertService.error(error)
      })
  }
}
