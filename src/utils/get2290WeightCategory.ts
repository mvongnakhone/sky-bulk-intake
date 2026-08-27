import type { WeightCategory } from "../types/fleet";

const categories: WeightCategory[] = [
  { code: "A", label: "55,000 lbs", price: 150 },
  { code: "B", label: "55,001-56,000 lbs", price: 172 },
  { code: "C", label: "56,001-57,000 lbs", price: 194 },
  { code: "D", label: "57,001-58,000 lbs", price: 216 },
  { code: "E", label: "58,001-59,000 lbs", price: 238 },
  { code: "F", label: "59,001-60,000 lbs", price: 260 },
  { code: "G", label: "60,001-61,000 lbs", price: 282 },
  { code: "H", label: "61,001-62,000 lbs", price: 304 },
  { code: "I", label: "62,001-63,000 lbs", price: 326 },
  { code: "J", label: "63,001-64,000 lbs", price: 348 },
  { code: "K", label: "64,001-65,000 lbs", price: 370 },
  { code: "L", label: "65,001-66,000 lbs", price: 392 },
  { code: "M", label: "66,001-67,000 lbs", price: 414 },
  { code: "N", label: "67,001-68,000 lbs", price: 436 },
  { code: "O", label: "68,001-69,000 lbs", price: 458 },
  { code: "P", label: "69,001-70,000 lbs", price: 480 },
  { code: "Q", label: "70,001-71,000 lbs", price: 502 },
  { code: "R", label: "71,001-72,000 lbs", price: 524 },
  { code: "S", label: "72,001-73,000 lbs", price: 546 },
  { code: "T", label: "73,001-74,000 lbs", price: 568 },
  { code: "U", label: "74,001-75,000 lbs", price: 590 },
  { code: "V", label: "Over 75,000 lbs", price: 600 },
];

export function get2290WeightCategory(
  weight: number
): WeightCategory | null {
  if (weight < 55000) {
    return null;
  }

  if (weight === 55000) return categories[0];
  if (weight <= 56000) return categories[1];
  if (weight <= 57000) return categories[2];
  if (weight <= 58000) return categories[3];
  if (weight <= 59000) return categories[4];
  if (weight <= 60000) return categories[5];
  if (weight <= 61000) return categories[6];
  if (weight <= 62000) return categories[7];
  if (weight <= 63000) return categories[8];
  if (weight <= 64000) return categories[9];
  if (weight <= 65000) return categories[10];
  if (weight <= 66000) return categories[11];
  if (weight <= 67000) return categories[12];
  if (weight <= 68000) return categories[13];
  if (weight <= 69000) return categories[14];
  if (weight <= 70000) return categories[15];
  if (weight <= 71000) return categories[16];
  if (weight <= 72000) return categories[17];
  if (weight <= 73000) return categories[18];
  if (weight <= 74000) return categories[19];
  if (weight <= 75000) return categories[20];

  return categories[21];
}
