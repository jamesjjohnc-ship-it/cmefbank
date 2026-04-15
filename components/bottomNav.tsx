"use client";

import {
  Home,
  CreditCard,
  BarChart2,
  PieChart,
  LogOut,
  Send,
  Settings as SettingsIcon,
} from "lucide-react";
import { useAppContext } from "@/app/context/appcontext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const { handleLogout } = useAppContext();
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Home", icon: <Home className="w-6 h-6" /> },
    {
      href: "/dashboard/transfers",
      label: "Transfers",
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      href: "/dashboard/invest",
      label: "Invest",
      icon: <BarChart2 className="w-6 h-6" />,
    },
    {
      href: "/dashboard/analytics",
      label: "Analytics",
      icon: <PieChart className="w-6 h-6" />,
    },
    {
      href: "/dashboard/merchandize",
      label: "Merchandize",
      icon: <Send className="w-6 h-6" />,
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: <SettingsIcon className="w-6 h-6" />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-7xl mx-auto px-1 py-4 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 p-2 transition-colors ${
                isActive
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.icon}
              <span className="text-[10px] sm:text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}

        {/* Optional Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="flex flex-col items-center gap-1 p-2 h-auto text-muted-foreground hover:text-red-500 border-none bg-transparent hover:bg-transparent"
        >
          <LogOut className="w-6 h-6" />
          <span className="text-[10px] sm:text-xs font-medium">Logout</span>
        </Button>
      </div>
    </nav>
  );
}
