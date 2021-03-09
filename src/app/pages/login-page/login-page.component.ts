import { Component } from '@angular/core';
import { User } from '../../services/user/user.types';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { skipWhile } from 'rxjs/operators';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  login(loginData: User): void {
    this.userService.login(loginData)
      .pipe(
        take(1),
        skipWhile(response =>  response == null)
      )
      .subscribe({
        next: response => {
          this.router.navigate(['users', response]);
        },
        error: error => {}
      });
  }
}
