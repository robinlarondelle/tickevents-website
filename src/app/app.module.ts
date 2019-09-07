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
import { EventsComponent } from './home/events/events.component';
import { LoginComponent } from './home/login/login.component';
import { PageNotFoundComponent } from './home/page-not-found/page-not-found.component';
import { EmailVerificationComponent } from './home/email-verification/email-verification.component';
import { RegisterComponent } from './home/register/register.component';
import { MustMatchDirective } from './shared/directives/MustMatchDirective';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { EventComponent } from './home/events/event/event.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventDetailsComponent } from './home/event-details/event-details.component';

import { RequestCache } from './shared/services/request-cache.service';
import { CachingInterceptor } from './shared/interceptors/caching-interceptor.service';
import { CreateEventWizardComponent } from './create-event-wizard/create-event-wizard.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { TokenInterceptorService } from './shared/interceptors/token-interceptor.service';
import { AlertComponent } from './alert/alert.component';
import { TokenService } from './shared/services/token.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    EventsComponent,
    LoginComponent,
    PageNotFoundComponent,
    EmailVerificationComponent,
    RegisterComponent,
    MustMatchDirective,
    DashboardComponent,
    WelcomeComponent,
    EventComponent,
    EventDetailsComponent,
    CreateEventWizardComponent,
    AlertComponent
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
    RequestCache,
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: CachingInterceptor, 
      multi: true 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    AuthGuard,
    TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
