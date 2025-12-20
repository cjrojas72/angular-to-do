import { Injectable } from '@angular/core';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup, 
  GoogleAuthProvider, 
  sendPasswordResetEmail,
  updatePassword, 
  reauthenticateWithCredential, 
  EmailAuthProvider
} from 'firebase/auth';

import { Observable, BehaviorSubject } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  
  private userSource = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.userSource.asObservable();

  constructor(private firebaseService: FirebaseService) {
    
    
    onAuthStateChanged(this.firebaseService.auth, (user) => {
      this.userSource.next(user);
    });
  }

 
  public getCurrentUser(): User | null {
    return this.firebaseService.auth.currentUser;
  }


  async signUp(email: string, password: string): Promise<void> {
    try {
      
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
      throw `Error signing in: ${error}`;
    }
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    
    provider.setCustomParameters({
      prompt: 'select_account'
    });

    try {
      const result = await signInWithPopup(this.firebaseService.auth, provider);
      
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      // The signed-in user info
      const user = result.user;
      console.log("Success!", user);
      
      return user;
    } catch (error: any) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error during Google Sign-In:", errorCode, errorMessage);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    await signOut(this.firebaseService.auth);
  }



  async resetPassword(email: string) {
    const auth = this.firebaseService.auth;
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent!");
      return { success: true };
    } catch (error: any) {
      console.error("Reset error:", error.code);
      return { success: false, error: error.message };
    }
  }

  async updateUserPassword(currentPw: string, newPw: string) {
    const auth = this.firebaseService.auth;
    const user = auth.currentUser;

    if (!user || !user.email) throw new Error("No user found");

    const credential = EmailAuthProvider.credential(user.email, currentPw);

    try {
    
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPw);
      
      return { success: true };
    } catch (error: any) {
      
      throw error;
    }
  }

}