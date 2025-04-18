"use client"
import React from "react";
import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import HIW from "@/components/HIW";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export default function LandingPage() {
  return (
    <>
      <div className="grid-background"></div>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <Features />

      {/* Stats Section */}
      <Stats />

      {/* How It Works Section */}
      <HIW />

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <CTA />
    </>
  );
}
