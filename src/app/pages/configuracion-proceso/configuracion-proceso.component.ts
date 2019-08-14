import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-configuracion-proceso',
  templateUrl: './configuracion-proceso.component.html',
  styleUrls: ['./configuracion-proceso.component.scss']
})
export class ConfiguracionProcesoComponent implements OnInit {
  idProcess: any;
  tab = 1;
  steps: any;
  roles: any;
  constructor(private services: ServicesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (response: any) => {
        this.idProcess = response.idProceso
      }
    );
    this.services.GetSteps().subscribe(
      response => {
        this.steps = response;
      },
      error => {
        console.log("error: ", error);

      }
    );
    this.services.GetRolesProcess(this.idProcess).subscribe(
      response => {
        this.roles = response;
      },
      error => {
        console.log("error: ", error);

      }
    );
  }

}
