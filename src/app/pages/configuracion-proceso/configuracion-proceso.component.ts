import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-configuracion-proceso',
  templateUrl: './configuracion-proceso.component.html',
  styleUrls: ['./configuracion-proceso.component.scss']
})
export class ConfiguracionProcesoComponent implements OnInit {
  idProcess: any
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (response: any) => {
        this.idProcess = response.idProceso
      }
    )
  }

}
