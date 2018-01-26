import { Injectable } from '@angular/core';
import { Usuario } from './../../models/usuario.model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SubirArchivoService } from './../subir-archivo/subir-archivo.service';

import { URL_SERVICIOS } from './../../config/config';

import 'rxjs/add/operator/map';

import swal from 'sweetalert2';

@Injectable()
export class UsuarioService {

	public id: string;
	public token: string;
	public usuario: Usuario;

	constructor(
		public router: Router,
		public subirArchivoService: SubirArchivoService,
		public http: HttpClient) {
		this.cargarStorage();
	}

	public estaLogueado() {
		return this.token ? true : false;
	}

	public cargarStorage() {
		this.id = localStorage.getItem('id');
		this.token = localStorage.getItem('token');
		this.usuario = JSON.parse(localStorage.getItem('usuario'));
	}

	public cargarUsuarios(desde: number = 0) {

		let url = URL_SERVICIOS + '/usuario?desde=' + desde;

		return this.http.get(url)
			.map((resp: any) => {
				return resp;
			});
	}

	public actualizarUsuario(usuario: Usuario) {

		let url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;

		let headers = new HttpHeaders({
			'Content-Type': 'application/json'
		})
		return this.http.put(url, usuario)
			.map((resp: any) => {

				if (usuario._id === this.usuario._id) {
					let usuarioDB: Usuario = resp.usuario;
					this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
				}
				swal('Usuario actualizado', usuario.nombre, 'success');
				return true;
			});
	}

	public buscarrUsuarios(termino: string) {

		let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;

		return this.http.get(url)
			.map((resp: any) => resp.usuarios);
	}

	public cambiarImagen(archivo: File, id: string) {
		this.subirArchivoService.subirArchivo(archivo, 'usuarios', id)
			.then(resp => {

				this.usuario.img = resp.usuarioActualizado.img;
				swal('Imagen subida correctamente', this.usuario.nombre, 'success');
				this.guardarStorage(id, this.token, this.usuario);
			})
			.catch(err => {
				console.log(err);
			})
	}

	public crearUsusario(usuario: Usuario) {

		let headers = new HttpHeaders({
			'Content-Type': 'application/json'
		})
		return this.http.post(URL_SERVICIOS + '/usuario', usuario, { headers })
			.map((resp: any) => {
				swal('Usuario creado', usuario.email, 'success');
				return resp.usuario;
			})
	}

	public eliminarUsuario(id: string) {

		let url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;

		return this.http.delete(url)
			.map((resp: any) => {
				swal(
					'Usuario eliminado',
					'El usuario se eliminó correctamente',
					'success'
				)
				return true;
			});
	}

	public logout() {
		localStorage.removeItem('id');
		localStorage.removeItem('token');
		localStorage.removeItem('usuario');

		this.id = null;
		this.token = null;
		this.usuario = null;

		this.router.navigate(['/login']);

	}

	public login(usuario: Usuario, recordar: boolean) {

		if (recordar) {
			localStorage.setItem('email', usuario.email);
		} else {
			localStorage.removeItem('email');
		}

		let headers = new HttpHeaders({
			'Content-Type': 'application/json'
		})
		return this.http.post(URL_SERVICIOS + '/login', usuario, { headers })
			.map((resp: any) => {
				this.guardarStorage(resp.id, resp.token, resp.usuario);
				return true;
			})
	}

	public loginGoogle(token: string) {

		let headers = new HttpHeaders({
			'Content-Type': 'application/json'
		})
		return this.http.post(URL_SERVICIOS + '/login/google', { token })
			.map((resp: any) => {
				this.guardarStorage(resp.id, resp.token, resp.usuario);
				return true;
			})
	}

	guardarStorage(id: string, token: string, usuario: Usuario) {
		localStorage.setItem('id', id);
		localStorage.setItem('token', token);
		localStorage.setItem('usuario', JSON.stringify(usuario));

		this.id = id;
		this.token = token;
		this.usuario = usuario;
	}

}
