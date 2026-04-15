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

      localStorage.setItem("otp", res.otp!);
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
    <section className="relative min-h-[600px] lg:h-[700px] w-full overflow-hidden flex items-center">
      {/* Background Layer */}
      <div 
        className="absolute inset-0 z-0 bg-gray-100" 
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000"
          alt="Outdoor landscape"
          fill
          className="object-cover opacity-80"
          priority
          sizes="100vw"
        />
        {/* Overlays for depth and readability */}
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full relative z-10 py-12 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-24">
          
          {/* Right Side (Login) - First on Mobile */}
          <div className="w-full lg:w-[450px] order-1 lg:order-2">
             <div className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden border border-white/30">
                <div className="bg-[#003366] p-6 sm:p-8 text-center">
                   <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-widest flex items-center justify-center gap-3">
                     <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300" />
                     Banking
                   </h3>
                </div>
                
                <div className="p-6 sm:p-10">
                   <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
                      <div className="space-y-2">
                         <Label htmlFor="account" className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#003366] ml-1">Account Number</Label>
                         <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                               <User className="w-4 h-4 sm:w-5 sm:h-5" />
                            </span>
                            <Input 
                              id="account"
                              placeholder="Account Number" 
                              className="h-12 sm:h-14 pl-12 bg-gray-50/50 border-gray-100 rounded-xl focus:ring-2 focus:ring-[#003366] transition-all"
                              value={identifier}
                              onChange={(e) => setIdentifier(e.target.value)}
                              disabled={isLoading}
                            />
                         </div>
                      </div>

                      <div className="space-y-2">
                         <Label htmlFor="pass" className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#003366] ml-1">Password</Label>
                         <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                               <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                            </span>
                            <Input 
                              id="pass"
                              type={showPassword ? "text" : "password"}
                              placeholder="Password" 
                              className="h-12 sm:h-14 pl-12 bg-gray-50/50 border-gray-100 rounded-xl focus:ring-2 focus:ring-[#003366] transition-all"
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
                        <Checkbox id="remember" className="border-gray-300 rounded-md data-[state=checked]:bg-[#003366] data-[state=checked]:border-[#003366]" />
                        <label
                          htmlFor="remember"
                          className="text-xs sm:text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-500"
                        >
                          Remember me
                        </label>
                      </div>

                      <Button 
                         type="submit" 
                         disabled={isLoading}
                         className="w-full h-14 sm:h-16 bg-[#003366] text-white font-black uppercase tracking-[0.2em] shadow-xl hover:bg-black hover:translate-y-[-2px] active:translate-y-[1px] transition-all duration-300 rounded-none text-sm sm:text-base"
                      >
                         {isLoading ? "Signing in..." : "Sign In"}
                      </Button>
                   </form>
                </div>
             </div>
          </div>

          {/* Left Side (Promo) - Below on Mobile */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start order-2 lg:order-1">
             <div className="bg-white/90 backdrop-blur-md p-6 sm:p-12 rounded-2xl sm:rounded-3xl shadow-xl max-w-xl border border-white/20">
                <div className="space-y-4 sm:space-y-6">
                   <h2 className="text-2xl sm:text-5xl font-black text-[#003366] leading-tight tracking-tighter">
                     Discover our new <br/>
                     <span className="text-blue-600">8.2% mortgages</span>
                   </h2>
                   <p className="text-gray-600 text-sm sm:text-xl font-light leading-relaxed">
                     Federally insured by the National Credit Union Administration.
                   </p>
                   
                   <div className="relative h-32 sm:h-64 w-full my-4 sm:my-8 group overflow-hidden rounded-xl sm:rounded-2xl hidden xs:block">
                      <Image
                        src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800"
                        alt="Teal Credit Card"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                   </div>

                   <Button className="rounded-none bg-[#003366] px-6 py-6 sm:px-10 sm:py-8 text-xs sm:text-sm font-bold uppercase tracking-widest text-white hover:bg-black transition-all flex items-center gap-3">
                     Find out more
                     <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                   </Button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
