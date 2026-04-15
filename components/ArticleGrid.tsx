"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const articles = [
  {
    title: "Up to $20,000 this tax year",
    description: "Make the most of your 2024/25 ISA allowance with a bank Selection Stocks and Shares ISA.",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800",
    href: "/features",
  },
  {
    title: "Book an appointment",
    description: "You can now book an appointment online. Existing customers may prefer to log on to Online Banking to make booking even simpler.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800",
    href: "/contact",
  },
  {
    title: "Ring-fencing",
    description: "We're changing the way bank is structured in the EU.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800",
    href: "/security",
  },
];

const secondaryArticles = [
  {
     title: "Activate your card",
     description: "There are several ways to easily activate your card. Choose the option that's best for you.",
     image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800",
     href: "/dashboard",
  },
  {
     title: "Security centre",
     description: "Handy tips designed to help you stay safe online.",
     image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
     href: "/security",
  },
  {
     title: "Helpful guides",
     description: "A range of guides and articles from understanding APRs to saving tips.",
     image: "https://images.unsplash.com/photo-1434039347661-90f463f1f004?auto=format&fit=crop&q=80&w=800",
     href: "/features",
  }
];

export default function ArticleGrid() {
  return (
    <section className="bg-white py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Primary Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-16 sm:mb-24">
           {articles.map((article) => (
             <div key={article.title} className="flex flex-col gap-4 sm:gap-6 group">
                <div className="aspect-[16/9] relative overflow-hidden rounded-sm">
                   <Image 
                     src={article.image} 
                     alt={article.title} 
                     fill 
                     className="object-cover transition-transform group-hover:scale-105"
                   />
                </div>
                <div className="space-y-4">
                  <Link href={article.href} className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-[#003366] group-hover:underline">
                    {article.title}
                    <ArrowRight className="h-5 w-5 text-red-600" />
                  </Link>
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    {article.description}
                  </p>
                </div>
             </div>
           ))}
        </div>

        {/* Secondary Articles (Blue Background Style) */}
        <div className="bg-[#003366] text-white p-8 sm:p-12 md:p-24 -mx-4 sm:-mx-6 lg:-mx-12 xl:mx-0 rounded-none md:rounded-3xl">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
              {secondaryArticles.map((article) => (
                <div key={article.title} className="flex flex-col gap-8 group">
                   <div className="aspect-[4/3] relative overflow-hidden border border-white/10">
                      <Image 
                        src={article.image} 
                        alt={article.title} 
                        fill 
                        className="object-cover transition-opacity opacity-80 group-hover:opacity-100"
                      />
                   </div>
                   <div className="space-y-4">
                      <Link href={article.href} className="text-xl sm:text-2xl font-bold flex items-center gap-2 hover:underline decoration-red-600 underline-offset-8">
                        {article.title}
                        <ArrowRight className="h-5 w-5 text-red-600" />
                      </Link>
                      <p className="text-blue-100 text-base sm:text-lg font-light leading-relaxed">
                        {article.description}
                      </p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}
