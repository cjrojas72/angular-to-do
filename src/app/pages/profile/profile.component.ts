import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  
  message = signal<string | null>(null);
  isError = signal(false);

  profileForm = this.fb.group({
    email: [{ value: '', disabled: true }],
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });


  

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPw = control.get('newPassword')?.value;
    const confirmPw = control.get('confirmPassword')?.value;
    return newPw === confirmPw ? null : { passwordMismatch: true };
  }

  async onUpdatePassword() {
    if (this.profileForm.invalid) return;

    const { currentPassword, newPassword } = this.profileForm.getRawValue();

    try {
      this.message.set("Updating password...");
      this.isError.set(false);

      await this.authService.updateUserPassword(
        currentPassword as string, 
        newPassword as string
      );

      this.message.set("Password updated successfully!");
      this.profileForm.reset();
      
      const user = this.authService.getCurrentUser();
      this.profileForm.patchValue({ email: user?.email });

    } catch (error: any) {
      this.isError.set(true);
      if (error.code === 'auth/wrong-password') {
        this.message.set("The current password you entered is incorrect.");
      } else {
        this.message.set("An error occurred. Please try again later.");
      }
    }
  }

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.profileForm.patchValue({ email: user.email });
    }
  }
}