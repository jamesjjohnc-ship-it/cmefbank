"use client";

import DashboardPage from "@/components/dashboard-page";
import { useAppContext } from "@/app/context/appcontext";

export default function DashboardOverview() {
  const { userData } = useAppContext();

  return (
    <DashboardPage
      data={userData}
    />
  );
}
