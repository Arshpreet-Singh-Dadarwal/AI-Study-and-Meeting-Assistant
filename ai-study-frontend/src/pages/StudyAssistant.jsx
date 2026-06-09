import Layout from "@/components/Layout";
import FileUploadZone from "@/components/FileUploadZone";
import FeatureCard from "@/components/FeatureCard";
import { List, FileText, Zap, HelpCircle, User } from "lucide-react";
import { use, useState } from "react";
import API from "@/api/api";
import { useNavigate } from "react-router-dom";

const StudyAssistant = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasFiles, setHasFiles] = useState(false);
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState(null);
  const navigate=useNavigate();

  // Called from FileUploadZone
  const handleFileSelect = (files) => {
    if (files && files.length > 0) {
      setHasFiles(true);
      setFile(files[0]);
    } else {
      setHasFiles(false);
      setFile(null);
    }
  };


const handleGenerate = async () => {
  if (!file) return;

  setIsProcessing(true);

  try {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("User Info:", user);

    if (!user?.id) {
      alert("Please login again!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", user.id); 

    // 1️⃣ Upload
    const uploadRes = await API.post("api/files/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const uploadedFileId = uploadRes.data.fileId;

    // 2️⃣ AI summarize
    await API.post("api/ai/summarize", { fileId: uploadedFileId, type: "pdf" });

    navigate("/dashboard");
  } catch (err) {
    const message =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Something went wrong";
    console.error("Study Assistant Error:", err.response?.data || err.message);
    alert(`Failed to generate summary: ${message}`);
  } finally {
    setIsProcessing(false);
  }
};




  return (
    <Layout>
      <div className="min-h-screen px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">AI Study</span> Assistant
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Upload your study materials and let AI create comprehensive
              summaries, key points, and practice questions.
            </p>
          </div>

          {/* Main Card */}
          <div
            className="glass-card p-8 mb-8 animate-fade-in"
            style={{ animationDelay: "100ms" }}
          >
            {/* Upload Zone */}
            <FileUploadZone onFileSelect={handleFileSelect} />

            {/* Generate Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleGenerate}
                disabled={!hasFiles || isProcessing}
                className={`cosmic-button text-lg px-10 py-4 ${
                  !hasFiles || isProcessing
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Generate AI Summary"
                )}
              </button>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div
            className="grid md:grid-cols-2 gap-4 animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            <FeatureCard
              icon={List}
              title="Key Points"
              description="Important highlights summarized for quick review and understanding."
              delay={0}
            />
            <FeatureCard
              icon={FileText}
              title="Detailed Analysis"
              description="In-depth insights generated from your study materials."
              delay={100}
            />
            <FeatureCard
              icon={Zap}
              title="Quick Overview"
              description="Brief summary provided for efficient studying and revision."
              delay={200}
            />
            <FeatureCard
              icon={HelpCircle}
              title="Study Questions"
              description="Practice questions created to test your knowledge."
              delay={300}
            />
          </div>

          {/* Tips Section */}
          <div
            className="mt-12 glass-card p-6 animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            <h3 className="font-display font-semibold text-lg mb-4 gradient-text">
              Pro Tips
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  Upload lecture recordings for automatic transcription and
                  summaries
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  Combine multiple documents for comprehensive study guides
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  Use generated questions to test your understanding before
                  exams
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudyAssistant;
