import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

// Summary values shown in Cart / Checkout pages
export interface CartSummary {
  totalItems: number; // total quantity of items (sum of qty)
  subtotalMrp: number; // total MRP (mrp * qty)
  subtotalPayable: number; // total selling price (unitPrice * qty)
  discount: number; // subtotalMrp - subtotalPayable
  shipping: number; // shipping charges (0/49 based on rule)
  grandTotal: number; // subtotalPayable + shipping
}

@Injectable({ providedIn: 'root' })
export class CartService {
  // LocalStorage key to store cart data
  private key = 'ministore_cart';

  // Keep cart items in memory (loaded once from LocalStorage)
  private items: CartItem[] = this.read();

  // Read cart items from LocalStorage (when service is created)
  private read(): CartItem[] {
    const raw = localStorage.getItem(this.key);
    return raw ? (JSON.parse(raw) as CartItem[]) : []; // parse to array or return empty
  }

  // Save current cart items to LocalStorage (after every cart update)
  private save(): void {
    localStorage.setItem(this.key, JSON.stringify(this.items));
  }

  // Return cart items to UI
  // We return a copy so components cannot directly modify service data accidentally
  getCart(): CartItem[] {
    return this.items.map((i) => ({ ...i }));
  }

  // Add product to cart (default qty = 1)
  add(product: Product, qyt: number): void {
    // Check if product already exists in cart
    const existing = this.items.find((x) => x.productId === product.id);
    if (existing) {
      existing.qty += 1;
    }
    console.log('item-6');
    // If not exists, create a new CartItem and add at the beginning
    this.items.unshift({
      productId: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      brand: product.brand,
      sku: product.sku,
      mrp: product.mrp,
      unitPrice: product.price,
      discountPercent: product.discountPercent,
      qty: qyt,
      addedAt: new Date().toISOString(), // for tracking / sorting (optional)
    });
    // Save updated cart
    this.save();
  }

  // Increase quantity of a cart item by 1
  increase(productId: number): void {
    const i = this.items.find((x) => x.productId === productId);
    if (i) {
      i.qty += 1;
      this.save();
    }
  }

  // Decrease quantity of a cart item by 1
  // If qty becomes 0, remove the item from cart
  decrease(productId: number): void {
    const i = this.items.find((x) => x.productId === productId);
    if (!i) return;
    i.qty -= 1;

    // Remove if quantity is 0 or less
    if (i.qty <= 0) {
      this.remove(productId);
    } else {
      this.save();
    }
  }

  remove(productId: number): void {
    // Returning the new  array of element which satisfied the condition
    // cond - Returning the item which product id not equa to 'productId'
    this.items = this.items.filter((i) => i.productId !== productId);
    this.save();
  }

  // Clear the entire cart (used after order success / logout)
  clear(): void {
    this.items = [];
    this.save();
  }

  // Calculate totals used in Cart/Checkout summary sections

  summary(): CartSummary {
    // Total number of items = sum of qty values
    const totalItems = this.items.reduce((s, i) => s + i.qty, 0);

    // Total MRP: sum of (mrp * qty)
    const subtotalMrp = this.items.reduce((s, i) => s + i.mrp * i.qty, 0);

    // Total payable: sum of (unitPrice * qty)
    const subtotalPayable = this.items.reduce((s, i) => s + i.unitPrice * i.qty, 0);

    // Discount is the difference between MRP and Payable
    const discount = subtotalMrp - subtotalPayable;

    // Shipping rule:
    // - If cart empty: 0
    // - If subtotalPayable >= 999: Free shipping
    // - Otherwise: 49
    const shipping = this.items.length === 0 ? 0 : subtotalPayable >= 999 ? 0 : 49;

    // Grand total = payable subtotal + shipping
    const grandTotal = subtotalPayable + shipping;

    return { totalItems, subtotalMrp, subtotalPayable, discount, shipping, grandTotal };
  }
}
