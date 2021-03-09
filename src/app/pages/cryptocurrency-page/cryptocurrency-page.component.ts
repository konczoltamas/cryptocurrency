import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart, Cryptocurrency, CryptocurrencyChartResponse } from '../../services/cryptocurrency/cryptocurrency.types';
import { CryptocurrencyService } from '../../services/cryptocurrency/cryptocurrency.service';
import { finalize, skipWhile, take } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CryptocurrencyModalComponent } from '../../components/cryptocurrency-modal/cryptocurrency-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Location } from '@angular/common';
import { WebsocketService } from '../../services/websocket/websocket.service';
import { Subscription } from 'rxjs';
import { WebsocketCryptocurrency } from '../../services/websocket/websocket.types';

@Component({
  selector: 'app-cryptocurrency-page',
  templateUrl: './cryptocurrency-page.component.html',
  styleUrls: ['./cryptocurrency-page.component.scss']
})
export class CryptocurrencyPageComponent implements OnInit, OnDestroy {
  private userName: string;
  private yesterday: Date;
  private lastSevenDay: Date;
  private cryptocurrencyModal: NgbModalRef;
  private subscriptions: Subscription = new Subscription();

  selectedCryptocurrency: Cryptocurrency;
  cryptocurrencies: Array<Cryptocurrency> = [];
  chartValues: Array<Chart> = [];
  userCryptocurrencies: Array<Cryptocurrency> = [];
  websocketListData: Array<WebsocketCryptocurrency> = [];

