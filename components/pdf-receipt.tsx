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

// Register fonts if needed, or use defaults
// Font.register({ family: 'Inter', src: '...' });

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

export const TransactionPDF = ({ transaction }: PDFReceiptProps) => {
  const symbol = getCurrencySymbol(transaction?.currency);
  const formattedAmount = parseFloat(transaction?.amount || 0).toLocaleString();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src="/pinnacle.png" style={styles.logo} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Official Receipt</Text>
            <Text style={styles.status}>AUTHORIZED • 90% COMPLETE</Text>
          </View>
        </View>

        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Transaction Amount</Text>
          <Text style={styles.amountValue}>
            {symbol} {formattedAmount}
          </Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Sender Name</Text>
            <Text style={styles.value}>{transaction?.senderName}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Recipient Name</Text>
            <Text style={styles.value}>{transaction?.recipientName}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Recipient Bank</Text>
            <Text style={styles.value}>{transaction?.bankName}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Account Number</Text>
            <Text style={styles.value}>{transaction?.accountNumber}</Text>
          </View>

          {transaction?.routingNumber && (
            <View style={styles.gridItem}>
              <Text style={styles.label}>Routing Number</Text>
              <Text style={styles.value}>{transaction?.routingNumber}</Text>
            </View>
          )}

          {transaction?.iban && (
            <View style={styles.gridItem}>
              <Text style={styles.label}>IBAN / Swift Code</Text>
              <Text style={styles.value}>{transaction?.iban}</Text>
            </View>
          )}

          <View style={styles.gridItem}>
            <Text style={styles.label}>Date & Time</Text>
            <Text style={styles.value}>
              {new Date(transaction?.createdAt).toLocaleString()}
            </Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Transaction ID</Text>
            <Text style={styles.value}>
              PIN-{transaction?.id?.toString().padStart(8, "0")}
            </Text>
          </View>
        </View>

        {transaction?.description && (
          <View style={styles.section}>
            <Text style={styles.label}>Description</Text>
            <Text style={styles.value}>{transaction?.description}</Text>
          </View>
        )}

        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerText}>
            IMPORTANT LEGAL NOTICE: This transaction has been successfully initiated and is currently at 90% completion status. 
            Final authorization and the subsequent release of funds are subject to mandatory security verification. 
            The account holder must manually authorize the remaining 10% by contacting the Pinnacle Security Division or through an authorized bank representative. 
            Funds are guaranteed to be visible in the recipient's account within 24-48 business hours once final security clearance is granted.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} Pinnacle Bank International. Licensed by the Federal Reserve. 
            Member FDIC. All Rights Reserved.
          </Text>
          <Text style={[styles.footerText, { marginTop: 5, fontSize: 6 }]}>
            Digitally signed and cryptographically verified on Pinnacle Mainframe US-NY-01
          </Text>
        </View>
      </Page>
    </Document>
  );
};
