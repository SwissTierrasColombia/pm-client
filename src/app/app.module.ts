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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RulesComponent } from './pages/configuracion-steps/rules/rules.component';
import { Callbacks } from 'src/app/models/callbacks';
import { ErrorInterceptorService } from './services/error/error-interceptor.service';
import { RolesComponent } from './pages/configuracion-steps/roles/roles.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TypeDataFieldModel } from './models/typeDataField.model';

@NgModule({
  declarations: [
    AppComponent,
    ProcesosComponent,
    ConfiguracionProcesoComponent,
    ConfiguracionStepsComponent,
    P404Component,
    P500Component,
    RulesComponent,
    RolesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxGraphModule,
    NgbModule
  ],
  providers: [
    Callbacks,
    TypeDataFieldModel,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
