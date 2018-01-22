import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
	LoginGuardGuard,

	SettingsService,
	SidebarService,
	SharedService,
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

		SettingsService,
		SharedService,
		SidebarService,
		UsuarioService
	],
	exports: []
})
export class ServicesModule { }
