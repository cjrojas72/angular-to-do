import { Component, inject, OnInit, signal, Type } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  showProfileDropdown = signal(false);
  private authService = inject(AuthService);

  private currentUser = this.authService.getCurrentUser()?.displayName ? this.authService.getCurrentUser()?.displayName :  this.authService.getCurrentUser()?.email ;
  profileName = signal<string | null | undefined>('profile');

  

  logOut(){
    this.authService.signOut();
  }

  toggleProfileDropdown(): void {
      this.showProfileDropdown.update(value => !value);
  }

  ngOnInit(): void {
    this.profileName.set(this.currentUser);
  }
}
