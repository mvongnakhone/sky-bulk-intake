import type {
  ValidatedVehicle,
  VehicleRecord,
  ValidationIssue,
} from "../types/fleet";

import { get2290WeightCategory } from "./get2290WeightCategory";

function isValidVin(vin: string): boolean {
  return /^[A-HJ-NPR-Z0-9]{17}$/.test(vin);
}

export function validateVehicles(
  vehicles: VehicleRecord[]
): ValidatedVehicle[] {
  const vinCounts = new Map<string, number>();

  vehicles.forEach((vehicle) => {
    if (!vehicle.vin) return;

    vinCounts.set(
      vehicle.vin,
      (vinCounts.get(vehicle.vin) ?? 0) + 1
    );
  });

  return vehicles.map((vehicle, index) => {
    const issues: ValidationIssue[] = [];

    if (!vehicle.unitNumber) {
      issues.push({
        field: "unitNumber",
        message: "Unit number is missing.",
      });
    }

    if (!vehicle.vin) {
      issues.push({
        field: "vin",
        message: "VIN is missing.",
      });
    } else if (!isValidVin(vehicle.vin)) {
      issues.push({
        field: "vin",
        message:
          "VIN must contain 17 valid characters.",
      });
    }

    if (
      vehicle.vin &&
      (vinCounts.get(vehicle.vin) ?? 0) > 1
    ) {
      issues.push({
        field: "vin",
        message: "Duplicate VIN detected.",
      });
    }

    if (
      !Number.isFinite(vehicle.taxableGrossWeight) ||
      vehicle.taxableGrossWeight <= 0
    ) {
      issues.push({
        field: "taxableGrossWeight",
        message: "Gross weight must be a valid number.",
      });
    } else if (vehicle.taxableGrossWeight < 55000) {
      issues.push({
        field: "taxableGrossWeight",
        message:
          "Vehicle weight is below the 55,000 lb Form 2290 threshold.",
      });
    }

    const weightCategory =
      get2290WeightCategory(vehicle.taxableGrossWeight);

    return {
      rowNumber: index + 1,
      vehicle,
      weightCategory,
      issues,
      isValid: issues.length === 0,
    };
  });
}
