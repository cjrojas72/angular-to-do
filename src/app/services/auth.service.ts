import { Injectable } from '@angular/core';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';

import { Observable, BehaviorSubject } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // Use a BehaviorSubject to track the user's login state
  private userSource = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.userSource.asObservable();

  constructor(private firebaseService: FirebaseService) {
    
    // Set up the state listener immediately upon service creation
    // This uses the initialized auth object from the FirebaseService
    onAuthStateChanged(this.firebaseService.auth, (user) => {
      this.userSource.next(user);
    });
  }

  /**
   * Retrieves the current user object synchronously.
   */
  public getCurrentUser(): User | null {
    return this.firebaseService.auth.currentUser;
  }

  // --- Authentication Methods ---

  async signUp(email: string, password: string): Promise<void> {
    try {
      // Use the auth instance from the FirebaseService
      await createUserWithEmailAndPassword(this.firebaseService.auth, email, password);
    } catch (error) {
      console.error('Firebase Sign Up Error:', error);
      throw error;
    }
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.firebaseService.auth, email, password);
    } catch (error) {
      console.error('Firebase Sign In Error:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    await signOut(this.firebaseService.auth);
  }
}