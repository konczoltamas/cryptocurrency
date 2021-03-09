import { Component, Input } from '@angular/core';
import { WebsocketCryptocurrency } from '../../services/websocket/websocket.types';

@Component({
  selector: 'app-cryptocurrency-list',
  templateUrl: './cryptocurrency-list.component.html',
  styleUrls: ['./cryptocurrency-list.component.scss']
})
export class CryptocurrencyListComponent {
  @Input() items: Array<WebsocketCryptocurrency>;
}
