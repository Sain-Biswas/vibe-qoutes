import { BookMarked } from "lucide-react";
import { DashboardActions } from "@/components/dashboard-actions";
import { getTags, getSources, getSnippets } from "@/app/actions/dashboard";
import { SnippetGrid } from "@/components/snippet-grid";
import { AddSnippetDialog } from "@/components/add-snippet-dialog";

export default async function DashboardPage() {
  const [tags, sources, snippets] = await Promise.all([
    getTags(),
    getSources(),
    getSnippets()
  ]);
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Hero Section */}
      <div className="relative h-64 w-full rounded-[2.5rem] overflow-hidden border border-border/40 shadow-2xl shadow-primary/5 group">
        <img 
          src="/resources/5.webp" 
          alt="Library Hero" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent flex flex-col justify-center px-12">
          <h1 className="text-5xl font-serif font-medium text-foreground tracking-tight mb-3">Your Library</h1>
          <p className="text-muted-foreground text-xl max-w-md font-sans leading-relaxed">
            A curated sanctuary for your gathered wisdom and intellectual fragments.
          </p>
        </div>
        <div className="absolute top-8 right-12">
          <DashboardActions tags={tags} sources={sources} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {snippets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-border/60 rounded-[2.5rem] bg-surface-soft/20 backdrop-blur-sm">
              <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                <BookMarked className="size-8" />
              </div>
              <h3 className="text-2xl font-serif font-medium mb-2">No snippets yet</h3>
              <p className="text-muted-foreground max-w-sm mb-8">
                Start building your library of wisdom by saving your first passage.
              </p>
              <AddSnippetDialog tags={tags} sources={sources} />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-2xl font-serif font-medium">Recent Fragments</h2>
              </div>
              <SnippetGrid snippets={snippets.slice(0, 5)} />
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/10 relative overflow-hidden group">
            <img 
              src="/resources/3.webp" 
              className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity" 
              alt="Decoration"
            />
            <h3 className="text-xl font-serif font-medium mb-3 relative">Quick Insight</h3>
            <p className="text-sm text-muted-foreground leading-relaxed relative">
              "The only way to make sense out of change is to plunge into it, move with it, and join the dance."
            </p>
            <div className="mt-6 flex items-center gap-2 relative">
              <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center">
                <BookMarked className="size-4 text-primary" />
              </div>
              <span className="text-xs font-medium text-primary uppercase tracking-wider">Alan Watts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
