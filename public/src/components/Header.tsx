import React from "react";
import { Link } from "wouter";
import logo from "../assets/logo.png";
import ThemeToggle from "./ThemeToggle";
import { NotificationDropdown } from "./notifications/NotificationDropdown";

export default function Header() {
  return (
    <header className="bg-white p-2 md:p-4 shadow-sm w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-12 w-12 md:h-16 md:w-16 rounded-full overflow-hidden mr-2 md:mr-3 border-[3px] border-[#C9AB51] flex items-center justify-center bg-[#144e28] -my-2">
            <img src={logo} alt="Rupeesmart Logo" className="h-10 w-10 md:h-14 md:w-14 object-contain" />
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold tracking-wide font-recoleta" style={{ 
            background: "linear-gradient(to right, #C9AB51, #E6C470, #C9AB51)", 
            WebkitBackgroundClip: "text", 
            WebkitTextFillColor: "transparent",
            textShadow: "0px 0px 2px rgba(201, 171, 81, 0.2)",
            fontWeight: 700,
            letterSpacing: "0.02em"
          }}>
            RupeeSmart
          </h1>
        </div>
        <div className="flex items-center gap-2 md:gap-5">
          <ThemeToggle />
          <NotificationDropdown />
          <div className="hidden md:block">
            <Link href="/community-features">
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