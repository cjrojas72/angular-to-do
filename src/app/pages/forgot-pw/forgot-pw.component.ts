import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

@Component({
  selector: 'app-forgot-pw',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-pw.component.html'
})
export class ForgotPwComponent {
  @Output() backToLogin = new EventEmitter<void>();
  
  email = new FormControl('', [Validators.required, Validators.email]);
  message = signal<string | null>(null);
  isError = signal(false);
  isLoading = signal(false);

  async onSubmit() {
    if (this.email.invalid) return;

    this.isLoading.set(true);
    this.message.set(null);

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, this.email.value!);
      
      this.isError.set(false);
      this.message.set('Check your inbox! A reset link has been sent.');
      
      setTimeout(() => this.backToLogin.emit(), 3000);
      
    } catch (error: any) {
      this.isError.set(true);
      this.message.set(error.message || 'An error occurred. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }
}