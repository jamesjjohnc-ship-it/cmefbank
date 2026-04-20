"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Send,
  ArrowLeft,
  Building2,
  User,
  History,
  Printer,
  CheckCircle2,
  CreditCard,
  Search,
  ArrowRight,
  Info,
  Globe,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import BottomNav from "./bottomNav";
import { useAppContext } from "@/app/context/appcontext";
import { createTransaction, getTransactions } from "@/actions";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { TransactionPDF } from "./pdf-receipt";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "de", name: "Deutsch" },
  { code: "fr", name: "Français" },
  { code: "es", name: "Español" },
];

const TRANSLATIONS: Record<string, any> = {
  en: {
    merchandize: "Merchandize",
    securePortal: "Secure Transfer Portal",
    globalNetwork: "Global Network",
    institutionalSettlement: "Institutional Settlement",
    heroDescription: "Authorize high-volume merchandize transfers across the global CMEF network. Each transaction is protected by 256-bit AES encryption and requires manual account manager approval.",
    swiftReady: "SWIFT/BIC Ready",
    amlVerified: "AML Verified",
    mandatoryInfo: "Mandatory Recipient Information",
    senderNameLabel: "Sender's Full Name *",
    senderNamePlaceholder: "Enter your full name",
    recipientNameLabel: "Recipient's Full Name *",
    recipientNamePlaceholder: "Enter recipient full name",
    currencyLabel: "Settlement Currency *",
    currencyPlaceholder: "Select Currency",
    accountNumberLabel: "Account Number *",
    accountNumberPlaceholder: "Enter recipient account number",
    bankNameLabel: "Bank Name *",
    bankNamePlaceholder: "Enter recipient bank name",
    routingNumberLabel: "Routing Number",
    routingNumberPlaceholder: "Optional routing number",
    ibanLabel: "IBAN / Swift Code",
    ibanPlaceholder: "Optional IBAN/Swift",
    amountLabel: "Amount to Settle",
    descriptionLabel: "Description / Internal Reference",
    descriptionPlaceholder: "Enter transaction description...",
    finalizeAuth: "Finalize Authorization",
    processing: "Processing Security Protocol...",
    transferArchive: "Transfer Archive",
    noHistory: "No merchandize history available",
    transfer: "Transfer",
    from: "From",
    transferInitiated: "Transfer Initiated",
    progress: "Progress: 90% Complete",
    amountAuthorized: "Amount Authorized",
    sender: "Sender",
    recipientName: "Recipient Name",
    recipientBank: "Recipient Bank",
    accountNumber: "Account Number",
    statusText: "The transfer is currently 90% complete. To authorize and finalize the transaction, please contact the sender or the recipient bank for immediate processing.",
    close: "Close",
    receipt: "Receipt",
  },
  de: {
    merchandize: "Handelswaren",
    securePortal: "Sicheres Überweisungsportal",
    globalNetwork: "Globales Netzwerk",
    institutionalSettlement: "Institutionelle Abwicklung",
    heroDescription: "Autorisieren Sie großvolumige Warentransfers über das globale CMEF-Netzwerk. Jede Transaktion ist durch eine 256-Bit-AES-Verschlüsselung geschützt und erfordert die manuelle Genehmigung durch den Kundenbetreuer.",
    swiftReady: "SWIFT/BIC Bereit",
    amlVerified: "AML Verifiziert",
    mandatoryInfo: "Erforderliche Empfängerdaten",
    senderNameLabel: "Vollständiger Name des Absenders *",
    senderNamePlaceholder: "Geben Sie Ihren vollständigen Namen ein",
    recipientNameLabel: "Vollständiger Name des Empfängers *",
    recipientNamePlaceholder: "Geben Sie den Namen des Empfängers ein",
    currencyLabel: "Abrechnungswährung *",
    currencyPlaceholder: "Währung auswählen",
    accountNumberLabel: "Kontonummer *",
    accountNumberPlaceholder: "Geben Sie die Kontonummer des Empfängers ein",
    bankNameLabel: "Name der Bank *",
    bankNamePlaceholder: "Geben Sie den Namen der Bank des Empfängers ein",
    routingNumberLabel: "Routing-Nummer",
    routingNumberPlaceholder: "Optionale Routing-Nummer",
    ibanLabel: "IBAN / Swift-Code",
    ibanPlaceholder: "Optionaler IBAN/Swift-Code",
    amountLabel: "Auszuzahlender Betrag",
    descriptionLabel: "Beschreibung / Interne Referenz",
    descriptionPlaceholder: "Geben Sie eine Transaktionsbeschreibung ein...",
    finalizeAuth: "Autorisierung abschließen",
    processing: "Sicherheitsprotokoll wird verarbeitet...",
    transferArchive: "Überweisungsarchiv",
    noHistory: "Keine Transaktionshistorie verfügbar",
    transfer: "Überweisung",
    from: "Von",
    transferInitiated: "Überweisung Eingeleitet",
    progress: "Fortschritt: 90% Abgeschlossen",
    amountAuthorized: "Autorisierter Betrag",
    sender: "Absender",
    recipientName: "Name des Empfängers",
    recipientBank: "Name der Bank",
    accountNumber: "Kontonummer",
    statusText: "Die Überweisung ist derzeit zu 90% abgeschlossen. Um die Transaktion zu autorisieren und abzuschließen, wenden Sie sich bitte an den Absender oder die Empfängerbank für eine sofortige Bearbeitung.",
    close: "Schließen",
    receipt: "Beleg",
  },
  fr: {
    merchandize: "Marchandise",
    securePortal: "Portail de Transfert Sécurisé",
    globalNetwork: "Réseau Mondial",
    institutionalSettlement: "Règlement Institutionnel",
    heroDescription: "Autorisez des transferts de marchandises de gros volume sur le réseau mondial CMEF. Chaque transaction est protégée par un cryptage AES 256 bits et nécessite l'approbation manuelle d'un gestionnaire de compte.",
    swiftReady: "Prêt pour SWIFT/BIC",
    amlVerified: "Vérifié AML",
    mandatoryInfo: "Informations Obligatoires du Destinataire",
    senderNameLabel: "Nom Complet de l'Expéditeur *",
    senderNamePlaceholder: "Entrez votre nom complet",
    recipientNameLabel: "Nom Complet du Destinataire *",
    recipientNamePlaceholder: "Entrez le nom complet du destinataire",
    currencyLabel: "Devise de Règlement *",
    currencyPlaceholder: "Sélectionnez la devise",
    accountNumberLabel: "Numéro de Compte *",
    accountNumberPlaceholder: "Entrez le numéro de compte du destinataire",
    bankNameLabel: "Nom de la Banque *",
    bankNamePlaceholder: "Entrez le nom de la banque du destinataire",
    routingNumberLabel: "Numéro de Routage",
    routingNumberPlaceholder: "Numéro de routage optionnel",
    ibanLabel: "IBAN / Code Swift",
    ibanPlaceholder: "IBAN/Swift optionnel",
    amountLabel: "Montant à Régler",
    descriptionLabel: "Description / Référence Interne",
    descriptionPlaceholder: "Entrez la description de la transaction...",
    finalizeAuth: "Finaliser l'Autorisation",
    processing: "Traitement du Protocole de Sécurité...",
    transferArchive: "Archives des Transferts",
    noHistory: "Aucun historique de marchandise disponible",
    transfer: "Transfert",
    from: "De",
    transferInitiated: "Transfert Initié",
    progress: "Progression: 90% Terminée",
    amountAuthorized: "Montant Autorisé",
    sender: "Expéditeur",
    recipientName: "Nom du Destinataire",
    recipientBank: "Banque du Destinataire",
    accountNumber: "Numéro de Compte",
    statusText: "Le transfert est actuellement terminé à 90%. Pour autoriser et finaliser la transaction, veuillez contacter l'expéditeur ou la banque destinataire pour un traitement immédiat.",
    close: "Fermer",
    receipt: "Reçu",
  },
  es: {
    merchandize: "Mercancía",
    securePortal: "Portal de Transferencia Segura",
    globalNetwork: "Red Global",
    institutionalSettlement: "Liquidación Institucional",
    heroDescription: "Autorice transferencias de mercancías de gran volumen a través de la red global de CMEF. Cada transacción está protegida por un cifrado AES de 256 bits y requiere la aprobación manual del administrador de la cuenta.",
    swiftReady: "Preparado para SWIFT/BIC",
    amlVerified: "Verificado por AML",
    mandatoryInfo: "Información Obligatoria del Destinatario",
    senderNameLabel: "Nombre Completo del Remitente *",
    senderNamePlaceholder: "Ingrese su nombre completo",
    recipientNameLabel: "Nombre Completo del Destinatario *",
    recipientNamePlaceholder: "Ingrese el nombre completo del destinatario",
    currencyLabel: "Moneda de Liquidación *",
    currencyPlaceholder: "Seleccione Moneda",
    accountNumberLabel: "Número de Cuenta *",
    accountNumberPlaceholder: "Ingrese el número de cuenta del destinatario",
    bankNameLabel: "Nombre del Banco *",
    bankNamePlaceholder: "Ingrese el nombre del banco del destinatario",
    routingNumberLabel: "Número de Ruta",
    routingNumberPlaceholder: "Número de ruta opcional",
    ibanLabel: "IBAN / Código Swift",
    ibanPlaceholder: "IBAN/Swift opcional",
    amountLabel: "Monto a Liquidar",
    descriptionLabel: "Descripción / Referencia Interna",
    descriptionPlaceholder: "Ingrese la descripción de la transacción...",
    finalizeAuth: "Finalizar Autorización",
    processing: "Procesando Protocolo de Seguridad...",
    transferArchive: "Archivo de Transferencias",
    noHistory: "No hay historial de mercancía disponible",
    transfer: "Transferencia",
    from: "De",
    transferInitiated: "Transferencia Iniciada",
    progress: "Progreso: 90% Completado",
    amountAuthorized: "Monto Autorizado",
    sender: "Remitente",
    recipientName: "Nombre del Destinatario",
    recipientBank: "Banco del Destinatario",
    accountNumber: "Número de Cuenta",
    statusText: "La transferencia está actualmente completada al 90%. Para autorizar y finalizar la transacción, póngase en contacto con el remitente o el banco del destinatario para su procesamiento inmediato.",
    close: "Cerrar",
    receipt: "Recibo",
  }
};

