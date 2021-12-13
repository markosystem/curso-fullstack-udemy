import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../../clientes/clientes';
import { ServicoPrestado } from '../servicoPrestado';
import { Router } from '@angular/router';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servico: ServicoPrestado;
  success: boolean = false;
  erros: String[];
  id: number;

  constructor(
      private clienteService: ClientesService, 
      private servicoService: ServicoPrestadoService,
      private route: Router) { 
    this.servico = new ServicoPrestado();
  }

  ngOnInit(): void {
    this.clienteService
      .getClientesAll()
      .subscribe(response => this.clientes = response);
  }

  onSubmit(){
    this.servico.data = this.convertDataToBr(this.servico.data, 'dd/MM/yyyy');
    if (!this.id) {
      this.servicoService.saveServicoPrestado(this.servico)
        .subscribe(response => {
          this.success = true;
          this.erros = [];
          this.servico = new ServicoPrestado();
          console.log(response);
        },
          erroResponse => {
            this.success = false;
            if(erroResponse.error.errors){
              this.erros = erroResponse.error.errors;
            }else{
              this.erros = ['Houve um problema ao realizar a operação!'];
            }
            console.log(erroResponse);
          });
    } else {

      /* this.servicoService.updateCliente(this.cliente)
        .subscribe(response => {
          this.success = true;
          this.erros = [];
          this.cliente = response;
          console.log(response);
        },
          erroResponse => {
            this.success = false;
            this.erros = ['Houve um problema ao realizar a operação!']
            console.log(erroResponse);
          }); */

    }
  }

  backList() {
    this.route.navigate(['/servicos/lista']);
  }

  convertDataToBr(data: string, pattern: string){
    return new DatePipe('en-US').transform(data, pattern);
  }

}
