import { useState } from "react";
import Papa from "papaparse";
import { suggestFieldMapping } from "../utils/suggestFieldMapping";

import FieldMapper from "./FieldMapper";
import ValidationResults from "./ValidationResults";
import Form2290Preview from "./Form2290Preview";
import VehicleEditor from "./VehicleEditor";
import StepIndicator from "./StepIndicator";

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

  const [editedVehicles, setEditedVehicles] =
    useState<VehicleRecord[]>([]);

  const [currentStep, setCurrentStep] =
    useState(1);

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
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
          initialMapping[header] =
            suggestFieldMapping(header);
        });

        setMapping(initialMapping);

        const mappedVehicles =
          normalizeVehicles(
            results.data,
            initialMapping
          );

        setEditedVehicles(mappedVehicles);

        setCurrentStep(2);
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
  };

  const validatedVehicles =
    validateVehicles(editedVehicles);

  const allVehiclesValid =
    validatedVehicles.length > 0 &&
    validatedVehicles.every(
      (vehicle) => vehicle.isValid
    );

  const requiredFields: SkyField[] = [
    "unitNumber",
    "vin",
    "taxableGrossWeight",
  ];

  const mappedFields = Object.values(mapping);

  const allRequiredFieldsMapped =
    requiredFields.every((field) =>
      mappedFields.includes(field)
    );

  return (
    <div>
      <StepIndicator currentStep={currentStep} />

      {currentStep === 1 && (
        <section className="card">
          <h2>Upload Fleet Data</h2>

          <p>
            Upload a CSV containing the vehicles
            you want to include in your Form 2290
            request.
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
        </section>
      )}

      {currentStep === 2 && (
        <section className="card">
          <h2>Map Fleet Fields</h2>

          <p>
            Confirm how your spreadsheet columns
            correspond to the required Form 2290
            fields.
          </p>

          <p>
            <strong>{rows.length}</strong>{" "}
            vehicles detected
          </p>

          <FieldMapper
            headers={headers}
            mapping={mapping}
            onMappingChange={
              handleMappingChange
            }
          />

          {!allRequiredFieldsMapped && (
            <p className="warning">
              Map Unit #, VIN, and Taxable Gross
              Weight before continuing.
            </p>
          )}

          <div className="button-row">
            <button
              className="secondary-button"
              onClick={() => setCurrentStep(1)}
            >
              Back
            </button>

            <button
              disabled={!allRequiredFieldsMapped}
              onClick={() => setCurrentStep(3)}
            >
              Continue to Review
            </button>
          </div>
        </section>
      )}

      {currentStep === 3 && (
        <section className="card">
          <h2>Review Vehicle Data</h2>

          <p>
            Review imported records and resolve
            any issues before generating the
            Form 2290 request.
          </p>

          <VehicleEditor
            vehicles={editedVehicles}
            onVehicleChange={
              handleVehicleChange
            }
          />

          <ValidationResults
            vehicles={validatedVehicles}
          />

          {!allVehiclesValid && (
            <p className="warning">
              Resolve all validation issues
              before continuing.
            </p>
          )}

          <div className="button-row">
            <button
              className="secondary-button"
              onClick={() => setCurrentStep(2)}
            >
              Back
            </button>

            <button
              disabled={!allVehiclesValid}
              onClick={() => setCurrentStep(4)}
            >
              Generate Form 2290
            </button>
          </div>
        </section>
      )}

      {currentStep === 4 && (
        <section className="card">
          <Form2290Preview
            vehicles={validatedVehicles}
          />

          <div className="button-row">
            <button
              className="secondary-button"
              onClick={() => setCurrentStep(3)}
            >
              Back to Review
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default CsvUploader;
