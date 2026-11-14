export type ProductCategory = 'Mobiles' | 'Laptops' | 'Shoes' | 'Books';

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;

  brand: string;
  sku: string;

  mrp: number;
  discountPercent: number;
  price: number;

  rating: number;
  inStock: boolean;
  stockQty: number;

  freeDelivery: boolean;
  deliveryDays: number;
  warrantyMonths: number;
  sellerName: string;

  imageUrl: string;
  description: string;
  highlights: string[];
}
