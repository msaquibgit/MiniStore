export interface CartItem {
  productId: number;
  name: string;
  imageUrl: string;
  brand: string;
  sku: string;

  mrp: number;
  unitPrice: number;
  discountPercent: number;

  qty: number;
  addedAt: string;
}
