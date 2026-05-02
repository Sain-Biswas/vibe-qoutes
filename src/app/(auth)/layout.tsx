import { BookOpen } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left Panel: Decorative / Bloom Aesthetic */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-primary/5 p-12">
        <div className="bloom-gradient-bg opacity-50" />
        <div className="grain-overlay opacity-70" />
        
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2.5 group w-fit">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-105">
              <BookOpen className="size-5" />
            </div>
            <span className="text-2xl font-medium tracking-tight font-serif text-foreground">
              Snippets
            </span>
          </Link>
        </div>

        <div className="relative z-10 mt-auto max-w-lg mb-12 animate-fade-in-up">
          <blockquote className="space-y-6">
            <p className="text-3xl font-serif leading-tight text-foreground/90">
              "We read to know we are not alone."
            </p>
            <footer className="text-lg text-muted-foreground">— C.S. Lewis</footer>
          </blockquote>
        </div>
      </div>

      {/* Right Panel: Forms */}
      <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-24 py-12 relative overflow-hidden">
        {/* Mobile Header */}
        <div className="absolute top-8 left-8 right-8 flex justify-between items-center lg:hidden">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <BookOpen className="size-4" />
            </div>
            <span className="text-xl font-medium tracking-tight font-serif text-foreground">
              Snippets
            </span>
          </Link>
          <ThemeToggle />
        </div>
        
        {/* Desktop Theme Toggle */}
        <div className="absolute top-8 right-8 hidden lg:block">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-sm mx-auto relative z-10 animate-fade-in-up animation-delay-200">
          {children}
        </div>
      </div>
    </div>
  );
}
