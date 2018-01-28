import { Injectable } from '@angular/core';
import { Medico } from './../../models/medico.model';
import { Usuario } from './../../models/usuario.model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SubirArchivoService } from './../subir-archivo/subir-archivo.service';
import { UsuarioService } from './../usuario/usuario.service';

import { URL_SERVICIOS } from './../../config/config';

import 'rxjs/add/operator/map';

import swal from 'sweetalert2';

@Injectable()
export class MedicoService {

	public medico: Medico;

	constructor(
		public router: Router,
		public subirArchivoService: SubirArchivoService,
		public usuarioService: UsuarioService,
		public http: HttpClient) {

	}

	public cargarMedicos() {

		let url = URL_SERVICIOS + '/medico';

		return this.http.get(url)
			.map((resp: any) => {
				return resp;
			});
	}

	public buscarMedicos(termino: string) {

		let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

		return this.http.get(url)
			.map((resp: any) => resp.medicos);
	}

	public cargarMedico(id: string) {

		let url = URL_SERVICIOS + '/medico/' + id;

		return this.http.get(url)
			.map((resp: any) => resp.medico);
	}

	public cambiarImagen(archivo: File, id: string) {
		this.subirArchivoService.subirArchivo(archivo, 'medicos', id)
			.then(resp => {

				this.medico.img = resp.medicoActualizado.img;
				swal('Imagen subida correctamente', this.medico.nombre, 'success');

			})
			.catch(err => {
				console.log(err);
			})
	}

	public eliminarMedico(id: string) {

		let url = URL_SERVICIOS + '/medico/' + id + '?token=' + this.usuarioService.token;

		return this.http.delete(url)
			.map((resp: any) => {
				swal(
					'Medico eliminado',
					'El medico se eliminó correctamente',
					'success'
				)
				return true;
			});
	}

	public guardarMedico(medico: Medico) {

		medico.usuario = this.usuarioService.usuario._id;

		let headers = new HttpHeaders({
			'Content-Type': 'application/json'
		})

		if (medico._id) {
			return this.http.put(URL_SERVICIOS + '/medico/' + medico._id +
				'?token=' + this.usuarioService.token, medico,
				{ headers })

				.map((resp: any) => {
					swal('Medico Actualizado', medico.nombre, 'success');
					return resp.medico;
				})
		} else {
			return this.http.post(URL_SERVICIOS + '/medico' +
				'?token=' + this.usuarioService.token, medico,
				{ headers })

				.map((resp: any) => {
					swal('Medico Creado', medico.nombre, 'success');
					return resp.medico;
				})
		}



	}
}
