import type {
  AuthResponse,
  Cart,
  Category,
  Order,
  OrderStatus,
  PaymentMethod,
  Product,
  ProductsResponse,
  RequestStatus,
  SpecialRequest,
  User,
} from "./types";

const API_URL = process.env.API_URL ?? "http://localhost:3001/api";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface FetchOptions extends RequestInit {
  token?: string;
}

async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { token, headers, ...rest } = options;

  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    // Always fetch fresh; the backend is the source of truth for this MVP.
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  if (!res.ok) {
    throw new ApiError(res.status, await extractError(res));
  }

  // 204 No Content
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

async function extractError(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as { message?: string | string[] };
    if (Array.isArray(data.message)) return data.message.join(", ");
    if (data.message) return data.message;
  } catch {
    // ignore parse errors
  }
  return `Request failed with status ${res.status}`;
}

/* ---------------- Catalog (public) ---------------- */

export interface ProductQuery {
  q?: string;
  category?: string;
  brand?: string;
  gender?: string;
  movement?: string;
  minPriceCents?: number;
  maxPriceCents?: number;
  page?: number;
  limit?: number;
}

export function getProducts(query: ProductQuery = {}): Promise<ProductsResponse> {
  const params = new URLSearchParams();
  if (query.q) params.set("q", query.q);
  if (query.category) params.set("category", query.category);
  if (query.brand) params.set("brand", query.brand);
  if (query.gender) params.set("gender", query.gender);
  if (query.movement) params.set("movement", query.movement);
  if (query.minPriceCents != null)
    params.set("minPriceCents", String(query.minPriceCents));
  if (query.maxPriceCents != null)
    params.set("maxPriceCents", String(query.maxPriceCents));
  if (query.page) params.set("page", String(query.page));
  if (query.limit) params.set("limit", String(query.limit));
  const qs = params.toString();
  return apiFetch<ProductsResponse>(`/products${qs ? `?${qs}` : ""}`);
}

export function getFacets(): Promise<{ brands: string[] }> {
  return apiFetch<{ brands: string[] }>("/products/facets");
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    return await apiFetch<Product>(`/products/${id}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

export function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>("/categories");
}

export function adminCreateCategory(
  token: string,
  name: string,
): Promise<Category> {
  return apiFetch<Category>("/categories", {
    method: "POST",
    token,
    body: JSON.stringify({ name }),
  });
}

export function adminUpdateCategory(
  token: string,
  id: string,
  name: string,
): Promise<Category> {
  return apiFetch<Category>(`/categories/${id}`, {
    method: "PATCH",
    token,
    body: JSON.stringify({ name }),
  });
}

export function adminDeleteCategory(
  token: string,
  id: string,
  reassignToId?: string,
): Promise<{ success: boolean; movedTo?: string }> {
  const qs = reassignToId
    ? `?reassignTo=${encodeURIComponent(reassignToId)}`
    : "";
  return apiFetch<{ success: boolean; movedTo?: string }>(
    `/categories/${id}${qs}`,
    { method: "DELETE", token },
  );
}

/* ---------------- Auth ---------------- */

export function login(email: string, password: string): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function register(
  name: string,
  email: string,
  password: string,
): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export function googleLogin(idToken: string): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/google", {
    method: "POST",
    body: JSON.stringify({ idToken }),
  });
}

export async function getMe(token: string): Promise<User | null> {
  try {
    return await apiFetch<User>("/auth/me", { token });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) return null;
    throw error;
  }
}

/* ---------------- Cart (authenticated) ---------------- */

export function getCart(token: string): Promise<Cart> {
  return apiFetch<Cart>("/cart", { token });
}

export function addCartItem(
  token: string,
  productId: string,
  quantity: number,
): Promise<Cart> {
  return apiFetch<Cart>("/cart/items", {
    method: "POST",
    token,
    body: JSON.stringify({ productId, quantity }),
  });
}

export function updateCartItem(
  token: string,
  itemId: string,
  quantity: number,
): Promise<Cart> {
  return apiFetch<Cart>(`/cart/items/${itemId}`, {
    method: "PATCH",
    token,
    body: JSON.stringify({ quantity }),
  });
}

export function removeCartItem(token: string, itemId: string): Promise<Cart> {
  return apiFetch<Cart>(`/cart/items/${itemId}`, {
    method: "DELETE",
    token,
  });
}

/* ---------------- Admin: product management ---------------- */

export interface ProductInput {
  name: string;
  description: string;
  priceCents: number;
  previousPriceCents?: number;
  images: string[];
  stock: number;
  categoryId: string;
  brand?: string;
  gender?: string;
  movement?: string;
}

export function createProduct(
  token: string,
  input: ProductInput,
): Promise<Product> {
  return apiFetch<Product>("/products", {
    method: "POST",
    token,
    body: JSON.stringify(input),
  });
}

export function updateProduct(
  token: string,
  id: string,
  input: Partial<ProductInput>,
): Promise<Product> {
  return apiFetch<Product>(`/products/${id}`, {
    method: "PATCH",
    token,
    body: JSON.stringify(input),
  });
}

export function deleteProduct(
  token: string,
  id: string,
): Promise<{ success: boolean }> {
  return apiFetch<{ success: boolean }>(`/products/${id}`, {
    method: "DELETE",
    token,
  });
}

/* ---------------- Orders ---------------- */

export interface CreateOrderInput {
  customerName: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
  paymentMethod: PaymentMethod;
}

export function createOrder(
  token: string,
  input: CreateOrderInput,
): Promise<Order> {
  return apiFetch<Order>("/orders", {
    method: "POST",
    token,
    body: JSON.stringify(input),
  });
}

export function getMyOrders(token: string): Promise<Order[]> {
  return apiFetch<Order[]>("/orders", { token });
}

export function getOrder(token: string, id: string): Promise<Order> {
  return apiFetch<Order>(`/orders/${id}`, { token });
}

export function adminGetOrders(token: string): Promise<Order[]> {
  return apiFetch<Order[]>("/admin/orders", { token });
}

export function adminUpdateOrderStatus(
  token: string,
  id: string,
  status: OrderStatus,
): Promise<Order> {
  return apiFetch<Order>(`/admin/orders/${id}/status`, {
    method: "PATCH",
    token,
    body: JSON.stringify({ status }),
  });
}

/* ---------------- Special requests (admin) ---------------- */

export function adminGetRequests(token: string): Promise<SpecialRequest[]> {
  return apiFetch<SpecialRequest[]>("/admin/requests", { token });
}

export function adminUpdateRequestStatus(
  token: string,
  id: string,
  status: RequestStatus,
): Promise<SpecialRequest> {
  return apiFetch<SpecialRequest>(`/admin/requests/${id}/status`, {
    method: "PATCH",
    token,
    body: JSON.stringify({ status }),
  });
}

export async function uploadImage(
  token: string,
  file: File,
): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("file", file);
  // Note: do not set Content-Type; fetch sets the multipart boundary.
  const res = await fetch(`${API_URL}/uploads`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
    cache: "no-store",
  });
  if (!res.ok) {
    throw new ApiError(res.status, await extractError(res));
  }
  return (await res.json()) as { url: string };
}
