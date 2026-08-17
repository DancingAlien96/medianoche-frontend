import type { RequestStatus } from "./types";

export const REQUEST_STATUS_LABELS: Record<RequestStatus, string> = {
  PENDING: "Pendiente",
  CONTACTED: "Contactado",
  CLOSED: "Cerrado",
};

export const REQUEST_STATUSES: RequestStatus[] = [
  "PENDING",
  "CONTACTED",
  "CLOSED",
];
