import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authSerivice = inject(AuthService)

  testUser = {
    'email': 'testemail123@gmail.com',
    'pw': 'abc123'
  }

  login(){
    console.log('clicked')
    this.authSerivice.signIn(this.testUser.email, this.testUser.pw)
    
  }
}
