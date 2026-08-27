import {
  SKY_FIELDS,
  type FieldMapping,
  type SkyField,
} from "../types/fleet";

type FieldMapperProps = {
  headers: string[];
  mapping: FieldMapping;
  onMappingChange: (
    sourceColumn: string,
    targetField: SkyField | ""
  ) => void;
};

function FieldMapper({
  headers,
  mapping,
  onMappingChange,
}: FieldMapperProps) {
  return (
    <div>
      <h3>Map Your Columns</h3>

      <p>
        Match the columns from your uploaded file to the fields required
        by Sky.
      </p>

      {headers.map((header) => (
        <div key={header}>
          <label>
            {header}

            <select
              value={mapping[header] ?? ""}
              onChange={(event) =>
                onMappingChange(
                  header,
                  event.target.value as SkyField | ""
                )
              }
            >
              <option value="">Select a field</option>

              {SKY_FIELDS.map((field) => (
                <option
                  key={field.value}
                  value={field.value}
                >
                  {field.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      ))}
    </div>
  );
}

export default FieldMapper;
