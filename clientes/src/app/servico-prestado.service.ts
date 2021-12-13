import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicoPrestado } from './servico-prestado/servicoPrestado';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  apiURLBase: string = environment.apiURLBase + '/api/servicos-prestados';

  constructor(private http: HttpClient) { }

  saveServicoPrestado(servicoPrestado: ServicoPrestado): Observable<ServicoPrestado> {
    return this.http.post<ServicoPrestado>(this.apiURLBase, servicoPrestado);
  }

  searchServicoPrestados(nome: string, mes: any): Observable<ServicoPrestado[]> {
    if (nome == undefined) {
      nome = "";
    }
    if (mes == undefined) {
      mes = "";
    }
    let httpParams = new HttpParams().set("nome", nome).set("mes", mes.toString());
    return this.http.get<ServicoPrestado[]>(this.apiURLBase + "?" + httpParams.toString());
  }


}
