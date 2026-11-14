import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  // In-memory product list (acts like a mini database for this demo app)
  // In real applications, products would come from an API + database.

  private readonly products: Product[] = [
    {
      id: 101,
      name: 'Galaxy S Series (128GB)',
      category: 'Mobiles',
      brand: 'Samsung',
      sku: 'MOB-SAMS-S-128',
      mrp: 62999,
      discountPercent: 12,
      price: 55439,
      rating: 4.6,
      inStock: true,
      stockQty: 18,
      freeDelivery: true,
      deliveryDays: 2,
      warrantyMonths: 12,
      sellerName: 'MiniCart Retail',
      imageUrl:
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
      description: 'Smooth performance, great camera, long battery life.',
      highlights: ['AMOLED display', 'Fast charging', 'Great low-light camera', '5G ready'],
    },
    {
      id: 102,
      name: 'UltraBook Pro (i5, 16GB, 512GB)',
      category: 'Laptops',
      brand: 'Acer',
      sku: 'LAP-ACR-ULTRA-I5',
      mrp: 99999,
      discountPercent: 15,
      price: 84999,
      rating: 4.7,
      inStock: true,
      stockQty: 9,
      freeDelivery: true,
      deliveryDays: 3,
      warrantyMonths: 12,
      sellerName: 'MiniCart Retail',
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
      description: 'Lightweight, premium build, fast SSD and great battery.',
      highlights: ['16GB RAM', '512GB SSD', 'FHD IPS display', 'Backlit keyboard'],
    },
    {
      id: 103,
      name: 'Running Shoes X (Men)',
      category: 'Shoes',
      brand: 'Nike',
      sku: 'SHO-NIKE-RUN-X',
      mrp: 5999,
      discountPercent: 35,
      price: 3899,
      rating: 4.3,
      inStock: true,
      stockQty: 26,
      freeDelivery: false,
      deliveryDays: 4,
      warrantyMonths: 0,
      sellerName: 'Sports Hub',
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      description: 'Comfort fit, durable outsole, stylish everyday runner.',
      highlights: ['Breathable mesh', 'Cushioned sole', 'Durable outsole', 'Lightweight'],
    },
    {
      id: 104,
      name: 'Clean Code (Paperback)',
      category: 'Books',
      brand: 'Pearson',
      sku: 'BOK-CLN-CODE',
      mrp: 899,
      discountPercent: 20,
      price: 719,
      rating: 4.8,
      inStock: true,
      stockQty: 60,
      freeDelivery: true,
      deliveryDays: 2,
      warrantyMonths: 0,
      sellerName: 'BookTown',
      imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794',
      description: 'Classic book on writing maintainable, readable code.',
      highlights: ['Best practices', 'Refactoring mindset', 'Real examples', 'Team-friendly code'],
    },
    {
      id: 105,
      name: 'Noise-Cancel Headphones',
      category: 'Mobiles',
      brand: 'Sony',
      sku: 'AUD-SONY-NC-01',
      mrp: 19999,
      discountPercent: 25,
      price: 14999,
      rating: 4.4,
      inStock: false,
      stockQty: 0,
      freeDelivery: true,
      deliveryDays: 5,
      warrantyMonths: 12,
      sellerName: 'AudioMart',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      description: 'Immersive sound with strong noise cancellation.',
      highlights: ['Noise cancellation', '20+ hours battery', 'Comfort fit', 'Fast pairing'],
    },
    {
      id: 106,
      name: 'Everyday Backpack (25L)',
      category: 'Books',
      brand: 'Wildcraft',
      sku: 'BAG-WILD-25L',
      mrp: 1799,
      discountPercent: 28,
      price: 1299,
      rating: 4.1,
      inStock: true,
      stockQty: 40,
      freeDelivery: false,
      deliveryDays: 4,
      warrantyMonths: 6,
      sellerName: 'Outdoor Store',
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
      description: 'Rugged backpack for office, travel, and daily use.',
      highlights: ['Laptop sleeve', 'Water resistant', 'Strong zippers', 'Lightweight'],
    },
  ];

  // Returns a COPY of the product list so external code cannot modify the original array
  getAll(): Product[] {
    return [...this.products]; // Shallow Copy
    // return structuredClone(this.products); // Deep Copy
  }

  // Finds a product by ID
  // Returns the product if found, otherwise returns null
  getById(id: number): Product | null {
    return this.products.find((x) => x.id === id) ?? null;
  }
}
