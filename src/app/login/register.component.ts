import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from './../services/services.index';
import { Usuario } from './../models/usuario.model';
import  swal from 'sweetalert2';

declare function initPlugins();

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

	public forma: FormGroup;

	constructor(public usuarioService: UsuarioService, public router: Router) { }

	ngOnInit() {
		initPlugins();

		this.forma = new FormGroup({
			nombre: new FormControl(null, Validators.required),
			email: new FormControl(null, [Validators.required, Validators.email]),
			password: new FormControl(null, Validators.required),
			password2: new FormControl(null, [Validators.required]),
			condiciones: new FormControl(false),
		}, { validators: this.samePass('password', 'password2') })

		this.forma.setValue({
			nombre: 'Juanra',
			email: 'jrcr@jrcr.com',
			password: '123456',
			password2: '123456',
			condiciones: true
		})
	}

	public samePass(campo1, campo2) {

		return (group: FormGroup) => {

			let c1 = group.controls[campo1];
			let c2 = group.controls[campo2];

			if (c1.value === c2.value) {
				return null;
			}

			return {
				samePass: true
			}
		}
	}

	registrar() {


		if (this.forma.invalid) {
			return;
		}
		if (!this.forma.value.condiciones) {

			swal('Importante', 'Debe aceptar las condiciones', 'warning');
			return;
		}

		let usuario = new Usuario(
			this.forma.value.nombre,
			this.forma.value.email,
			this.forma.value.password,
		);

		this.usuarioService.crearUsuario(usuario)
			.subscribe(resp => this.router.navigate(['/login']));
	}
}
