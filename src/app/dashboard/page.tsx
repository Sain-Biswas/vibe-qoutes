import { BookMarked, Library, Quote, ArrowRight } from "lucide-react";
import { DashboardActions } from "@/components/dashboard-actions";
import { getTags, getSources, getSnippets } from "@/app/actions/dashboard";
import { SnippetGrid } from "@/components/snippet-grid";
import { AddSnippetDialog } from "@/components/add-snippet-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DashboardPage() {
  const [tags, sources, snippets] = await Promise.all([
    getTags(),
    getSources(),
    getSnippets()
  ]);
  return (
    <div className="space-y-12 animate-fade-in pb-20">
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[400px] w-full rounded-[3rem] overflow-hidden border border-border/40 shadow-2xl group grain-overlay">
        <img 
          src="/images/hero.png" 
          alt="Library" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 scale-100 brightness-[0.85] dark:brightness-[0.6]"
        />
        <div className="bloom-gradient-bg opacity-40 mix-blend-overlay" />
        
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background flex flex-col justify-end p-12 md:p-16">
          <div className="max-w-3xl space-y-6 relative z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] uppercase font-bold tracking-widest backdrop-blur-md">
              <Library className="size-3" />
              <span>Personal Collection</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-serif font-medium text-foreground tracking-tighter leading-none animate-fade-in-up">
              Your Library
            </h1>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-xl font-sans leading-relaxed animate-fade-in-up animation-delay-100 italic">
              "A curated sanctuary for your gathered wisdom and intellectual fragments."
            </p>
          </div>
          
          {/* Action Bar integrated into hero */}
          <div className="absolute top-10 right-10 z-30 animate-fade-in animation-delay-200">
            <div className="bloom-nav-pill px-4 py-2 flex items-center gap-2 shadow-2xl">
              <DashboardActions tags={tags} sources={sources} />
            </div>
          </div>
        </div>
      </section>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
        {/* Main Feed */}
        <div className="lg:col-span-8 space-y-10">
          {snippets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-40 text-center border-2 border-dashed border-border/40 rounded-[3rem] bg-surface-soft/10 backdrop-blur-sm group hover:bg-surface-soft/20 transition-all duration-500">
              <div className="flex size-24 items-center justify-center rounded-full bg-primary/10 text-primary mb-8 group-hover:scale-110 transition-transform">
                <BookMarked className="size-12" />
              </div>
              <h3 className="text-4xl font-serif font-medium mb-4">The library is empty</h3>
              <p className="text-muted-foreground max-w-sm mb-12 text-lg italic leading-relaxed">
                "Every great collection begins with a single insight. Capture your first fragment of wisdom today."
              </p>
              <AddSnippetDialog tags={tags} sources={sources} />
            </div>
          ) : (
            <div className="space-y-12">
              <div className="flex items-center justify-between border-b border-border/40 pb-6">
                <div className="space-y-1">
                  <h2 className="text-3xl font-serif font-medium tracking-tight">Recent Fragments</h2>
                  <p className="text-sm text-muted-foreground">Your latest {snippets.length > 5 ? "5" : snippets.length} insights and discoveries.</p>
                </div>
                <Link href="/dashboard/snippets">
                  <Button variant="ghost" className="rounded-full text-primary hover:bg-primary/5 gap-2">
                    View All <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </div>
              <SnippetGrid snippets={snippets.slice(0, 5)} />
            </div>
          )}
        </div>

        {/* Sidebar Insights */}
        <div className="lg:col-span-4 space-y-8">
          {/* Featured Quote Card */}
          <div className="p-10 rounded-[3rem] bg-surface-soft/20 border border-border/40 relative overflow-hidden group bloom-card-hover grain-overlay">
            <div className="bloom-gradient-bg opacity-30" />
            <img 
              src="/images/texture-light.png" 
              className="absolute inset-0 w-full h-full object-cover opacity-5 group-hover:opacity-10 transition-opacity" 
              alt="Decoration"
            />
            <div className="relative z-10 space-y-6">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Quote className="size-6" />
              </div>
              <p className="text-xl font-serif italic leading-relaxed text-foreground/90">
                "The only way to make sense out of change is to plunge into it, move with it, and join the dance."
              </p>
              <div className="pt-4 flex items-center gap-3 border-t border-border/40">
                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border border-primary/20">
                   <BookMarked className="size-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-serif font-medium">Alan Watts</span>
                  <span className="text-[10px] text-primary uppercase tracking-widest font-bold">Wisdom of the East</span>
                </div>
              </div>
            </div>
          </div>

          {/* Library Stats / Quick Links */}
          <div className="p-8 rounded-[2.5rem] border border-border/40 bg-card/30 space-y-6 backdrop-blur-sm">
            <h3 className="text-lg font-serif font-medium px-2">Your Taxonomy</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/dashboard/tags" className="p-4 rounded-2xl bg-surface-soft/30 hover:bg-surface-soft transition-colors text-center group">
                <span className="block text-2xl font-serif font-medium group-hover:text-primary transition-colors">{tags.length}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Tags</span>
              </Link>
              <Link href="/dashboard/sources" className="p-4 rounded-2xl bg-surface-soft/30 hover:bg-surface-soft transition-colors text-center group">
                <span className="block text-2xl font-serif font-medium group-hover:text-primary transition-colors">{sources.length}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Sources</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
