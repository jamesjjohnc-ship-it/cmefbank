"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle2, Lock } from "lucide-react";
import { verifyOtpAction } from "@/actions";

interface TwoFAPageProps {
  onBack: () => void;
  onVerify: () => void; // called after successful verification
}

export default function TwoFAPage({ onBack, onVerify }: TwoFAPageProps) {
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const fullCode = codes.join("");

    if (fullCode.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    const identifier = localStorage.getItem("identifier");
    if (!identifier) {
      setError("Session expired. Please log in again.");
      return;
    }

    try {
      const res = await verifyOtpAction({ email: identifier, otp: fullCode });
      
      if (!res.success) {
        setError(res.message || "Invalid code. Please try again.");
        return;
      }

      // OTP is correct
      setError("");
      setIsVerified(true);

      setTimeout(() => {
        onVerify();
      }, 1000);
    } catch (err) {
      console.error(err);
      setError("Something went wrong during verification.");
    }
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-sm border-0 shadow-lg">
          <CardContent className="pt-12 pb-12 flex flex-col items-center text-center">
            <div className="mb-4 p-3 bg-green-100 rounded-full">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Verified
            </h2>
            <p className="text-muted-foreground text-sm">
              You're being authenticated...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-accent hover:underline mb-6 font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </button>

        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Lock className="w-5 h-5 text-accent" />
              </div>
            </div>
            <CardTitle className="text-2xl">
              Two-Factor Authentication
            </CardTitle>
            <CardDescription>
              Enter the 6-digit code sent to your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleVerify();
              }}
              className="space-y-6"
            >
              {error && (
                <p className="text-sm text-destructive text-center bg-destructive/10 p-3 rounded-lg">
                  {error}
                </p>
              )}

              <div className="flex gap-2 justify-center">
                {codes.map((code, index) => (
                  <Input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={code}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg font-bold border-2 border-border hover:border-accent focus:border-accent transition-colors"
                  />
                ))}
              </div>

              <Button
                onClick={handleVerify}
                className="w-full h-11 bg-primary hover:bg-primary/90 font-medium"
              >
                Verify Code
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Didn't receive the code?{" "}
              <button className="text-accent hover:underline font-medium">
                Resend
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
