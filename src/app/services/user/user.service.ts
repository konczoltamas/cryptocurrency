import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserCryptocurrenciesResponse } from './user.types';
import { Cryptocurrency } from '../cryptocurrency/cryptocurrency.types';

@Injectable()
export class UserService {
  private login$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private userCryptocurrencies$: BehaviorSubject<UserCryptocurrenciesResponse> = new BehaviorSubject<UserCryptocurrenciesResponse>(null);

  constructor() { }

  login(loginData: User): Observable<string> {
    const user = JSON.parse(this.getUserFromLocalStorage(loginData.userName));
    if (user && this.isPasswordCorrect(loginData.password, user.password)) {
      this.login$.next(loginData.userName);
    } else if (!user) {
      localStorage.setItem(loginData.userName, JSON.stringify(loginData));
      this.login$.next(loginData.userName);
    }
    return this.login$.asObservable();
  }

  getUserFromLocalStorage(userName: string): string {
    return localStorage.getItem(userName);
  }

  isPasswordCorrect(typedPassword: string, password: string): boolean {
    return typedPassword === password;
  }

  getUserCryptocurrenciesFromLocalStorage(userName: string): Array<Cryptocurrency> {
    return JSON.parse(localStorage.getItem(`currency_${userName}`));
  }

  getUserCryptocurrencies(userName: string): Observable<UserCryptocurrenciesResponse> {
    const cryptocurrencies = this.getUserCryptocurrenciesFromLocalStorage(userName);
    this.userCryptocurrencies$.next({ cryptocurrencies });
    return this.userCryptocurrencies$.asObservable();
  }

  addFavoriteCryptocurrency(userName: string, cryptocurrency: Cryptocurrency): Observable<UserCryptocurrenciesResponse> {
    let cryptocurrencies = this.getUserCryptocurrenciesFromLocalStorage(userName);
    if (!cryptocurrencies) {
      cryptocurrencies = [];
    }
    if (!this.isLocalstorageContainsCurrency(cryptocurrency, cryptocurrencies)) {
      cryptocurrencies.push(cryptocurrency);
      localStorage.setItem(`currency_${userName}`, JSON.stringify(cryptocurrencies));
      this.userCryptocurrencies$.next({ cryptocurrencies });
    }
    return this.userCryptocurrencies$.asObservable();
  }

  isLocalstorageContainsCurrency(cryptocurrency: Cryptocurrency, cryptocurrencies: Array<Cryptocurrency>): boolean {
    return !!cryptocurrencies.find(item => item.asset_id === cryptocurrency.asset_id);
  }

  deleteFavoriteCryptocurrency(userName: string, cryptocurrencyId: string): Observable<UserCryptocurrenciesResponse> {
    const cryptocurrencies = this.userCryptocurrencies$.value.cryptocurrencies.filter(currency => currency.asset_id !== cryptocurrencyId);
    localStorage.setItem(`currency_${userName}`, JSON.stringify(cryptocurrencies));
    this.userCryptocurrencies$.next({ cryptocurrencies });
    return this.userCryptocurrencies$.asObservable();
  }

  isLoggedIn(): boolean {
    return !!this.login$.value;
  }

  logout(): void {
    this.login$.next(null);
  }
}
