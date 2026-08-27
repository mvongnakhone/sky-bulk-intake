import type {
  FieldMapping,
  FleetRow,
  VehicleRecord,
} from "../types/fleet";

export function normalizeVehicles(
  rows: FleetRow[],
  mapping: FieldMapping
): VehicleRecord[] {
  return rows.map((row) => {
    const vehicle: VehicleRecord = {
      unitNumber: "",
      vin: "",
      taxableGrossWeight: 0,
    };

    for (const [sourceColumn, targetField] of Object.entries(mapping)) {
      if (!targetField) continue;

      const value = row[sourceColumn]?.trim() ?? "";

      if (targetField === "unitNumber") {
        vehicle.unitNumber = value;
      }

      if (targetField === "vin") {
        vehicle.vin = value.toUpperCase();
      }

      if (targetField === "taxableGrossWeight") {
        vehicle.taxableGrossWeight = Number(
          value.replace(/[$,\s]/g, "")
        );
      }
    }

    return vehicle;
  });
}
