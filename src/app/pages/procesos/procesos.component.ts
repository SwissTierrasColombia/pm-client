import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.scss']
})
export class ProcesosComponent implements OnInit {
  listaprocesos = true;
  procesos: Array<{}>;
  nomProcessCreate: string;
  constructor(private services: ServicesService, private toastr: ToastrService, private route: Router) {
    this.procesos = []
  }

  ngOnInit() {
    this.services.GetProcesos().subscribe(
      response => {
        this.procesos = response;
      },
      error => {
        console.log("Error al obtener los procesos", error);
      }
    );
  }
  viewProcess() {
    this.listaprocesos = false;
  }
  CreateProcess() {
    this.services.CreateProcess(this.nomProcessCreate).subscribe(
      data => {
        this.procesos.push(data);
        this.listaprocesos = true;
        this.toastr.success("Haz registrado el proceso: " + this.nomProcessCreate)
      },
      error => {
        this.toastr.error("No se registro el proceso")
      }
    );
  }
  volver() {
    this.listaprocesos = true;
  }
  ConfigProcess(id: string) {
    this.route.navigate(['procesos/' + id + '/configuracion/']);
  }

}
