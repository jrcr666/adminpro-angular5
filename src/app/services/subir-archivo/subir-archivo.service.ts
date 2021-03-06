import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from './../../config/config';

@Injectable()
export class SubirArchivoService {

	constructor() { }

	public subirArchivo(archivo: File, tipo: string, id: string): Promise<any> {

		return new Promise((resolve, reject) => {

			let formData = new FormData();
			let xhr = new XMLHttpRequest();

			formData.append('imagen', archivo, archivo.name);

			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						console.log('Imagen subida');
						resolve(JSON.parse(xhr.response));
					} else {
						console.log('Error en la subida');
						reject(JSON.parse(xhr.response));
					}
				}
			}
			let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

			xhr.open('PUT', url, true);
			xhr.send(formData);

		});
	}
}
