"use client";

import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

const TRANSLATIONS: Record<string, any> = {
  en: {
    title: "Official Receipt",
    authorized: "AUTHORIZED • 90% COMPLETE",
    transactionAmount: "Transaction Amount",
    sender: "Sender Name",
    recipientName: "Recipient Name",
    recipientBank: "Recipient Bank",
    accountNumber: "Account Number",
    routingNumber: "Routing Number",
    iban: "IBAN / Swift Code",
    date: "Date & Time",
    txId: "Transaction ID",
    description: "Description",
    legalNotice: "IMPORTANT LEGAL NOTICE: This transaction has been successfully initiated and is currently at 90% completion status. Final authorization and the subsequent release of funds are subject to mandatory security verification. The account holder must manually authorize the remaining 10% by contacting the Pinnacle Security Division or through an authorized bank representative. Funds are guaranteed to be visible in the recipient's account within 24-48 business hours once final security clearance is granted.",
    footer: "Pinnacle Bank International. Licensed by the Federal Reserve. Member FDIC. All Rights Reserved. Digitally signed and cryptographically verified on Pinnacle Mainframe US-NY-01",
  },
  de: {
    title: "Offizielle Quittung",
    authorized: "AUTORISIERT • 90% VOLLSTÄNDIG",
    transactionAmount: "Transaktionsbetrag",
    sender: "Absender Name",
    recipientName: "Empfänger Name",
    recipientBank: "Empfänger Bank",
    accountNumber: "Kontonummer",
    routingNumber: "Routing-Nummer",
    iban: "IBAN / Swift-Code",
    date: "Datum & Uhrzeit",
    txId: "Transaktions-ID",
    description: "Beschreibung",
    legalNotice: "WICHTIGER RECHTLICHER HINWEIS: Diese Transaktion wurde erfolgreich eingeleitet und befindet sich derzeit in einem Abschlussstatus von 90%. Die endgültige Autorisierung und die anschließende Freigabe der Mittel unterliegen einer obligatorischen Sicherheitsüberprüfung. Der Kontoinhaber muss die verbleibenden 10% manuell autorisieren, indem er sich an die Pinnacle Security Abteilung oder an einen autorisierten Bankvertreter wendet. Es wird garantiert, dass die Mittel innerhalb von 24 bis 48 Geschäftsstunden auf dem Konto des Empfängers sichtbar sind, sobald die endgültige Sicherheitsfreigabe erteilt wurde.",
    footer: "Pinnacle Bank International. Lizenziert durch die Federal Reserve. Mitglied im FDIC. Alle Rechte vorbehalten. Digital signiert und kryptographisch verifiziert auf Pinnacle Mainframe US-NY-01",
  },
  fr: {
    title: "Reçu Officiel",
    authorized: "AUTORISÉ • 90% TERMINÉ",
    transactionAmount: "Montant de la Transaction",
    sender: "Nom de l'Expéditeur",
    recipientName: "Nom du Destinataire",
    recipientBank: "Banque du Destinataire",
    accountNumber: "Numéro de Compte",
    routingNumber: "Numéro de Routage",
    iban: "IBAN / Code Swift",
    date: "Date et Heure",
    txId: "ID de Transaction",
    description: "Description",
    legalNotice: "AVIS JURIDIQUE IMPORTANT : Cette transaction a été initiée avec succès et est actuellement à un état d'achèvement de 90%. L'autorisation finale et la libération subséquente des fonds sont soumises à une vérification de sécurité obligatoire. Le titulaire du compte doit autoriser manuellement les 10% restants en contactant la division de sécurité de Pinnacle ou par l'intermédiaire d'un représentant bancaire autorisé. Les fonds sont garantis d'être visibles sur le compte du destinataire dans les 24 à 48 heures ouvrables une fois l'autorisation de sécurité finale accordée.",
    footer: "Pinnacle Bank International. Autorisé par la Réserve Fédérale. Membre de la FDIC. Tous droits réservés. Signé numériquement et vérifié par cryptographie sur le Pinnacle Mainframe US-NY-01",
  },
  es: {
    title: "Recibo Oficial",
    authorized: "AUTORIZADO • 90% COMPLETADO",
    transactionAmount: "Monto de la Transacción",
    sender: "Nombre del Remitente",
    recipientName: "Nombre del Destinatario",
    recipientBank: "Banco del Destinatario",
    accountNumber: "Número de Cuenta",
    routingNumber: "Número de Ruta",
    iban: "IBAN / Código Swift",
    date: "Fecha y Hora",
    txId: "ID de Transacción",
    description: "Descripción",
    legalNotice: "AVISO LEGAL IMPORTANTE: Esta transacción se ha iniciado con éxito y se encuentra actualmente en un estado de finalización del 90%. La autorización final y la posterior liberación de fondos están sujetas a una verificación de seguridad obligatoria. El titular de la cuenta debe autorizar manualmente el 10% restante poniéndose en contacto con la División de Seguridad de Pinnacle o a través de un representante bancario autorizado. Se garantiza que los fondos serán visibles en la cuenta del destinatario en un plazo de 24-48 horas hábiles una vez que se otorgue la autorización de seguridad final.",
    footer: "Pinnacle Bank International. Licenciado por la Reserva Federal. Miembro de la FDIC. Todos los derechos reservados. Firmado digitalmente y verificado criptográficamente en Pinnacle Mainframe US-NY-01",
  }
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: "#1A5DAD", // Pinnacle Blue
    paddingBottom: 20,
  },
  logo: {
    width: 140,
    height: 40,
  },
  titleContainer: {
    textAlign: "right",
  },
  title: {
    fontSize: 24,
    fontWeight: "heavy",
    color: "#1A5DAD",
    textTransform: "uppercase",
  },
  status: {
    fontSize: 10,
    marginTop: 5,
    color: "#10B981", // Success Green
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 10,
    color: "#6B7280",
    textTransform: "uppercase",
    marginBottom: 5,
    fontWeight: "bold",
  },
  amountCard: {
    backgroundColor: "#F3F4F6",
    padding: 20,
    borderRadius: 8,
    marginBottom: 30,
    textAlign: "center",
  },
  amountLabel: {
    fontSize: 12,
    color: "#4B5563",
    marginBottom: 5,
  },
  amountValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#111827",
    letterSpacing: 1,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  gridItem: {
    width: "50%",
    marginBottom: 15,
  },
  label: {
    fontSize: 9,
    color: "#6B7280",
    marginBottom: 2,
  },
  value: {
    fontSize: 12,
    color: "#111827",
    fontWeight: "bold",
  },
  disclaimerBox: {
    marginTop: 40,
    padding: 15,
    backgroundColor: "#FFFBEB", // Light yellow
    borderWidth: 1,
    borderColor: "#FDE68A",
    borderRadius: 6,
  },
  disclaimerText: {
    fontSize: 8,
    color: "#92400E",
    lineHeight: 1.5,
    fontStyle: "italic",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 15,
    textAlign: "center",
  },
  footerText: {
    fontSize: 8,
    color: "#9CA3AF",
  },
});

