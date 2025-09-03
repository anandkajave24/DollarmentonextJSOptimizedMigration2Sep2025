import React from "react";
import { Helmet } from "react-helmet";
import TaxFilingGuideComponent from "../components/tax/TaxFilingGuide";

export default function TaxFilingGuidePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Income Tax Filing Guide (FY 2024-25) | RupeeSmart</title>
        <meta 
          name="description" 
          content="Complete guide for filing income tax returns for FY 2024-25 (AY 2025-26). Includes step-by-step instructions, documents checklist, and tax regime comparison." 
        />
      </Helmet>

      <div className="max-w-5xl mx-auto">
        <TaxFilingGuideComponent />
      </div>
    </div>
  );
}