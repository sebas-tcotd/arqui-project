import { Component } from '@angular/core';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component {
  titles = ['Gráfica 1', 'Gráfica 2', 'Gráfica 3', 'Gráfica 4'];
  datas: MultiDataSet = [
    [350, 450, 100],
    [332, 111, 22],
    [412, 124, 126],
    [142, 125, 809],
  ];
  labels = [
    ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'],
    ['Descargas Sales', 'En-Store Sales', 'Correos-Order Sales'],
    ['Baxadas Sales', 'No-market Sales', 'Cartas-Order Sales'],
    ['Venezia Sales', 'Milano Sales', 'Vaticano Sales'],
  ];
}
