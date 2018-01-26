import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

	public tipo: string;
	public id: string;

	public oculto: string = 'oculto';

	public notificacion: EventEmitter<any> = new EventEmitter<any>()

	constructor() { }


	public mostrarModal(tipo: string, id: string) {
		this.oculto = '';
		this.id = id;
		this.tipo = tipo;
	}

	public ocultarModal() {
		this.oculto = 'oculto';
		this.id = '';
		this.tipo = '';
	}

}
