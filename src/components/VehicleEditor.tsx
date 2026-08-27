import type { VehicleRecord } from "../types/fleet";

type VehicleEditorProps = {
  vehicles: VehicleRecord[];
  onVehicleChange: (
    index: number,
    field: keyof VehicleRecord,
    value: string
  ) => void;
};

function VehicleEditor({
  vehicles,
  onVehicleChange,
}: VehicleEditorProps) {
  return (
    <div>
      <h3>Review Vehicle Data</h3>

      {vehicles.map((vehicle, index) => (
        <div key={index}>
          <h4>Vehicle {index + 1}</h4>

          <div>
            <label>Unit #</label>

            <input
              type="text"
              value={vehicle.unitNumber}
              onChange={(event) =>
                onVehicleChange(
                  index,
                  "unitNumber",
                  event.target.value
                )
              }
            />
          </div>

          <div>
            <label>VIN</label>

            <input
              type="text"
              value={vehicle.vin}
              onChange={(event) =>
                onVehicleChange(
                  index,
                  "vin",
                  event.target.value
                )
              }
            />
          </div>

          <div>
            <label>Taxable Gross Weight</label>

            <input
              type="number"
              value={vehicle.taxableGrossWeight}
              onChange={(event) =>
                onVehicleChange(
                  index,
                  "taxableGrossWeight",
                  event.target.value
                )
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default VehicleEditor;
