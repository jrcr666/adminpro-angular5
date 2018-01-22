import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UsuarioService } from './../usuario/usuario.service';


@Injectable()
export class LoginGuardGuard implements CanActivate {
	constructor(public router: Router, public usuarioService: UsuarioService) {

	}
	canActivate(): boolean {

		if (this.usuarioService.estaLogueado()) {
			console.log('Logueado');
			return true;
		}
		console.log('Boqueado');
		this.router.navigate(['/login']);
		return false;
	}
}
