import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "events", component: EventsComponent },
  { path: "login", component: LoginComponent },
  { path: "create-event", component: EventCreateComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }