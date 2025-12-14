import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showProfileDropdown = signal(false)

  toggleProfileDropdown(): void {
      this.showProfileDropdown.update(value => !value);
  }
}
