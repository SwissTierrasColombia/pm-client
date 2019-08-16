import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-configuracion-steps',
  templateUrl: './configuracion-steps.component.html',
  styleUrls: ['./configuracion-steps.component.scss']
})
export class ConfiguracionStepsComponent implements OnInit {

  idStep: any;

  constructor(
    private services: ServicesService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (response: any) => {
        this.idStep = response.idStep
      }
    );
    console.log("this.idStep", this.idStep);

  }

}
