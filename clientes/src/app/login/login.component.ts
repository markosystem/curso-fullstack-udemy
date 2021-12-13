import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;
  loginError: boolean;
  cadastrando: boolean;
  mensagemSucesso: string;

  constructor(private route: Router, private authService: AuthService) {

  }

  ngSubmit() {
    this.authService
      .tentarLogar(this.username, this.password).subscribe(response => {
        const access_token = JSON.stringify(response);
        localStorage.setItem('access_token', access_token);
        console.log(response);
        this.loginError = false;
        this.route.navigate(['/home']);
      }, errorResponse => {
        this.loginError = true;
      });


  }

  prepararCadastro() {
    this.cadastrando = true;
  }

  cancelaCadastro() {
    this.cadastrando = false;
  }

  cadastrar() {
    let usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;

    this.authService.saveUsuario(usuario)
      .subscribe(response => {
        this.loginError = false;
        this.cadastrando = false;
        this.username = null;
        this.password = null;
        this.mensagemSucesso = "Cadastro realizado com sucesso. Efetue Login!";
        console.log(response);
      }, erroResponse => {
        this.loginError = true;
        this.mensagemSucesso = null;
        console.log(erroResponse);
      })
  }
}
