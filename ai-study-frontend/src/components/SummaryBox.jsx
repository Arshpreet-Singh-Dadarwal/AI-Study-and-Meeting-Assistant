import { useState } from "react";
import API from "../api/api";
import { Sparkles } from "lucide-react";

export default function SummaryBox({ fileId, setSummary, refreshNotes }) {
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    if (!fileId) return;

    setLoading(true);
    setSummary("");

    try {
      const res = await API.post("/ai/summarize", { fileId, type: "pdf" });
      setSummary(res.data.summary);
      refreshNotes();
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Something went wrong";
      alert(`Failed to generate summary: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={generateSummary}
        disabled={!fileId || loading}
        className="relative w-full py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 font-bold text-lg shadow-xl shadow-purple-500/30 transition disabled:opacity-40"
      >
        <Sparkles className="inline w-5 h-5 mr-2" />
        {loading ? "AI is thinking..." : "Generate AI Summary"}
      </button>
    </div>
  );
}
