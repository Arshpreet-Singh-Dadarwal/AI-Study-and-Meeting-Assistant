import { useState } from "react";
import API from "../api/api";
import { UploadCloud } from "lucide-react";

export default function FileUpload({ setFileId }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const res = await API.post("/files/upload", formData);
      setFileId(res.data.fileId);
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="flex flex-col items-center justify-center h-44 border-2 border-dashed border-white/20 rounded-2xl bg-white/5 hover:bg-white/10 transition cursor-pointer">
        <UploadCloud className="w-9 h-9 text-purple-400 mb-2" />
        <p className="text-gray-300 text-sm">
          {file ? file.name : "Drag & drop your file here or click to upload"}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          PDF, DOCX, Audio supported
        </p>
        <input
          type="file"
          hidden
          onChange={(e) => setFile(e.target.files[0])}
        />
      </label>

      <button
        onClick={uploadFile}
        disabled={!file || uploading}
        className="w-full mt-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-semibold disabled:opacity-40"
      >
        {uploading ? "Uploading..." : "Confirm Upload"}
      </button>
    </div>
  );
}
