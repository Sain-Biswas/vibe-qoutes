import { getSnippets, getTags, getSources } from "@/app/actions/dashboard";
import { SnippetGrid } from "@/components/snippet-grid";
import { AddSnippetDialog } from "@/components/add-snippet-dialog";
import { Quote } from "lucide-react";

export default async function SnippetsPage() {
  const [snippets, tags, sources] = await Promise.all([
    getSnippets(),
    getTags(),
    getSources()
  ]);

  return (
    <div className="space-y-12 animate-fade-in pb-20">
      <section className="relative min-h-[300px] w-full rounded-[2.5rem] overflow-hidden border border-border/40 shadow-2xl group grain-overlay">
        <img 
          src="/images/fragments.png" 
          alt="Fragments" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 scale-100 brightness-[0.9] dark:brightness-[0.6]"
        />
        <div className="bloom-gradient-bg opacity-40 mix-blend-overlay" />
        
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent flex flex-col justify-center p-12">
          <div className="max-w-2xl space-y-4 relative z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] uppercase font-bold tracking-widest backdrop-blur-md">
              <Quote className="size-3" />
              <span>{snippets.length} fragments of wisdom</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-medium text-foreground tracking-tighter leading-none animate-fade-in-up">
              Fragments
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-md font-sans leading-relaxed animate-fade-in-up animation-delay-100">
              A curated collection of your preserved thoughts and captured insights.
            </p>
          </div>
          
          <div className="absolute bottom-10 right-10 z-30 animate-fade-in animation-delay-200">
            <AddSnippetDialog tags={tags} sources={sources} />
          </div>
        </div>
      </section>

      <SnippetGrid snippets={snippets} />
    </div>
  );
}
