import { HostListener, Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { WebsocketCryptocurrency } from './websocket.types';

const COINAPI_KEY = '742A89C6-0387-4A3C-92BB-B020C2AC682E';

@Injectable()
export class WebsocketService {
  webSocket: WebSocketSubject<any>;

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(): void {
    this.close();
  }

  public createConnection(symbols: Array<string>, assets: Array<string>): void {
    if (this.webSocket) {
      this.webSocket.complete();
    }
    this.webSocket = webSocket('ws://ws.coinapi.io/v1/');
    this.webSocket.next({
      type: 'hello',
      apikey: COINAPI_KEY,
      heartbeat: false,
      subscribe_filter_period_id: ['1MIN'],
      subscribe_data_type: ['ohlcv'],
      subscribe_filter_symbol_id: symbols,
      subscribe_filter_asset_id: assets
    });
  }

  public getData(): Observable<WebsocketCryptocurrency> {
    return this.webSocket.asObservable();
  }

  public close(): void {
    this.webSocket.complete();
  }
}
