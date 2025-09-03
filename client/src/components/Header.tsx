import React from "react";
import Link from "next/link";
import { Home, Users, BookOpen, User } from "lucide-react";

const Header = React.memo(() => {
  return (
    <header className="bg-white py-3 px-4 shadow-sm w-full border-b border-gray-100 fixed top-0 left-0 right-0 z-50" suppressHydrationWarning>
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <img 
                src="/logo.png" 
                alt="DollarMento Logo" 
                className="h-8 w-8 object-contain"
              />
              <div className="text-2xl font-bold text-yellow-500">
                dollarmento
              </div>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/">
            <div className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
              <Home className="w-6 h-6 mb-1" />
              <span className="text-xs">Home</span>
            </div>
          </Link>
          <Link href="/community">
            <div className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
              <Users className="w-6 h-6 mb-1" />
              <span className="text-xs">Community</span>
            </div>
          </Link>
          <Link href="/guide">
            <div className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
              <BookOpen className="w-6 h-6 mb-1" />
              <span className="text-xs">Guide</span>
            </div>
          </Link>
          <Link href="/profile">
            <div className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
              <User className="w-6 h-6 mb-1" />
              <span className="text-xs">Profile</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;