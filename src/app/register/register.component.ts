import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface IEmailFormConfig {
  email: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  emailForm: FormGroup;

  formConfig: IEmailFormConfig = {
    email: 'email',
  };

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.emailForm = new FormGroup({
      [this.formConfig.email]: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  onSubmit() {
    console.log(this.emailForm.value);
  }
}
