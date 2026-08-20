import type { Gender, Movement } from "./types";

export const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: "MALE", label: "Para él" },
  { value: "FEMALE", label: "Para ella" },
  { value: "UNISEX", label: "Unisex" },
];

export const MOVEMENT_OPTIONS: { value: Movement; label: string }[] = [
  { value: "AUTOMATIC", label: "Automático" },
  { value: "QUARTZ", label: "Clásico de cuarzo" },
];

export const GENDER_LABELS: Record<Gender, string> = {
  MALE: "Para él",
  FEMALE: "Para ella",
  UNISEX: "Unisex",
};

export const MOVEMENT_LABELS: Record<Movement, string> = {
  AUTOMATIC: "Automático",
  QUARTZ: "Cuarzo",
};

/** Price ranges in cents (Q × 100). max = null means "and up". */
export const PRICE_RANGES: {
  key: string;
  label: string;
  min: number;
  max: number | null;
}[] = [
  { key: "0-150000", label: "Menos de Q1,500", min: 0, max: 150000 },
  { key: "150000-300000", label: "Q1,500 – Q3,000", min: 150000, max: 300000 },
  { key: "300000-600000", label: "Q3,000 – Q6,000", min: 300000, max: 600000 },
  { key: "600000-", label: "Más de Q6,000", min: 600000, max: null },
];

export function priceRangeByKey(key?: string) {
  return PRICE_RANGES.find((r) => r.key === key);
}
