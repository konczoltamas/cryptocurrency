import { Cryptocurrency } from '../cryptocurrency/cryptocurrency.types';

export interface User {
  userName: string;
  password: string;
}

export interface UserCryptocurrenciesResponse {
  cryptocurrencies: Array<Cryptocurrency>;
}
