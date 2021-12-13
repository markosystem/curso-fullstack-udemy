import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './clientes/clientes';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiURLBase: string = environment.apiURLBase + '/api/clientes';

  constructor(private http: HttpClient) {

  }

  saveCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiURLBase, cliente);
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.apiURLBase, cliente);
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiURLBase}/${id}`);
  }

  getClientesAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiURLBase);
  }

  deleteCliente(id: number) {
    return this.http.delete<any>(`${this.apiURLBase}/${id}`);
  }
}