  constructor(
    private cryptocurrencyService: CryptocurrencyService,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private websocketService: WebsocketService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const activatedRouteSubscription = this.activatedRoute.params.subscribe(params => {
      this.userName = params.userName;
      this.getUserCryptocurrencies(this.userName);
    });
    this.subscriptions.add(activatedRouteSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private getUserCryptocurrencies(userName: string): void {
    const userCryptocurrenciesSubscription = this.userService.getUserCryptocurrencies(userName)
      .pipe(
        skipWhile(response => response == null || response.cryptocurrencies == null || response.cryptocurrencies.length === 0)
      )
      .subscribe(response => {
        this.userCryptocurrencies = response.cryptocurrencies;
        this.determineWebsocketListData(this.userCryptocurrencies);
        this.onCryptocurrencyChange(this.userCryptocurrencies[0]);
        this.updateWebsocket(this.userCryptocurrencies);
      });
    this.subscriptions.add(userCryptocurrenciesSubscription);
  }

  onCryptocurrencyChange(cryptocurrency: Cryptocurrency): void {
    if (!cryptocurrency) {
      return;
    }
    this.selectedCryptocurrency = cryptocurrency;
    this.getChartData(cryptocurrency);
    this.setBrowserUrl(cryptocurrency, this.userName);
  }

  private getChartData(cryptocurrency: Cryptocurrency): void {
    this.determineChartDates();
    this.cryptocurrencyService.getCryptocurrencyByDay(
      cryptocurrency.asset_id, 'USD', '1DAY', this.lastSevenDay, this.yesterday
    ).pipe(take(1))
      .subscribe(response => {
        this.chartValues = this.transformToChartData(response);
        this.getUsdValue(cryptocurrency);
      });
  }

  private getUsdValue(cryptocurrency: Cryptocurrency): void {
    this.cryptocurrencyService.getCryptocurrency(cryptocurrency.asset_id)
      .pipe(take(1))
      .subscribe(response => {
        this.selectedCryptocurrency = {
          ...response[0]
        };
    });
  }

  private setBrowserUrl(cryptocurrency: Cryptocurrency, userName: string): void {
    const queryString = `cryptocurrency=${cryptocurrency.name}`;
    this.location.replaceState(`users/${userName}`, queryString);
  }

  onDelete(): void {
    this.userService.deleteFavoriteCryptocurrency(this.userName, this.selectedCryptocurrency.asset_id)
      .pipe(take(1))
      .subscribe({
        next: response => {
          if (response.cryptocurrencies.length === 0) {
            this.selectedCryptocurrency = null;
          } else {
            this.onCryptocurrencyChange(this.userCryptocurrencies[0]);
          }
        },
        error: error => { }
      });
  }

  private updateWebsocket(cryptocurrencies: Array<Cryptocurrency>): void {
    if (!cryptocurrencies || cryptocurrencies.length === 0) {
      return;
    }
    const symbols = this.createWebsocketSymbols(cryptocurrencies);
    const assets = this.createWebsocketAssets(cryptocurrencies);
    this.websocketService.createConnection(symbols, assets);
    const websocketSubscription = this.websocketService.getData()
      .subscribe({
        next: response => {
          this.updateWebsocketListData(response);
        },
        error: error => { }
      });
    this.subscriptions.add(websocketSubscription);
  }

  private determineChartDates(): void {
    this.yesterday = new Date();
    this.lastSevenDay = new Date();
    this.yesterday.setDate(this.yesterday.getDate() - 1);
    this.lastSevenDay.setDate(this.lastSevenDay.getDate() - 8);
  }

  private transformToChartData(cryptocurrencyDaysData: Array<CryptocurrencyChartResponse>): Array<Chart> {
    return cryptocurrencyDaysData.map(cryptocurrencyOnDay => ({
      name: cryptocurrencyOnDay.time_period_start.toString().slice(0, 10),
      value: cryptocurrencyOnDay.price_close
    }));
  }

  private createWebsocketSymbols(cryptocurrencies: Array<Cryptocurrency>): Array<string> {
    return cryptocurrencies.map(item => `BITFINEX_SPOT_${item.asset_id}_USD`);
  }

  private createWebsocketAssets(cryptocurrencies: Array<Cryptocurrency>): Array<string> {
    return cryptocurrencies.map(item => `${item.asset_id}`);
  }

  private determineWebsocketListData(cryptocurrencies: Array<Cryptocurrency>): void {
    this.websocketListData = cryptocurrencies.map(item => ({
      asset_id: item.asset_id,
      name: item.name
    }));
  }

  private updateWebsocketListData(cryptocurrency: WebsocketCryptocurrency): void {
    if (!this.websocketListData || this.websocketListData.length === 0) {
      this.websocketService.close();
      return;
    }
    const searchedItemIndex = this.websocketListData.findIndex(item => cryptocurrency.symbol_id.includes(item.asset_id));
    if (this.websocketListData[searchedItemIndex].price_high == null || this.websocketListData[searchedItemIndex].price_high < cryptocurrency.price_high) {
      this.websocketListData[searchedItemIndex].price_high = cryptocurrency.price_high;
    }
    if (this.websocketListData[searchedItemIndex].price_low == null || this.websocketListData[searchedItemIndex].price_low > cryptocurrency.price_low) {
      this.websocketListData[searchedItemIndex].price_low = cryptocurrency.price_low;
    }
  }

  private saveCryptocurrency(): void {
    this.cryptocurrencyService.getCryptocurrencies()
      .pipe(
        take(1),
        finalize(() => {
          this.cryptocurrencyModal.componentInstance.loadingCurrencies = false;
        })
      )
      .subscribe({
        next: response => {
          this.cryptocurrencies = response.filter(currency => currency.type_is_crypto === 1).map(currency => ({
            name: currency.name,
            asset_id: currency.asset_id
          }));
          this.cryptocurrencyModal.componentInstance.cryptocurrencies = this.cryptocurrencies;
        },
        error: error => { }
      });
  }

  openSaveCryptocurrencyModal(): void {
    this.cryptocurrencyModal = this.modalService.open(CryptocurrencyModalComponent);
    this.cryptocurrencyModal.componentInstance.loadingCurrencies = true;
    this.cryptocurrencyModal.componentInstance.userName = this.userName;
    this.cryptocurrencyModal.closed
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.onCryptocurrencyChange(this.userCryptocurrencies[this.userCryptocurrencies.length - 1]);
        },
        error: error => { }
      });
    this.saveCryptocurrency();
  }

  onLogout(): void {
    this.userService.logout();
    this.router.navigate(['']);
  }
}

