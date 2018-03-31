import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from './../services/services.index';
import { Usuario } from './../models/usuario.model';
import swal from 'sweetalert2';;

declare function initPlugins();
declare const gapi: any;

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public recuerdame: boolean = false;
	public email: string;
	public auth2: any;

	constructor(private _router: Router, public usuarioService: UsuarioService) { }

	ngOnInit() {
		initPlugins();

		this.email = localStorage.getItem('email') || '';

		if (this.email.length > 0) {
			this.recuerdame = true;
		}

		this.googleInit();
	}

	private googleInit() {
		gapi.load('auth2', () => {
			this.auth2 = gapi.auth2.init({
				client_id: '676616150161-cr7eppsapcj9to3974on70eg228f9rr9.apps.googleusercontent.com',
				cookiepolicy: 'single_hots_origin',
				scope: 'profile email'
			});
			this.attachSignin(document.getElementById('btnGoogle'));
		});
	}

	public attachSignin(element) {
		this.auth2.attachClickHandler(element, {}, (googleUser) => {
			// let profile = googleUser.getBasicProfile();
			let token = googleUser.getAuthResponse().id_token;

			console.log(token);

			this.usuarioService.loginGoogle(token)
			.subscribe(
			correcto => {
				swal('Usuario correcto', '', 'success');
				(<any>window).location = '#/dashboard';
				//this._router.navigate(['/dashboard'])
			},
			error => {
				swal('Usuario no registrado', 'Hubo un error inesperado', 'error');
			})
		})
	}

	ingresar(forma: NgForm) {
		console.log(forma.valid);
		console.log(forma.value);

		let usuario = new Usuario(null, forma.value.email, forma.value.password);

		this.usuarioService.login(usuario, forma.value.recuerdame).subscribe(
			correcto => {
				swal('Usuario correcto', usuario.email, 'success');
				this._router.navigate(['/dashboard'])
			},
			error => {
				swal('Usuario no registrado', 'El usuario o la contraseña son incorrectos', 'error');
			})
		//this._router.navigate(['/dashboard'])
	}

}
