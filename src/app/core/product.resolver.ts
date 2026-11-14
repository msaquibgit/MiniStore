import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Product } from '../models/product';
import { inject } from '@angular/core';
import { ProductService } from '../services/product.service';

// Resolver: Runs before opening Product Details page and provides "product" in route data
// Return type: Product | null (null if product not found)

export const productResolver: ResolveFn<Product | null> = (
  route: ActivatedRouteSnapshot, // Contains route info, including parameters like /products/:id
) => {
  // Get ProductService instance using inject()
  const productService = inject(ProductService);
  // Read "id" route parameter (string), convert it to number
  const id = Number(route.paramMap.get('id'));
  // Fetch product by id and return it
  // The resolved value will be available in component via this.route.data
  return productService.getById(id);
};
