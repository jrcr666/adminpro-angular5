import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { UsuarioService } from './../usuario/usuario.service';


@Injectable()
export class AdminGuard implements CanActivate {
	constructor(public usuarioService: UsuarioService) {

	}
	canActivate(): boolean {

		if (this.usuarioService.usuario.role === 'ADMIN_ROLE') {
			console.log('ADMIN');
			return true;
		}
		console.log('Boqueado por admin Guard');
		this.usuarioService.logout()
		return false;
	}
}
