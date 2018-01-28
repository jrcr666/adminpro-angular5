import { Component, OnInit } from '@angular/core';
import { Medico } from './../../models/medico.model';
import { Usuario } from './../../models/usuario.model';

import { UsuarioService, MedicoService, ModalUploadService } from './../../services/services.index';
import swal from 'sweetalert2';
@Component({
	selector: 'app-medicos',
	templateUrl: './medicos.component.html',
	styles: []
})
export class MedicosComponent implements OnInit {

	medicos: Medico[] = [];
	public totalRegistros: number = 0;
	public cargando: boolean = false;
	public usuario: Usuario;

	constructor(public medicoService: MedicoService,
		public usuarioService: UsuarioService/*,
		public modalUploadService: ModalUploadService*/) { }

	ngOnInit() {
		this.usuario = this.usuarioService.usuario;
		this.cargarMedicos();
	}

	borrarMedico(medico: Medico) {
		console.log(medico);

		swal({
			title: '¿Desea borrar este médico?',
			text: 'Se borrará el medico ' + medico.nombre,
			type: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Eliminar',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.value) {

				this.medicoService.eliminarMedico(medico._id)
					.subscribe((borrado: boolean) => {
						this.cargarMedicos();
					})
				// result.dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
			} /*else if (result.dismiss === 'cancel') {
				swal(
					'Cancelado',
					'No se borró el medico',
					'error'
				)
			}*/
		})
	}

	cargarMedicos() {
		//this.cargando = true;
		this.medicoService.cargarMedicos()
			.subscribe(resp => {
				console.log(resp);
				this.totalRegistros = resp.count;

				let medicos = resp.medicos;
				this.medicos = medicos;
				this.cargando = false;
			})
	}

	buscarMedico(termino: string) {

		if (termino.length <= 0) {
			this.cargarMedicos();
			return;
		}

		console.log(termino);
		//this.cargando = true;
		this.medicoService.buscarMedicos(termino)
			.subscribe(medicos => {
				console.log(medicos)
				this.medicos = medicos,
					this.cargando = false;
			});
	}
}
