import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private auth = getAuth();

  signupForm = this.fb.group({
    displayName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  // Custom validator to check if passwords match
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirm = control.get('confirmPassword');
    return password && confirm && password.value !== confirm.value ? { passwordMismatch: true } : null;
  }

  async onSignup() {
    if (this.signupForm.invalid) return;


    const email = this.signupForm.value.email ?? '';
    const pw = this.signupForm.value.password ?? '';
    const displayName = this.signupForm.value.displayName ?? '';


    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, pw);
      // Update the profile to include the display name
      await updateProfile(userCredential.user, { displayName, });
      console.log('User created:', userCredential.user);
    } catch (error: any) {
      console.error('Signup error:', error.code);
    }
  }
}