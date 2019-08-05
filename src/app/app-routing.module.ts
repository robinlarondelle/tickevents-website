import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './home/events/events.component';
import { LoginComponent } from './home/login/login.component';
import { PageNotFoundComponent } from './home/page-not-found/page-not-found.component';
import { EmailVerificationComponent } from './home/email-verification/email-verification.component';
import { RegisterComponent } from './home/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { EventDetailsComponent } from './home/event-details/event-details.component';

const routes: Routes = [
  { path: '', redirectTo: "/home/welcome", pathMatch: "full" },
  { path: 'home', redirectTo: "/home/welcome", pathMatch: "full" },
  { path: "home", component: HomeComponent, children: [
      { path: "welcome", component: WelcomeComponent, data: { animation: 'WelcomeComponent'}},
      { path: "events", component: EventsComponent, data: { animation: 'EventsComponent'} },
      { path: "login", component: LoginComponent , data: { animation: 'LoginComponent'}},
      { path: "register", component: RegisterComponent , data: { animation: 'RegisterComponent'}},
      { path: "events/:id", component: EventDetailsComponent , data: { animation: 'EventDetailsComponent'}},
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