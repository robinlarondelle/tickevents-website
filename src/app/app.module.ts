import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestCache } from './shared/services/request-cache.service';
import { CachingInterceptor } from './shared/services/caching-interceptor.service';
import { CreateEventComponent } from './create-event/create-event.component';

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
    CreateEventComponent ],
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
