import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from './../../services/services.index';
import { Usuario } from './../../models/usuario.model';
import swal from 'sweetalert2';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styles: []
})
export class ProfileComponent implements OnInit {

	public usuario: Usuario;
	public imagenSubir: File;
	public imagenTemp: string;

	constructor(
		public usuarioService: UsuarioService
	) { }

	ngOnInit() {
		this.usuario = this.usuarioService.usuario;
	}

	guardar(usuario: Usuario) {
		this.usuario.nombre = usuario.nombre;
		this.usuario.email = this.usuario.google ? this.usuario.email : usuario.email;

		this.usuarioService.actualizarUsuario(this.usuario)
			.subscribe(resp => {
				console.log(resp);
			})
	}

	seleccionImagen(archivo) {
		if (!archivo) {
			this.imagenSubir = null;
			return;
		}

		if (archivo.type.indexOf('image') < 0) {
			swal('El tipo de archivo no es correcto', 'Tiene que ser una imagen', 'error');
			return;
		}

		let reader = new FileReader();

		let urlImagenTemp = reader.readAsDataURL(archivo);


		this.imagenSubir = archivo;
		console.log(this.imagenSubir);
		reader.onloadend = ()=> this.imagenTemp = reader.result;

	}

	cambiarImagen() {
		this.usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
	}

}
