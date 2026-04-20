"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { adminUpdateUserMetrics, adminBulkCreateTransactions, getUserByEmail } from "@/actions";
import { Loader2, Plus, RefreshCw, Save, ShieldCheck, Zap, Search, User } from "lucide-react";

const MERCHANTS_INCOME = [
  "Massachusetts Institute of Technology",
  "Sotheby's International Realty",
  "Harvard Business School",
  "Silicon Valley Startup",
  "Global Banking Corp",
  "Machine Learning Startup",
  "National Science Foundation",
  "JLL Commercial Real Estate",
  "Stanford Graduate School of Business"
];

const MERCHANTS_EXPENSE = [
  "Sarah Martinez - Virtual Assistant",
  "James Chen - Lead Developer",
  "David Rodriguez - Property Management",
  "Michael Thompson - Technical Writer",
  "Alex Johnson - Full Stack Engineer",
  "Lisa Wang - React Specialist",
  "Carlos Mendez - Backend Engineer",
  "Jennifer Lee - UI/UX Designer",
  "Rachel Green - Accounting Services"
];

const DESCRIPTIONS_INCOME = [
  "Monthly Salary - Dean of Engineering",
  "Real Estate Commission - Luxury Estate",
  "Research Grant - AI Ethics Program",
  "Web Development - Enterprise Platform",
  "Consulting - AI/ML Implementation",
  "Summer Teaching - Executive MBA"
];

const DESCRIPTIONS_EXPENSE = [
  "ACH Payment - Virtual Assistant Services",
  "ACH Payment - Lead Developer Fee",
  "ACH Payment - Property Maintenance",
  "ACH Payment - Technical Documentation",
  "ACH Payment - Full Stack Support",
  "ACH Payment - SEO & Digital Marketing"
];

