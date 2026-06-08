import { Trash2, FileAudio, ExternalLink, Play, Pause } from "lucide-react";
import { useState, useRef } from "react";

export default function MeetingNotesList({ meetings = [], loading, onDelete, onOpenChat }) {
  const meetingsArray = Array.isArray(meetings) ? meetings : [];

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center mt-20 gap-4">
        <div className="w-12 h-12 border-4 border-white/20 border-t-accent rounded-full animate-spin" />
        <p className="text-white/60 font-medium animate-pulse">Processing your discussions...</p>
      </div>
    );

  if (meetingsArray.length === 0)
    return (
      <div className="text-center mt-20 p-10 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 max-w-md mx-auto">
        <p className="text-white/40 text-sm font-medium">No meeting recordings found. Transcribe your first meeting to see it here!</p>
      </div>
    );

  return (
    <div className="relative w-full">
      <div className="relative z-20 px-6 py-6 min-h-full">
        <h2 className="text-4xl font-bold text-white text-center drop-shadow-md mb-12 font-display">
          Meeting Notes Vault
        </h2>

        <div className="w-full max-w-6xl mx-auto pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {meetingsArray.map((meeting, index) => (
              <MeetingCard
                key={meeting._id}
                meeting={meeting}
                index={index}
                onDelete={onDelete}
                onOpenChat={onOpenChat}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MeetingCard({ meeting, index, onDelete, onOpenChat }) {
  const [expanded, setExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const rotations = ["rotate-1", "-rotate-1", "rotate-0.5", "-rotate-0.5"];
  const rotateClass = rotations[index % rotations.length];

  const togglePlayback = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const audioUrl = meeting.fileId?.filePath
    ? `http://localhost:5000/${meeting.fileId.filePath.replace(/\\/g, "/")}`
    : null;

  return (
    <div className={`group relative ${rotateClass} hover:rotate-0 transition-all duration-500 ease-out`}>
      {/* ✅ Subtle Shadow Glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-accent/20 to-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />

      {/* ✅ Premium Clean Paper Look */}
      <div className="relative bg-[#faf9f6] rounded-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.3)] border border-black/5 p-8 transition-all duration-300 group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)]">

        {/* ✅ Pin */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
          <div className="w-8 h-8 rounded-full bg-zinc-900 border-2 border-white shadow-lg flex items-center justify-center">
            <div className="w-3.5 h-3.5 rounded-full bg-blue-500 shadow-inner" />
          </div>
        </div>

        <div className="relative z-10 pt-2">
          {/* ✅ Metadata Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <FileAudio className="w-3.5 h-3.5 text-blue-500" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 bg-zinc-100 px-2 py-1 rounded">
                Meeting Transcript
              </span>
            </div>
            <p className="text-[10px] font-medium text-zinc-400">
              {new Date(meeting.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* ✅ Hero Title */}
          <h3 className="text-xl font-bold text-zinc-900 mb-3 leading-tight font-display group-hover:text-accent transition-colors">
            {meeting.title || "Standard Sync-up"}
          </h3>

          {/* ✅ Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(meeting.tags || ["#Meeting", "#Review"]).map((tag, i) => (
              <span key={i} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200">
                {tag}
              </span>
            ))}
          </div>

          {/* ✅ Audio Player */}
          {audioUrl && (
            <div className="mb-6 p-3 bg-zinc-50 rounded-xl border border-zinc-100 flex items-center gap-4">
              <button
                onClick={togglePlayback}
                className="w-10 h-10 rounded-full bg-white shadow-sm border border-zinc-100 flex items-center justify-center text-primary hover:scale-105 transition"
              >
                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
              </button>
              <div className="flex-1">
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter mb-1">Original Recording</div>
                <div className="h-1.5 w-full bg-zinc-200 rounded-full overflow-hidden">
                  <div className={`h-full bg-primary transition-all duration-300 ${isPlaying ? "w-1/2" : "w-0"}`} />
                </div>
              </div>
              <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />
            </div>
          )}

          {/* ✅ Summary Content */}
          <div className={`text-sm text-zinc-700 leading-relaxed transition-all duration-300 ${expanded ? "" : "line-clamp-4"}`}>
            {meeting.notes || "No notes available for this meeting."}
          </div>

          {/* ✅ Action Footer */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-100">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs font-bold text-accent hover:text-accent/80 transition uppercase tracking-wider"
            >
              {expanded ? "Show Less" : "Read Full Summary"}
            </button>

            {/* ✅ Actions */}
            <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <button
                onClick={() => onOpenChat(meeting)}
                className="p-2 rounded-full bg-zinc-100 text-zinc-600 hover:bg-accent hover:text-white transition shadow-sm" title="Chat with Meeting">
                <ExternalLink size={16} />
              </button>
              <button
                onClick={() => onDelete(meeting._id)}
                className="p-2 rounded-full bg-zinc-100 text-red-500 hover:bg-red-500 hover:text-white transition shadow-sm"
                title="Delete Recording"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
