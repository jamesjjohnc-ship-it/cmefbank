"use client";

import TwoFAPage from "@/components/two-fa-page";
import { useAppContext } from "@/app/context/appcontext";
import { useRouter } from "next/navigation";

export default function TwoFARoute() {
  const { setAuthStep } = useAppContext();
  const router = useRouter();

  return (
    <TwoFAPage 
      onBack={() => router.push("/")}
      onVerify={() => {
        setAuthStep("authenticated");
        router.push("/dashboard");
      }}
    />
  );
}
