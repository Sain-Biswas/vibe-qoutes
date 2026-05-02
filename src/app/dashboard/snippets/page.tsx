import { getSnippets } from "@/app/actions/dashboard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Quote, Tag as TagIcon } from "lucide-react";

export default async function SnippetsPage() {
  const snippets = await getSnippets();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-medium text-foreground tracking-tight">Snippets</h1>
          <p className="text-muted-foreground mt-2 font-sans">Your curated collection of wisdom and insights.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10">
          <Quote className="size-4 text-primary" />
          <span className="text-sm font-medium text-primary">{snippets.length} Snippets Total</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {snippets.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-muted rounded-[2rem]">
            <Quote className="size-12 text-muted mx-auto mb-4" />
            <h3 className="text-xl font-serif font-medium">Your library is empty</h3>
            <p className="text-muted-foreground mt-2">Capture your first snippet to begin your collection.</p>
          </div>
        ) : (
          snippets.map((snippet) => (
            <Card key={snippet.id} className="bloom-card overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors" />
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 text-primary">
                    <Quote className="size-5" />
                    <span className="text-xs font-bold uppercase tracking-widest font-sans">Fragment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {snippet.tags.map((tag) => (
                      <Badge key={tag.id} variant="outline" className="rounded-full bg-primary/5 border-primary/10 text-primary font-sans font-normal">
                        <TagIcon className="size-3 mr-1" />
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xl font-serif leading-relaxed text-foreground/90 italic">
                  "{snippet.content}"
                </p>
                
                {snippet.source && (
                  <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                    <BookOpen className="size-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground/70 font-serif">
                      {snippet.source.title} {snippet.source.author && <span className="text-muted-foreground ml-1">by {snippet.source.author}</span>}
                    </span>
                  </div>
                )}
                
                <div className="flex items-center justify-end text-[10px] text-muted-foreground font-sans uppercase tracking-tighter">
                  <span>Saved {new Date(snippet.createdAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
