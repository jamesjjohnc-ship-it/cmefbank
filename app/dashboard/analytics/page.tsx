"use client";

import AnalyticsPage from "@/components/analytics-page";
import { useAppContext } from "@/app/context/appcontext";

export default function AnalyticsRoute() {
  const { handleLogout, setCurrentPage } = useAppContext();
  return <AnalyticsPage onLogout={handleLogout} onNavigate={setCurrentPage} />;
}
