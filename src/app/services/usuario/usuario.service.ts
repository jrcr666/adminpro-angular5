import { Injectable } from '@angular/core';
import { Usuario } from './../../models/usuario.model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { SubirArchivoService } from './../subir-archivo/subir-archivo.service';

import { URL_SERVICIOS } from './../../config/config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import swal from 'sweetalert2';

@Injectable()
export class UsuarioService {

	public id: string;
	public token: string;
	public usuario: Usuario;
	public menu: any = [];

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
		this.menu = JSON.parse(localStorage.getItem('menu'));
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
					this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
				}
				swal('Usuario actualizado', usuario.nombre, 'success');
				return true;
			});
	}

	public buscarUsuarios(termino: string) {

		let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;

		return this.http.get(url)
			.map((resp: any) => resp.usuarios);
	}

	public cambiarImagen(archivo: File, id: string) {
		this.subirArchivoService.subirArchivo(archivo, 'usuarios', id)
			.then(resp => {

				this.usuario.img = resp.usuarioActualizado.img;
				swal('Imagen subida correctamente', this.usuario.nombre, 'success');
				this.guardarStorage(id, this.token, this.usuario, this.menu);
			})
			.catch(err => {
				console.log(err);
			})
	}

	public crearUsuario(usuario: Usuario) {

		let headers = new HttpHeaders({
			'Content-Type': 'application/json'
		})
		return this.http.post(URL_SERVICIOS + '/usuario', usuario, { headers })
			.map((resp: any) => {
				swal('Usuario creado', usuario.email, 'success');
				return resp.usuario;
			})
			.catch(err => {
				swal(err.error.mensaje, err.error.errors.message, 'error');
				return Observable.throw(err);
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
		localStorage.removeItem('menu');

		this.id = null;
		this.token = null;
		this.usuario = null;
		this.menu = null;

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
				this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
				return true;
			})
			.catch(err => {
				console.log(err.status);
				return Observable.throw(err);
			})
	}

	public loginGoogle(token: string) {

		let headers = new HttpHeaders({
			'Content-Type': 'application/json'
		})
		return this.http.post(URL_SERVICIOS + '/login/google', { token })
			.map((resp: any) => {

				this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
				return true;
			})
			.catch(err => {
				console.log(err.status);
				return Observable.throw(err);
			})
	}

	guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
		localStorage.setItem('id', id);
		localStorage.setItem('token', token);
		localStorage.setItem('usuario', JSON.stringify(usuario));
		localStorage.setItem('menu', JSON.stringify(menu));

		this.id = id;
		this.token = token;
		this.usuario = usuario;
		this.menu = menu;
	}
}
