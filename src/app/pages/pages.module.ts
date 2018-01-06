import { NgModule } from '@angular/core';

//Modules

import { SharedModule } from './../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';


@NgModule({
	declarations: [
		PagesComponent,
		DashboardComponent,
		ProgressComponent,
		Graficas1Component
	],
	imports: [
		PAGES_ROUTES,
		SharedModule
	],
	providers: [

	],
	exports: [
		PagesComponent,
		DashboardComponent,
		ProgressComponent,
		Graficas1Component
	]
})
export class PagesModule { }
