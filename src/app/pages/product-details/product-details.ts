import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [RouterLink, CommonModule, FormsModule],
  selector: 'app-product-details',
  styleUrl: './product-details.css',
  templateUrl: './product-details.html',
})
export class ProductDetails {
  // Holds the current product (null if not found)
  product: Product | null = null;
  // Quantity selected by the user (default 1)
  qty = 1;
  // Message shown after user adds product to cart (used in UI)
  addedMsg = '';
  // Inject services using constructor dependency injection

  constructor(
    private route: ActivatedRoute, // used to read resolver data (product)
    private router: Router, // used to navigate to other pages
    private cart: CartService, // used to add items to cart
  ) {
    this.product = route.snapshot.data['product'] as Product | null;
    // If product not found, redirect to Not Found page
    if (!this.product) {
      this.router.navigate(['not-found']);
    }
  }

  // Add-to-cart: adds product to cart and stays on the same page
  addToCart(): void {
    // Safety check: if product is not available, do nothing
    if (!this.product) return;
    // Add product to cart with selected quantity
    this.cart.add(this.product, this.qty);
    // Show a simple success message
    this.addedMsg = `Added "${this.product.name}" (Qty: ${this.qty}) to cart.`;
  }
  // Buy Now: adds product to cart and goes directly to checkout page
  buyNow(): void {
    // Safety check
    if (!this.product) return;
    // Add product to cart with selected quantity
    this.cart.add(this.product, this.qty);
    this.router.navigate(['checkout']);
  }
}
