import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { Cryptocurrency } from '../../services/cryptocurrency/cryptocurrency.types';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-cryptocurrency-modal',
  templateUrl: './cryptocurrency-modal.component.html',
  styleUrls: ['./cryptocurrency-modal.component.scss']
})
export class CryptocurrencyModalComponent {
  @Input() userName: string;
  @Input() cryptocurrencies: Array<Cryptocurrency>;
  @Input() loadingCurrencies: boolean;

  selectedCryptocurrency: Cryptocurrency;
  successful: boolean;

  constructor(
    private activeModal: NgbActiveModal,
    private userService: UserService
  ) { }

  onAddCryptoCurrency(): void {
    if (!this.selectedCryptocurrency) {
      return;
    }
    this.userService.addFavoriteCryptocurrency(this.userName, this.selectedCryptocurrency)
      .pipe(take(1))
      .subscribe(() => {
        this.successful = true;
        this.disappearInfoMessage();
      });
  }

  onClose(): void {
    this.activeModal.close();
  }

  onSelectedCryptocurrency(cryptocurrency: Cryptocurrency): void {
    this.selectedCryptocurrency = cryptocurrency;
  }

  private disappearInfoMessage(): void {
    setTimeout(() => {
      this.successful = false;
    }, 2000);
  }
}
