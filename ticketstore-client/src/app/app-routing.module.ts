import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { MyEventsComponent } from './profile/my-events/my-events.component';
import { MyTicketsComponent } from './profile/my-tickets/my-tickets.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "events", component: EventsComponent },
  { path: "login", component: LoginComponent },
  { path: "create-event", component: EventCreateComponent },
  { path: "profile", component: ProfileComponent, children: [
      { path: "my-events", component: MyEventsComponent },
      { path: "my-tickets", component: MyTicketsComponent }
    ]
  },
  { path: "404", component: PageNotFoundComponent },
  { path: "*", redirectTo: "/404" }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }