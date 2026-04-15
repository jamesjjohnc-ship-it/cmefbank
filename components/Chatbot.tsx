"use client";

import { useState } from "react";
import { MessageCircle, X, Send, User, Bot } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hello! We are here to help. How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    
    // Simple bot simulation
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "bot", 
        content: "Thank you for your message. A customer representative will be with you shortly." 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-5">
           {/* Header */}
           <div className="bg-[#003366] p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-[#003366]" />
                 </div>
                 <div>
                    <h3 className="text-white font-bold text-sm">Pinnacle Support</h3>
                    <div className="flex items-center gap-1.5">
                       <span className="w-2 h-2 rounded-full bg-green-400"></span>
                       <span className="text-blue-100 text-[10px] font-medium uppercase tracking-wider">Online</span>
                    </div>
                 </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/10 p-1 rounded-lg"
              >
                 <X className="w-5 h-5" />
              </button>
           </div>

           {/* Messages */}
           <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                   <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                     msg.role === "user" 
                     ? "bg-[#003366] text-white rounded-tr-none" 
                     : "bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-none"
                   }`}>
                      {msg.content}
                   </div>
                </div>
              ))}
           </div>

           {/* Input */}
           <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex gap-2">
                 <input 
                   type="text" 
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   onKeyPress={(e) => e.key === "Enter" && handleSend()}
                   placeholder="Type a message..."
                   className="flex-grow text-sm border-none focus:ring-0 text-gray-700"
                 />
                 <button 
                    onClick={handleSend}
                    className="p-2 text-[#003366] hover:bg-blue-50 rounded-xl transition-colors"
                 >
                    <Send className="w-5 h-5" />
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <div className="group relative">
           {/* Tooltip */}
           <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-xl shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              <span className="text-[#003366] font-bold text-sm">We Are Here! 👋</span>
           </div>
           
           <button 
             onClick={() => setIsOpen(true)}
             className="w-16 h-16 bg-[#003366] rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-95 transition-all"
           >
              <MessageCircle className="w-8 h-8" />
           </button>
        </div>
      )}
    </div>
  );
}
