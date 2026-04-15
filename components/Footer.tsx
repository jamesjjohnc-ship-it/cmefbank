"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";

const footerLinks = [
  {
    title: "HELP & SUPPORT",
    links: [
      { name: "Got a question? We are here to help you", href: "/contact" },
      { name: "Find a Branch", href: "/contact" },
      { name: "Help Center", href: "/contact" },
      { name: "Report Fraud", href: "/security" },
    ],
  },
  {
    title: "FIND A BRANCH",
    links: [
      { name: "Find your nearest Pinnacle Bank location", href: "/contact" },
      { name: "ATM Locator", href: "/contact" },
      { name: "International Offices", href: "/contact" },
    ],
  },
  {
    title: "OUR PERFORMANCE",
    links: [
      { name: "View our service dashboard to see how we're doing", href: "/invest" },
      { name: "Annual Reports", href: "/invest" },
      { name: "Investor Relations", href: "/invest" },
    ],
  },
  {
    title: "ABOUT PINNACLE BANK",
    links: [
      { name: "Careers, media, investor and corporate information", href: "/contact" },
      { name: "Our History", href: "/contact" },
      { name: "Sustainability", href: "/contact" },
      { name: "Global Presence", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#003366] text-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Connection Header */}
        <div className="mb-12 border-b border-white/10 pb-12 text-center md:text-left">
           <h2 className="text-2xl sm:text-4xl font-light mb-4 text-white">Connect with us</h2>
           <p className="text-blue-100 text-base sm:text-lg">Listening to what you have to say about our services matters to us.</p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-6">
              <h3 className="text-lg font-bold tracking-wider">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-blue-100 hover:text-white flex items-center group transition-colors text-sm font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal & Bottom Section */}
        <div className="border-t border-white/10 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8 text-center md:text-left">
            <div className="flex justify-center md:justify-start gap-6 w-full md:w-auto">
              <Facebook className="h-5 w-5 cursor-pointer hover:text-blue-300 transition-colors" />
              <Twitter className="h-5 w-5 cursor-pointer hover:text-blue-300 transition-colors" />
              <Instagram className="h-5 w-5 cursor-pointer hover:text-blue-300 transition-colors" />
              <Linkedin className="h-5 w-5 cursor-pointer hover:text-blue-300 transition-colors" />
            </div>
            <p className="text-[10px] sm:text-xs text-blue-200 max-w-2xl italic leading-relaxed">
              This Institution is federally insured by the National Credit Union Administration. We do business in accordance with the Fair Housing Law and Equal opportunity Credit Act.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4 text-xs font-bold tracking-widest text-blue-300 uppercase">
             <Link href="/security" className="hover:text-white">Privacy Policy</Link>
             <Link href="/security" className="hover:text-white">Security Centre</Link>
             <Link href="/contact" className="hover:text-white">Sitemap</Link>
             <Link href="/contact" className="hover:text-white">Accessibility</Link>
             <span>© {new Date().getFullYear()} Pinnacle Bank. ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
