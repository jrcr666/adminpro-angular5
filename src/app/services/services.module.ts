import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
	LoginGuardGuard,

	ModalUploadService,
	SettingsService,
	SharedService,
	SidebarService,
	SubirArchivoService,
	UsuarioService
} from './services.index';

@NgModule({
	declarations: [],
	imports: [
		HttpClientModule,
		CommonModule
	],
	providers: [
		LoginGuardGuard,

		ModalUploadService,
		SettingsService,
		SharedService,
		SidebarService,
		SubirArchivoService,
		UsuarioService
	],
	exports: []
})
export class ServicesModule { }
