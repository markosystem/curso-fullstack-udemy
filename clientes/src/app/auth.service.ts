import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './login/usuario';
import { environment } from '../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURLBase: string = environment.apiURLBase + '/api/usuarios';
  apiURLTokenJwt: string = environment.apiURLBase + environment.tokenJwtURL;
  apiClientId: string = environment.clientId;
  apiClientSecret: string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {

  }

  obterToken() {
    const tokenString = localStorage.getItem('access_token');
    if(tokenString){
      const token = JSON.parse(tokenString).access_token;
      return token;
    }
    return null;
  }

  saveUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiURLBase, usuario);
  }

  tentarLogar(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', 'arthur.santos')
      .set('password', '123')
      .set('grant_type', 'password');

    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.apiClientId}:${this.apiClientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    return this.http.post<any>(this.apiURLTokenJwt, params.toString(), { headers });
  }

  isAuthentication(): boolean {
    const token = this.obterToken();
    if(token){
      const expirated = this.jwtHelper.isTokenExpired(token);
      return !expirated;
    }
    return false;
  }

  encerrarSessao(){
    localStorage.removeItem('access_token');
  }

  getUsuarioAutenticado(){
    const token = this.obterToken();
    if(token){
      const nome = this.jwtHelper.decodeToken(token).user_name;
      return nome;
    }
    return null;
  }
}
