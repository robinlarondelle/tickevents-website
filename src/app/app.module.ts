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
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EmailVerificationComponent } from './home/email-verification/email-verification.component';
import { RegisterComponent } from './home/register/register.component';
import { MustMatchDirective } from './shared/directives/MustMatchDirective';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventDetailsComponent } from './home/event-details/event-details.component';

import { RequestCache } from './shared/services/request-cache.service';
import { CachingInterceptor } from './shared/interceptors/caching-interceptor.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { TokenInterceptorService } from './shared/interceptors/token-interceptor.service';
import { TokenService } from './shared/services/token.service';
import { ErrorInterceptor } from './shared/interceptors/error-interceptor.service';
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
    CreateNewPasswordComponent
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
    //disable caching and intercepting until further notice
    // RequestCache,
    // { 
    //   provide: HTTP_INTERCEPTORS, 
    //   useClass: CachingInterceptor, 
    //   multi: true 
    // },
    // { 
    //   provide: HTTP_INTERCEPTORS, 
    //   useClass: ErrorInterceptor, 
    //   multi: true 
    // },
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
