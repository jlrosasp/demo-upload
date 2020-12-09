import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'navigation-loading',
  templateUrl: './loading.component.html',
  styles: []
})
export class LoadingComponent implements OnInit {

  @Input() loadingTitle: string = 'Cargando Información';
  @Input() loadingMessage: string = 'Espere un momento por favor ...';

  constructor() { }

  ngOnInit() {
  }

}
