export type FleetRow = Record<string, string>;

export type SkyField =
  | "unitNumber"
  | "vin"
  | "taxableGrossWeight";

export type FieldMapping = Record<string, SkyField | "">;

export const SKY_FIELDS: {
  value: SkyField;
  label: string;
}[] = [
  {
    value: "unitNumber",
    label: "Unit #",
  },
  {
    value: "vin",
    label: "VIN",
  },
  {
    value: "taxableGrossWeight",
    label: "Taxable Gross Weight",
  },
];