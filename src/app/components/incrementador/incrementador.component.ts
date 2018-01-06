import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
	selector: 'app-incrementador',
	templateUrl: './incrementador.component.html',
	styles: []
})
export class IncrementadorComponent implements OnInit {

	@ViewChild('txtProgress') txtProgress: ElementRef;

	@Input('progreso') public progreso: number;
	@Input('leyenda') public leyenda: string = 'Leyenda';

	@Output() cambioValor: EventEmitter<number> = new EventEmitter();
	constructor() { }

	ngOnInit() {
	}

	public cambiarValor(valor) {
		this.progreso = this.progreso + valor;
		if (!this.progreso || this.progreso < 0) {
			this.progreso = 0;
		} else if (this.progreso > 100) {
			this.progreso = 100;
		}

		this.txtProgress.nativeElement.focus();
		this.cambioValor.emit(this.progreso);
	}

	ngChange(newValue: number) {

		console.log(this.txtProgress);


		if (!newValue || newValue < 0) {
			this.progreso = 0;
		} else if (newValue > 100) {
			this.progreso = 100;
		} else {
			this.progreso = newValue;
		}
		//elemHTML = Number(newValue);
		this.txtProgress.nativeElement.value = this.progreso;
		this.cambioValor.emit(this.progreso);
	}
}
