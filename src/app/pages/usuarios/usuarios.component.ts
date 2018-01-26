import { Component, OnInit } from '@angular/core';
import { Usuario } from './../../models/usuario.model';

import { UsuarioService, ModalUploadService } from './../../services/services.index';
import swal from 'sweetalert2';
@Component({
	selector: 'app-usuarios',
	templateUrl: './usuarios.component.html',
	styles: []
})
export class UsuariosComponent implements OnInit {

	usuarios: Usuario[] = [];
	public desde: number = 0;
	public totalRegistros: number = 0;
	public cargando: boolean = false;

	constructor(public usuarioService: UsuarioService, public modalUploadService: ModalUploadService) { }

	ngOnInit() {
		this.cargarUsuarios();

		this.modalUploadService.notificacion.subscribe(notificacion => {
			console.log(notificacion);
			this.cargarUsuarios();
		});
	}

	borrarUsuario(usuario: Usuario) {
		console.log(usuario);


		if (usuario._id === this.usuarioService.usuario._id) {
			swal('No puede borrar usuario', 'No se puede borrar a uno mismo', 'error');
			return;
		}
		swal({
			title: '¿Desea borrar este usuario?',
			text: 'Se borrará el usuario ' + usuario.nombre,
			type: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Eliminar',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.value) {

				this.usuarioService.eliminarUsuario(usuario._id)
					.subscribe((borrado: boolean) => {
						this.cargarUsuarios();
					})
				// result.dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
			} /*else if (result.dismiss === 'cancel') {
				swal(
					'Cancelado',
					'No se borró el usuario',
					'error'
				)
			}*/
		})
	}

	cargarUsuarios() {
		this.cargando = true;
		this.usuarioService.cargarUsuarios(this.desde)
			.subscribe(resp => {
				console.log(resp);
				this.totalRegistros = resp.count;

				let usuarios = resp.usuarios;
				this.usuarios = usuarios;
				this.cargando = false;
			})
	}

	cambiarDesde(valor: number) {
		let desde = this.desde + valor;

		if (desde >= this.totalRegistros) {
			return;
		}

		if (desde < 0) {
			return;
		}

		this.desde += valor;
		this.cargarUsuarios();
	}

	guardarUsuario(usuario: Usuario) {
		this.usuarioService.actualizarUsuario(usuario)
			.subscribe(resp => {
				console.log(resp);
			})
	}

	buscarUsuario(termino: string) {

		if (termino.length <= 0) {
			this.cargarUsuarios();
			return;
		}

		console.log(termino);
		this.cargando = true;
		this.usuarioService.buscarrUsuarios(termino)
			.subscribe(usuarios => {
				console.log(usuarios)
				this.usuarios = usuarios,
					this.cargando = false;
			});
	}

	mostrarModal(id: string) {
		this.modalUploadService.mostrarModal('usuarios', id);
	}

}
