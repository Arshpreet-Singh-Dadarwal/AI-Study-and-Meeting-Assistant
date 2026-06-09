import { useEffect, useState } from "react";
import NotesList from "../components/NotesList";
import MeetingNotesList from "../components/MeetingNotesList";
import ChatSidebar from "../components/ChatSidebar";
import FlashcardModal from "../components/FlashcardModal";
import API from "../api/api";
import woddenimg from "../assets/download.jpeg";
import { useNavigate } from "react-router-dom";
import { Brain, Video, Sparkles } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pdf");

  const [notes, setNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(true);

  const [meetings, setMeetings] = useState([]);
  const [loadingMeetings, setLoadingMeetings] = useState(true);

  // Advanced Features State
  const [chatOpen, setChatOpen] = useState(false);
  const [flashcardOpen, setFlashcardOpen] = useState(false);
  const [activeNote, setActiveNote] = useState(null);

  const fetchNotes = async () => {
    try {
      const res = await API.get("api/notes/my");
      setNotes(res.data.notes || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingNotes(false);
    }
  };

  const fetchMeetings = async () => {
    try {
      const res = await API.get("api/meetingNotes/my");
      setMeetings(res.data.notes || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMeetings(false);
    }
  };

  const deleteNote = async (id) => {
    try {
      await API.delete(`api/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMeeting = async (id) => {
    try {
      await API.delete(`api/meetingNotes/${id}`);
      setMeetings((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenChat = (note) => {
    setActiveNote({
      text: note.summary || note.notes,
      title: note.title
    });
    setChatOpen(true);
  };

  const handleOpenFlashcards = (note) => {
    setActiveNote({
      text: note.summary || note.notes,
      title: note.title
    });
    setFlashcardOpen(true);
  };

  useEffect(() => {
    fetchNotes();
    fetchMeetings();
  }, []);

  return (
    <div className="relative min-h-screen overflow-auto">
      {/* ✅ Background */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-10 pointer-events-none"
        style={{ backgroundImage: `url(${woddenimg})` }}
      />
      <div className="fixed inset-0 bg-black/45 -z-10 pointer-events-none" />
      <div className="fixed inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.8)] -z-10 pointer-events-none" />

      {/* ✅ Dashboard Header Section */}
      <div className="relative z-50 pt-10 pb-6 px-4 flex flex-col items-center gap-10">

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-4xl">
          <button
            onClick={() => navigate("/study")}
            className="w-full sm:flex-1 bg-white/5 backdrop-blur-2xl border border-white/10 p-5 rounded-[2rem] flex items-center gap-4 text-white hover:bg-white/10 transition-all hover:scale-[1.02] shadow-2xl group border-b-4 border-b-primary/30"
          >
            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-all duration-500 shadow-lg">
              <Brain size={24} className="text-primary group-hover:text-white" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">AI Assistant</p>
              <p className="font-bold text-base tracking-tight">Study Mode</p>
            </div>
          </button>

          <button
            onClick={() => navigate("/meeting")}
            className="w-full sm:flex-1 bg-white/5 backdrop-blur-2xl border border-white/10 p-5 rounded-[2rem] flex items-center gap-4 text-white hover:bg-white/10 transition-all hover:scale-[1.02] shadow-2xl group border-b-4 border-b-indigo-500/30"
          >
            <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center group-hover:bg-indigo-500 transition-all duration-500 shadow-lg">
              <Video size={24} className="text-indigo-400 group-hover:text-white" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">Meeting Bot</p>
              <p className="font-bold text-base tracking-tight">Meeting Mode</p>
            </div>
          </button>
        </div>

        {/* View Switcher Tabs */}
        <div className="bg-black/20 backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl flex gap-1 shadow-inner">
          <button
            onClick={() => setActiveTab("pdf")}
            className={`px-10 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-500 ${activeTab === "pdf"
              ? "bg-white text-zinc-900 shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105"
              : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
          >
            Study Notes
          </button>

          <button
            onClick={() => setActiveTab("meeting")}
            className={`px-10 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-500 ${activeTab === "meeting"
              ? "bg-white text-zinc-900 shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105"
              : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
          >
            Meeting Cards
          </button>
        </div>
      </div>

      {/* ✅ AI Feature Modals */}
      {activeNote && (
        <>
          <ChatSidebar
            isOpen={chatOpen}
            onClose={() => setChatOpen(false)}
            noteText={activeNote.text}
            noteTitle={activeNote.title}
          />
          <FlashcardModal
            isOpen={flashcardOpen}
            onClose={() => setFlashcardOpen(false)}
            noteText={activeNote.text}
            noteTitle={activeNote.title}
          />
        </>
      )}

      {/* ✅ Content Grid */}
      <div className="w-full max-w-7xl mx-auto relative z-40">
        {activeTab === "pdf" ? (
          <NotesList
            notes={notes}
            loading={loadingNotes}
            onDelete={deleteNote}
            onOpenChat={handleOpenChat}
            onOpenFlashcards={handleOpenFlashcards}
          />
        ) : (
          <MeetingNotesList
            meetings={meetings}
            loading={loadingMeetings}
            onDelete={deleteMeeting}
            onOpenChat={handleOpenChat}
          />
        )}
      </div>
    </div>
  );
}
