import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../model/user.model';

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
  emailForm: FormGroup;

  formConfig: IEmailFormConfig = {
    userName: 'userName',
    email: 'email',
    password: 'password',
  };

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.emailForm = new FormGroup({
      [this.formConfig.userName]: new FormControl('', [Validators.required]),
      [this.formConfig.email]: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      [this.formConfig.password]: new FormControl('', [Validators.required]),
    });
  }

  register() {}

  login() {}
}
