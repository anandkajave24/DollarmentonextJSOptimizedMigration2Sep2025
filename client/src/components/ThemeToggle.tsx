import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Switch } from "@/components/ui/switch";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <span className={`material-icons text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {isDark ? "dark_mode" : "light_mode"}
        </span>
      </div>
      <Switch 
        checked={isDark} 
        onCheckedChange={toggleTheme}
        aria-label="Toggle day/night theme"
        className={`${isDark ? 'bg-red-600' : 'bg-gray-300'}`}
      />
    </div>
  );
}