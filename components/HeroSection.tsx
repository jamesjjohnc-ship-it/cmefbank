"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Lock, User, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { loginAction, getUserByEmail } from "@/actions";
import { useAppContext } from "@/app/context/appcontext";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const { setAuthStep, setUserData } = useAppContext();
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      toast.error("Please enter both account number and password");
      return;
    }

    setIsLoading(true);
    try {
      const res = await loginAction({ identifier, password });
      if (!res.success) {
        toast.error(res.message || "Invalid credentials");
        setIsLoading(false);
        return;
      }

      const userRes = await getUserByEmail(identifier);
      if (userRes.success) {
        setUserData(userRes.user);
      }

      localStorage.setItem("identifier", identifier);
      
      toast.success("Login successful! Redirecting to verification...");
      setAuthStep("2fa");
      
      // Use a small timeout to ensure state settles before push
      setTimeout(() => {
        router.push("/dashboard/2fa");
      }, 800);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-[600px] lg:h-[800px] w-full overflow-hidden flex items-center bg-white border-b border-gray-100">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-traditional.png"
          alt="Traditional bank architecture"
          fill
          className="object-cover opacity-20"
          priority
          sizes="100vw"
        />
        {/* Overlays for depth and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full relative z-10 py-20 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
          
          {/* Left Side (Promo) */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start order-2 lg:order-1">
             <div className="py-6 sm:py-10 max-w-xl">
                <div className="space-y-6 sm:space-y-8 animate-in slide-in-from-bottom-8 duration-1000 fade-in text-gray-900">
                   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs sm:text-sm font-bold backdrop-blur-md">
                     <span className="flex h-2 w-2 rounded-full bg-[#B91C1C]"></span>
                     CMEF Institutional Private Banking
                   </div>
                   <h2 className="text-4xl sm:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight">
                     Tradition meets <br/>
                     <span className="text-[#B91C1C]">lasting security.</span>
                   </h2>
                   <p className="text-gray-600 text-base sm:text-xl font-medium leading-relaxed max-w-md">
                     Experience the legacy of institutional financial services. Bespoke banking solutions tailored for the traditional wealth builder.
                   </p>
                   
                   <div className="flex flex-col sm:flex-row gap-4 pt-4">
                     <Button className="h-12 sm:h-14 px-8 bg-[#B91C1C] text-white text-sm sm:text-base font-bold uppercase tracking-wider hover:bg-black transition-all rounded-none shadow-lg shadow-red-900/10">
                       Open an Account
                     </Button>
                     <Button variant="outline" className="h-12 sm:h-14 px-8 border-gray-200 bg-white text-gray-900 text-sm sm:text-base font-bold hover:bg-gray-50 transition-all rounded-none">
                       Our Heritage
                     </Button>
                   </div>
                </div>
             </div>
          </div>

          {/* Right Side (Login) */}
          <div className="w-full lg:w-[450px] order-1 lg:order-2">
             <div className="bg-white rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden border border-gray-100 relative">
                {/* Accent bar */}
                <div className="absolute top-0 inset-x-0 h-1 bg-[#B91C1C]" />
                
                <div className="bg-gray-50/50 border-b border-gray-100 p-6 sm:p-8 text-center relative overflow-hidden">
                   <h3 className="text-xl sm:text-2xl font-black text-gray-900 uppercase tracking-widest flex items-center justify-center gap-3 relative z-10">
                     <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-[#B91C1C]" />
                     Secure Access
                   </h3>
                </div>
                
                <div className="p-6 sm:p-10 relative">
                   <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
                      <div className="space-y-2">
                         <Label htmlFor="account" className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Account Number</Label>
                         <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                               <User className="w-4 h-4 sm:w-5 sm:h-5" />
                            </span>
                            <Input 
                              id="account"
                              placeholder="e.g. 0001234567" 
                              className="h-12 sm:h-14 pl-12 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-none focus:ring-1 focus:ring-[#B91C1C] focus:border-[#B91C1C] transition-all"
                              value={identifier}
                              onChange={(e) => setIdentifier(e.target.value)}
                              disabled={isLoading}
                            />
                         </div>
                      </div>

                      <div className="space-y-2">
                         <Label htmlFor="pass" className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Password</Label>
                         <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                               <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                            </span>
                            <Input 
                              id="pass"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••" 
                              className="h-12 sm:h-14 pl-12 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-none focus:ring-1 focus:ring-[#B91C1C] focus:border-[#B91C1C] transition-all"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              disabled={isLoading}
                            />
                            <button 
                               type="button" 
                               onClick={() => setShowPassword(!showPassword)}
                               className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                               {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                            </button>
                         </div>
                      </div>

                      <div className="flex items-center space-x-2 pb-1 sm:pb-2">
                        <Checkbox id="remember" className="border-gray-300 data-[state=checked]:bg-[#B91C1C] data-[state=checked]:border-[#B91C1C]" />
                        <label
                          htmlFor="remember"
                          className="text-xs sm:text-sm font-medium leading-none text-gray-500 cursor-pointer"
                        >
                          Keep me signed in
                        </label>
                      </div>
 
                      <Button 
                         type="submit" 
                         disabled={isLoading}
                         className="w-full h-14 sm:h-16 bg-[#B91C1C] text-white font-black uppercase tracking-[0.1em] shadow-lg shadow-red-900/10 hover:bg-black hover:translate-y-[-2px] active:translate-y-[0px] transition-all duration-300 rounded-none text-sm sm:text-base mt-2"
                      >
                         {isLoading ? "Authenticating..." : "Sign In"}
                      </Button>
                      
                      <div className="flex flex-col space-y-3 text-center pt-2">
                         <a href="/reset" className="text-xs text-[#B91C1C] hover:underline transition-colors font-bold">Forgot your password?</a>
                         <p className="text-xs text-gray-500">
                           New to CMEF Bank?{" "}
                           <a href="/register" className="text-[#B91C1C] hover:underline font-bold transition-colors">Open an Account</a>
                         </p>
                      </div>
                   </form>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
