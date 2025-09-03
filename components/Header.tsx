import React from "react";
import { Link } from "wouter";
import { Home } from "lucide-react";
import dollarmentoLogo from "@assets/dollarmento_1753875471087.png";

export default function Header() {
  return (
    <header className="bg-white p-1 md:p-2 shadow-sm w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <img 
              src={dollarmentoLogo} 
              alt="DollarMento" 
              className="h-12 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>
        <div className="flex items-center gap-2 md:gap-5">
          <Link href="/">
            <div className="flex flex-col items-center text-primary hover:text-primary/80 transition-colors cursor-pointer">
              <Home className="w-5 h-5" />
              <span className="text-xs mt-1">Home</span>
            </div>
          </Link>
          <div className="hidden md:block">
            <Link href="/community">
              <div className="flex flex-col items-center text-primary hover:text-primary/80 transition-colors cursor-pointer">
                <span className="material-icons">groups</span>
                <span className="text-xs mt-1">Community</span>
              </div>
            </Link>
          </div>
          <div className="hidden md:block">
            <Link href="/guide">
              <div className="flex flex-col items-center text-primary hover:text-primary/80 transition-colors cursor-pointer">
                <span className="material-icons">auto_stories</span>
                <span className="text-xs mt-1">Guide</span>
              </div>
            </Link>
          </div>
          <Link href="/profile">
            <div className="flex flex-col items-center text-primary hover:text-primary/80 transition-colors cursor-pointer">
              <span className="material-icons">account_circle</span>
              <span className="text-xs mt-1">Profile</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}