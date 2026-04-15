"use client";

import SettingsPage from "@/components/settings-page";
import { useAppContext } from "@/app/context/appcontext";

export default function SettingsRoute() {
  const { handleLogout, setCurrentPage } = useAppContext();
  return <SettingsPage onLogout={handleLogout} onNavigate={setCurrentPage} />;
}
