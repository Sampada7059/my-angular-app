
import { Product } from "../services/product.service";

export interface CartItem {
  userId: string;
  productId: number;
  productName: string;
  imagePath: string;
  quantity: number;
  unitPrice: number; // ✅ Ensured always to be a number
  totalPrice: number;
  product?: Product;
}


