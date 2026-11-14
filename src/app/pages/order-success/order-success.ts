// Component: used to create an Angular component with metadata (selector, template, imports, etc.)
// OnInit: lifecycle interface to run code when component loads (ngOnInit)
import { Component, OnInit } from '@angular/core';

// CommonModule: provides common directives/pipes used in templates (ngIf/ngFor, date pipe, etc.)
import { CommonModule } from '@angular/common';

// Router: used for programmatic navigation (redirect to /products)
// RouterLink: used in template for navigation links (routerLink="/products")
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-order-success',
  styleUrl: './order-success.css',
  templateUrl: './order-success.html',
})
export class OrderSuccess implements OnInit {
  // Inject Router service for redirect/navigation

  constructor(private router: Router) {}

  ngOnInit(): void {
    debugger;
    // history.state contains data passed during navigation:
    // this.router.navigate(['/order-success'], { state: successState });
    // If user refreshed the page or opened /order-success directly,
    // history.state will not contain the expected order info.

    const st = history.state;
    // If state is missing or orderId is not present, redirect to Products page
    if (!st || !st.orderId) {
      this.router.navigate(['/products']);
    }
  }
}
