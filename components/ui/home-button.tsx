import { Button } from "./button";
import { Home } from "lucide-react";
import { Link } from "wouter";

interface HomeButtonProps {
  className?: string;
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export function HomeButton({ 
  className = "", 
  variant = "outline", 
  size = "default" 
}: HomeButtonProps) {
  return (
    <Link href="/">
      <Button variant={variant} size={size} className={`${className}`}>
        <Home className="w-4 h-4 mr-2" />
        Home
      </Button>
    </Link>
  );
}