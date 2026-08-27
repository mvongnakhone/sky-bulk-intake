import "./App.css";
import CsvUploader from "./components/CsvUploader";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Sky Bulk Intake</h1>

        <p>
          Import and validate fleet records
          for Form 2290 filing requests.
        </p>
      </header>

      <CsvUploader />
    </div>
  );
}

export default App;
