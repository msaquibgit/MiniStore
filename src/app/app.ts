// Component: used to create an Angular component with metadata (selector, template, imports, etc.)
import { Component, signal } from '@angular/core';
// RouterOutlet: where routed pages will render (<router-outlet></router-outlet>)
// RouterLink: used for navigation links (routerLink="/products")
// RouterLinkActive: adds CSS class to active link (routerLinkActive="active")
// Router: used for programmatic navigation (this.router.navigate(...))

import {
  Router,
  RouterOutlet,
  RouterLinkWithHref,
  RouterLinkActive,
  RouterLink,
} from '@angular/router';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';

// CommonModule: provides common directives and pipes

// AuthService: handles login/logout, reads customer from localStorage

// CartService: handles cart items and summary (used to show cart count in navbar)

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkWithHref, RouterLinkActive], // Dependencies used in app.html
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('MiniStorer');

  // Injecting required services using constructor dependency injection
  constructor(
    private auth: AuthService, //used to check login and get customer name
    private cart: CartService, // used to show cart item count
    private router: Router, // used to redirect after logout
  ) {}

  // Current year for footer display (e.g., © 2026)
  currentYear = new Date().getFullYear();

  // Returns logged-in customer's name (empty string if not logged in)
  customerName(): string {
    return this.auth.getCustomer()?.name ?? '';
  }

  // Returns true/false to show Login/Logout UI sections
  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  // Returns total number of items in the cart (sum of quantities)
  cartCount(): number {
    return this.cart.summary().totalItems;
  }

  // Logs out the user and redirects to Products page
  logout(): void {
    this.auth.logout(); // clears customer (and optionally cart) from localStorage
    this.router.navigate(['/products']); // navigate to products after logout
  }
}
