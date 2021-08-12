import { Component, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [],
})
export class DonutComponent {
  @Input() public title: string = 'Sales';
  @Input('labels') public doughnutChartLabels: Label[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  @Input('data') public doughnutChartData: MultiDataSet = [[350, 450, 100]];
  @Input() public colors: Color[] = [
    { backgroundColor: ['#9E120E', '#ff5800', '#ffb414'] },
  ];
}
