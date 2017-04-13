import {Component,OnInit, HostBinding} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';
import {AuthService} from '../../theme/services/auth/auth.service';
import {AuthSQLService} from '../../theme/services/authSQL/authSQL.service';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';

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
  error: any;
  private userAuthValid:boolean = true;
  private errMsg:string = "The username and/or username is already in used.";

  constructor(public af: AngularFire, fb:FormBuilder, private authService:AuthService, private authSQLService: AuthSQLService, private router: Router) {

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
      this.authSQLService.checkExistingUser(this.name.value, this.email.value)
      .subscribe(
        (data)=>{
          this.responseCheckExistingUser(data)}
      );
    }
  }

  responseCheckExistingUser(data:any){
    if (data == true){
      this.userAuthValid = false;
      return console.log("user not logged");
    } else {
      this.userAuthValid = true;
      //Register user Firebase
      this.af.auth.createUser({
        email: this.email.value,
        password: this.password.value
      }).then(
        (success) => {
        console.log(success.auth.email);
        /*
        API call SQL user
        this.router.navigate(['/login'])
        */
      }).catch(
        (err) => {
        this.error = err;
        this.errMsg = this.error.code;
        this.userAuthValid = false;
      })
      return console.log("user logged");
    }
  }



  loginFb() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    }).then(
        (success) => {
        console.log(success.auth.email);
        /*
        this.router.navigate(['/members']);
        */
      }).catch(
        (err) => {
        this.error = err;
        this.errMsg = this.error.code;
        this.userAuthValid = false;
      })
  }

  loginGoogle() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    }).then(
        (success) => {
        console.log(success.auth.email);
        /*
        this.router.navigate(['/members']);
        */
      }).catch(
        (err) => {
        this.error = err;
        this.errMsg = this.error.code;
        this.userAuthValid = false;
      })
  }




}
