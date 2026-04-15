"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getUserByEmail } from "@/actions";

type PageType =
  | "home"
  | "transfers"
  | "invest"
  | "analytics"
  | "settings"
  | "merchandize";
type AuthStep = "login" | "2fa" | "authenticated";

interface AppContextType {
  authStep: AuthStep;
  currentPage: PageType;
  userData: any;
  setAuthStep: (step: AuthStep) => void;
  setCurrentPage: (page: PageType) => void;
  setUserData: (data: any) => void;
  handleLogout: () => void;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [authStep, setAuthStepState] = useState<AuthStep>("login");
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Sync authStep with localStorage on mount
  useEffect(() => {
    const savedStep = localStorage.getItem("authStep") as AuthStep;
    if (savedStep && ["login", "2fa", "authenticated"].includes(savedStep)) {
      setAuthStepState(savedStep);
    }
  }, []);

  const setAuthStep = (step: AuthStep) => {
    setAuthStepState(step);
    localStorage.setItem("authStep", step);
  };

  const handleLogout = () => {
    setAuthStep("login");
    setCurrentPage("home");
    setUserData(null);
    localStorage.removeItem("identifier");
    localStorage.removeItem("authStep");
    localStorage.removeItem("otp");
  };

  // Fetch user when authenticated
  useEffect(() => {
    const fetchUser = async () => {
      // if (authStep !== "authenticated") return;
      const email = localStorage.getItem("identifier");
      if (!email) return;

      setLoading(true);
      try {
        const user = await getUserByEmail(email);
        setUserData(user);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [authStep]);

  return (
    <AppContext.Provider
      value={{
        authStep,
        currentPage,
        userData,
        setAuthStep,
        setCurrentPage,
        setUserData,
        handleLogout,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Custom hook for consuming context
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
}