export default function AdminPage() {
  const [email, setEmail] = useState("Danielhalltag@gmail.com");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [genLoading, setGenLoading] = useState(false);

  // Balance States
  const [balances, setBalances] = useState({
    balance: 9912458.37,
    availableBalance: 912458.37,
    sentThisMonth: 33250.00,
    pendingAmount: 3000.00
  });

  // Generator States
  const [genConfig, setGenConfig] = useState({
    count: 20,
    minAmount: 1000,
    maxAmount: 50000,
    startDate: "2024-01-01",
    endDate: new Date().toISOString().split('T')[0]
  });

  const handleFetchUser = async () => {
    if (!email) return toast.error("Enter an email first");
    setFetchLoading(true);
    try {
      const res = await getUserByEmail(email);
      if (res.success && res.user) {
        setBalances({
          balance: Number(res.user.balance),
          availableBalance: Number(res.user.availableBalance),
          sentThisMonth: Number(res.user.sentThisMonth),
          pendingAmount: Number(res.user.pendingAmount)
        });
        toast.success("User data loaded successfully!");
      } else {
        toast.error("User not found or error fetching data.");
      }
    } catch (err) {
      toast.error("Failed to fetch user data.");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleUpdateBalances = async () => {
    setLoading(true);
    try {
      const res = await adminUpdateUserMetrics(email, balances);
      if (res.success) {
        toast.success("User metrics updated successfully!");
      } else {
        toast.error("Failed to update: " + (res as any).message);
      }
    } catch (err) {
      toast.error("An error occurred during update.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateTransactions = async () => {
    setGenLoading(true);
    try {
      const generated = [];
      const start = new Date(genConfig.startDate).getTime();
      const end = new Date(genConfig.endDate).getTime();

      for (let i = 0; i < genConfig.count; i++) {
        const isIncome = Math.random() > 0.6; // 40% income
        const amount = Math.floor(Math.random() * (genConfig.maxAmount - genConfig.minAmount + 1)) + genConfig.minAmount;
        const randomDate = new Date(start + Math.random() * (end - start));
        
        generated.push({
          description: isIncome 
            ? DESCRIPTIONS_INCOME[Math.floor(Math.random() * DESCRIPTIONS_INCOME.length)]
            : DESCRIPTIONS_EXPENSE[Math.floor(Math.random() * DESCRIPTIONS_EXPENSE.length)],
          merchant: isIncome
            ? MERCHANTS_INCOME[Math.floor(Math.random() * MERCHANTS_INCOME.length)]
            : MERCHANTS_EXPENSE[Math.floor(Math.random() * MERCHANTS_EXPENSE.length)],
          amount: isIncome ? amount : -amount,
          type: isIncome ? "income" : "expense",
          createdAt: randomDate,
          bankName: "CMEF Internal",
          status: "completed"
        });
      }

      const res = await adminBulkCreateTransactions(email, generated);
      if (res.success) {
        toast.success(`Successfully generated ${res.count} transactions!`);
      } else {
        toast.error("Failed to generate: " + (res as any).message);
      }
    } catch (err) {
      toast.error("An error occurred during generation.");
    } finally {
      setGenLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-4 border-[#B91C1C] pb-6">
          <div className="flex items-center gap-5">
            <div className="bg-[#B91C1C] p-4 rounded-none shadow-xl transform rotate-3">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Institutional Control</h1>
              <p className="text-[#B91C1C] font-black text-xs uppercase tracking-[0.3em]">CMEF Private Banking Systems</p>
            </div>
          </div>
          <div className="hidden md:block">
             <div className="flex flex-col items-end">
                <span className="px-6 py-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] border-none">
                   System Administrator
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">Terminal Active: {new Date().toLocaleTimeString()}</span>
             </div>
          </div>
        </div>

        {/* Target Selector */}
        <Card className="rounded-none border-none shadow-2xl bg-white overflow-hidden">
           <div className="h-2 bg-[#B91C1C]"></div>
           <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6 items-end">
                <div className="flex-1 space-y-3">
                   <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                     <User className="w-4 h-4 text-[#B91C1C]" />
                     Target Account Email
                   </Label>
                   <div className="flex gap-2">
                      <Input 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="email@example.com"
                        className="h-14 rounded-none border-slate-200 bg-slate-50 font-bold text-lg focus:ring-red-600"
                      />
                      <Button 
                        onClick={handleFetchUser}
                        disabled={fetchLoading}
                        className="h-14 px-8 rounded-none bg-slate-900 hover:bg-[#B91C1C] text-white font-black uppercase tracking-widest transition-all gap-2 shadow-lg"
                      >
                         {fetchLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                         Fetch
                      </Button>
                   </div>
                </div>
              </div>
           </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Metrics Editor */}
          <Card className="rounded-none border-none shadow-2xl bg-white">
             <CardHeader className="bg-slate-900 text-white rounded-none border-b-4 border-[#B91C1C]">
                <CardTitle className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                  <RefreshCw className="w-6 h-6 text-[#B91C1C]" />
                  Ledger Modification
                </CardTitle>
                <CardDescription className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Adjust real-time institutional balances</CardDescription>
             </CardHeader>
             <CardContent className="p-8 space-y-8">
                <div className="space-y-6">
                  <div className="p-4 bg-slate-50 border-l-4 border-slate-900 space-y-3">
                    <Label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Ledger Balance ($)</Label>
                    <Input 
                       type="number"
                       value={balances.balance}
                       onChange={(e) => setBalances({...balances, balance: parseFloat(e.target.value)})}
                       className="font-mono text-2xl font-black border-none bg-transparent p-0 h-auto focus:ring-0"
                    />
                  </div>
                  <div className="p-4 bg-red-50 border-l-4 border-[#B91C1C] space-y-3">
                    <Label className="text-[10px] font-black text-[#B91C1C] uppercase tracking-widest">Available Cash ($)</Label>
                    <Input 
                       type="number"
                       value={balances.availableBalance}
                       onChange={(e) => setBalances({...balances, availableBalance: parseFloat(e.target.value)})}
                       className="font-mono text-2xl font-black border-none bg-transparent p-0 h-auto focus:ring-0 text-[#B91C1C]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 border border-slate-100 space-y-2">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sent (Monthly)</Label>
                      <Input 
                         type="number"
                         value={balances.sentThisMonth}
                         onChange={(e) => setBalances({...balances, sentThisMonth: parseFloat(e.target.value)})}
                         className="font-mono font-bold"
                      />
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-100 space-y-2">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending Clear</Label>
                      <Input 
                         type="number"
                         value={balances.pendingAmount}
                         onChange={(e) => setBalances({...balances, pendingAmount: parseFloat(e.target.value)})}
                         className="font-mono font-bold text-amber-600"
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleUpdateBalances}
                  disabled={loading}
                  className="w-full h-16 rounded-none bg-[#B91C1C] hover:bg-black text-white font-black uppercase tracking-[0.2em] shadow-xl transition-all gap-3"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  Synchronize Ledger
                </Button>
             </CardContent>
          </Card>

          {/* Transaction Factory */}
          <Card className="rounded-none border-none shadow-2xl bg-white">
             <CardHeader className="bg-[#B91C1C] text-white rounded-none border-b-4 border-black">
                <CardTitle className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                  <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
                  History Forge
                </CardTitle>
                <CardDescription className="text-white/80 font-bold text-[10px] uppercase tracking-widest">Generate high-volume institutional transaction logs</CardDescription>
             </CardHeader>
             <CardContent className="p-8 space-y-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Historical Start</Label>
                      <Input 
                         type="date"
                         value={genConfig.startDate}
                         onChange={(e) => setGenConfig({...genConfig, startDate: e.target.value})}
                         className="rounded-none border-slate-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Historical End</Label>
                      <Input 
                         type="date"
                         value={genConfig.endDate}
                         onChange={(e) => setGenConfig({...genConfig, endDate: e.target.value})}
                         className="rounded-none border-slate-200"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Min Value ($)</Label>
                      <Input 
                         type="number"
                         value={genConfig.minAmount}
                         onChange={(e) => setGenConfig({...genConfig, minAmount: parseInt(e.target.value)})}
                         className="rounded-none border-slate-200 font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Max Value ($)</Label>
                      <Input 
                         type="number"
                         value={genConfig.maxAmount}
                         onChange={(e) => setGenConfig({...genConfig, maxAmount: parseInt(e.target.value)})}
                         className="rounded-none border-slate-200 font-bold"
                      />
                    </div>
                  </div>
                  <div className="space-y-3 p-4 bg-slate-900 text-white">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Injection Volume (Records)</Label>
                    <Input 
                       type="number"
                       value={genConfig.count}
                       onChange={(e) => setGenConfig({...genConfig, count: parseInt(e.target.value)})}
                       className="rounded-none border-none bg-transparent font-black text-2xl p-0 h-auto focus:ring-0 text-white"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleGenerateTransactions}
                  disabled={genLoading}
                  className="w-full h-16 rounded-none bg-black hover:bg-slate-800 text-white font-black uppercase tracking-[0.2em] shadow-xl transition-all gap-3"
                >
                  {genLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                  Inject Audit Trail
                </Button>
                <div className="p-4 border border-slate-100 italic text-[10px] text-slate-400 text-center">
                   System warning: High volume injections will overwrite current dashboard trends. 
                </div>
             </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
