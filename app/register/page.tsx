"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { registerAction } from "@/actions";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Lock, Hash } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const res = await registerAction({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
      });

      if (!res.success) {
        toast.error(res.message);
        setIsLoading(false);
        return;
      }

      toast.success(`Account created! Your Account Number is ${res.accountNumber}`, {
        duration: 10000, // keep the toast up longer so they can read the number
      });
      
      // Send them to the login page
      setTimeout(() => {
        router.push("/dashboard"); // or back to `/` to trigger normal login
      }, 3000);
    } catch (err) {
      toast.error("Something went wrong during registration.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-[#001529]">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
          alt="Modern cityscape"
          fill
          className="object-cover opacity-50 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001529] via-[#001529]/80 to-transparent" />
      </div>

      <div className="w-full max-w-lg relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="mb-6 text-center">
          <Link href="/">
            <div className="inline-flex items-center justify-center h-12 rounded-lg bg-white/5 border border-white/10 px-6 backdrop-blur-md hover:bg-white/10 transition-colors">
              <span className="text-[#CDA644] font-black text-xl tracking-widest uppercase">CMEF Group</span>
            </div>
          </Link>
          <p className="text-gray-400 mt-3 font-medium">Create a new institutional wealth account</p>
        </div>

        <Card className="border border-white/10 bg-[#001f3f]/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#CDA644]/50 to-transparent" />
          
          <CardHeader className="space-y-1 text-center border-b border-white/5 bg-white/5 pb-6 pt-8">
            <CardTitle className="text-2xl text-white font-bold">Registration</CardTitle>
            <CardDescription className="text-gray-400">
              Join the future of global banking today.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6 pb-8 px-6 sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">First Name</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><User className="w-4 h-4" /></span>
                    <Input
                      required
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-gray-500 focus:border-[#CDA644] focus:ring-1 focus:ring-[#CDA644]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Last Name</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><User className="w-4 h-4" /></span>
                    <Input
                      required
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-gray-500 focus:border-[#CDA644] focus:ring-1 focus:ring-[#CDA644]"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><Mail className="w-4 h-4" /></span>
                  <Input
                    required
                    type="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-gray-500 focus:border-[#CDA644] focus:ring-1 focus:ring-[#CDA644]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Phone Number</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><Phone className="w-4 h-4" /></span>
                  <Input
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-gray-500 focus:border-[#CDA644] focus:ring-1 focus:ring-[#CDA644]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Password</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><Lock className="w-4 h-4" /></span>
                  <Input
                    required
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-gray-500 focus:border-[#CDA644] focus:ring-1 focus:ring-[#CDA644]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Confirm Password</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><Hash className="w-4 h-4" /></span>
                  <Input
                    required
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-gray-500 focus:border-[#CDA644] focus:ring-1 focus:ring-[#CDA644]"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-[#CDA644] hover:bg-[#B8953D] text-[#001529] font-black uppercase tracking-[0.1em] shadow-lg rounded-xl mt-4"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <p className="text-xs text-gray-400 text-center mt-6">
              Already have an account?{" "}
              <Link href="/dashboard" className="text-[#CDA644] hover:text-[#FDE68A] font-bold transition-colors">
                Sign in here
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
