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

@NgModule({
	declarations: [
		PagesComponent,
		DashboardComponent,
		ProgressComponent,
		Graficas1Component,
		IncrementadorComponent,
		GraficoDonaComponent,
		AccountSettingsComponent,
		PromesasComponent,
		RxjsComponent,
		ProfileComponent
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
		PagesComponent,
		DashboardComponent,
		ProgressComponent,
		Graficas1Component,
		IncrementadorComponent,
		AccountSettingsComponent
	]
})
export class PagesModule { }
