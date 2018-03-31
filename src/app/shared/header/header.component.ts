import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './../../services/services.index';
import { Usuario } from './../../models/usuario.model';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styles: []
})
export class HeaderComponent implements OnInit {

	public usuario: Usuario;

	constructor(public usuarioService: UsuarioService,
		public router: Router) { }

	ngOnInit() {
		this.usuario = this.usuarioService.usuario;
	}

	buscar(termino: string) {
		console.log(termino);

		this.router.navigate(['/busqueda',termino]);
	}

}
