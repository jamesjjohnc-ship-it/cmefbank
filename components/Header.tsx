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
      <div className="mx-auto flex h-20 lg:h-24 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 relative overflow-hidden rounded-lg bg-primary">
               <Image
                  width={40}
                  height={40}
                  alt="Pinnacle Logo"
                  src="/pinnacle.png"
                  className="object-cover"
                />
            </div>
            <span className="text-lg sm:text-2xl font-black tracking-tighter text-gray-900 group-hover:text-primary transition-colors uppercase">
              Pinnacle Bank
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
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 lg:top-24 left-0 w-full bg-white border-b border-gray-200 lg:hidden shadow-2xl animate-in slide-in-from-top fill-mode-both max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="flex flex-col p-6 space-y-6">
            <div className="xs:hidden border-b border-gray-100 pb-6">
              <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full rounded-none bg-primary py-6 text-sm font-bold uppercase tracking-widest text-primary-foreground">
                  Log In
                </Button>
              </Link>
            </div>
            {navItems.map((item) => (
              <div key={item.label} className="space-y-4 border-b border-gray-50 pb-4">
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-gray-900">{item.label}</span>
                  <span className="text-xs text-gray-500">{item.subLabel}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pl-4">
                  {item.subItems.map(sub => (
                    <Link key={sub} href={item.href} className="text-sm text-gray-600 active:text-primary py-1">
                      {sub}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
