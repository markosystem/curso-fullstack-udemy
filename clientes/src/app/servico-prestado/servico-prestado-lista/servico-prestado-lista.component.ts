import { Component, OnInit } from '@angular/core';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ServicoPrestado } from '../servicoPrestado';

@Component({
  selector: 'app-servico-prestado-lista',
  templateUrl: './servico-prestado-lista.component.html',
  styleUrls: ['./servico-prestado-lista.component.css']
})
export class ServicoPrestadoListaComponent implements OnInit {

  nome: string;
  mes: number;
  meses: number[];
  servicosPrestados: ServicoPrestado[] = [];
  erros: string[];

  constructor(private servicoService: ServicoPrestadoService) {
    this.meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  }

  ngOnInit(): void {
    this.onSubmit();
  }

  onSubmit() {
    this.servicoService.searchServicoPrestados(this.nome, this.mes)
      .subscribe(response => {
        this.erros = [];
        this.servicosPrestados = response;
        console.log(response);
      },
        erroResponse => {
          if (erroResponse.error.errors) {
            this.erros = erroResponse.error.errors;
          } else {
            this.erros = ['Houve um problema ao realizar a operação!'];
          }
          console.log(erroResponse);
        });
  }

}
