# Sky Bulk Intake

Trucking customers keep their fleet in a spreadsheet. Every filing season someone has to re-key that data into a Form 2290 submission (Heavy Vehicle Use Tax). Different customer, different column names, same tedious job. This tool takes their CSV, figures out what maps to what, catches bad data, and previews the Form 2290.

## Try it

```bash
npm install
npm run dev
```

Sample CSVs live in `sample-data/`:
- `fleet.csv` is the clean baseline
- `fleet-alternate.csv` has different column names to exercise the auto-mapper
- `fleet-with-error.csv` has one bad VIN to exercise the inline editor

## Flow

Upload, map columns, review and fix, preview. Each step gates the next.

Along the way the app auto-suggests mappings from a curated alias list (the user can always override), normalizes each vehicle (uppercases VIN, strips `$` and commas), validates it (17-char VIN with no `I`/`O`/`Q`, no duplicates, at least 55,000 lb), and converts weight to its IRS 2290 category (A through V) with the annual tax price. Everything recomputes on each keystroke, so fixing a bad VIN flips the row to valid immediately.

## Stack

React 19, TypeScript, Vite, Papaparse, plain CSS. Client-side only.

## Decisions worth calling out

Auto-mapping uses an alias table instead of an LLM. It's fast, testable, and free. An LLM fallback would only earn its cost on exotic column names the aliases don't recognize.

There are two shapes: `FleetRow` (whatever the customer sent) and `VehicleRecord` (Sky's canonical form). One validator handles every customer format because everything downstream runs on the normalized shape.

When a row fails validation the user fixes it in place. Rejecting the whole CSV and forcing a re-upload for a single VIN typo would be miserable.

## Not in v1

Actual IRS submission would live in Sky's existing infrastructure. 
