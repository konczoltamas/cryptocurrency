import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CryptocurrencyPageComponent } from './pages/cryptocurrency-page/cryptocurrency-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  },
  {
    path: 'users/:userName',
    canActivate: [AuthenticationGuard],
    component: CryptocurrencyPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
