import { Component } from '@angular/core';
import { Product, ProductCategory } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [RouterLink, FormsModule, CommonModule],
  selector: 'app-products',
  styleUrl: './products.css',
  templateUrl: './products.html',
})
export class Products {
  // all: full product list (never modified directly)
  all: Product[] = [];
  // view: filtered + sorted list shown on UI
  view: Product[] = [];

  // UI filters (bound to inputs / dropdowns in the template)
  q = ''; // search keyword

  cat: ProductCategory | 'All' = 'All'; // selected category
  sort: 'ratingDes' | 'priceAsc' | 'priceDes' = 'ratingDes';

  // Popup state (controlled by Angular, not Bootstrap JS)
  isCartPopupOpen: boolean = false; // true = show popup, false = hide popup
  popupTitle = 'Add to Cart';
  popupMessage = ''; // popup body text

  // Inject required services using constructor dependency injection

  constructor(
    private api: ProductService, // fetch products list
    private cart: CartService, // add products to cart
    private route: ActivatedRoute, // read query params (q, cat, sort)
    private router: Router, // update query params + navigate pages
  ) {}

  // Runs when the Products page loads
  ngOnInit(): void {
    // Load the full product list from ProductService
    this.all = this.api.getAll();

    // Subscribe to query parameters so filters persist in URL
    // Example URL: /products?q=samsung&cat=Mobiles&sort=priceAsc
    this.route.queryParamMap.subscribe((qp) => {
      // Read query params (if missing, use defaults)
      this.q = qp.get('q') ?? '';
      this.cat = (qp.get('cat') as any) ?? 'All';
      this.sort = (qp.get('sort') as any) ?? 'ratingDes';

      // Apply filters and sorting to build "view" list
      this.apply();
    });
  }
  // Applies search + category filter + sorting and updates the view list
  apply(): void {
    // Convert search term to lowercase for case-insensitive matching
    const keyword = this.q.trim().toLowerCase();

    // Filter by keyword (name + brand)
    // If no keyword, start with a copy of all products

    let items = keyword
      ? this.all.filter((p) => (p.name + '' + p.brand).toLowerCase().includes(keyword))
      : [...this.all];

    // Filter by category if user selected anything other than "All"

    if (this.cat !== 'All') items = items.filter((c) => c.category === this.cat);
    // Apply sorting rules

    if (this.sort === 'priceAsc') items.sort((a, b) => a.price - b.price);
    if (this.sort === 'priceDes') items.sort((a, b) => b.price - a.price);
    if (this.sort === 'ratingDes') items.sort((a, b) => b.rating - a.rating);

    // Final list that will be rendered on the UI
    this.view = items;
  }

  // Update the URL query parameters
  updateQueryParams(): void {
    // Existing query params will be replaced
    this.router.navigate(['/products'], {
      queryParams: {
        q: this.q || null,
      },
    });
  }

  // Add-to-cart: stays on Products page and opens a popup message
  addQuick(p: Product): void {
    // Add 1 quantity of this product to cart
    this.cart.add(p, 1);
    // Prepare popup content
    this.popupTitle = 'Added to Cart';
    this.popupMessage = `"${p.name}" has been added to your cart successfully.`;
    // Show popup
    this.isCartPopupOpen = true;
  }

  // Close the popup
  closeCartPopup(): void {
    this.isCartPopupOpen = false;
  }

  // User clicked "Go to Cart" from popup
  goToCartFromPopup(): void {
    this.isCartPopupOpen = false; // close popup
    this.router.navigate(['/cart']);
  }
}
