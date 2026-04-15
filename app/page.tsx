"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeatureGrid from "@/components/FeatureGrid";
import ArticleGrid from "@/components/ArticleGrid";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeatureGrid />
        <ArticleGrid />
      </main>
      <Footer />
    </div>
  );
}
