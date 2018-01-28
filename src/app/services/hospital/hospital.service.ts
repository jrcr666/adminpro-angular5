import { Injectable } from '@angular/core';
import { Hospital } from './../../models/hospital.model';
import { Usuario } from './../../models/usuario.model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SubirArchivoService } from './../subir-archivo/subir-archivo.service';
import { UsuarioService } from './../usuario/usuario.service';

import { URL_SERVICIOS } from './../../config/config';

import 'rxjs/add/operator/map';

import swal from 'sweetalert2';

@Injectable()
export class HospitalService {

	public hospital: Hospital;

	constructor(
		public router: Router,
		public subirArchivoService: SubirArchivoService,
		public usuarioService: UsuarioService,
		public http: HttpClient) {

	}

	public cargarHospitales() {

		let url = URL_SERVICIOS + '/hospital';

		return this.http.get(url)
			.map((resp: any) => {
				return resp;
			});
	}

	public obtenerHospital(id: string) {

		let url = URL_SERVICIOS + '/hospital/' + id;

		return this.http.get(url)
			.map((resp: any) => {
				return resp.hospital;
			});
	}

	public actualizarHospital(hospital: Hospital) {

		let url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this.usuarioService.token;

		let headers = new HttpHeaders({
			'Content-Type': 'application/json'
		})
		return this.http.put(url, hospital)
			.map((resp: any) => {

				swal('Hospital actualizado', hospital.nombre, 'success');
				return true;
			});
	}

	public buscarHospitales(termino: string) {

		let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

		return this.http.get(url)
			.map((resp: any) => resp.hospitales);
	}

	public cambiarImagen(archivo: File, id: string) {
		this.subirArchivoService.subirArchivo(archivo, 'hospitales', id)
			.then(resp => {

				this.hospital.img = resp.hospitalActualizado.img;
				swal('Imagen subida correctamente', this.hospital.nombre, 'success');

			})
			.catch(err => {
				console.log(err);
			})
	}

	public crearHospital(hospital: Hospital) {

		hospital._id = this.usuarioService.usuario._id;

		let headers = new HttpHeaders({
			'Content-Type': 'application/json'
		})
		return this.http.post(URL_SERVICIOS + '/hospital' + '?token=' + this.usuarioService.token, hospital, { headers })
			.map((resp: any) => {
				swal('Hospital creado', hospital.nombre, 'success');
				return resp.hospital;
			})
	}

	public eliminarHospital(id: string) {

		let url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this.usuarioService.token;

		return this.http.delete(url)
			.map((resp: any) => {
				swal(
					'Hospital eliminado',
					'El hospital se eliminó correctamente',
					'success'
				)
				return true;
			});
	}
}
