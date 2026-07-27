import type { OrderStatus, PaymentMethod } from "./types";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmado",
  SHIPPED: "Enviado",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};

export const ORDER_STATUSES: OrderStatus[] = [
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  CONTRA_ENTREGA: "Pago contra entrega",
  TRANSFERENCIA: "Transferencia bancaria",
  VISA_CUOTAS: "Visa cuotas",
};

export const PAYMENT_METHODS: PaymentMethod[] = [
  "CONTRA_ENTREGA",
  "TRANSFERENCIA",
  "VISA_CUOTAS",
];

const dateFormatter = new Intl.DateTimeFormat("es-GT", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function formatOrderDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

/** Short human-friendly order code from the id. */
export function orderCode(id: string): string {
  return id.slice(-6).toUpperCase();
}
