import { Routes, RouterModule } from '@angular/router';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
const ROUTES: Routes = [
	{
		path: '',
		component: PagesComponent,
		children: [
			{ path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
			{ path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Settings' } },
			{ path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBars' } },
			{ path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas' } },
			{ path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
			{ path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
			{ path: '', pathMatch: 'full', redirectTo: '/dashboard' },
		]
	},
];

export const PAGES_ROUTES = RouterModule.forChild(ROUTES);