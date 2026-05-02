"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Bookmark, Tag, Library, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { UserDropdown } from "./user-dropdown";

const navigation = [
  { name: "Library", href: "/dashboard", icon: Library },
  { name: "Tags", href: "/dashboard/tags", icon: Tag },
  { name: "Sources", href: "/dashboard/sources", icon: BookOpen },
  { name: "Snippets", href: "/dashboard/snippets", icon: Bookmark },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 h-16 border-b border-border/40 bg-background">
        <div className="flex items-center gap-2.5">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
            <Menu className="size-5" />
          </Button>
          <span className="font-serif font-medium text-lg">Snippets</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <UserDropdown />
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-surface-soft/50 border-r border-border/40 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:block",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-border/40">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-105">
                <BookOpen className="size-4" />
              </div>
              <span className="text-xl font-medium tracking-tight font-serif text-foreground">
                Snippets
              </span>
            </Link>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsOpen(false)}>
              <X className="size-5" />
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-surface-soft hover:text-foreground"
                  )}
                >
                  <item.icon className={cn("size-5", isActive ? "text-primary" : "text-muted-foreground")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Section (Desktop) */}
          <div className="hidden lg:flex flex-col gap-4 p-4 border-t border-border/40 bg-surface-soft/20">
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Appearance</span>
              <ThemeToggle />
            </div>
            <UserDropdown mode="full" />
          </div>
        </div>
      </div>
    </>
  );
}
