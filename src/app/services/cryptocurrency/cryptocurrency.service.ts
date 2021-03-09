import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cryptocurrency, CryptocurrencyChartResponse } from './cryptocurrency.types';

const COINAPI_KEY = '742A89C6-0387-4A3C-92BB-B020C2AC682E';

@Injectable()
export class CryptocurrencyService {
  headers: HttpHeaders;
  apiUrl = 'https://rest.coinapi.io/v1';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'X-CoinAPI-Key': COINAPI_KEY
    });
  }

  getCryptocurrencies(): Observable<Array<Cryptocurrency>> {
    return this.http.get<Array<Cryptocurrency>>(`${this.apiUrl}/assets`, { headers: this.headers });
  }

  getCryptocurrency(cryptocurrencyId: string): Observable<Cryptocurrency> {
    let params = new HttpParams();
    if (cryptocurrencyId) {
      params = params.append('filter_asset_id', cryptocurrencyId);
    }
    return this.http.get<Cryptocurrency>(`${this.apiUrl}/assets`, { headers: this.headers, params });
  }

  getCryptocurrencyByDay(cryptocurrencyId: string, currency: string, period: string, startDate: Date, endDate: Date): Observable<Array<CryptocurrencyChartResponse>> {
    let params = new HttpParams();
    if (startDate) {
      params = params.append('time_start', startDate.toISOString());
    }
    if (endDate) {
      params = params.append('time_end', endDate.toISOString());
    }
    if (period) {
      params = params.append('period_id', period);
    }
    return this.http.get<Array<CryptocurrencyChartResponse>>(`${this.apiUrl}/ohlcv/${cryptocurrencyId}/${currency}/history`, { headers: this.headers, params });
  }
}
