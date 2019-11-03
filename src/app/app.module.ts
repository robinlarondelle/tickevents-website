import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http'
import { ScrollEventModule } from 'ngx-scroll-event';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './home/login/login.component';
import { PageNotFoundComponent } from './home/page-not-found/page-not-found.component';
import { EmailVerificationComponent } from './home/email-verification/email-verification.component';
import { RegisterComponent } from './home/register/register.component';
import { MustMatchDirective } from './shared/directives/MustMatchDirective';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventDetailsComponent } from './home/event-details/event-details.component';

import { AuthGuard } from './shared/guards/auth.guard';
import { TokenInterceptorService } from './shared/interceptors/token-interceptor.service';
import { TokenService } from './shared/services/token.service';
import { PurchaseTicketFormComponent } from './home/purchase-ticket-form/purchase-ticket-form.component';
import { TicketTypesComponent } from './home/purchase-ticket-form/ticket-types/ticket-types.component';
import { PurchaseOverviewComponent } from './home/purchase-ticket-form/purchase-overview/purchase-overview.component';
import { CustomerDetailsComponent } from './home/purchase-ticket-form/customer-details/customer-details.component';
import { TypeComponent } from './home/purchase-ticket-form/ticket-types/type/type.component';
import { EventsComponent } from './home/welcome/events/events.component';
import { EventTileComponent } from './home/welcome/events/event-tile/event-tile.component';
import { ReturnToHomeButtonComponent } from './home/return-to-home-button/return-to-home-button.component';
import { LoadingIconComponent } from './loading-icon/loading-icon.component';
import { HttpErrorInterceptor } from './shared/interceptors/http-error-interceptor.service';
import { ForgotPasswordComponent } from './home/forgot-password/forgot-password.component';
import { CreateNewPasswordComponent } from './home/create-new-password/create-new-password.component';
import { DWelcomeComponent } from './dashboard/d-welcome/d-welcome.component';
import { DProfileComponent } from './dashboard/d-profile/d-profile.component';
import { DNotFoundComponent } from './dashboard/d-not-found/d-not-found.component';
import { DHeaderComponent } from './dashboard/d-header/d-header.component';
import { DCreateEventComponent } from './dashboard/d-create-event/d-create-event.component'

import { DSideMenuComponent } from './dashboard/d-side-menu/d-side-menu.component';
import { DProfileNavComponent } from './dashboard/d-side-menu/d-profile-nav/d-profile-nav.component';
import { DSettingsNavComponent } from './dashboard/d-side-menu/d-settings-nav/d-settings-nav.component';
import { DMyEventsNavComponent} from './dashboard/d-side-menu/d-my-events-nav/d-my-events-nav.component';
import { DCreateEventNavComponent } from './dashboard/d-side-menu/d-create-event-nav/d-create-event-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    PageNotFoundComponent,
    EmailVerificationComponent,
    RegisterComponent,
    MustMatchDirective,
    DashboardComponent,
    WelcomeComponent,
    EventDetailsComponent,
    PurchaseTicketFormComponent,
    TicketTypesComponent,
    PurchaseOverviewComponent,
    CustomerDetailsComponent,
    TypeComponent,
    EventsComponent,
    EventTileComponent,
    ReturnToHomeButtonComponent,
    LoadingIconComponent,
    ForgotPasswordComponent,
    CreateNewPasswordComponent,
    
    DSideMenuComponent,
    DProfileNavComponent,
    DSettingsNavComponent,
    DMyEventsNavComponent,
    DCreateEventNavComponent,
    
    DWelcomeComponent,
    DProfileComponent,
    DNotFoundComponent,
    DHeaderComponent,
    DCreateEventComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ScrollEventModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    AuthGuard,
    TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
