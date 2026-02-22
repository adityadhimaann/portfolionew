import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Mic, Copy, Check, Bot, User } from "lucide-react";
import { useSound } from "@/hooks/useSound";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const QUICK_QUESTIONS = [
  "What tech stack do you use?",
  "Are you available for hire?",
  "Show me your best project",
  "What are your rates?",
];

async function streamChat(
  messages: { role: string; content: string }[],
  onDelta: (text: string) => void,
  onDone: () => void,
  onError: (msg: string) => void
) {
  const resp = await fetch(`${SUPABASE_URL}/functions/v1/portfolio-chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!resp.ok || !resp.body) {
    const data = await resp.json().catch(() => ({}));
    onError(data.error || "Failed to connect to AI.");
    return;
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let done = false;

  while (!done) {
    const { done: streamDone, value } = await reader.read();
    if (streamDone) break;
    buffer += decoder.decode(value, { stream: true });

    let newlineIdx: number;
    while ((newlineIdx = buffer.indexOf("\n")) !== -1) {
      let line = buffer.slice(0, newlineIdx);
      buffer = buffer.slice(newlineIdx + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (!line.startsWith("data: ")) continue;
      const json = line.slice(6).trim();
      if (json === "[DONE]") { done = true; break; }
      try {
        const parsed = JSON.parse(json);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) onDelta(content);
      } catch {}
    }
  }

  onDone();
}

const TypingDots = () => (
  <div className="flex items-center gap-1 px-1 py-0.5">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
        transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
      />
    ))}
  </div>
);

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Aditya's AI assistant. Ask me anything about his work, skills, or availability! 👋",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const { click, pop, chatOpen } = useSound();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleOpen = useCallback(() => {
    chatOpen();
    setIsOpen(true);
  }, [chatOpen]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    click();
    const userMsg: Message = { role: "user", content: trimmed, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const history = [...messages, userMsg].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    let buffer = "";
    let started = false;

    await streamChat(
      history,
      (delta) => {
        buffer += delta;
        if (!started) {
          started = true;
          setMessages((prev) => [...prev, { role: "assistant", content: buffer, timestamp: new Date() }]);
        } else {
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { ...updated[updated.length - 1], content: buffer };
            return updated;
          });
        }
        if (!isOpen) setHasUnread(true);
      },
      () => {
        setIsTyping(false);
        pop();
      },
      (err) => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `Sorry, something went wrong: ${err}`, timestamp: new Date() },
        ]);
      }
    );
  }, [messages, isTyping, isOpen, click, pop]);

  const handleVoice = useCallback(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) return;
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.onresult = (e: any) => {
      const t = e.results[0][0].transcript;
      setInput(t);
      setIsListening(false);
      sendMessage(t);
    };
    rec.onend = () => setIsListening(false);
    recognitionRef.current = rec;
    rec.start();
    setIsListening(true);
  }, [isListening, sendMessage]);

  const copyMsg = (content: string, idx: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* Floating Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="relative">
              {/* Pulse rings */}
              <motion.div
                className="absolute inset-0 rounded-full bg-primary"
                animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-primary"
                animate={{ scale: [1, 1.8], opacity: [0.2, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.4 }}
              />
              {/* Unread badge */}
              {hasUnread && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-background z-10"
                />
              )}
              <motion.button
                onClick={handleOpen}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl"
                aria-label="Open AI Chat"
              >
                <Bot size={22} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 flex h-[600px] w-[380px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] flex-col rounded-2xl border border-border overflow-hidden shadow-2xl"
            style={{
              background: "hsl(var(--card))",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/80">
              <div className="flex items-center gap-3">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                  <Bot size={16} className="text-primary" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-500 border border-card" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Aditya's AI Assistant</p>
                  <p className="text-xs text-muted-foreground">Always here to help</p>
                </div>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X size={16} />
              </motion.button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full mt-1 ${
                    msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {msg.role === "user" ? <User size={12} /> : <Bot size={12} />}
                  </div>
                  <div className={`group relative max-w-[78%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                    <div className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-muted text-foreground rounded-tl-sm"
                    }`}>
                      {msg.content}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-muted-foreground">{formatTime(msg.timestamp)}</span>
                      {msg.role === "assistant" && (
                        <motion.button
                          onClick={() => copyMsg(msg.content, i)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          whileTap={{ scale: 0.9 }}
                        >
                          {copiedIdx === i
                            ? <Check size={10} className="text-green-500" />
                            : <Copy size={10} className="text-muted-foreground" />}
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2"
                >
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground mt-1">
                    <Bot size={12} />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-muted px-3.5 py-2.5">
                    <TypingDots />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick Questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {QUICK_QUESTIONS.map((q) => (
                  <motion.button
                    key={q}
                    onClick={() => sendMessage(q)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    {q}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t border-border p-3">
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="w-full rounded-xl border border-border bg-muted px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                  />
                </div>
                <motion.button
                  type="button"
                  onClick={handleVoice}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`rounded-xl p-2.5 transition-colors ${
                    isListening ? "bg-red-500/20 text-red-500" : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Mic size={15} />
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground disabled:opacity-40 transition-opacity"
                >
                  <Send size={14} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
