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
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative h-48 w-full rounded-[2rem] overflow-hidden border border-border/40 group">
        <img 
          src="/resources/1.webp" 
          alt="Snippets Hero" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent flex items-center justify-between px-10">
          <div>
            <h1 className="text-4xl font-serif font-medium text-foreground tracking-tight">Fragments</h1>
            <p className="text-muted-foreground mt-2 font-sans max-w-sm">A collection of preserved thoughts and captured insights.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-md rounded-full border border-border/40 shadow-sm">
              <Quote className="size-4 text-primary" />
              <span className="text-sm font-medium text-primary">{snippets.length} Total</span>
            </div>
            <AddSnippetDialog tags={tags} sources={sources} />
          </div>
        </div>
      </div>

      <SnippetGrid snippets={snippets} />
    </div>
  );
}
