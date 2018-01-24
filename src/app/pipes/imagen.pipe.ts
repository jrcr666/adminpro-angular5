import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from './../config/config';

@Pipe({
	name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

	transform(imagen: string, tipo: string = 'usuario'): any {

		let url = URL_SERVICIOS + '/img';

		if (!imagen) {
			return url + '/no-imagen'
		}

		if (imagen.indexOf('https') >= 0) {
			return imagen;
		}

		switch (tipo) {
			case "usuario":
				return url + '/usuarios/' + imagen;

			case "medico":
				return url + '/medicos/' + imagen;

			case "hospital":
				return url + '/hospitales/' + imagen;

			default:
				console.log('Tipo de imagen no existe');
				return url + '/no-imagen';
		}

	}

}
