import { Component, OnInit } from '@angular/core';
import { ManageServicesService } from 'src/app/services/m/manage-services.service';
import { ParameterizationServicesService } from 'src/app/services/p/parameterization-services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  formRules = [];
  idStep: string;
  nameStep: string;
  idProcess: string;
  allstepsSelect: any;
  idStepSelect: any;
  allFieldStep: any;
  typeOperaators: any;
  constructor(
    private services: ManageServicesService,
    private servicesp: ParameterizationServicesService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (response: any) => {
        this.idStep = response.idStep;
        this.nameStep = response.nameStep;
        this.idProcess = response.idProceso;
        //console.log("route response", response);
      }
    );
    let promiseForm = new Promise((resolve, reject) => {
      this.services.GetStepsProcess(this.idProcess).subscribe(
        response => {
          this.allstepsSelect = response;
          this.idStepSelect = this.allstepsSelect.find((item) => {
            return item.typeStep == this.idStep;
          })
          if (this.idStepSelect) {
            this.services.GetFieldsFromStep(this.idStepSelect._id).subscribe(
              response => {
                this.allFieldStep = response;
                console.log("this.allFieldStep: ", this.allFieldStep);

                resolve()
              }, error => {
                console.log(error);
              }
            )
          }
        }, error => {
          console.log("error obteniendo los pasos de procesos: ", error);

        }
      )
    });
    Promise.all([promiseForm]).then(values => {
    });
    this.servicesp.GetTypesOperators().subscribe(
      data => {
        this.typeOperaators = data;
        //console.log(this.typeOperaators);

      },
      error => {
        console.log("error typeOperaators: ", error);

      }
    )
  }

}
