import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';
import {AuthService} from '../../theme/services/auth/auth.service';

import 'style-loader!./register.scss';

@Component({
  selector: 'register',
  templateUrl: './register.html',
})
export class Register {

  public form:FormGroup;
  public name:AbstractControl;
  public email:AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;
  public selectOption:AbstractControl;
  public selectLocation:AbstractControl;

  public submitted:boolean = false;

  constructor(fb:FormBuilder, private authService:AuthService) {

    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'selectOption': ['',Validators.compose([Validators.required])],
      'selectLocation': ['',Validators.compose([Validators.required])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
    this.selectOption = this.form.controls['selectOption'];
    this.selectLocation = this.form.controls['selectLocation'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {

      console.log(this.form.value);
      
      this.authService.signupUser(this.form.value);
      
    }
  }
}
