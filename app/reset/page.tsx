"use client";

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
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Lock, CheckCircle2 } from "lucide-react";

import {
  forgotPasswordAction,
  verifyOtpAction,
  resetPasswordAction,
} from "@/actions";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "otp" | "reset" | "success">(
    "email"
  );
  const [email, setEmail] = useState("");
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Handle OTP input change
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

  const sendOtp = async () => {
    setError("");
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    const res = await forgotPasswordAction({ email });
    if (!res.success) return toast.error(res.message);
    toast.success(res.message);
    setStep("otp");
  };

  const verifyOtp = async () => {
    const fullCode = codes.join("");
    if (fullCode.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    const res = await verifyOtpAction({ email, otp: fullCode });
    if (!res.success) {
      setError(res.message || "Invalid OTP");
      return;
    }
    setStep("reset");
    setError("");
  };

  const resetPassword = async () => {
    if (!newPassword) return toast.error("Please enter a new password");

    const res = await resetPasswordAction({ email, newPassword });
    if (!res.success) return toast.error(res.message);

    toast.success(res.message);
    setStep("success");
    setTimeout(() => {
      // redirect back to login
      router.push("/");
    }, 1500);
  };

  // Step components
  const renderStep = () => {
    switch (step) {
      case "email":
        return (
          <div className="space-y-4">
            <Label>Email Address</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10"
            />
            <Button className="w-full" onClick={sendOtp}>
              Send OTP
            </Button>
          </div>
        );

      case "otp":
        return (
          <div className="space-y-4">
            {error && (
              <p className="text-sm text-destructive text-center bg-destructive/10 p-2 rounded">
                {error}
              </p>
            )}
            <p className="text-center text-sm">
              Enter the 6-digit OTP sent to your email
            </p>
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
            <Button className="w-full" onClick={verifyOtp}>
              Verify OTP
            </Button>
          </div>
        );

      case "reset":
        return (
          <div className="space-y-4">
            <Label>New Password</Label>
            <Input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="h-10"
            />
            <Button className="w-full" onClick={resetPassword}>
              Reset Password
            </Button>
          </div>
        );

      case "success":
        return (
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <p className="text-lg font-bold">Password Reset Successful!</p>
            <p className="text-sm text-muted-foreground">
              Redirecting to login...
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="inline-flex items-center justify-center w-full h-auto rounded-lg bg-white mb-4">
        <Image
          width={400}
          height={100}
          alt="CMEF Bank Logo"
          src="/cmef-logo.png"
        />
      </div>
      <div className="w-full max-w-sm">
        <button
          onClick={() => {
            router.push("/");
          }}
          className="flex items-center gap-2 text-accent hover:underline mb-6 font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to login
        </button>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Forgot Password</CardTitle>
            <CardDescription>
              Follow the steps to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>{renderStep()}</CardContent>
        </Card>
      </div>
    </div>
  );
}
