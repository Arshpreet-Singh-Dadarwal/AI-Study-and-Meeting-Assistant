import { Trash2, ExternalLink, BrainCircuit } from "lucide-react";
import { useState } from "react";

export default function NotesList({ notes = [], loading, onDelete, onOpenChat, onOpenFlashcards }) {
  const notesArray = Array.isArray(notes) ? notes : [];

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center mt-20 gap-4">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        <p className="text-white/60 font-medium animate-pulse">Retrieving your insights...</p>
      </div>
    );

  if (notesArray.length === 0)
    return (
      <div className="text-center mt-20 p-10 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 max-w-md mx-auto">
        <p className="text-white/40 text-sm font-medium">Your knowledge vault is empty. Upload a PDF to start learning!</p>
      </div>
    );

  return (
    <div className="relative w-full">
      <div className="relative z-20 px-6 py-6 min-h-full">
        <h2 className="text-4xl font-bold text-white text-center drop-shadow-md mb-12 font-display">
          Your Knowledge Vault
        </h2>

        <div className="w-full max-w-6xl mx-auto pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            {notesArray.map((note, index) => (
              <PinnedPaper
                key={note._id}
                note={note}
                index={index}
                onDelete={onDelete}
                onOpenChat={onOpenChat}
                onOpenFlashcards={onOpenFlashcards}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PinnedPaper({ note, index, onDelete, onOpenChat, onOpenFlashcards }) {
  const [expanded, setExpanded] = useState(false);
  const rotations = ["-rotate-1", "rotate-1", "-rotate-0.5", "rotate-0.5"];
  const rotateClass = rotations[index % rotations.length];

  return (
    <div className={`group relative ${rotateClass} hover:rotate-0 transition-all duration-500 ease-out`}>
      {/* ✅ Subtle Shadow Glow on Hover */}
      <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />

      {/* ✅ Premium Clean Paper Look */}
      <div className="relative bg-[#faf9f6] rounded-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.3)] border border-black/5 p-8 transition-all duration-300 group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)]">

        {/* ✅ Pin with Glow */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
          <div className="w-8 h-8 rounded-full bg-zinc-900 border-2 border-white shadow-lg flex items-center justify-center">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-inner animate-pulse" />
          </div>
        </div>

        <div className="relative z-10 pt-2">
          {/* ✅ Metadata Header (De-emphasized) */}
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 bg-zinc-100 px-2 py-1 rounded">
              Note Archive
            </span>
            <p className="text-[10px] font-medium text-zinc-400">
              {new Date(note.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* ✅ Hero Title */}
          <h3 className="text-xl font-bold text-zinc-900 mb-3 leading-tight font-display group-hover:text-primary transition-colors">
            {note.title || "Untitled Intelligence"}
          </h3>

          {/* ✅ Colored Tag Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(note.tags || ["#AI", "#Study"]).map((tag, i) => (
              <span key={i} className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${i % 3 === 0 ? "bg-blue-50 text-blue-600 border-blue-100" :
                  i % 3 === 1 ? "bg-purple-50 text-purple-600 border-purple-100" :
                    "bg-emerald-50 text-emerald-600 border-emerald-100"
                }`}>
                {tag}
              </span>
            ))}
          </div>

          {/* ✅ Content with Truncation */}
          <div className={`text-sm text-zinc-700 leading-relaxed transition-all duration-300 ${expanded ? "" : "line-clamp-4"}`}>
            {note.summary}
          </div>

          {/* ✅ Action Footer */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-100">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs font-bold text-primary hover:text-primary/80 transition uppercase tracking-wider"
            >
              {expanded ? "Show Less" : "Read Full Summary"}
            </button>

            {/* ✅ Actions (Visible on Hover) */}
            <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <button
                onClick={() => onOpenFlashcards(note)}
                className="p-2 rounded-full bg-zinc-100 text-zinc-600 hover:bg-primary hover:text-white transition shadow-sm" title="Flashcard Mode">
                <BrainCircuit size={16} />
              </button>
              <button
                onClick={() => onOpenChat(note)}
                className="p-2 rounded-full bg-zinc-100 text-zinc-600 hover:bg-accent hover:text-white transition shadow-sm" title="Chat with Note">
                <ExternalLink size={16} />
              </button>
              <button
                onClick={() => onDelete(note._id)}
                className="p-2 rounded-full bg-zinc-100 text-red-500 hover:bg-red-500 hover:text-white transition shadow-sm"
                title="Delete Note"
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
