import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  @Input() btnClassName: string = 'btn-primary';
  @Input('valor') progreso: number = 50;
  @Output() valorEmitter: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}
  ngOnInit(): void {
    this.btnClassName = `btn ${this.btnClassName}`;
  }

  cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      this.valorEmitter.emit(100);
    }
    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      this.valorEmitter.emit(0);
    }
    this.progreso += valor;
    this.valorEmitter.emit(this.progreso);
  }

  onChange(newValor: number) {
    if (newValor >= 100) {
      this.progreso = 100;
    } else if (newValor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValor;
    }
    this.valorEmitter.emit(this.progreso);
  }
}
