import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { trigger, state } from '@angular/animations'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    
  ]
})
export class HeaderComponent implements OnInit {
  model: any = {}; //form-model
  @ViewChild('closeBtn') closeBtn: ElementRef;


  constructor(
    private authService: AuthService,
    private router: Router

  ) { }

  ngOnInit() {
  }

  onReset(form: NgForm) {
    form.resetForm()
  }

  onSubmit(form: NgForm) {
    this.authService.login(form.value).subscribe(res => {
      this.authService.setToken(res.token)
      this.router.navigateByUrl("/profile")

      // close the modal
      this.closeModal();
    })
  }

  // call this wherever you want to close modal
  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

}
