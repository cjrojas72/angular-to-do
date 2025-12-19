import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { AuthService } from './services/auth.service';
import { AsyncPipe } from '@angular/common';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  currentUser$: Observable<User | null>;
  private router = inject(Router)
  private auth = inject(FirebaseService)

  constructor(public authService: AuthService) { // Make authService public if you want to call its methods directly from template
    this.currentUser$ = this.authService.currentUser$;
    
    onAuthStateChanged(this.auth.auth, (user) => {
      if (user) {
        // If user logs in, send them to home
        this.router.navigate(['/home']);
      } else {
        // If they log out, send them to login
        this.router.navigate(['']);
      }
    })
  }

  ngOnInit(): void {
    console.log(`User is ${this.currentUser$}`)
  }
}
