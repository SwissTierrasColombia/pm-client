import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  FormsModule, ReactiveFormsModule
} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProcesosComponent } from './pages/procesos/procesos.component';
import { ConfiguracionProcesoComponent } from './pages/configuracion-proceso/configuracion-proceso.component';
import { ConfiguracionStepsComponent } from './pages/configuracion-steps/configuracion-steps.component';
import { P404Component } from './pages/error/404.component';
import { P500Component } from './pages/error/500.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RulesComponent } from './pages/configuracion-steps/rules/rules.component';
@NgModule({
  declarations: [
    AppComponent,
    ProcesosComponent,
    ConfiguracionProcesoComponent,
    ConfiguracionStepsComponent,
    P404Component,
    P500Component,
    RulesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
