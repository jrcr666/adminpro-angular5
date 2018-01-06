import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {
	@Input() public data;
	@Input() public labels;
	@Input() public leyenda: string = 'Leyenda';
	@Input() public chartType;
  constructor() { }

  ngOnInit() {
  }

}
