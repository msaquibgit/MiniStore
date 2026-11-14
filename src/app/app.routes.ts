import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Products } from './pages/products/products';
import { Cart } from './pages/cart/cart';
import { productResolver } from './core/product.resolver';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  // Default route: when user opens '/', redirect to '/products'
  { path: '', redirectTo: 'products', pathMatch: 'full' },

  // Public routes (eager-loaded)
  { path: 'login', component: Login }, // login page
  { path: 'products', component: Products },
  { path: 'cart', component: Cart },
  // Product details (lazy-loaded) + resolver
  {
    // Example: /products/101
    path: 'products/:id',
    loadComponent: () =>
      import('./pages/product-details/product-details').then((m) => m.ProductDetails),
    // Resolver runs before the component loads, and provides route.data.product
    resolve: { product: productResolver },
  },
  // Checkout (lazy-loaded) + guard
  {
    path: 'checkout',
    // Guard: allow only logged-in users
    canActivate: [authGuard],
    // Lazy-load the Checkout component only when user goes to checkout
    loadComponent: () => import('./pages/checkout/checkout').then((m) => m.Checkout),
  },
  // Order success (lazy-loaded) + guard
  {
    path: 'order-success',
    // Guard: allow only logged-in users
    canActivate: [authGuard],
    loadComponent: () => import('./pages/order-success/order-success').then((m) => m.OrderSuccess),
  },
  // Not Found (lazy-loaded) - rarely needed

  {
    path: '**',
    // Lazy-load NotFound page only for invalid URLs
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
