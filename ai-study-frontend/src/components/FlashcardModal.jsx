import { X, ChevronLeft, ChevronRight, RotateCcw, BrainCircuit, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function FlashcardModal({ isOpen, onClose, noteText, noteTitle }) {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen && noteText) {
            generateCards();
        }
    }, [isOpen, noteText]);

    const generateCards = async () => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8000/generate-flashcards", {
                text: noteText,
            });
            setFlashcards(response.data.flashcards || []);
            setCurrentIndex(0);
            setIsFlipped(false);
        } catch (err) {
            console.error("Flashcard generation failed", err);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

            <div className="relative bg-[#faf9f6] w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[650px] border border-white/20">
                {/* Header */}
                <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-white/50 backdrop-blur-sm shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shadow-inner">
                            <BrainCircuit className="text-primary" size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-zinc-900 leading-tight font-display">Study Quiz</h2>
                            <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold truncate max-w-[200px]">
                                {noteTitle || "Active Document"}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-100 transition text-zinc-400 hover:text-zinc-600">
                        <X size={24} />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col p-8 overflow-hidden relative">
                    {loading ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                            <div className="relative w-20 h-20 mb-6">
                                <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                                <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                                <BrainCircuit className="absolute inset-0 m-auto text-primary animate-pulse" size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-zinc-800 mb-1">Analyzing notes...</h3>
                            <p className="text-zinc-400 text-xs italic">Groq AI is preparing your cards</p>
                        </div>
                    ) : flashcards.length > 0 ? (
                        <div className="w-full h-full flex flex-col">
                            {/* Progress */}
                            <div className="flex justify-between items-center mb-6 shrink-0">
                                <span className="text-sm font-bold text-zinc-900">
                                    Card {currentIndex + 1} <span className="text-zinc-300 font-medium">/ 5</span>
                                </span>
                                <div className="flex gap-1.5">
                                    {flashcards.map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-1.5 rounded-full transition-all duration-500 ${i <= currentIndex ? "w-6 bg-primary" : "w-1.5 bg-zinc-200"}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Main Card Section */}
                            <div
                                className="perspective-1000 w-full flex-1 cursor-pointer group/card mb-6"
                                onClick={() => setIsFlipped(!isFlipped)}
                            >
                                <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}>

                                    {/* Front Side (Question) */}
                                    <div className="absolute inset-0 backface-hidden bg-white rounded-[2rem] border-2 border-zinc-50 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.1)] flex flex-col p-8 text-center group-hover/card:shadow-[0_25px_50px_-20px_rgba(0,0,0,0.15)] transition-shadow overflow-hidden">
                                        <div className="w-8 h-8 bg-primary/5 rounded-full flex items-center justify-center shrink-0 mb-2">
                                            <span className="text-[10px] font-black text-primary">Q</span>
                                        </div>

                                        <div className="w-full flex-1 overflow-y-auto custom-scrollbar px-2 flex flex-col">
                                            <div className="my-auto py-4">
                                                <p className={`font-bold text-zinc-900 leading-snug ${flashcards[currentIndex].question.length > 70 ? "text-lg" : "text-2xl"}`}>
                                                    {flashcards[currentIndex].question}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-zinc-50 flex flex-col items-center gap-1 shrink-0">
                                            <RotateCcw size={12} className="text-zinc-300" />
                                            <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Flip to reveal</p>
                                        </div>
                                    </div>

                                    {/* Back Side (Answer) */}
                                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-primary rounded-[2rem] border-4 border-white shadow-2xl flex flex-col p-8 text-center overflow-hidden">
                                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0 mb-2">
                                            <span className="text-[10px] font-black text-white">A</span>
                                        </div>

                                        <div className="w-full flex-1 overflow-y-auto custom-scrollbar px-2 flex flex-col text-white">
                                            <div className="my-auto py-4">
                                                <p className={`font-bold leading-relaxed ${flashcards[currentIndex].answer.length > 80 ? "text-base" : "text-xl"}`}>
                                                    {flashcards[currentIndex].answer}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-white/10 shrink-0">
                                            <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Flip back</p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Control Bar */}
                            <div className="flex items-center justify-between shrink-0">
                                <button
                                    onClick={(e) => { e.stopPropagation(); if (currentIndex > 0) { setCurrentIndex(currentIndex - 1); setIsFlipped(false); } }}
                                    disabled={currentIndex === 0}
                                    className="p-4 rounded-xl bg-white border border-zinc-100 shadow-sm text-zinc-400 hover:text-primary transition-all disabled:opacity-30"
                                >
                                    <ChevronLeft size={24} />
                                </button>

                                <button
                                    onClick={(e) => { e.stopPropagation(); generateCards(); }}
                                    className="px-6 py-3.5 rounded-xl bg-zinc-900 text-white font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-primary transition-all shadow-lg"
                                >
                                    <RotateCcw size={14} /> New Quiz
                                </button>

                                <button
                                    onClick={(e) => { e.stopPropagation(); if (currentIndex < flashcards.length - 1) { setCurrentIndex(currentIndex + 1); setIsFlipped(false); } }}
                                    disabled={currentIndex === flashcards.length - 1}
                                    className="p-4 rounded-xl bg-white border border-zinc-100 shadow-sm text-zinc-400 hover:text-primary transition-all disabled:opacity-30"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                            <h3 className="text-lg font-bold text-zinc-800 mb-2">Quiz Failed</h3>
                            <p className="text-zinc-400 text-xs mb-6 max-w-xs">We couldn't generate cards for this note.</p>
                            <button onClick={generateCards} className="px-8 py-3 rounded-xl bg-zinc-900 text-white font-bold text-xs uppercase tracking-widest">Try Again</button>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .perspective-1000 { perspective: 1000px; }
                .preserve-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
                .custom-scrollbar::-webkit-scrollbar { width: 3px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.05); border-radius: 10px; }
            `}</style>
        </div>
    );
}
