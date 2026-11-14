import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { LoginRequest } from '../models/login-request';
import { LoginResult } from '../models/login-result';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Key used to store logged-in customer info in Local Storage
  private readonly key = 'ministore_customer';

  // Dummy customers (demo users) - in real apps, this comes from API/database
  private readonly customers: Customer[] = [
    {
      id: 1,
      name: 'Pranaya Rout',
      email: 'pranaya@example.com',
      password: 'Pranaya@123',
      mobile: '9876543210',
      isActive: true,
    },
    {
      id: 2,
      name: 'Amit Kumar',
      email: 'amit@example.com',
      password: 'Amit@123',
      mobile: '9123456780',
      isActive: true,
    },
    {
      id: 3,
      name: 'Riya Sharma',
      email: 'riya@example.com',
      password: 'Riya@123',
      mobile: '9000011111',
      isActive: false,
    }, // inactive user demo
  ];

  // Login method called from Login page
  login(request: LoginRequest): LoginResult {
    // Trim spaces and convert email to lowercase for safe matching
    const email = (request.email ?? '').trim().toLowerCase();
    // Trim password spaces
    const password = (request.password ?? '').trim();

    // Required field validation
    if (!email || !password) {
      return { isSuccess: false, errorMessage: 'Email and Password are required.' };
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isSuccess: false, errorMessage: 'Please enter a valid Email address.' };
    }
    // Find customer from dummy customer list by email
    const customer = this.customers.find((x) => x.email === request.email);
    // If email not found, return invalid credentials (generic message for security)
    if (!customer) {
      return { isSuccess: false, errorMessage: 'Invalid Email or Password.' };
    }
    // Check whether customer account is active
    if (!customer.isActive) {
      return {
        isSuccess: false,
        errorMessage: 'Your account is inactive. Please contact support.',
      };
    }
    // Password validation (match with dummy stored password)
    if (customer.password !== password) {
      return { isSuccess: false, errorMessage: 'Invalid Email or Password.' };
    }

    // Create a "safe" customer object (do not store password)
    const safeCustomer = {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      mobile: customer.mobile,
    };
    // Store safe customer data in Local Storage to keep user logged in
    localStorage.setItem(this.key, JSON.stringify(safeCustomer));

    // Return success response
    return { isSuccess: true, customer: safeCustomer };
  }

  logout(): void {
    // remove customer session
    localStorage.removeItem(this.key);
  }

  // Returns true if customer data exists in local storage
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.key);
  }

  // Get logged-in customer details from local storage
  getCustomer(): { id: number; name: string; email: string; mobile: string } | null {
    // read from local storage
    const raw = localStorage.getItem(this.key);
    return raw
      ? (JSON.parse(raw) as { id: number; name: string; email: string; mobile: string })
      : null; // if nothing stored, user is not logged in
  }
}
