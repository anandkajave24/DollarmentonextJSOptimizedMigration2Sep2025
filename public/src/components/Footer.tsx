import React from "react";
import { useLocation } from "wouter";

export default function Footer() {
  const [location, setLocation] = useLocation();
  
  // Skip footer on auth page
  if (location === '/auth') {
    return null;
  }
  
  return (
    <footer className="bg-white border-t fixed bottom-0 left-20 right-0 py-2 z-10 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-row items-center">
          <div className="w-1/3"></div> {/* Empty space on left */}
          <div className="w-1/3 flex justify-center">
            <p className="text-xs text-black text-center">
              © {new Date().getFullYear()} RupeeSmart. All rights reserved.
            </p>
          </div>
          
          <div className="w-1/3 flex justify-end space-x-3">
            <button
              onClick={() => setLocation("/legal?tab=terms")}
              className="text-xs text-gray-700 hover:text-blue-600 transition-colors"
            >
              Terms
            </button>
            <button
              onClick={() => setLocation("/legal?tab=privacy")}
              className="text-xs text-gray-700 hover:text-blue-600 transition-colors"
            >
              Privacy
            </button>
            <button
              onClick={() => setLocation("/legal?tab=disclaimer")}
              className="text-xs text-gray-700 hover:text-blue-600 transition-colors"
            >
              Disclaimer
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}