const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
  { code: "CAD", symbol: "CA$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
];

export default function MerchandizePage() {
  const { userData, setCurrentPage } = useAppContext();
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("en");
  const [description, setDescription] = useState("");
  const [senderName, setSenderName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [iban, setIban] = useState("");
  const [bankName, setBankName] = useState("");
  
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedTx, setSelectedTx] = useState<any>(null);
  const [lastTxId, setLastTxId] = useState<any>(null);

  const printRef = useRef<HTMLDivElement>(null);

  const fetchTxs = async () => {
    const res = await getTransactions(userData?.user?.id);
    if (res.success && res.transactions) {
      setTransactions(res.transactions);
    }
  };

  useEffect(() => {
    fetchTxs();
  }, [userData]);

  useEffect(() => {
    if (userData?.user && !senderName) {
      setSenderName(`${userData.user.firstName ?? ""} ${userData.user.lastName ?? ""}`.trim());
    }
  }, [userData]);

  const handleTransfer = async () => {
    if (!amount || !accountNumber || !bankName || !senderName || !recipientName) {
      toast.error("Missing Fields", {
        description: "Please fill in all required details, including sender and recipient names",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const payload = {
        amount: parseFloat(amount),
        currency,
        description,
        senderName,
        recipientName,
        accountNumber,
        routingNumber,
        iban,
        bankName,
        userId: userData?.user?.id,
      };

      const res = await createTransaction(payload);

      if (res.success) {
        setLastTxId(res.transaction);
        setShowSuccessModal(true);
        setAmount("");
        setDescription("");
        setRecipientName("");
        setAccountNumber("");
        setRoutingNumber("");
        setIban("");
        setBankName("");
        fetchTxs();
      } else {
        toast.error("Transaction Error", { 
          description: res.message || "The database is currently unreachable. Please check your connection."
        });
      }
    } catch (err: any) {
      console.error("Client-side error:", err);
      toast.error("Critical Error", {
        description: "Failed to connect to the authorization server. The database may be down."
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getCurrencySymbol = (code: string) => {
    return CURRENCIES.find(c => c.code === code)?.symbol || "$";
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <div className="min-h-screen bg-background pb-32 font-sans overflow-x-hidden">
      {/* Premium Header */}
      <header className="bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentPage("home")}
              className="p-2.5 hover:bg-muted rounded-2xl transition-all active:scale-95 bg-muted/50"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div>
              <h1 className="text-xl font-black tracking-tight text-foreground">{t.merchandize}</h1>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">{t.securePortal}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <Select value={language} onValueChange={setLanguage}>
               <SelectTrigger className="h-9 w-28 bg-muted/50 border-transparent text-[10px] font-bold uppercase tracking-widest">
                 <SelectValue placeholder="Language" />
               </SelectTrigger>
               <SelectContent>
                 {LANGUAGES.map((l) => (
                   <SelectItem key={l.code} value={l.code} className="text-[10px] uppercase font-bold">
                     {l.name}
                   </SelectItem>
                 ))}
               </SelectContent>
             </Select>
             <div className="hidden sm:flex px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-black uppercase text-primary tracking-tighter">{t.globalNetwork}</span>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Improved Hero / Stats Upper Part */}
        <div className="relative group">
           <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-[2.5rem] blur-2xl opacity-50 transition-all group-hover:opacity-100" />
           <Card className="relative border-0 shadow-2xl bg-black/5 dark:bg-white/5 backdrop-blur-sm overflow-hidden rounded-[2rem]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20" />
              <CardContent className="p-10 flex flex-col md:flex-row items-center gap-8">
                 <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/40 rotate-3">
                    <Send className="w-10 h-10 text-white" />
                 </div>
                 <div className="text-center md:text-left space-y-2">
                    <h2 className="text-3xl font-black tracking-tighter uppercase italic">{t.institutionalSettlement}</h2>
                    <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-lg">
                       {t.heroDescription}
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                       <span className="px-2 py-1 bg-background rounded-lg text-[9px] font-black border border-border tracking-widest uppercase">{t.swiftReady}</span>
                       <span className="px-2 py-1 bg-background rounded-lg text-[9px] font-black border border-border tracking-widest uppercase">{t.amlVerified}</span>
                    </div>
                 </div>
              </CardContent>
           </Card>
        </div>

        {/* Transfer Form */}
        <Card className="shadow-2xl border-primary/5 rounded-[2rem] overflow-hidden">
          <CardHeader className="bg-muted/50 border-b border-border/50 py-6">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                 <Building2 className="w-5 h-5 text-primary" />
              </div>
              {t.mandatoryInfo}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 pt-8 px-8 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground px-1">
                   {t.senderNameLabel}
                </Label>
                <div className="relative">
                   <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                   <Input
                     placeholder={t.senderNamePlaceholder}
                     value={senderName}
                     onChange={(e) => setSenderName(e.target.value)}
                     className="pl-11 h-12 bg-muted/20 border-transparent focus:bg-background transition-all"
                   />
                </div>
              </div>

              <div className="space-y-2.5">
                <Label className="text-[11px] font-black uppercase tracking-widest text-primary px-1">
                   {t.recipientNameLabel}
                </Label>
                <div className="relative">
                   <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary opacity-60" />
                   <Input
                     placeholder={t.recipientNamePlaceholder}
                     value={recipientName}
                     onChange={(e) => setRecipientName(e.target.value)}
                     className="pl-11 h-12 border-primary/20 focus:border-primary transition-all"
                   />
                </div>
              </div>

              <div className="space-y-2.5">
                <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground px-1">
                   {t.currencyLabel}
                </Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="h-12 bg-muted/20 border-transparent">
                    <SelectValue placeholder={t.currencyPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.code} - {c.name} ({c.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2.5">
                <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground px-1">
                   {t.accountNumberLabel}
                </Label>
                <div className="relative">
                   <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                   <Input
                     placeholder={t.accountNumberPlaceholder}
                     value={accountNumber}
                     onChange={(e) => setAccountNumber(e.target.value)}
                     className="pl-11 h-12 bg-muted/20 border-transparent focus:bg-background transition-all"
                   />
                </div>
              </div>
              <div className="space-y-2.5">
                <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground px-1">
                   {t.bankNameLabel}
                </Label>
                <div className="relative">
                   <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                   <Input
                     placeholder={t.bankNamePlaceholder}
                     value={bankName}
                     onChange={(e) => setBankName(e.target.value)}
                     className="pl-11 h-12 bg-muted/20 border-transparent focus:bg-background transition-all"
                   />
                </div>
              </div>
              <div className="space-y-2.5">
                <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground px-1">{t.routingNumberLabel}</Label>
                <Input
                  placeholder={t.routingNumberPlaceholder}
                  value={routingNumber}
                  onChange={(e) => setRoutingNumber(e.target.value)}
                  className="h-12 bg-muted/20 border-transparent focus:bg-background transition-all"
                />
              </div>
              <div className="space-y-2.5">
                <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground px-1">{t.ibanLabel}</Label>
                <Input
                  placeholder={t.ibanPlaceholder}
                  value={iban}
                  onChange={(e) => setIban(e.target.value)}
                  className="h-12 bg-muted/20 border-transparent focus:bg-background transition-all"
                />
              </div>
              <div className="space-y-2.5 md:col-span-2">
                <Label className="text-[11px] font-black uppercase tracking-widest text-primary px-1">{t.amountLabel} ({getCurrencySymbol(currency)}) *</Label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-2xl text-primary/40 select-none">
                     {getCurrencySymbol(currency)}
                  </span>
                  <Input
                    type="number"
                    className="pl-20 h-20 text-4xl font-black text-primary border-primary/10 bg-primary/5 focus:bg-background transition-all"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2.5 md:col-span-2">
                <Label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground px-1">{t.descriptionLabel}</Label>
                <Textarea
                  placeholder={t.descriptionPlaceholder}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-muted/20 border-transparent focus:bg-background transition-all resize-none"
                  rows={2}
                />
              </div>
            </div>

            <Button
              onClick={handleTransfer}
              disabled={isProcessing || !amount || !accountNumber || !bankName || !senderName || !recipientName}
              className="w-full h-16 text-xl font-black shadow-2xl shadow-primary/30 uppercase tracking-tighter"
            >
              {isProcessing ? t.processing : `${t.finalizeAuth}: ${getCurrencySymbol(currency)} ${amount || "0.00"}`}
            </Button>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <History className="w-5 h-5 text-primary" />
              {t.transferArchive}
            </h2>
          </div>

          <div className="grid gap-4">
            {transactions.length === 0 ? (
              <div className="text-center py-16 bg-muted/20 rounded-2xl border-2 border-dashed border-border">
                <p className="text-muted-foreground font-medium">{t.noHistory}</p>
              </div>
            ) : (
              transactions.map((tx) => (
                <Card key={tx.id} className="hover:shadow-xl transition-all border-l-4 border-l-primary/40 overflow-hidden">
                  <CardContent className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shadow-inner">
                        <Send className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-black text-lg leading-tight">{tx.recipientName || t.transfer}</p>
                        <p className="text-sm text-muted-foreground font-medium mt-1">
                          {tx.bankName} • {tx.accountNumber}
                        </p>
                        <p className="text-[10px] text-primary font-bold uppercase tracking-wider mt-1">
                           {t.from}: {tx.senderName} • {new Date(tx.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-2xl font-black text-foreground">
                          {getCurrencySymbol(tx.currency)} {parseFloat(tx.amount).toLocaleString()}
                        </p>
                        <div className="flex items-center gap-1.5 justify-end mt-1">
                           <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                           <span className="text-[10px] font-black uppercase text-yellow-600 dark:text-yellow-400">
                             {tx.status} (90%)
                           </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <PDFDownloadLink
                          document={<TransactionPDF transaction={tx} language={language} />}
                          fileName={`Receipt-CMEF-${tx.id}.pdf`}
                        >
                          {({ loading }) => (
                            <Button
                              variant="secondary"
                              size="icon"
                              disabled={loading}
                              className="h-12 w-12 rounded-xl"
                            >
                              {loading ? (
                                <div className="w-4 h-4 border-2 border-primary border-t-transparent animate-spin rounded-full" />
                              ) : (
                                <Printer className="w-5 h-5 text-primary" />
                              )}
                            </Button>
                          )}
                        </PDFDownloadLink>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      {/* SUCCESS MODAL */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-0 shadow-2xl">
          <div className="bg-primary p-8 text-white relative overflow-hidden">
             <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
             <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 ring-4 ring-white/10">
                   <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tighter italic">{t.transferInitiated}</h2>
                <div className="mt-4 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center gap-2">
                   <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                   <span className="text-xs font-black uppercase tracking-widest">{t.progress}</span>
                </div>
             </div>
          </div>

          <div className="p-8 space-y-6 bg-card">
              <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-2">
                      <span className="text-xs font-bold text-muted-foreground uppercase opacity-70">{t.amountAuthorized}</span>
                      <span className="text-2xl font-black">
                        {getCurrencySymbol(lastTxId?.currency)} {parseFloat(lastTxId?.amount || "0").toLocaleString()}
                      </span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-4 pt-2">
                      <div className="space-y-0.5">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">{t.sender}</p>
                          <p className="text-sm font-black">{lastTxId?.senderName}</p>
                      </div>
                      <div className="space-y-0.5 text-right">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">{t.recipientName}</p>
                          <p className="text-sm font-black">{lastTxId?.recipientName}</p>
                      </div>
                      <div className="space-y-0.5">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">{t.recipientBank}</p>
                          <p className="text-sm font-black truncate">{lastTxId?.bankName}</p>
                      </div>
                      <div className="space-y-0.5 text-right">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">{t.accountNumber}</p>
                          <p className="text-sm font-mono font-bold">{lastTxId?.accountNumber}</p>
                      </div>
                      {lastTxId?.iban && (
                        <div className="space-y-0.5 col-span-2 border-t border-border pt-2">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase">{t.ibanLabel}</p>
                            <p className="text-sm font-mono font-bold">{lastTxId?.iban}</p>
                        </div>
                      )}
                      {lastTxId?.routingNumber && !lastTxId?.iban && (
                        <div className="space-y-0.5 col-span-2 border-t border-border pt-2">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase">{t.routingNumberLabel}</p>
                            <p className="text-sm font-mono font-bold">{lastTxId?.routingNumber}</p>
                        </div>
                      )}
                  </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 p-4 rounded-xl flex items-start gap-4">
                  <div className="mt-1">
                     <Info className="w-5 h-5 text-yellow-600" />
                  </div>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium leading-tight text-center">
                    {t.statusText}
                  </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button onClick={() => setShowSuccessModal(false)} variant="outline" className="h-14 text-sm font-black uppercase">
                  {t.close}
                </Button>
                {lastTxId && (
                  <PDFDownloadLink
                    document={<TransactionPDF transaction={lastTxId} language={language} />}
                    fileName={`Receipt-CMEF-${lastTxId.id}.pdf`}
                  >
                    {({ loading }) => (
                      <Button disabled={loading} className="w-full h-14 text-sm font-black uppercase shadow-lg flex items-center justify-center gap-2">
                        {loading ? "Building..." : <><Printer className="w-4 h-4" /> {t.receipt}</>}
                      </Button>
                    )}
                  </PDFDownloadLink>
                )}
              </div>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
}
