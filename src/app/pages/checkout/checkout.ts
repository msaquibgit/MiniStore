import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cart-item';
import { CartService, CartSummary } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

type PaymentMode = 'COD';
@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-checkout',
  styleUrl: './checkout.css',
  templateUrl: './checkout.html',
})
export class Checkout implements OnInit {
  // Cart items shown in checkout page
  items: CartItem[] = [];

  // Cart totals shown in summary section
  // "!" means it will be assigned later (in ngOnInit)
  sum!: CartSummary;

  // PaymentMode: for this demo a

  // Address fields (bound to form inputs in checkout.html)
  fullName = '';
  phone = '';
  addressLine = '';
  city = '';
  state = '';
  pincode = '';

  // Selected payment mode (COD only in this demo)
  paymentMode: PaymentMode = 'COD';

  error = '';
  placing = false;

  constructor(
    private cart: CartService,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Load cart items and summary totals
    this.items = this.cart.getCart();
    this.sum = this.cart.summary();
    // If cart is empty, redirect user back to Cart page
    if (this.items.length === 0) this.router.navigate(['/cart']);

    // Prefill full name and phone from logged-in customer (stored in localStorage)
    const customer = this.auth.getCustomer();
    if (customer?.name) this.fullName = customer.name;
    if (customer?.mobile) this.phone = customer.mobile;
  }

  // Validates address input fields (simple demo validation)

  private isValid(): boolean {
    // Trim values to avoid spaces-only inputs
    const nm = this.fullName.trim();
    const ph = this.phone.trim();
    const ad = this.addressLine.trim();
    const ct = this.city.trim();
    const st = this.state.trim();
    const pc = this.pincode.trim();

    // Check if any required field is empty

    if (!nm || !ph || !ad || !ct || !st || !pc) {
      this.error = 'Please fill all address fields.';
      return false;
    }

    // Validate phone (must be exactly 10 digits)
    if (!/^\d{10}$/.test(ph)) {
      this.error = 'Phone number must be 10 digits.';
      return false;
    }

    // Validate pincode (must be exactly 6 digits)
    if (!/^\d{6}$/.test(pc)) {
      this.error = 'Pincode must be 6 digits.';
      return false;
    }

    // Everything looks valid
    return true;
  }

  // Called when user clicks "Place Order"
  placeOrder(): void {
    debugger;
    // Clear previous error message
    this.error = '';

    // Safety check: if cart is empty, show message
    if (this.items.length === 0) {
      this.error = 'Your cart is empty.';
      return;
    }
    // Validate address fields before placing the order
    if (!this.isValid()) return;
    // Disable the button while placing order (prevents double click)
    this.placing = true;

    // Create a simple random order id for demo purposes
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

    // Prepare data to show on Order Success page
    // We pass this data via navigation state (no backend/database in demo)

    const successState = {
      orderId,
      placedAtIso: new Date().toISOString(),
      totalItems: this.sum.totalItems,
      grandTotal: this.sum.grandTotal,
      fullName: this.fullName.trim(),
      phone: this.phone.trim(),
      addressLine: this.addressLine.trim(),
      city: this.city.trim(),
      state: this.state.trim(),
      pincode: this.pincode.trim(),
      paymentMode: 'COD' as const,
    };

    // Clear cart AFTER preparing the success state
    this.cart.clear();

    // Navigate to Order Success page and pass successState
    this.router.navigate(['/order-success'], { state: successState });
  }
}
