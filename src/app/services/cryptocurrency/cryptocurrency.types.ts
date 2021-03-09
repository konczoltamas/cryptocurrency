export interface Cryptocurrency {
  asset_id?: string;
  name?: string;
  price_usd?: number;
  type_is_crypto?: number;
  time?: Date;
}

export interface CryptocurrencyChartResponse {
  price_close?: number;
  time_period_start?: Date;
}

export interface Chart {
  name?: string;
  value?: number;
}
