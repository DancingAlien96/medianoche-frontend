export interface Category {
  id: string;
  name: string;
  slug: string;
  _count?: { products: number };
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  priceCents: number;
  imageUrl: string;
  images: string[];
  stock: number;
  categoryId: string;
  category: Category;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  product: Product;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotalCents: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentMethod =
  | "CONTRA_ENTREGA"
  | "TRANSFERENCIA"
  | "VISA_CUOTAS";

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string | null;
  productName: string;
  priceCents: number;
  quantity: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  notes: string | null;
  paymentMethod: PaymentMethod;
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
  user?: { name: string; email: string };
}

export type RequestStatus = "PENDING" | "CONTACTED" | "CLOSED";

export interface SpecialRequest {
  id: string;
  name: string | null;
  phone: string;
  brand: string | null;
  description: string;
  photos: string[];
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
}
