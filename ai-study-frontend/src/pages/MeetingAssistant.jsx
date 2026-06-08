
import Layout from "@/components/Layout";
import { MicOff, FileText } from "lucide-react";
import { useState } from "react";

const MeetingAssistant = () => {
  const [recentMeetings, setRecentMeetings] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // ✅ File Upload Handler (Shared)
  const handleUpload = async (file) => {
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // ✅ Backend API call
      const res = await fetch("http://localhost:5000/api/meeting/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.message || "Upload failed");
        return;
      }

      setRecentMeetings((prev) => [
        {
          id: data.meetingId || Date.now(),
          filename: file.name,
         
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
    } catch (err) {
      console.log(err);
      alert("Something went wrong while uploading");
    } finally {
      setUploading(false);
    }
  };


  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    await handleUpload(file);
  };

  return (
    <Layout>
      <div className="min-h-screen px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Meeting</span> Assistant
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Upload your meeting recording, get automatic transcription and AI
              notes instantly.
            </p>
          </div>

          {/* ✅ Drag & Drop Upload Section */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`glass-card p-10 mb-8 animate-fade-in transition-all duration-300 cursor-pointer ${
              dragActive ? "border-2 border-accent scale-[1.02]" : ""
            }`}
            style={{ animationDelay: "100ms" }}
            onClick={() => document.getElementById("meetingUpload").click()}
          >
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                  dragActive
                    ? "bg-accent/20"
                    : "bg-gradient-to-br from-primary to-accent"
                }`}
              >
                <FileText className="w-10 h-10 text-white" />
              </div>

              <h2 className="mt-6 font-display text-2xl font-bold text-foreground">
                {uploading ? "Uploading & Generating Notes..." : "Drag & Drop Your Recording"}
              </h2>

              <p className="text-muted-foreground mt-2">
                {uploading
                  ? "Please wait... AI is working on your notes."
                  : "Drop your audio/video file here or click to browse"}
              </p>

              <p className="text-xs text-muted-foreground mt-2">
                Supported: MP3, WAV, MP4, M4A
              </p>

              {/* Hidden File Input */}
              <input
                type="file"
                accept="audio/*,video/*"
                id="meetingUpload"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  await handleUpload(file);
                  e.target.value = ""; // reset input
                }}
              />
            </div>
          </div>

          {/* Recent Meetings */}
          <div
            className="mt-8 glass-card p-6 animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            <h3 className="font-display text-xl font-semibold mb-4">
              Recent Meetings
            </h3>

            {recentMeetings.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MicOff className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No meetings uploaded yet</p>
                <p className="text-sm mt-1">
                  Upload a recording to see AI notes here
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentMeetings.map((m) => (
                  <div
                    key={m.id}
                    className="glass-card-glow p-4 rounded-xl"
                  >
                    <p className="font-semibold text-foreground">{m.filename}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(m.createdAt).toLocaleString()}
                    </p>

                    <div className="mt-3">
                      <p className="text-sm font-semibold text-accent">
                        AI Notes
                      </p>
                      <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">
                        {m.notes}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MeetingAssistant;
