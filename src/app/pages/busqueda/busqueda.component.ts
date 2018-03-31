import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from './../../config/config';

import { Hospital } from './../../models/hospital.model';
import { Medico } from './../../models/medico.model';
import { Usuario } from './../../models/usuario.model';

@Component({
	selector: 'app-busqueda',
	templateUrl: './busqueda.component.html',
	styles: []
})
export class BusquedaComponent implements OnInit {

	public hospitales: Hospital[] = [];
	public medicos: Medico[] = [];
	public usuarios: Usuario[] = [];

	constructor(public activatedRoute: ActivatedRoute,
		public http: HttpClient) { }

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			console.log(params);

			this.buscar(params.termino);
		})
	}

	buscar(termino: string) {

		let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
		this.http.get(url).subscribe(resp => {
			console.log(resp);

			this.hospitales = resp['hospitales'];
			this.medicos = resp['medicos'];
			this.usuarios = resp['usuarios'];
		})
	}
}
