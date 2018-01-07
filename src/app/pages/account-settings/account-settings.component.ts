import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { SettingsService } from './../../services/services.index';

@Component({
	selector: 'app-account-settings',
	templateUrl: './account-settings.component.html',
	styles: []
})
export class AccountSettingsComponent implements OnInit {
	public tema;
	constructor(public settingsService: SettingsService) {
	}

	ngOnInit() {
		this.colorcarCheck();
	}

	public cambiarColor(tema: string, link: ElementRef) {

		this.aplicarCheck(link);

		console.log(tema);

		this.settingsService.aplicarTema(tema);

	}

	private aplicarCheck(link: ElementRef) {

		console.log(link);
		let selectores: any = document.getElementsByClassName('selector');

		for (let ref of selectores) {
			ref.classList.remove('working');
		}

		link['classList'].add('working');
	}

	public colorcarCheck() {
		let selectores: any = document.getElementsByClassName('selector');

		let tema = this.settingsService.ajustes.tema;

		for (let ref of selectores) {

			if (ref.getAttribute('data-theme') === tema) {
				ref['classList'].add('working');
				break;
			}
		}
	}

}
