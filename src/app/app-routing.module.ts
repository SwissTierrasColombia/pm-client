import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P404Component } from './pages/error/404.component';
import { P500Component } from './pages/error/500.component';
import { ProcesosComponent } from './pages/procesos/procesos.component';
import { ConfiguracionProcesoComponent } from './pages/configuracion-proceso/configuracion-proceso.component';
import { ConfiguracionStepsComponent } from './pages/configuracion-steps/configuracion-steps.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'procesos',
    pathMatch: 'full'
  },
  {
    path: 'procesos',
    component: ProcesosComponent,
    data: {
      title: 'Procesos Registrados'
    }
  },
  {
    path: 'procesos/:idProceso/configuracion',
    component: ConfiguracionProcesoComponent,
    data: {
      title: 'Configuración de Procesos'
    }
  },
  {
    path: 'steps',
    component: ConfiguracionStepsComponent,
    data: {
      title: 'Configuración de pasos'
    }
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: '**',
    component: P404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
