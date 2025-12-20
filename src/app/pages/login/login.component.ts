import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators, } from '@angular/forms';
import { SignupComponent } from '../signup/signup.component';
import { ForgotPwComponent } from '../forgot-pw/forgot-pw.component';

type AuthMode = 'login' | 'signup' | 'forgot'

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, SignupComponent, ForgotPwComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {


  private authSerivice = inject(AuthService);
  private fb = inject(FormBuilder);

  errorMessage = signal<string | null>(null);
  mode = signal<AuthMode>('login');


  setMode(newMode: AuthMode) {
    this.mode.set(newMode);
    this.errorMessage.set(null); 
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    pw: ['', [Validators.required, Validators.minLength(6)]]
  })

  async login(){
    if(!this.loginForm.valid){
      return console.log("Not valid");
    }

    const email = this.loginForm.value.email ?? '';
    const pw = this.loginForm.value.pw ?? '';

    try{
      this.errorMessage.set(null)
      await this.authSerivice.signIn(email, pw);
    } catch (err) {
      this.errorMessage.set("Invalid email or password. Please try again.");
    }

  }

  async loginWithGoogle(){
    
    try{
      await this.authSerivice.loginWithGoogle();
    } catch (err){
      throw err;
    }
  }
}
