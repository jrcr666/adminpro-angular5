import { NgModule } from '@angular/core';

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
