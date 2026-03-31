export default function DataView({ data }: any) {
  return (
    <div className="bg-white p-4 rounded shadow text-gray-900">
      <h3>Extracted Data</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}