import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';



@Component({
	selector: 'app-rxjs',
	templateUrl: './rxjs.component.html',
	styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

	public subscription: Subscription;

	constructor() {

		this.subscription = this.regresaObservable()
			.subscribe(
			numero => console.log('Subs', numero),
			error => console.error('Error en el Obs', error),
			() => console.log('El Observable terminó')
			);
	}

	ngOnInit() {
	}
	ngOnDestroy() {
		console.log('Página cerrada');
		this.subscription.unsubscribe();
	}

	public regresaObservable(): Observable<number> {
		return new Observable<any>(observer => {

			let contador = 0;


			let intervalo = setInterval(() => {
				contador++;

				let salida = {
					valor: contador
				}
				observer.next(salida);

				// if (contador == 3) {
				// 	clearInterval(intervalo);
				// 	observer.complete()
				// }
			}, 500)
		})
			.retry(2)
			.map(resp => {
				return resp.valor;
			})
			.filter((filtro, index) => {
				console.log(filtro, index);
				return filtro % 2 !== 0
			});
	}
}
