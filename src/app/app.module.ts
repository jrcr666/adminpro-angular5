import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_ROUTES } from './app.routes';

//Modules

import { PagesModule } from './pages/pages.module';

// Services

import { SharedService } from './services/shared.service';
import { SidebarService } from './services/sidebar.service';

// Components

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    APP_ROUTES,
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    PagesModule
  ],
  providers: [
    SharedService,
    SidebarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
