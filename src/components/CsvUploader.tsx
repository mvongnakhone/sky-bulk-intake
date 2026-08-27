import { useState } from "react";
import Papa from "papaparse";

import FieldMapper from "./FieldMapper";

import {
  type FieldMapping,
  type FleetRow,
  type SkyField,
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
          initialMapping[header] = "";
        });

        setMapping(initialMapping);
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
    setMapping((previousMapping) => ({
      ...previousMapping,

      [sourceColumn]: targetField,
    }));
  };

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
        </>
      )}
    </div>
  );
}

export default CsvUploader;