import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientesService } from '../../clientes.service';
import { Cliente } from '../clientes';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;

  success: boolean = false;
  erros: String[];
  id: number;

  constructor(private service: ClientesService, private route: Router, private activateRoute: ActivatedRoute) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    let params = this.activateRoute.params;
    if (params && params['value'] && params['value'].id) {
      this.id = params['value'].id;
      this.service
        .getClienteById(this.id)
        .subscribe(response => this.cliente = response), erroResponse => {
          alert('erro');
        }
    }
  }

  onSubmit() {
    if (!this.id) {
      this.service.saveCliente(this.cliente)
        .subscribe(response => {
          this.success = true;
          this.erros = [];
          this.cliente = response;
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
      this.service.updateCliente(this.cliente)
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
          });
    }
  }

  backList() {
    this.route.navigate(['/clientes/lista']);
  }
}
