import { Routes, RouterModule } from '@angular/router';

import { LoginGuardGuard } from './../services/services.index';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';

const ROUTES: Routes = [
	{
		path: '',
		component: PagesComponent,
		canActivate: [LoginGuardGuard],
		children: [
			{ path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
			{ path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Settings' } },
			{ path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBars' } },
			{ path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas' } },
			{ path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
			{ path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
			{ path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
			{ path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios' } },
			{ path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales' } },
			{ path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de médicos' } },
			{ path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar médico' } },
			{ path: '', pathMatch: 'full', redirectTo: '/dashboard' },
		]
	},
];

export const PAGES_ROUTES = RouterModule.forChild(ROUTES);