import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './../../services/services.index';
import { Usuario } from './../../models/usuario.model';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styles: []
})
export class HeaderComponent implements OnInit {

	public usuario: Usuario;

	constructor(public usuarioService: UsuarioService) { }

	ngOnInit() {
		this.usuario = this.usuarioService.usuario;
	}

}
