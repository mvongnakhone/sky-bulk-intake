import Papa from "papaparse";

type FleetRow = Record<string, string>;

function CsvUploader() {
  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    Papa.parse<FleetRow>(file, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        console.log("Parsed CSV:", results.data);
        console.log("Headers:", results.meta.fields);
      },

      error: (error) => {
        console.error("CSV parsing failed:", error);
      },
    });
  };

  return (
    <div>
      <h2>Upload Fleet Data</h2>

      <p>Select a CSV file containing your vehicle records.</p>

      <input
        type="file"
        accept=".csv,text/csv"
        onChange={handleFileUpload}
      />
    </div>
  );
}

export default CsvUploader;