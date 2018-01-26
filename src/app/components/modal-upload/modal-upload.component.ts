import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService, SubirArchivoService, ModalUploadService } from './../../services/services.index';
import { Usuario } from './../../models/usuario.model';
import swal from 'sweetalert2';


@Component({
	selector: 'app-modal-upload',
	templateUrl: './modal-upload.component.html',
	styles: []
})
export class ModalUploadComponent implements OnInit {

	// public usuario: Usuario;
	public imagenSubir: File;
	public imagenTemp: string;

	@ViewChild('inputImagen')
	inputImagen: any;

	constructor(
		public modalUploadService: ModalUploadService,
		public subirArchivoService: SubirArchivoService,
		public usuarioService: UsuarioService
	) { }

	ngOnInit() {
		//this.usuario = this.usuarioService.usuario;
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
		reader.onloadend = () => this.imagenTemp = reader.result;

	}

	public subirImagen() {
		console.log('subiendo');
		this.subirArchivoService.subirArchivo(
			this.imagenSubir,
			this.modalUploadService.tipo,
			this.modalUploadService.id)
			.then(resp => {
				console.log(resp);
				this.modalUploadService.notificacion.emit(resp);
				this.cerrarModal();
			})
			.catch(error => {
				console.log(error);
			})
	}

	public cerrarModal() {
		this.imagenSubir = null;
		this.imagenTemp = null;
		this.inputImagen.nativeElement.value = '';
		this.modalUploadService.ocultarModal();
	}
}