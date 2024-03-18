import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';

interface IEmailFormConfig {
  userName: keyof IUser;
  email: keyof IUser;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  isEmailExist: boolean;

  formConfig: IEmailFormConfig = {
    userName: 'userName',
    email: 'email',
    password: 'password',
  };

  constructor(private auth: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = new FormGroup({
      [this.formConfig.userName]: new FormControl('', [Validators.required]),
      [this.formConfig.email]: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      [this.formConfig.password]: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  async onEmailBlur() {
    if (this.userForm.get([this.formConfig.email])?.invalid) {
      return;
    }

    const email = this.userForm.value[this.formConfig.email];

    try {
      const users = await this.userService.getUserByEmail(email);

      this.isEmailExist = users.docs.length > 0;
      // console.log(this.isEmailExist, users, email);
    } catch (error) {
      console.error(error);
    }
  }

  async register() {
    const email = this.userForm.value[this.formConfig.email];
    const userName = this.userForm.value[this.formConfig.userName];
    const password = this.userForm.value[this.formConfig.password];

    const userDoc: IUser = {
      email,
      userName,
    };

    try {
      await this.auth.createUser(email, password);
      await this.userService.createUser(userDoc);
    } catch (error) {
      console.error(error);
    }
  }

  async login() {
    const email = this.userForm.value[this.formConfig.email];
    const password = this.userForm.value[this.formConfig.password];

    try {
      await this.auth.signIn(email, password);
    } catch (error) {
      console.error(error);
    }
  }
}
