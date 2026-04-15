"use client";

import InvestPage from "@/components/invest-page";
import { useAppContext } from "@/app/context/appcontext";

export default function InvestRoute() {
  const { handleLogout, setCurrentPage } = useAppContext();
  return <InvestPage onLogout={handleLogout} onNavigate={setCurrentPage} />;
}
