"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Clock, MessageSquare, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactOptions = [
  {
    title: "Call Us",
    description: "Our support team is available 24/7 for urgent matters and fraud reporting.",
    icon: Phone,
    detail: "+1 (800) CMEF-BANK",
  },
  {
    title: "Email Support",
    description: "For non-urgent inquiries, send us an email and we'll reply within 24 hours.",
    icon: Mail,
    detail: "support@cmefgroup.com",
  },
  {
    title: "Visit a Branch",
    description: "Find your nearest branch or ATM using our global locator tool.",
    icon: MapPin,
    detail: "Locator Tool",
  },
  {
    title: "Help Center",
    description: "Browse our extensive list of FAQs and self-help articles.",
    icon: HelpCircle,
    detail: "Visit Help Center",
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-blue-50 py-12 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="max-w-3xl">
               <h1 className="text-3xl sm:text-5xl font-black text-[#003366] mb-8 uppercase tracking-tighter">
                 Connect with us
               </h1>
               <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed font-light italic">
                 "Listening to what you have to say about our services matters to us. Whether you have a question, feedback, or need assistance, we're here to help."
               </p>
            </div>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="py-12 sm:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {contactOptions.map((opt) => (
                  <div key={opt.title} className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                     <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                        <opt.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#003366]" />
                     </div>
                     <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 uppercase tracking-wider">{opt.title}</h3>
                     <p className="text-gray-600 mb-6 text-sm italic">
                        {opt.description}
                     </p>
                     <span className="text-[#003366] font-bold border-b border-[#003366] pb-1 cursor-pointer hover:text-blue-500 hover:border-blue-500 transition-colors">
                        {opt.detail}
                     </span>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 sm:py-24 bg-gray-50 border-t border-gray-200">
           <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
                 {/* Sidebar Info */}
                 <div className="lg:w-1/3 bg-[#003366] p-8 sm:p-12 text-white flex flex-col justify-between">
                    <div className="space-y-8">
                       <h2 className="text-2xl sm:text-3xl font-bold">Send us a message</h2>
                       <p className="text-blue-100 leading-relaxed font-light italic text-sm sm:text-base">
                         Fill out the form and our head office team will get back to you within one business day.
                       </p>
                    </div>
                    <div className="space-y-4 pt-12 border-t border-white/10">
                       <div className="flex items-center gap-4">
                          <Clock className="w-5 h-5 text-blue-300" />
                          <span className="text-sm font-medium">Mon - Fri: 9am - 6pm</span>
                       </div>
                       <div className="flex items-center gap-4">
                          <MessageSquare className="w-5 h-5 text-blue-300" />
                          <span className="text-sm font-medium">Average response: 4h</span>
                       </div>
                    </div>
                 </div>
                 
                 {/* Form */}
                 <div className="lg:w-2/3 p-8 sm:p-12">
                    <form className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                       <div className="space-y-2">
                          <label className="text-[10px] sm:text-sm font-black uppercase tracking-widest text-[#003366]">First Name</label>
                          <input type="text" className="w-full p-3 sm:p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#003366] transition-all text-sm sm:text-base" placeholder="John" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] sm:text-sm font-black uppercase tracking-widest text-[#003366]">Last Name</label>
                          <input type="text" className="w-full p-3 sm:p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#003366] transition-all text-sm sm:text-base" placeholder="Doe" />
                       </div>
                       <div className="space-y-2 sm:col-span-2">
                          <label className="text-[10px] sm:text-sm font-black uppercase tracking-widest text-[#003366]">Email Address</label>
                          <input type="email" className="w-full p-3 sm:p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#003366] transition-all text-sm sm:text-base" placeholder="john@example.com" />
                       </div>
                       <div className="space-y-2 sm:col-span-2">
                          <label className="text-[10px] sm:text-sm font-black uppercase tracking-widest text-[#003366]">Subject</label>
                          <select className="w-full p-3 sm:p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#003366] transition-all text-sm sm:text-base">
                             <option>General Inquiry</option>
                             <option>Account Support</option>
                             <option>Fraud Reporting</option>
                             <option>Investment Advice</option>
                          </select>
                       </div>
                       <div className="space-y-2 sm:col-span-2">
                          <label className="text-[10px] sm:text-sm font-black uppercase tracking-widest text-[#003366]">Message</label>
                          <textarea rows={5} className="w-full p-3 sm:p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#003366] transition-all text-sm sm:text-base" placeholder="How can we help?"></textarea>
                       </div>
                       <div className="sm:col-span-2">
                          <Button className="w-full sm:w-auto px-12 py-8 rounded-none bg-[#003366] text-white font-bold uppercase tracking-[0.2em] hover:bg-black transition-all">
                            Send Message
                          </Button>
                       </div>
                    </form>
                 </div>
              </div>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
