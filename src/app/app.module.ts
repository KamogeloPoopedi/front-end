// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';

import { LoginComponent } from './login/login.component';

import { SearchComponent } from './search/search.component';
import { AuthServiceService } from './auth-service.service';
import { UserServicaService } from './user-servica.service'; // Import the second service

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthServiceService, UserServicaService], // Include both services here
  bootstrap: [AppComponent]
})
export class AppModule { }
