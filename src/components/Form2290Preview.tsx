import type { ValidatedVehicle } from "../types/fleet";

type Form2290PreviewProps = {
  vehicles: ValidatedVehicle[];
};

function Form2290Preview({
  vehicles,
}: Form2290PreviewProps) {
  return (
    <div>
      <h3>Form 2290 Vehicle Information</h3>

      <p>
        Number of Vehicles: <strong>{vehicles.length}</strong>
      </p>

      {vehicles.map((result, index) => {
        const { vehicle, weightCategory } = result;

        return (
          <div key={result.rowNumber}>
            <h4>Vehicle {index + 1}</h4>

            <div>
              <label>Unit #</label>
              <input
                type="text"
                value={vehicle.unitNumber}
                readOnly
              />
            </div>

            <div>
              <label>Taxable Gross Weight</label>
              <input
                type="text"
                value={
                  weightCategory
                    ? `${weightCategory.code} — ${weightCategory.label}`
                    : ""
                }
                readOnly
              />
            </div>

            <div>
              <label>VIN</label>
              <input
                type="text"
                value={vehicle.vin}
                readOnly
              />
            </div>

            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default Form2290Preview;
