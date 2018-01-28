import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Medico } from './../../models/medico.model';
import { Hospital } from './../../models/hospital.model';
import { MedicoService, HospitalService, ModalUploadService } from './../../services/services.index';
@Component({
	selector: 'app-medico',
	templateUrl: './medico.component.html',
	styles: []
})
export class MedicoComponent implements OnInit {

	hospitales: Hospital[];
	public medico = new Medico('', '', '', '', '');
	public hospital: Hospital = new Hospital('');

	constructor(
		public medicoService: MedicoService,
		public router: Router,
		public activatedRoute: ActivatedRoute,
		public hospitalService: HospitalService,
		public modalUploadService: ModalUploadService) { }

	ngOnInit() {

		this.modalUploadService.notificacion.subscribe(resp => {
			
			this.medico.img = resp.medicoActualizado.img;
			
		});

		this.activatedRoute.params.subscribe(params => {
			let id = params.id;

			if (id !== 'nuevo') {
				this.cargarMedico(id);

			}
		})

		this.hospitalService.cargarHospitales()
			.subscribe(resp =>
				this.hospitales = resp.hospitales);
	}

	public cargarMedico(id: string) {
		this.medicoService.cargarMedico(id)
			.subscribe(medico => {

				this.medico = medico;
				this.medico.hospital = medico.hospital._id;
				this.cambioHospital(this.medico.hospital);
			});
	}
	guardarMedico(form: NgForm) {
		console.log(form.valid); console.log(form.value);

		if (form.invalid) {
			return
		}

		this.medicoService.guardarMedico(this.medico)
			.subscribe(medico => {
				console.log(medico);
				this.medico._id = medico._id;
				this.router.navigate(['/medico', medico._id]);
			})
	}

	cambioHospital(id) {
		console.log(id)

		this.hospitalService.obtenerHospital(id)
			.subscribe(hospital => this.hospital = hospital);
	}

	mostrarModal(id: string) {
		this.modalUploadService.mostrarModal('medicos', id);
	}
}
