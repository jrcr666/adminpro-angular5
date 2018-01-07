import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';


@Injectable()
export class SettingsService {
	public ajustes: Ajustes = {
		temaUrl: 'assets/css/colors/default.css',
		tema: 'default'
	};
	constructor( @Inject(DOCUMENT) private _document) {
		this.cargarAjustes();
	}

	public guardarAjustes() {
		localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
	}

	public cargarAjustes() {
		let ajustes = JSON.parse(localStorage.getItem('ajustes'));
		this.ajustes = ajustes ? ajustes : this.ajustes;

		this.aplicarTema(this.ajustes.tema);
	}

	public aplicarTema(tema: string) {
		let url = 'assets/css/colors/' + tema + '.css'
		this._document.getElementById('theme')
			.setAttribute('href', url);

		this.ajustes.tema = tema;
		this.ajustes.temaUrl = url;


		this.guardarAjustes();
	}

}
interface Ajustes {
	temaUrl: string,
	tema: string
}
