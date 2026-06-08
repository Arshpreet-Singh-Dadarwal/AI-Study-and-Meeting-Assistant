import { X, Send, User, Bot, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function ChatSidebar({ isOpen, onClose, noteText, noteTitle }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    // ✅ Reset history when changing notes
    useEffect(() => {
        setMessages([]);
    }, [noteText]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:8000/chat-with-note", {
                text: noteText,
                question: input,
            });

            const aiMessage = {
                role: "assistant",
                content: response.data.response || response.data.error || "Sorry, I couldn't process that."
            };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Error: Could not connect to the AI service." }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white shadow-2xl z-[100] transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                } border-l border-zinc-200 flex flex-col`}
        >
            {/* Header */}
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-[#faf9f6]">
                <div>
                    <h2 className="text-xl font-bold text-zinc-900 leading-tight">Chat with Note</h2>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold mt-1 truncate max-w-[200px]">
                        {noteTitle || "Active Document"}
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-zinc-200 transition text-zinc-500"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Messages */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 bg-zinc-50/50"
            >
                {messages.length === 0 && (
                    <div className="text-center py-10 px-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Bot className="text-primary" size={24} />
                        </div>
                        <p className="text-zinc-500 text-sm">Ask anything about this document! I can help you find specific details, calculate budgets, or explain complex concepts.</p>
                    </div>
                )}

                {messages.map((m, i) => (
                    <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${m.role === "user" ? "bg-primary text-white" : "bg-white text-zinc-600 border border-zinc-100"
                            }`}>
                            {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
                        </div>
                        <div className={`max-w-[80%] p-4 rounded-2xl text-sm shadow-sm ${m.role === "user"
                            ? "bg-primary text-white rounded-tr-none"
                            : "bg-white text-zinc-700 border border-zinc-100 rounded-tl-none"
                            }`}>
                            {m.content}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-white text-zinc-600 border border-zinc-100 flex items-center justify-center shrink-0">
                            <Loader2 size={14} className="animate-spin text-primary" />
                        </div>
                        <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-zinc-100 shadow-sm">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-zinc-100 bg-[#faf9f6]">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Ask a question..."
                        className="w-full bg-white text-zinc-900 border border-zinc-200 rounded-2xl pl-5 pr-14 py-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition outline-none shadow-sm"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || loading}
                        className="absolute right-2 p-2.5 rounded-xl bg-primary text-white hover:bg-primary/90 transition shadow-lg disabled:bg-zinc-300 disabled:shadow-none"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
