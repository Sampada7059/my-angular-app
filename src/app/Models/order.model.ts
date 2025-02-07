export interface Order {
  userId: number;
  totalAmount: number;
  orderDate: string;
  paymentStatus: string;
  paymentMethod?: string;  // ✅ Added paymentMethod
  orderItems: {
    productId: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
}
