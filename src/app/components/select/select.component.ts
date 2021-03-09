import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cryptocurrency } from '../../services/cryptocurrency/cryptocurrency.types';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() title: string;
  @Input() items: Array<Cryptocurrency>;

  @Output() selectedCryptocurrency: EventEmitter<Cryptocurrency> = new EventEmitter<Cryptocurrency>();

  onSelected(cryptocurrency: Cryptocurrency): void {
    this.selectedCryptocurrency.emit(cryptocurrency);
  }
}
