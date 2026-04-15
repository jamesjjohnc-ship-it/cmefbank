"use client";

import { useAppContext } from "@/app/context/appcontext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import BottomNav from "@/components/bottomNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authStep, loading } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && authStep !== "authenticated" && pathname !== "/dashboard/login" && pathname !== "/dashboard/2fa") {
      router.push("/");
    }
  }, [authStep, loading, router, pathname]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isAuth = authStep === "authenticated";
  const is2FA = pathname === "/dashboard/2fa";

  return (
    <div className="min-h-screen bg-background pb-20">
      {children}
      {isAuth && !is2FA && <BottomNav />}
    </div>
  );
}
