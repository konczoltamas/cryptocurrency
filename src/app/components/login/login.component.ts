import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { User } from 'src/app/services/user/user.types';
import { InputComponent } from '../input/input.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @Output() loginClick: EventEmitter<User> = new EventEmitter<User>();

  @ViewChild('userNameInput', { static: true }) userNameInput: InputComponent;
  focused: boolean;
  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'userName': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  ngAfterViewInit(): void {
    if (!this.focused) {
      this.userNameInput.focus();
      this.focused = true;
    }
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.loginClick.emit(this.loginForm.value);
    }
  }
}
