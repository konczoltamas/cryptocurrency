import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TabSetComponent } from './components/tab-set/tab-set.component';
import { CryptocurrencyModalComponent } from './components/cryptocurrency-modal/cryptocurrency-modal.component';
import { SelectComponent } from './components/select/select.component';
import { ChartComponent } from './components/chart/chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CryptocurrencyListComponent } from './components/cryptocurrency-list/cryptocurrency-list.component';
import { CryptocurrencyPageComponent } from './pages/cryptocurrency-page/cryptocurrency-page.component';
import { CryptocurrencyService } from './services/cryptocurrency/cryptocurrency.service';
import { HttpClientModule } from '@angular/common/http';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './services/user/user.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { WebsocketService } from './services/websocket/websocket.service';
import { AuthenticationGuard } from './guards/authentication.guard';

@NgModule({
  declarations: [
    AppComponent,
    TabSetComponent,
    CryptocurrencyModalComponent,
    SelectComponent,
    TabSetComponent,
    ChartComponent,
    CryptocurrencyListComponent,
    CryptocurrencyPageComponent,
    InputComponent,
    CurrencyConverterComponent,
    LoginPageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ScrollingModule,
    ReactiveFormsModule
  ],
  providers: [
    CryptocurrencyService,
    UserService,
    WebsocketService,
    AuthenticationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