interface PDFReceiptProps {
  transaction: any;
  language?: string;
}

const getCurrencySymbol = (code: string) => {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    NGN: "₦",
    CAD: "CA$",
    AUD: "A$",
  };
  return symbols[code] || "$";
};

export const TransactionPDF = ({ transaction, language = "en" }: PDFReceiptProps) => {
  const symbol = getCurrencySymbol(transaction?.currency);
  const formattedAmount = parseFloat(transaction?.amount || 0).toLocaleString();
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src="/pinnacle.png" style={styles.logo} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{t.title}</Text>
            <Text style={styles.status}>{t.authorized}</Text>
          </View>
        </View>

        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>{t.transactionAmount}</Text>
          <Text style={styles.amountValue}>
            {symbol} {formattedAmount}
          </Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.label}>{t.sender}</Text>
            <Text style={styles.value}>{transaction?.senderName}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>{t.recipientName}</Text>
            <Text style={styles.value}>{transaction?.recipientName}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>{t.recipientBank}</Text>
            <Text style={styles.value}>{transaction?.bankName}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>{t.accountNumber}</Text>
            <Text style={styles.value}>{transaction?.accountNumber}</Text>
          </View>

          {transaction?.routingNumber && (
            <View style={styles.gridItem}>
              <Text style={styles.label}>{t.routingNumber}</Text>
              <Text style={styles.value}>{transaction?.routingNumber}</Text>
            </View>
          )}

          {transaction?.iban && (
            <View style={styles.gridItem}>
              <Text style={styles.label}>{t.iban}</Text>
              <Text style={styles.value}>{transaction?.iban}</Text>
            </View>
          )}

          <View style={styles.gridItem}>
            <Text style={styles.label}>{t.date}</Text>
            <Text style={styles.value}>
              {new Date(transaction?.createdAt).toLocaleString(language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : language === 'es' ? 'es-ES' : 'en-US')}
            </Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>{t.txId}</Text>
            <Text style={styles.value}>
              PIN-{transaction?.id?.toString().padStart(8, "0")}
            </Text>
          </View>
        </View>

        {transaction?.description && (
          <View style={styles.section}>
            <Text style={styles.label}>{t.description}</Text>
            <Text style={styles.value}>{transaction?.description}</Text>
          </View>
        )}

        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerText}>
            {t.legalNotice}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} {t.footer}
          </Text>
          <Text style={[styles.footerText, { marginTop: 5, fontSize: 6 }]}>
            Digitally signed and cryptographically verified on Pinnacle Mainframe US-NY-01
          </Text>
        </View>
      </Page>
    </Document>
  );
};
