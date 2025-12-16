import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './pages/login/login.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, LoginComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  currentUser$: Observable<User | null>;

  constructor(public authService: AuthService) { // Make authService public if you want to call its methods directly from template
    this.currentUser$ = this.authService.currentUser$; // Assign the Observable from the service
  }

  ngOnInit(): void {
    console.log(`User is ${this.currentUser$}`)
  }
}
