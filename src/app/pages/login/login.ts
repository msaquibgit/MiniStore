import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  email = '';
  password = '';
  error = '';

  constructor(
    private auth: AuthService, // used to login and check login status
    private router: Router, // used to redirect after successful login
    private route: ActivatedRoute, // used to read returnUrl query parameter
  ) {}

  // Runs automatically when the component loads
  ngOnint(): void {
    // If already logged in, redirect user to products page
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/products']);
    }
  }

  // Called when user clicks the Login button
  login(): void {
    // Clear old error before doing a new login attempt
    this.error = '';

    // Call AuthService login with email/password entered by user
    const result = this.auth.login({
      email: this.email,
      password: this.password,
    });

    if (!result.isSuccess) {
      this.error = result.errorMessage ?? 'Login failed.';
      return;
    }
    // If user was redirected here by a guard, returnUrl will be present
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

    // If user was redirected here by a guard, returnUrl will be present
    this.router.navigateByUrl(returnUrl || '/products');
  }
}
