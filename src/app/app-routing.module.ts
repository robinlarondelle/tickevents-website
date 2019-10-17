import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
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

const routes: Routes = [
  { path: '', redirectTo: "/home/welcome", pathMatch: "full" },
  { path: 'home', redirectTo: "/home/welcome", pathMatch: "full" },
  {
    path: "home", component: HomeComponent, children: [
      { path: "welcome", component: WelcomeComponent, data: { animation: 'WelcomeComponent' } },
      { path: "login", component: LoginComponent, data: { animation: 'LoginComponent' } },
      { path: "register", component: RegisterComponent, data: { animation: 'RegisterComponent' } },
      { path: "events/:id", component: EventDetailsComponent, data: { animation: 'EventDetailsComponent' } },

      { path: "events/:id/purchase", redirectTo: "events/:id/purchase/ticket-types", pathMatch: "full" },
      {
        path: "events/:id/purchase", component: PurchaseTicketFormComponent, children: [
          {
            path: "", canActivate: [PurchaseFormGuard], children: [
              { path: "ticket-types", component: TicketTypesComponent },
              { path: "customer-details", component: CustomerDetailsComponent },
              { path: "purchase-overview", component: PurchaseOverviewComponent },
            ]
          }
        ]
      }
    ]
  },

  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },

  { path: "404", component: PageNotFoundComponent },
  { path: "verify-email/:userid/:token/:jwt", component: EmailVerificationComponent },
  { path: "**", redirectTo: "/404" }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }