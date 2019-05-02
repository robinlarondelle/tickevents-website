import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './home/events/events.component';
import { LoginComponent } from './home/login/login.component';
import { PageNotFoundComponent } from './home/page-not-found/page-not-found.component';
import { EmailVerificationComponent } from './home/email-verification/email-verification.component';
import { RegisterComponent } from './home/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent, children: [
      { path: "events", component: EventsComponent },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
    ]
  },
  { path: "dashboard", component: DashboardComponent, children: [
    
  ]},

  { path: "404", component: PageNotFoundComponent },
  { path: "verify-email/:userid/:token/:jwt", component: EmailVerificationComponent },
  { path: "**", redirectTo: "/404" }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }