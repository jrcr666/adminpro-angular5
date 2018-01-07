import { NgModule } from '@angular/core';

import {
	SettingsService,
	SidebarService,
	SharedService
} from './services.index';

@NgModule({
	declarations: [],
	imports: [],
	providers: [
		SettingsService,
		SharedService,
		SidebarService
	],
	exports: []
})
export class ServicesModule { }
