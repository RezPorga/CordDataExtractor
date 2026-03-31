export default function UploadBox({ onUpload }: any) {
  return (
    <div className="bg-white p-4 rounded shadow text-blue-500">
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            onUpload(file);
          }
        }}
        className="border border-blue-500 rounded px-2 py-2"
      />
    </div>
  );
}