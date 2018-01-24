import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Pipes

import { PipesModule } from './../pipes/pipes.module';

// Components
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NopagefoundComponent } from './404/nopagefound.component';


@NgModule({
	declarations: [
		BreadcrumbsComponent,
		HeaderComponent,
		SidebarComponent, NopagefoundComponent
	],
	imports: [
		RouterModule,
		CommonModule,
		PipesModule
	],
	providers: [

	],
	exports: [
		BreadcrumbsComponent,
		HeaderComponent,
		SidebarComponent, NopagefoundComponent
	]
})
export class SharedModule { }
