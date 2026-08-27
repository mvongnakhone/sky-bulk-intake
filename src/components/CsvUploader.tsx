import { useState } from "react";
import Papa from "papaparse";
import { suggestFieldMapping } from "../utils/suggestFieldMapping";

import FieldMapper from "./FieldMapper";
import ValidationResults from "./ValidationResults";
import Form2290Preview from "./Form2290Preview";
import VehicleEditor from "./VehicleEditor";

import { normalizeVehicles } from "../utils/normalizeVehicles";
import { validateVehicles } from "../utils/validateVehicles";

import {
  type FieldMapping,
  type FleetRow,
  type SkyField,
  type VehicleRecord,
} from "../types/fleet";

function CsvUploader() {
  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [rows, setRows] =
    useState<FleetRow[]>([]);

  const [headers, setHeaders] =
    useState<string[]>([]);

  const [mapping, setMapping] =
    useState<FieldMapping>({});

  const [showFormPreview, setShowFormPreview] =
    useState(false);

  const [editedVehicles, setEditedVehicles] =
    useState<VehicleRecord[]>([]);

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
    setShowFormPreview(false);
  };

  const handleImport = () => {
    if (!selectedFile) return;

    Papa.parse<FleetRow>(selectedFile, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        const parsedHeaders =
          results.meta.fields ?? [];

        setRows(results.data);
        setHeaders(parsedHeaders);

        const initialMapping: FieldMapping = {};

        parsedHeaders.forEach((header) => {
          initialMapping[header] = suggestFieldMapping(header);
        });

        setMapping(initialMapping);

        const mappedVehicles = normalizeVehicles(
          results.data,
          initialMapping
        );

        setEditedVehicles(mappedVehicles);
      },

      error: (error) => {
        console.error(
          "CSV parsing failed:",
          error
        );
      },
    });
  };

  const handleMappingChange = (
    sourceColumn: string,
    targetField: SkyField | ""
  ) => {
    const updatedMapping = {
      ...mapping,
      [sourceColumn]: targetField,
    };

    setMapping(updatedMapping);

    const updatedVehicles =
      normalizeVehicles(rows, updatedMapping);

    setEditedVehicles(updatedVehicles);

    setShowFormPreview(false);
  };

  const handleVehicleChange = (
    index: number,
    field: keyof VehicleRecord,
    value: string
  ) => {
    setEditedVehicles((previousVehicles) => {
      const updatedVehicles = [...previousVehicles];

      const vehicle = {
        ...updatedVehicles[index],
      };

      if (field === "taxableGrossWeight") {
        vehicle.taxableGrossWeight = Number(value);
      } else {
        vehicle[field] = value;
      }

      updatedVehicles[index] = vehicle;

      return updatedVehicles;
    });

    setShowFormPreview(false);
  };

  const validatedVehicles =
    validateVehicles(editedVehicles);

  const allVehiclesValid =
    validatedVehicles.length > 0 &&
    validatedVehicles.every(
      (vehicle) => vehicle.isValid
    );

  return (
    <div>
      <h2>Upload Fleet Data</h2>

      <p>
        Select a CSV file containing your vehicle
        records.
      </p>

      <input
        type="file"
        accept=".csv,text/csv"
        onChange={handleFileSelect}
      />

      <button
        onClick={handleImport}
        disabled={!selectedFile}
      >
        Import Data
      </button>

      {rows.length > 0 && (
        <>
          <div>
            <h3>Imported Fleet Data</h3>

            <p>
              {rows.length} records imported
            </p>

            <table>
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th key={header}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map(
                  (row, rowIndex) => (
                    <tr key={rowIndex}>
                      {headers.map(
                        (header) => (
                          <td key={header}>
                            {row[header]}
                          </td>
                        )
                      )}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          <FieldMapper
            headers={headers}
            mapping={mapping}
            onMappingChange={
              handleMappingChange
            }
          />

          <VehicleEditor
            vehicles={editedVehicles}
            onVehicleChange={handleVehicleChange}
          />

          <ValidationResults
            vehicles={validatedVehicles}
          />

          <button
            onClick={() => setShowFormPreview(true)}
            disabled={!allVehiclesValid}
          >
            Generate Form 2290 Preview
          </button>

          {!allVehiclesValid &&
            validatedVehicles.length > 0 && (
              <p>
                Resolve all validation issues before generating
                the Form 2290 request.
              </p>
            )}

          {showFormPreview && allVehiclesValid && (
            <Form2290Preview
              vehicles={validatedVehicles}
            />
          )}
        </>
      )}
    </div>
  );
}

export default CsvUploader;