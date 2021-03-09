import { Component, Input } from '@angular/core';
import { Chart } from '../../services/cryptocurrency/cryptocurrency.types';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  @Input() items: Array<Chart>;
  @Input() showXAxis = true;
  @Input() showYAxis = true;
  @Input() showXAxisLabel = true;
  @Input() showYAxisLabel = true;
  @Input() xAxisLabel: string;
  @Input() yAxisLabel: string;
  @Input() size: Array<number>;
  @Input() showLegend: boolean;
  @Input() showInfo: boolean;
  @Input() animations: boolean;
}
