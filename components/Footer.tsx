import React from "react";
import { useLocation } from "wouter";

export default function Footer() {
  const [location, setLocation] = useLocation();
  
  return (
    <footer className="bg-white border-t mt-8 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600 text-center md:text-left">
              © {new Date().getFullYear()} DollarMento. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <button
              onClick={() => setLocation("/legal?tab=terms")}
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={() => setLocation("/legal?tab=privacy")}
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setLocation("/legal?tab=disclaimer")}
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              Disclaimer
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}