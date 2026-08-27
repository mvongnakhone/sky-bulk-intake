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

export type VehicleRecord = {
  unitNumber: string;
  vin: string;
  taxableGrossWeight: number;
};

export type WeightCategory = {
  code: string;
  label: string;
  price: number;
};

export type ValidationIssue = {
  field: keyof VehicleRecord;
  message: string;
};

export type ValidatedVehicle = {
  rowNumber: number;
  vehicle: VehicleRecord;
  weightCategory: WeightCategory | null;
  issues: ValidationIssue[];
  isValid: boolean;
};
