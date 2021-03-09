import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnChanges, AfterViewInit {
  @Input() cryptocurrencyName: string;
  @Input() currencyName: string;
  @Input() valueInUsd: number;

  @ViewChild('valueInput', { static: true }) valueInput: InputComponent;

  currencyToCrypto = true;
  value: number;
  calculatedValue: number;
  focused: boolean;

  ngOnChanges(): void {
    this.value = null;
    this.calculatedValue = null;
  }

  ngAfterViewInit(): void {
    if (!this.focused) {
      this.valueInput.focus();
      this.focused = true;
    }
  }

  onCalculate(): void {
    this.value = Number(this.value);
    if (!this.value || isNaN(this.value)) {
      this.value = null;
      return;
    }
    if (this.currencyToCrypto) {
      this.calculatedValue = this.value / this.valueInUsd;
    } else  {
      this.calculatedValue = this.value * this.valueInUsd;
    }
  }

  onReverseChange(): void {
    this.calculatedValue = null;
    this.currencyToCrypto = !this.currencyToCrypto;
  }
}
