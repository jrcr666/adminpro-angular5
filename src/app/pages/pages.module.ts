import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

//Modules

import { ChartsModule } from 'ng2-charts';
import { SharedModule } from './../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';

// Pipes

import { PipesModule } from './../pipes/pipes.module';

// Components

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { IncrementadorComponent } from './../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from './../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { MedicosComponent } from './medicos/medicos.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

@NgModule({
	declarations: [
		AccountSettingsComponent,
		DashboardComponent,
		Graficas1Component,
		GraficoDonaComponent,
		IncrementadorComponent,
		MedicosComponent,
		ModalUploadComponent,
		PagesComponent,
		ProfileComponent,
		ProgressComponent,
		PromesasComponent,
		RxjsComponent,
		UsuariosComponent,
		HospitalesComponent,
		MedicoComponent,
		BusquedaComponent
	],
	imports: [
		BrowserModule,
		CommonModule,
		ChartsModule,
		FormsModule,
		PAGES_ROUTES,
		PipesModule,
		SharedModule
	],
	providers: [

	],
	exports: [
		AccountSettingsComponent,
		DashboardComponent,
		Graficas1Component,
		IncrementadorComponent,
		MedicosComponent,
		ModalUploadComponent,
		PagesComponent,
		ProgressComponent
	]
})
export class PagesModule { }
