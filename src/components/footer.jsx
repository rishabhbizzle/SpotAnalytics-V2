"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  CommandIcon,
  Github,
  KeyboardIcon,
  LayoutGridIcon,
  MoonIcon,
  TriangleIcon,
  Twitter,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ui/toggleButton";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="border-t border-gray-700 mt-10">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between flex-col gap-5">
          <div className="flex space-x-6">
            <p className="text-muted-foreground">Spotracker</p>
            <p className="text-sm ">© 2024</p>
            <Badge variant="secondary">BETA</Badge>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              <Link
                href="/dashboard"
                className={cn(
                  "text-sm transition-colors hover:text-foreground/80",
                  pathname === "/dashboard"
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                Contact
              </Link>
              <Link
                href="/charts"
                className={cn(
                  "text-sm transition-colors hover:text-foreground/80",
                  pathname?.startsWith("/charts")
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                Updates
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
              href='/'
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  "w-9 px-0"
                )}
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href='/'
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  "w-9 px-0"
                )}
              >
                <Twitter className=" h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
