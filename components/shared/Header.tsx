import { Code } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";

const Header = () => {
  return (
    <header className="fixed top-0 w-full">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              CodeTest Pro
            </span>
          </Link>
          <Badge variant="secondary">Choose Your Test</Badge>
        </div>
      </div>
    </header>
  );
};

export default Header;
