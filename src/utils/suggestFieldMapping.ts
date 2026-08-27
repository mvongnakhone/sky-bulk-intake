import type { SkyField } from "../types/fleet";

const FIELD_ALIASES: Record<SkyField, string[]> = {
  unitNumber: [
    "unit",
    "unit_number",
    "unitnumber",
    "unit_no",
    "unit_num",
    "truck_number",
    "trucknumber",
    "truck_no",
    "truck_num",
    "vehicle_number",
    "vehicle_no",
  ],

  vin: [
    "vin",
    "vehicle_vin",
    "truck_vin",
    "vehicle_id",
    "vehicle_identification_number",
  ],

  taxableGrossWeight: [
    "weight",
    "gross_weight",
    "grossweight",
    "gvw",
    "gvwr",
    "taxable_gross_weight",
    "vehicle_weight",
    "truck_weight",
  ],
};

function normalizeHeader(header: string): string {
  return header
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}

export function suggestFieldMapping(
  header: string
): SkyField | "" {
  const normalizedHeader = normalizeHeader(header);

  for (const [field, aliases] of Object.entries(FIELD_ALIASES)) {
    if (aliases.includes(normalizedHeader)) {
      return field as SkyField;
    }
  }

  return "";
}