import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../clientes';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSelecionado: Cliente = new Cliente();

  success: boolean = false;
  erros: String[];

  constructor(private service: ClientesService, private route: Router) {

  }

  ngOnInit(): void {
    this.service
      .getClientesAll()
      .subscribe(response => this.clientes = response, errorResponse => this.erros = ['Houve um problema ao carregar os clientes!']);
  }

  newCadastro() {
    this.route.navigate(['/clientes/form']);
  }


  selectCliente(cliente: Cliente){
    this.clienteSelecionado = cliente;
  }

  deleteCliente(){
    this.service
      .deleteCliente(this.clienteSelecionado.id)
      .subscribe(response => {
        this.success = true;
        this.ngOnInit();
        console.log(response);
      },
        erroResponse => {
          this.success = false;
          this.erros = ['Houve um problema ao realizar a operação!']
          console.log(erroResponse);
        });
  }
}
