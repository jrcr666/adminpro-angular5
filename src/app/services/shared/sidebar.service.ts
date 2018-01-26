import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
	public menu: any = [
		{
			titulo: 'Principal',
			icono: 'mdi mdi-gauge',
			subMenu: [
				{ titulo: 'Dashboard', url: '/dashboard' },
				{ titulo: 'ProgressBar', url: '/progress' },
				{ titulo: 'Gráficas', url: '/graficas1' },
				{ titulo: 'Promesas', url: '/promesas' },
				{ titulo: 'RxJs', url: '/rxjs' }
			]
		},
		{
			titulo: 'Mantenimientos',
			icono: 'mdi mdi-folder-lock-open',
			subMenu: [
				{ titulo: 'Usuarios', url: '/usuarios' },
				{ titulo: 'Hospitales', url: '/hospitales' },
				{ titulo: 'Médicos', url: '/medicos' }
			]
		}
	];

	constructor() { }

}
