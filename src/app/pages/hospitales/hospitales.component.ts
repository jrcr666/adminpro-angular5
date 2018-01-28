import { Component, OnInit } from '@angular/core';
import { Hospital } from './../../models/hospital.model';
import { Usuario } from './../../models/usuario.model';

import { UsuarioService, HospitalService, ModalUploadService } from './../../services/services.index';
import swal from 'sweetalert2';
@Component({
	selector: 'app-hospitales',
	templateUrl: './hospitales.component.html',
	styles: []
})
export class HospitalesComponent implements OnInit {

	hospitales: Hospital[] = [];
	public totalRegistros: number = 0;
	public cargando: boolean = false;
	public usuario: Usuario;

	constructor(public hospitalService: HospitalService,
		public usuarioService: UsuarioService,
		public modalUploadService: ModalUploadService) { }

	ngOnInit() {
		this.usuario = this.usuarioService.usuario;
		this.cargarHospitales();

		this.modalUploadService.notificacion.subscribe(notificacion => {
			console.log(notificacion);
			this.cargarHospitales();
		});
	}

	crearHospital() {

		swal({
			title: 'SIntroduce el nombre del hospital',
			input: 'text',
			showCancelButton: true,
			confirmButtonText: 'Submit'
		}).then((result) => {

			if (result.value) {

				let hospital: Hospital= new Hospital(result.value);

				this.hospitalService.crearHospital(hospital)
					.subscribe((hospital: Hospital) => {
						this.cargarHospitales();
					})
			}
		})
	}

	borrarHospital(hospital: Hospital) {
		console.log(hospital);

		swal({
			title: '¿Desea borrar este hospital?',
			text: 'Se borrará el hospital ' + hospital.nombre,
			type: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Eliminar',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.value) {

				this.hospitalService.eliminarHospital(hospital._id)
					.subscribe((borrado: boolean) => {
						this.cargarHospitales();
					})
				// result.dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
			} /*else if (result.dismiss === 'cancel') {
				swal(
					'Cancelado',
					'No se borró el hospital',
					'error'
				)
			}*/
		})
	}

	cargarHospitales() {
		//this.cargando = true;
		this.hospitalService.cargarHospitales()
			.subscribe(resp => {
				console.log(resp);
				this.totalRegistros = resp.count;

				let hospitales = resp.hospitales;
				this.hospitales = hospitales;
				this.cargando = false;
			})
	}

	// cambiarDesde(valor: number) {
	// 	let desde = this.desde + valor;

	// 	if (desde >= this.totalRegistros) {
	// 		return;
	// 	}

	// 	if (desde < 0) {
	// 		return;
	// 	}

	// 	this.desde += valor;
	// 	this.cargarHospitales();
	// }

	guardarHospital(hospital: Hospital) {
		this.hospitalService.actualizarHospital(hospital)
			.subscribe(resp => {
				console.log(resp);
			})
	}

	buscarHospital(termino: string) {

		if (termino.length <= 0) {
			this.cargarHospitales();
			return;
		}

		console.log(termino);
		//this.cargando = true;
		this.hospitalService.buscarHospitales(termino)
			.subscribe(hospitales => {
				console.log(hospitales)
				this.hospitales = hospitales,
					this.cargando = false;
			});
	}

	mostrarModal(id: string) {
		this.modalUploadService.mostrarModal('hospitales', id);
	}

}
