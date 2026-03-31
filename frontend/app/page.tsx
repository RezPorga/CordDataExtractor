"use client";

import { useState } from "react";
import UploadBox from "../components/UploadBox";
import DataView from "../components/DataView";
import ChatBox from "../components/ChatBox";

export default function Home() {
  const [data, setData] = useState<any>(null);

  const handleUpload = async (file: File) => {
  try {
    console.log("Uploading:", file);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://127.0.0.1:8000/extract", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const result = await res.json();
    console.log("Response:", result);

    setData(result);
  } catch (err) {
    console.error("UPLOAD FAILED:", err);
  }
};

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Document AI</h1>

      <UploadBox onUpload={handleUpload} />

      {data && <DataView data={data} />}

      {data && <ChatBox />}
    </div>
  );
}