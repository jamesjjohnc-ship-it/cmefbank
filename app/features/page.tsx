"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, Star, Zap, Globe, Shield, Wallet } from "lucide-react";
import Image from "next/image";

const mainFeatures = [
  {
    title: "Instant Global Transfers",
    description: "Send and receive money across borders in seconds with zero hidden fees and competitive exchange rates.",
    icon: Globe,
    color: "text-blue-600",
  },
  {
    title: "Smart Savings Vaults",
    description: "Automate your savings with AI-driven vaults that round up purchases and grow your wealth effortlessly.",
    icon: Wallet,
    color: "text-green-600",
  },
  {
    title: "Pinnacle Protection",
    description: "Advanced biometric security and 256-bit encryption keep your assets safe with 24/7 monitoring.",
    icon: Shield,
    color: "text-purple-600",
  },
  {
    title: "Real-time Analytics",
    description: "Get deep insights into your spending habits with intuitive charts and intelligent budgeting tools.",
    icon: Zap,
    color: "text-yellow-600",
  },
];

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-gray-50 py-12 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              Banking features designed for the <span className="text-primary italic">modern era</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore the tools and services that make Pinnacle Bank the most powerful financial platform in your pocket.
            </p>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-12 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
              {mainFeatures.map((feature) => (
                <div key={feature.title} className="flex gap-6 group">
                  <div className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gray-50 flex items-center justify-center transition-transform group-hover:scale-110`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-base sm:text-lg italic">
                      {feature.description}
                    </p>
                    <ul className="space-y-2 pt-4">
                       <li className="flex items-center gap-2 text-sm font-medium text-gray-500">
                         <CheckCircle2 className="w-4 h-4 text-green-500" />
                         Available in 150+ countries
                       </li>
                       <li className="flex items-center gap-2 text-sm font-medium text-gray-500">
                         <CheckCircle2 className="w-4 h-4 text-green-500" />
                         No monthly maintenance fees
                       </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Breakdown */}
        <section className="bg-white py-12 sm:py-24 border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
             <div className="flex flex-col lg:flex-row items-center gap-12 sm:gap-16">
                <div className="lg:w-1/2 relative">
                   <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl -z-10 rotate-3"></div>
                   <Image 
                     src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=800" 
                     alt="App Interface" 
                     width={800} 
                     height={600} 
                     className="rounded-2xl shadow-2xl border border-gray-100"
                   />
                </div>
                <div className="lg:w-1/2 space-y-8">
                   <h2 className="text-4xl font-bold text-gray-900">Total control, anywhere in the world.</h2>
                   <p className="text-lg text-gray-600 leading-relaxed">
                     Our mobile app gives you the same power as a full-service branch, right at your fingertips. From applying for a mortgage to setting up an investment portfolio, it's all just a tap away.
                   </p>
                   <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                         <span className="text-3xl font-black text-primary">0%</span>
                         <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Fees on transfers</p>
                      </div>
                      <div className="space-y-2">
                         <span className="text-3xl font-black text-primary">4.5%</span>
                         <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Savings APY</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
