"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Send,
  Plus,
  Eye,
  EyeOff,
  LogOut,
  TrendingDown,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { useEffect } from "react";
import TransactionDetailDrawer, { TransactionItem } from "./transaction-detail-drawer";
// import { mockTransactions } from "./data"; // Remove mock data
import { getTransactions } from "@/actions";

import { TransactionHistory } from "./transaction-detail-drawer";
import CardsComponent, { CardItem } from "./cardsPage";
import { toast } from "sonner";
import Image from "next/image";
import { useAppContext } from "@/app/context/appcontext";
import { useRouter } from "next/navigation";

interface DashboardPageProps {
  data?: Record<string, any>;
}

export default function DashboardPage({
  data,
}: DashboardPageProps) {
  const { handleLogout } = useAppContext();
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(true);
  const [isCardsDrawerOpen, setIsCardsDrawerOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoadingTx, setIsLoadingTx] = useState(true);

  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  useEffect(() => {
    async function loadTransactions() {
      if (!data?.id) return;
      setIsLoadingTx(true);
      const res = await getTransactions(data.id);
      if (res.success) {
        setTransactions(res.transactions);
      }
      setIsLoadingTx(false);
    }
    loadTransactions();
  }, [data?.id]);

  const balance = data?.balance || 0;
  const availableBalance = data?.availableBalance || 0;
  const pendingAmount = data?.pendingAmount || 0;
  const sentThisMonth = data?.sentThisMonth || 0;

  const hours = new Date().getHours();
  const greeting =
    hours < 12
      ? "Good Morning"
      : hours < 18
      ? "Good Afternoon"
      : "Good Evening";

  const handleTransactionClick = (transaction: any) => {
    setSelectedTransaction(transaction);
    setShowAllTransactions(false);
    setIsDrawerOpen(true);
  };

  const handleViewAll = () => {
    setSelectedTransaction(null);
    setShowAllTransactions(true);
    setIsDrawerOpen(true);
  };

  const mockCards: CardItem[] = [
    {
      id: 1,
      type: "Visa Platinum",
      number: "•••• 1534",
      balance: 252300,
      status: "active",
    },
    {
      id: 2,
      type: "MasterCard Gold",
      number: "•••• 5128",
      balance: 271250,
      status: "locked",
    },
    {
      id: 3,
      type: "Amex Green",
      number: "•••• 9012",
      balance: 131200,
      status: "active",
    },
  ];

  const mockSpendingData = [
    { month: "Aug", amount: 145000, income: 320000 },
    { month: "Sep", amount: 168000, income: 340000 },
    { month: "Oct", amount: 157000, income: 335000 },
    { month: "Nov", amount: 174000, income: 360000 },
  ];
  
  const mockCategoryData = [
    { name: "Real Estate Acquisitions", value: 1250000, color: "#1A5DAD" },
    { name: "SaaS", value: 980000, color: "#10B981" },
    { name: "Asset Management", value: 620000, color: "#8B5CF6" },
    { name: "Philanthropy", value: 450000, color: "#EF4444" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
              <span className="text-primary-foreground font-bold">
                <Image
                  width={400}
                  height={100}
                  alt="hello"
                  src="/pinnacle.png"
                />
              </span>
            </div>
            <h1 className="text-xl font-bold text-foreground">Pinnacle Bank</h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="h-10 text-sm bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 pb-32">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {greeting},{" "}
            {data?.firstName || data?.lastName
              ? `${data?.firstName ?? ""} ${data?.lastName ?? ""}`.trim()
              : "User"}
            !
          </h2>
          <p className="text-muted-foreground">
            Here's your financial overview
          </p>
        </div>

        {/* Account Balance Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2 bg-[#003366] text-white shadow-xl border-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            <CardContent className="pt-8 pb-8 relative z-10">
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <div>
                    <p className="text-blue-200 text-xs font-black uppercase tracking-[0.2em] mb-1">
                      Total Ledger Balance
                    </p>
                    <div className="flex items-center gap-3">
                      <h3 className="text-4xl sm:text-5xl font-black tracking-tighter">
                        {showBalance
                          ? `$${Number(balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}`
                          : "••••••"}
                      </h3>
                      <button
                        onClick={() => setShowBalance(!showBalance)}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                      >
                        {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                     <p className="text-blue-300 text-[10px] font-black uppercase tracking-widest mb-1">Available Balance</p>
                     <p className="text-2xl font-bold text-white">
                        {showBalance ? `$${Number(availableBalance).toLocaleString(undefined, { minimumFractionDigits: 2 })}` : "••••••"}
                     </p>
                  </div>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                   <Wallet className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
             <Card className="bg-white border-0 shadow-lg group hover:translate-y-[-4px] transition-all">
                <CardContent className="p-6">
                   <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                         <TrendingDown className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">This Month</span>
                   </div>
                   <p className="text-slate-500 text-xs font-bold uppercase tracking-tight mb-1">Sent This Month</p>
                   <h4 className="text-2xl font-black text-slate-900">
                      ${Number(sentThisMonth).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                   </h4>
                </CardContent>
             </Card>

             <Card className="bg-white border-0 shadow-lg group hover:translate-y-[-4px] transition-all">
                <CardContent className="p-6">
                   <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
                         <RefreshCw className="w-5 h-5 text-amber-600 animate-spin-slow" />
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Awaiting</span>
                   </div>
                   <p className="text-slate-500 text-xs font-bold uppercase tracking-tight mb-1">Pending Transfer</p>
                   <h4 className="text-2xl font-black text-slate-900">
                      ${Number(pendingAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                   </h4>
                </CardContent>
             </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button
            onClick={() => router.push("/dashboard/transfers")}
            className="h-16 flex flex-col items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg"
          >
            <Send className="w-5 h-5" />
            <span className="text-xs font-medium">Send Money</span>
          </Button>
          <Button
            onClick={() => {
              toast("Try Again!", {
                description: "Service unavailable at the moment.",
              });
            }}
            variant="outline"
            className="h-16 flex flex-col items-center justify-center gap-2 rounded-lg bg-transparent"
          >
            <Plus className="w-5 h-5" />
            <span className="text-xs font-medium">Add Money</span>
          </Button>
          <Button
            onClick={() => router.push("/dashboard/invest")}
            variant="outline"
            className="h-16 flex flex-col items-center justify-center gap-2 rounded-lg bg-transparent"
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs font-medium">Invest</span>
          </Button>
          <Button
            onClick={() => router.push("/dashboard/merchandize")}
            variant="outline"
            className="h-16 flex flex-col items-center justify-center gap-2 rounded-lg bg-transparent"
          >
            <Send className="w-5 h-5 text-accent" />
            <span className="text-xs font-medium">Merchandize</span>
          </Button>
          <Button
            variant="outline"
            className="h-16 flex flex-col items-center justify-center gap-2 rounded-lg bg-transparent"
          >
            <Wallet className="w-5 h-5" />
            <span
              onClick={() => setIsCardsDrawerOpen(true)}
              className="text-xs font-medium"
            >
              Cards
            </span>
          </Button>
        </div>

        {/* Enhanced Stats Grid with Better Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Income vs Spending Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Income vs Spending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart
                  data={mockSpendingData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorIncome"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--color-chart-1))"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--color-chart-1))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorSpending"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--color-chart-2))"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--color-chart-2))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-border)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    stroke="var(--color-muted-foreground)"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis
                    stroke="var(--color-muted-foreground)"
                    style={{ fontSize: "12px" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "0.5rem",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                    formatter={(value) => `$${value}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="hsl(var(--color-chart-1))"
                    fillOpacity={1}
                    fill="url(#colorIncome)"
                    name="Income"
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="hsl(var(--color-chart-2))"
                    fillOpacity={1}
                    fill="url(#colorSpending)"
                    name="Spending"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Spending by Category */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Spending by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                <div className="w-full md:w-auto flex justify-center">
                  <ResponsiveContainer width={180} height={220}>
                    <PieChart>
                      <Pie
                        data={mockCategoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                      >
                        {mockCategoryData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            stroke="white"
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full md:w-auto flex flex-col justify-center gap-4">
                  {mockCategoryData.map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 whitespace-nowrap"
                    >
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0 border border-white/20"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm text-muted-foreground flex-1">
                        {category.name}
                      </span>
                      <span className="text-sm font-semibold text-foreground ml-4">
                        ${category.value.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">
                Recent Transactions
              </CardTitle>
              <button
                onClick={handleViewAll}
                className="text-sm text-accent hover:underline font-medium"
              >
                View All
              </button>
            </div>
          </CardHeader>
          <CardContent className="px-3">
            <div className="space-y-1">
              {isLoadingTx ? (
                <div className="flex flex-col items-center py-12 gap-4">
                   <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                   <p className="text-sm font-medium text-slate-400">Loading your history...</p>
                </div>
              ) : transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <button
                    key={transaction.id}
                    onClick={() => handleTransactionClick(transaction)}
                    className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-all group cursor-pointer border border-transparent hover:border-slate-100"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                          transaction.type === "income"
                            ? "bg-green-50"
                            : "bg-slate-50"
                        }`}
                      >
                        {transaction.type === "income" ? (
                          <ArrowDownLeft className="w-6 h-6 text-green-600" />
                        ) : (
                          <ArrowUpRight className="w-6 h-6 text-slate-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="font-bold text-slate-900 text-sm truncate">
                          {transaction.description}
                        </p>
                        <p className="text-xs font-medium text-slate-400">
                          {transaction.merchant}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-black text-sm ${
                          transaction.type === "income"
                            ? "text-green-600"
                            : "text-slate-900"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : ""}$
                        {Math.abs(transaction.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        {new Date(transaction.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-12">
                   <p className="text-slate-400 font-medium">No transactions found.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Main Content End */}

      {/* Transaction Detail Drawer Component */}
      <TransactionDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedTransaction(null);
          setShowAllTransactions(false);
        }}
        title={showAllTransactions ? "All Transactions" : "Transaction Details"}
      >
        {showAllTransactions ? (
          <TransactionHistory
            transactions={transactions}
            onTransactionClick={handleTransactionClick}
          />
        ) : selectedTransaction ? (
          <TransactionItem transaction={selectedTransaction} />
        ) : null}
      </TransactionDetailDrawer>

      <TransactionDetailDrawer
        isOpen={isCardsDrawerOpen}
        onClose={() => {
          setIsCardsDrawerOpen(false);
          setSelectedCard(null);
        }}
        title={selectedCard ? selectedCard.type : "My Cards"}
      >
        <CardsComponent
          cards={mockCards}
          onAddCard={() => console.log("Add card clicked")}
          onToggleCardStatus={(cardId) =>
            console.log("Toggle card status", cardId)
          }
        />
      </TransactionDetailDrawer>
    </div>
  );
}
