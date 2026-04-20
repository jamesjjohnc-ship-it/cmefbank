"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShieldAlert, ShieldCheck, Lock, Fingerprint, Eye, RefreshCcw } from "lucide-react";

const securityFeatures = [
  {
    title: "Biometric Authentication",
    description: "Access your account securely with Face ID or fingerprint scanning on your mobile device.",
    icon: Fingerprint,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "256-bit AES Encryption",
    description: "Your data is protected with industry-leading encryption standards used by banks worldwide.",
    icon: Lock,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Real-time Fraud Monitoring",
    description: "Our AI systems monitor your accounts 24/7 to detect and block suspicious activity instantly.",
    icon: ShieldAlert,
    color: "bg-red-50 text-red-600",
  },
  {
    title: "Virtual Cards",
    description: "Create disposable virtual cards for online shopping to keep your permanent card details private.",
    icon: RefreshCcw,
    color: "bg-green-50 text-green-600",
  },
];

export default function SecurityPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-slate-900 text-white py-12 sm:py-24 overflow-hidden relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
            <div className="max-w-3xl">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold tracking-widest uppercase mb-8">
                  <ShieldCheck className="w-4 h-4" />
                  Grade A Security
               </div>
               <h1 className="text-3xl sm:text-7xl font-bold mb-8 leading-[1.1]">
                 The safest place for <br/><span className="text-blue-500">your money.</span>
               </h1>
               <p className="text-lg sm:text-xl text-slate-400 leading-relaxed italic">
                 At CMEF Bank, we believe security isn't just a feature—it's the foundation of everything we build. We use military-grade technology to ensure your peace of mind.
               </p>
            </div>
          </div>
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/10 to-transparent -z-0"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"></div>
        </section>

        {/* Detailed Protection */}
        <section className="py-12 sm:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 sm:gap-y-16">
                {securityFeatures.map((item) => (
                  <div key={item.title} className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start p-6 sm:p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                     <div className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center ${item.color}`}>
                        <item.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                     </div>
                     <div className="space-y-4 text-center sm:text-left">
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{item.title}</h3>
                        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
                          {item.description}
                        </p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* Security Centre Style CTA */}
        <section className="bg-gray-50 py-24 border-y border-gray-200">
           <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
              <h2 className="text-4xl font-bold text-slate-900 mb-8">Staying safe online</h2>
              <p className="text-xl text-slate-600 mb-12 italic leading-relaxed">
                "We'll never ask for your PIN, password, or security codes over the phone or email. If you receive a suspicious request, report it immediately to our 24/7 fraud hotline."
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                 <button className="px-8 py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-200 uppercase tracking-widest text-sm">
                   Report Suspicious Activity
                 </button>
                 <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-black transition-colors shadow-lg shadow-slate-200 uppercase tracking-widest text-sm">
                   Security FAQ
                 </button>
              </div>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
