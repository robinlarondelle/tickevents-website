import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EmailVerificationComponent } from './home/email-verification/email-verification.component';
import { RegisterComponent } from './home/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { EventDetailsComponent } from './home/event-details/event-details.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { PurchaseTicketFormComponent } from './home/purchase-ticket-form/purchase-ticket-form.component';
import { TicketTypesComponent } from './home/purchase-ticket-form/ticket-types/ticket-types.component';
import { CustomerDetailsComponent } from './home/purchase-ticket-form/customer-details/customer-details.component';
import { PurchaseOverviewComponent } from './home/purchase-ticket-form/purchase-overview/purchase-overview.component';
import { PurchaseFormGuard } from './shared/guards/purchase-form.guard';
import { ForgotPasswordComponent } from './home/forgot-password/forgot-password.component';
import { CreateNewPasswordComponent } from './home/create-new-password/create-new-password.component';
import { DWelcomeComponent } from './dashboard/d-welcome/d-welcome.component';
import { DProfileComponent } from './dashboard/d-profile/d-profile.component';
import { DNotFoundComponent } from './dashboard/d-not-found/d-not-found.component';

const routes: Routes = [
  //catch routes
  // { path: '', redirectTo: "/home/welcome", pathMatch: "full" }, //disabled for development purposes
  { path: '', redirectTo: "/dashboard", pathMatch: "full" },
  { path: 'home', redirectTo: "/home/welcome", pathMatch: "full" },

  //home-related routes
  { path: "home", component: HomeComponent, children: [
      { path: "welcome", component: WelcomeComponent, data: { animation: 'WelcomeComponent' } },

      //auth-related routes
      { path: "login", component: LoginComponent, data: { animation: 'LoginComponent' } },
      { path: "register", component: RegisterComponent, data: { animation: 'RegisterComponent' } },
      { path: "verify-email/:userid/:token", component: EmailVerificationComponent },
      { path: "forgot-password", component: ForgotPasswordComponent, data: { animation: 'ForgotPasswordComponent' } },
      {path: "forgot-password/:identityUserID/:token", component: CreateNewPasswordComponent, data: {animation: "CreateNewPasswordComponent"}},

      //event-related routes
      { path: "events/:id", component: EventDetailsComponent, data: { animation: 'EventDetailsComponent' } },
      { path: "events/:id/purchase", redirectTo: "events/:id/purchase/ticket-types", pathMatch: "full" },
      { path: "events/:id/purchase", component: PurchaseTicketFormComponent, children: [
          { path: "", canActivate: [PurchaseFormGuard], children: [
              { path: "ticket-types", component: TicketTypesComponent },
              { path: "customer-details", component: CustomerDetailsComponent },
              { path: "purchase-overview", component: PurchaseOverviewComponent },
            ]
          }
        ]
      }
    ]
  },

  //dashboard-related routes
  // { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] }, //deactivated authguard because of development purposes
  { path: "dashboard", redirectTo: "dashboard/welcome", pathMatch: "full"},
  { path: "dashboard", component: DashboardComponent, children: [
      {path: "welcome", component: DWelcomeComponent},
      {path: "profile", component: DProfileComponent},
      {path: "404", component: DNotFoundComponent}
  ]},

  //error-handling routes
  { path: "404", component: PageNotFoundComponent },
  { path: "**", redirectTo: "/404" }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }