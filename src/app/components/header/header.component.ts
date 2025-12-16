import { Component, inject, OnInit, signal, Type } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  showProfileDropdown = signal(false)
  authService = inject(AuthService)

  currentUser = this.authService.getCurrentUser()?.email
  profileName = signal<string | null | undefined>('profile')

  logOut(){
    this.authService.signOut();
  }

  toggleProfileDropdown(): void {
      this.showProfileDropdown.update(value => !value);
  }

  ngOnInit(): void {
    this.profileName.set(this.currentUser)
  }
}
