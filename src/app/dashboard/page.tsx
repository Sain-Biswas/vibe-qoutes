import { BookOpen } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border/40">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <BookOpen className="size-4" />
            </div>
            <span className="text-xl font-medium tracking-tight font-serif text-foreground">
              Snippets
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center font-medium font-serif">
              U
            </div>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-4xl font-serif mb-6 text-foreground">Your Library</h1>
        <div className="p-12 text-center border border-dashed border-border rounded-[2rem] bg-surface-soft/30">
          <p className="text-muted-foreground">You haven't saved any snippets yet.</p>
        </div>
      </main>
    </div>
  );
}
