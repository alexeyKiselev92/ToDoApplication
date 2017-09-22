import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { backendSimulationProvider } from '../backend/backend-simulate.component';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';


import { AlertService } from '../service/alert.service';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/users.service';
import { AlertComponent } from '../components/alert/alert.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { ToDoListComponent } from '../components/todoList/todoList.component';
import { AuthenticationGuard } from '../guards/athentication.guard';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    ToDoListComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    AuthenticationGuard,
    AlertService,
    AuthenticationService,
    UserService,

    backendSimulationProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
