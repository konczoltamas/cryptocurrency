import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cryptocurrency } from '../../services/cryptocurrency/cryptocurrency.types';

@Component({
  selector: 'app-tab-set',
  templateUrl: './tab-set.component.html',
  styleUrls: ['./tab-set.component.scss']
})
export class TabSetComponent {
  @Input() savedCryptocurrencies: Array<Cryptocurrency> = [];
  @Input() active: Cryptocurrency;

  @Output() addClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() tabClick: EventEmitter<Cryptocurrency> = new EventEmitter<Cryptocurrency>();


  onAddClick(): void {
    this.addClick.emit();
  }

  onTabChange(cryptocurrency: Cryptocurrency): void {
    this.tabClick.emit(cryptocurrency);
  }
}
