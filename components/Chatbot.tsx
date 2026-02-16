"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatbotProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Message {
    id: number;
    text: string;
    sender: "bot" | "user";
}

export default function Chatbot({ isOpen, onClose }: ChatbotProps) {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Welcome to the GT-R Experience.", sender: "bot" },
        { id: 2, text: "I am your virtual concierge. How can I assist you with your inquiry today?", sender: "bot" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = { id: Date.now(), text: inputValue, sender: "user" };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        // Simulate bot response
        setTimeout(() => {
            const botResponses = [
                "Excellent choice. The GT-R is a masterpiece of engineering.",
                "I have noted your interest. A Nismo specialist will contact you shortly.",
                "Would you like to schedule a private viewing?",
                "The 2024 model features refined aerodynamics and increased downforce."
            ];
            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

            const botMsg: Message = { id: Date.now() + 1, text: randomResponse, sender: "bot" };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSend();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-6 right-6 z-50 w-full max-w-sm bg-neutral-900 border border-white/20 shadow-2xl overflow-hidden rounded-lg flex flex-col font-rajdhani"
                >
                    {/* Header */}
                    <div className="bg-black p-4 flex justify-between items-center border-b border-gt-r-red/50">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-gt-r-red animate-pulse" />
                            <span className="font-orbitron font-bold text-white tracking-widest">NISSAN CONCIERGE</span>
                        </div>
                        <button onClick={onClose} className="text-neutral-400 hover:text-white transition-colors">
                            &#10005;
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 h-80 overflow-y-auto p-4 flex flex-col gap-4 bg-neutral-900/95 backdrop-blur-md">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`max-w-[80%] p-3 rounded-md text-sm leading-relaxed ${msg.sender === "user"
                                        ? "self-end bg-gt-r-red text-white rounded-br-none"
                                        : "self-start bg-neutral-800 text-neutral-200 border border-white/10 rounded-bl-none"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="self-start bg-neutral-800 p-3 rounded-md border border-white/10 rounded-bl-none">
                                <span className="flex gap-1">
                                    <span className="w-1 h-1 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                    <span className="w-1 h-1 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                    <span className="w-1 h-1 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                </span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-black border-t border-white/10 flex gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your inquiry..."
                            className="flex-1 bg-neutral-800 border border-white/10 text-white px-4 py-2 text-sm focus:outline-none focus:border-gt-r-red transition-colors placeholder:text-neutral-600"
                        />
                        <button
                            onClick={handleSend}
                            className="bg-white text-black px-4 py-2 font-bold hover:bg-gt-r-red hover:text-white transition-colors text-xs tracking-widest"
                        >
                            SEND
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
