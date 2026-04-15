"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const features = [
  {
    title: "Bank Accounts",
    description: "Discover the benefits of a bank account from Pinnacle Savings Bank.",
    color: "bg-[#003366]/90",
    href: "/features",
    image: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Mortgages",
    description: "Find one that's right for your needs and circumstances.",
    color: "bg-[#CC3333]/90",
    href: "/features",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Travel Money",
    description: "Check rates and order online now.",
    color: "bg-[#003366]/90",
    href: "/features",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Savings",
    description: "See how we could help your money work harder.",
    color: "bg-[#CC3333]/90",
    href: "/features",
    image: "https://images.unsplash.com/photo-1579621970795-87f9da7f2928?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Insurance",
    description: "Protect your family and property.",
    color: "bg-[#003366]/90",
    href: "/security",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
  },
];

export default function FeatureGrid() {
  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
        {features.map((feature, idx) => (
          <div 
            key={feature.title} 
            className={`group relative h-[320px] sm:h-[380px] overflow-hidden ${
              idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
               <Image 
                 src={feature.image} 
                 alt={feature.title} 
                 fill 
                 className="object-cover transition-transform duration-700 group-hover:scale-110"
               />
            </div>
            
            {/* Overlay */}
            <div className={`absolute inset-0 ${feature.color} opacity-95 flex flex-col justify-between p-8 sm:p-12 text-white transition-all duration-300 group-hover:p-10 sm:group-hover:p-14`}>
              <div className="space-y-6">
                <Link href={feature.href} className="inline-flex items-center gap-4 text-2xl sm:text-3xl font-bold hover:underline decoration-1 underline-offset-8">
                  {feature.title}
                  <ArrowRight className="h-6 w-6 sm:h-8 sm:w-8 transition-transform group-hover:translate-x-2" />
                </Link>
                <p className="text-lg sm:text-xl leading-relaxed text-blue-50/90 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {feature.description}
                </p>
              </div>
              
              <div className="mt-4">
                 <Link href={feature.href} className="text-sm font-bold tracking-widest uppercase border-b border-white pb-2 hover:text-blue-200 transition-colors">
                   Get Started
                 </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
