import { Component } from '@angular/core';
import { CartItem } from '../../models/cart-item';
import { CartService, CartSummary } from '../../services/cart.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  imports: [RouterLink, CommonModule],
  selector: 'app-cart',
  styleUrl: './cart.css',
  templateUrl: './cart.html',
})
export class Cart {
  // items: cart items displayed on the UI
  items: CartItem[] = [];
  // sum: cart totals (calculated from items)
  // "!" means it will be assigned later (in refresh)
  sum!: CartSummary;

  constructor(
    private cart: CartService,
    private router: Router,
  ) {
    // Load cart items and totals initially
    this.refresh();
  }

  // Reads latest cart items + totals from CartService and updates UI variables
  refresh(): void {
    this.items = this.cart.getCart();
    this.sum = this.cart.summary();
  }

  // Increase quantity of one item by 1, then refresh UI
  increment(id: number): void {
    this.cart.increase(id);
    this.refresh();
  }

  // Decrease quantity of one item by 1, then refresh UI
  // If qty becomes 0, CartService removes the item automatically

  decrement(id: number): void {
    this.cart.decrease(id);
    this.refresh();
  }

  remove(id: number): void {
    this.cart.remove(id);
    this.refresh();
  }

  // Clear all cart items, then refresh UI
  clear(): void {
    this.cart.clear();
    this.refresh();
  }

  lineTotal(i: CartItem): number {
    return i.unitPrice * i.qty;
  }

  goCheckout(): void {
    if (this.items.length === 0) return;
    this.router.navigate(['/checkout']);
  }
}
