"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, X, Send, User, Bot, Mail, Phone, HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", content: "Welcome to CMEF Private Banking Support. How may we assist with your institutional needs today?" }
  ]);
  const [input, setInput] = useState("");
  const [showBadge, setShowBadge] = useState(true);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    
    // Simple bot simulation
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "bot", 
        content: "Thank you for your inquiry. A senior representative has been notified and will respond via your secure portal shortly." 
      }]);
    }, 1200);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowBadge(false);
  };

  return (
    <motion.div 
      drag
      dragMomentum={false}
      className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-[100] flex flex-col items-end group cursor-grab active:cursor-grabbing"
    >
      
      {/* Floating Satellites (Show on hover when chat is closed) */}
      {!isOpen && (
        <div className="absolute bottom-full right-0 pb-6 flex flex-col items-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
          {/* Email Satellite */}
          <div className="flex items-center gap-3">
             <span className="bg-white px-3 py-1.5 rounded-none border border-gray-100 shadow-sm text-[10px] font-bold uppercase tracking-widest text-[#B91C1C]">Email Us</span>
             <a href="mailto:support@cmefbank.com" className="w-12 h-12 bg-white rounded-none border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#B91C1C] hover:border-[#B91C1C] shadow-lg transition-all hover:-translate-y-1">
               <Mail className="w-5 h-5" />
             </a>
          </div>
          
          {/* FAQ Satellite */}
          <div className="flex items-center gap-3">
             <span className="bg-white px-3 py-1.5 rounded-none border border-gray-100 shadow-sm text-[10px] font-bold uppercase tracking-widest text-gray-500">FAQ Center</span>
             <button className="w-12 h-12 bg-white rounded-none border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#B91C1C] hover:border-[#B91C1C] shadow-lg transition-all hover:-translate-y-1">
               <HelpCircle className="w-5 h-5" />
             </button>
          </div>

          {/* Call Satellite */}
          <div className="flex items-center gap-3">
             <span className="bg-white px-3 py-1.5 rounded-none border border-gray-100 shadow-sm text-[10px] font-bold uppercase tracking-widest text-gray-500">Priority Call</span>
             <button className="w-12 h-12 bg-white rounded-none border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#B91C1C] hover:border-[#B91C1C] shadow-lg transition-all hover:-translate-y-1">
               <Phone className="w-5 h-5" />
             </button>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[320px] sm:w-[380px] bg-white rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
           {/* Header */}
           <div className="bg-[#B91C1C] p-6 flex justify-between items-center relative overflow-hidden">
              {/* Subtle texture overlay */}
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
              
              <div className="flex items-center gap-4 relative z-10">
                 <div className="w-10 h-10 rounded-none bg-white flex items-center justify-center shadow-sm">
                    <Bot className="w-6 h-6 text-[#B91C1C]" />
                 </div>
                 <div>
                    <h3 className="text-white font-black text-sm uppercase tracking-[0.15em]">CMEF Private</h3>
                    <div className="flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                       <span className="text-white/80 text-[10px] font-bold uppercase tracking-wider">Institutional Support</span>
                    </div>
                 </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-black/10 p-2 rounded-none transition-colors relative z-10"
              >
                 <X className="w-5 h-5" />
              </button>
           </div>

           {/* Messages */}
           <div className="h-96 overflow-y-auto p-6 space-y-6 bg-white">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                   <div className={`max-w-[85%] p-4 text-xs font-medium leading-relaxed ${
                     msg.role === "user" 
                     ? "bg-gray-50 text-gray-900 border-r-2 border-[#B91C1C]" 
                     : "bg-white text-gray-600 border border-gray-100 shadow-sm"
                   }`}>
                      {msg.content}
                   </div>
                </div>
              ))}
           </div>

           {/* Input Area */}
           <div className="p-4 bg-gray-50/50 border-t border-gray-100">
              <div className="flex gap-2 bg-white border border-gray-200 focus-within:border-[#B91C1C] transition-colors overflow-hidden">
                 <input 
                   type="text" 
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   onKeyPress={(e) => e.key === "Enter" && handleSend()}
                   placeholder="Your Inquiry..."
                   className="flex-grow text-xs px-4 py-3 border-none focus:outline-none text-gray-800 placeholder:text-gray-400 uppercase font-bold tracking-widest"
                 />
                 <button 
                    onClick={handleSend}
                    className="px-4 text-[#B91C1C] hover:bg-red-50 transition-colors border-l border-gray-100"
                 >
                    <Send className="w-4 h-4" />
                 </button>
              </div>
              <div className="mt-3 text-center">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">Secure Institutional Line</span>
              </div>
           </div>
        </div>
      )}

      {/* Floating Main Button */}
      {!isOpen && (
        <div className="relative">
           {/* Notification Badge */}
           {showBadge && (
             <span className="absolute -top-1 -right-1 w-6 h-6 bg-white border-2 border-[#B91C1C] text-[#B91C1C] text-[10px] font-black rounded-full flex items-center justify-center z-10 animate-bounce">
               1
             </span>
           )}
           
           {/* Pulse Effect Rings */}
           <div className="absolute inset-0 rounded-full bg-[#B91C1C] opacity-20 animate-ping"></div>
           
           <button 
             onClick={toggleChat}
             className="relative w-16 h-16 sm:w-20 sm:h-20 bg-[#B91C1C] rounded-none flex items-center justify-center text-white shadow-[0_10px_40px_rgba(185,28,28,0.4)] hover:shadow-[0_15px_50px_rgba(185,28,28,0.6)] hover:-translate-y-1 active:scale-95 transition-all duration-500 z-[5]"
           >
              <div className="group-hover:hidden animate-in fade-in zoom-in duration-300">
                <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <div className="hidden group-hover:block animate-in fade-in spin-in-12 duration-500">
                <ArrowRight className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
           </button>
        </div>
      )}
    </motion.div>
  );
}
