"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "@/app/context/appcontext";
import Image from "next/image";

const navItems = [
  {
    label: "Banking Services",
    subLabel: "Accounts & Services",
    href: "/features",
    subItems: ["Checking", "Savings", "Credit Cards", "Mortgages"],
  },
  {
    label: "Borrowing",
    subLabel: "Loans & Mortgages",
    href: "/features",
    subItems: ["Personal Loans", "Auto Loans", "Home Equity"],
  },
  {
    label: "Investing",
    subLabel: "Products & Analysis",
    href: "/invest",
    subItems: ["Stocks", "Bonds", "Mutual Funds", "Advice"],
  },
  {
    label: "Insurance",
    subLabel: "Property & Family",
    href: "/security",
    subItems: ["Life", "Health", "Home", "Auto"],
  },
  {
    label: "Life Events",
    subLabel: "Help & Support",
    href: "/contact",
    subItems: ["Buying a Home", "Starting a Business", "Retirement"],
  },
];

export default function Header() {
  const { authStep } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
      {/* Top Utility Bar */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2 flex flex-col sm:flex-row justify-between items-center text-[9px] sm:text-[11px] font-bold uppercase tracking-widest text-gray-500 gap-2 sm:gap-0 text-center sm:text-left">
          <div className="flex gap-4 sm:gap-6 flex-wrap justify-center sm:justify-start">
            <a href="mailto:support@cmefbank.com" className="hover:text-primary transition-colors flex items-center gap-1.5">
              Contact Us: support@cmefbank.com
            </a>
            <span className="hidden xs:inline">Call Us: +1 (800) 123-4567</span>
          </div>
          <div className="flex gap-4">
            <span className="text-primary/60">Institutional Banking</span>
            <span className="w-px h-3 bg-gray-300 hidden sm:block"></span>
            <span className="hidden sm:block">Locations</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-20 lg:h-24 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 relative overflow-hidden rounded-lg bg-primary">
               <Image
                  width={40}
                  height={40}
                  alt="CMEF Bank Logo"
                  src="/cmef-logo.png"
                  className="object-cover"
                />
            </div>
            <span className="text-lg sm:text-2xl font-black tracking-tighter text-gray-900 group-hover:text-primary transition-colors uppercase">
              CMEF Bank
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:gap-x-8">
          {navItems.map((item) => (
            <div key={item.label} className="group relative py-6">
              <button className="flex flex-col items-start gap-0.5 text-left focus:outline-none transition-transform group-hover:-translate-y-1">
                <div className="flex items-center gap-1 text-sm font-bold text-gray-900">
                  {item.label}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">
                  {item.subLabel}
                </span>
              </button>
              
              {/* Dropdown Menu (Mega-menu style hint) */}
              <div className="invisible absolute top-full left-0 w-48 bg-white border border-gray-100 shadow-xl rounded-b-xl opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 p-4">
                 <ul className="space-y-3">
                   {item.subItems.map(sub => (
                     <li key={sub}>
                        <Link href={item.href} className="text-sm text-gray-600 hover:text-primary hover:translate-x-1 inline-block transition-transform font-medium">
                          {sub}
                        </Link>
                     </li>
                   ))}
                 </ul>
              </div>
            </div>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex text-gray-500 hover:text-primary">
            <Search className="h-5 w-5" />
          </button>
          {authStep === "authenticated" ? (
            <Link href="/dashboard" className="hidden xs:block">
              <Button className="rounded-none bg-primary px-4 py-4 sm:px-8 sm:py-6 text-xs sm:text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-black transition-all">
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/dashboard" className="hidden xs:block">
              <Button className="rounded-none bg-primary px-4 py-4 sm:px-8 sm:py-6 text-xs sm:text-sm font-bold uppercase tracking-widest text-primary-foreground hover:bg-black transition-all">
                Log In
              </Button>
            </Link>
          )}
          <button 
            className="lg:hidden flex items-center gap-2 px-3 py-2 border border-gray-100 hover:border-[#B91C1C] hover:text-[#B91C1C] transition-all group/menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{isMobileMenuOpen ? "Close" : "Menu"}</span>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5 group-hover/menu:rotate-90 transition-transform" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-[#B91C1C] shadow-[0_30px_60px_rgba(0,0,0,0.15)] animate-in slide-in-from-top-4 duration-300 fill-mode-both max-h-[calc(100dvh-120px)] overflow-y-auto lg:hidden">
          <div className="flex flex-col p-6 space-y-8 bg-white relative">
            <div className="xs:hidden border-b border-gray-100 pb-8">
              <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full rounded-none bg-[#B91C1C] py-7 text-sm font-black uppercase tracking-[0.2em] text-white hover:bg-black transition-all shadow-lg shadow-red-900/10">
                  Secure Log In
                </Button>
              </Link>
            </div>
            {navItems.map((item) => (
              <div key={item.label} className="space-y-4 border-l-2 border-transparent hover:border-[#B91C1C] pl-4 transition-colors">
                <div className="flex flex-col">
                  <span className="text-xl font-black text-gray-900 uppercase tracking-tight">{item.label}</span>
                  <span className="text-[10px] text-[#B91C1C] font-bold uppercase tracking-widest">{item.subLabel}</span>
                </div>
                <div className="grid grid-cols-1 gap-3 pl-2">
                  {item.subItems.map(sub => (
                    <Link 
                      key={sub} 
                      href={item.href} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm text-gray-500 hover:text-[#B91C1C] hover:translate-x-1 transition-all font-medium py-1"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="pt-8 border-t border-gray-50 text-center">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em]">CMEF Institutional Private Line</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
