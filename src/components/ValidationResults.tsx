import type { ValidatedVehicle } from "../types/fleet";

type ValidationResultsProps = {
  vehicles: ValidatedVehicle[];
};

function ValidationResults({
  vehicles,
}: ValidationResultsProps) {
  const validCount = vehicles.filter(
    (vehicle) => vehicle.isValid
  ).length;

  const invalidCount =
    vehicles.length - validCount;

  return (
    <div>
      <h3>Vehicle Validation</h3>

      <p>
        {validCount} valid / {invalidCount} require attention
      </p>

      <table>
        <thead>
          <tr>
            <th>Row</th>
            <th>Unit #</th>
            <th>VIN</th>
            <th>Weight</th>
            <th>2290 Category</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map((result) => (
            <tr key={result.rowNumber}>
              <td>{result.rowNumber}</td>

              <td>
                {result.vehicle.unitNumber || "—"}
              </td>

              <td>
                {result.vehicle.vin || "—"}
              </td>

              <td>
                {result.vehicle.taxableGrossWeight
                  ? `${result.vehicle.taxableGrossWeight.toLocaleString()} lbs`
                  : "—"}
              </td>

              <td>
                {result.weightCategory
                  ? `${result.weightCategory.code} — ${result.weightCategory.label} ($${result.weightCategory.price})`
                  : "—"}
              </td>

              <td>
                {result.isValid ? (
                  <span>✓ Valid</span>
                ) : (
                  <div>
                    <strong>Needs attention</strong>

                    {result.issues.map((issue, index) => (
                      <div key={index}>
                        {issue.message}
                      </div>
                    ))}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ValidationResults;
