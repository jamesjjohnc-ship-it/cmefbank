"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { adminUpdateUserMetrics, adminBulkCreateTransactions } from "@/actions";
import { Loader2, Plus, RefreshCw, Save, ShieldCheck, Zap } from "lucide-react";

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
          bankName: "Pinnacle Internal",
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
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-[#003366] p-3 rounded-xl shadow-lg">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Pinnacle Control</h1>
              <p className="text-slate-500 font-medium">System Administration & Data Injection</p>
            </div>
          </div>
          <div className="hidden md:block">
             <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest border border-green-200">
                System Active
             </span>
          </div>
        </div>

        {/* Target Selector */}
        <Card className="border-0 shadow-sm">
           <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 space-y-2">
                   <Label className="text-[10px] font-black uppercase tracking-widest text-[#003366]">Target User Email</Label>
                   <Input 
                     value={email} 
                     onChange={(e) => setEmail(e.target.value)} 
                     placeholder="email@example.com"
                     className="h-12 border-slate-200 bg-white"
                   />
                </div>
                <div className="text-xs text-slate-400 italic pb-3">Currently managing: <strong>{email}</strong></div>
              </div>
           </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Metrics Editor */}
          <Card className="border-0 shadow-xl overflow-hidden">
             <CardHeader className="bg-slate-900 text-white">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-blue-400" />
                  Account Metrics
                </CardTitle>
                <CardDescription className="text-slate-400">Set real-time balance values</CardDescription>
             </CardHeader>
             <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-600">Total Balance ($)</Label>
                    <Input 
                       type="number"
                       value={balances.balance}
                       onChange={(e) => setBalances({...balances, balance: parseFloat(e.target.value)})}
                       className="font-mono text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-600">Available Balance ($)</Label>
                    <Input 
                       type="number"
                       value={balances.availableBalance}
                       onChange={(e) => setBalances({...balances, availableBalance: parseFloat(e.target.value)})}
                       className="font-mono text-lg text-blue-600"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-600">Sent (Month)</Label>
                      <Input 
                         type="number"
                         value={balances.sentThisMonth}
                         onChange={(e) => setBalances({...balances, sentThisMonth: parseFloat(e.target.value)})}
                         className="font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-600">Pending</Label>
                      <Input 
                         type="number"
                         value={balances.pendingAmount}
                         onChange={(e) => setBalances({...balances, pendingAmount: parseFloat(e.target.value)})}
                         className="font-mono text-amber-600"
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleUpdateBalances}
                  disabled={loading}
                  className="w-full h-14 bg-[#003366] hover:bg-black text-white font-bold uppercase tracking-widest gap-2"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  Synchronize DB
                </Button>
             </CardContent>
          </Card>

          {/* Transaction Factory */}
          <Card className="border-0 shadow-xl overflow-hidden">
             <CardHeader className="bg-blue-600 text-white">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-300" />
                  History Factory
                </CardTitle>
                <CardDescription className="text-blue-100">Mass inject realistic transaction logs</CardDescription>
             </CardHeader>
             <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-600">Start Date</Label>
                      <Input 
                         type="date"
                         value={genConfig.startDate}
                         onChange={(e) => setGenConfig({...genConfig, startDate: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-600">End Date</Label>
                      <Input 
                         type="date"
                         value={genConfig.endDate}
                         onChange={(e) => setGenConfig({...genConfig, endDate: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-600">Min Amount</Label>
                      <Input 
                         type="number"
                         value={genConfig.minAmount}
                         onChange={(e) => setGenConfig({...genConfig, minAmount: parseInt(e.target.value)})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-600">Max Amount</Label>
                      <Input 
                         type="number"
                         value={genConfig.maxAmount}
                         onChange={(e) => setGenConfig({...genConfig, maxAmount: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-slate-600">Transaction Count</Label>
                    <Input 
                       type="number"
                       value={genConfig.count}
                       onChange={(e) => setGenConfig({...genConfig, count: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleGenerateTransactions}
                  disabled={genLoading}
                  className="w-full h-14 bg-black hover:bg-slate-800 text-white font-bold uppercase tracking-widest gap-2"
                >
                  {genLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                  Inject Transactions
                </Button>
                <p className="text-[10px] text-center text-slate-400">Transactions are randomized based on standard banking descriptions and merchants.</p>
             </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
