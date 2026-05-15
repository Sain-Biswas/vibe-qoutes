"use client";

import { useState, useMemo } from "react";
import { Quote, BookOpen, Calendar, Search, Hash, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

function getLocationSummary(snippet: any): string | null {
  const parts: string[] = [];
  // Books / Papers
  if (snippet.pageNumber) parts.push(`p. ${snippet.pageNumber}`);
  if (snippet.chapter) parts.push(snippet.chapter);
  if (snippet.paragraph) parts.push(`¶ ${snippet.paragraph}`);
  if (snippet.section) parts.push(snippet.section);
  // Scriptures
  if (snippet.scriptureBook) parts.push(snippet.scriptureBook);
  if (snippet.canto) parts.push(`Canto ${snippet.canto}`);
  if (snippet.hymn) parts.push(`Hymn ${snippet.hymn}`);
  if (snippet.verse) parts.push(`v. ${snippet.verse}`);
  // Video / Podcast
  if (snippet.episodeTitle) parts.push(snippet.episodeTitle);
  if (snippet.episodeNumber) parts.push(`Ep. ${snippet.episodeNumber}`);
  if (snippet.timestamp) parts.push(`⏱ ${snippet.timestamp}`);
  // Person
  if (snippet.event) parts.push(snippet.event);
  if (snippet.eventDate) parts.push(snippet.eventDate);
  if (snippet.eventLocation) parts.push(snippet.eventLocation);
  
  return parts.length > 0 ? parts.join(" · ") : null;
}

interface SnippetGridProps {
  snippets: any[];
}

export function SnippetGrid({ snippets }: SnippetGridProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSnippets = useMemo(() => {
    return snippets.filter(snippet => 
      snippet.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (snippet.source && snippet.source.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      snippet.tags.some((tag: any) => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [snippets, searchQuery]);

  return (
    <div className="space-y-8">
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search snippets by content, source, or tag..."
          className="pl-10 rounded-full bg-surface-soft/30 border-border/40 h-11 focus:ring-primary/20"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-8">
        {filteredSnippets.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-muted rounded-[2rem]">
            <Quote className="size-12 text-muted mx-auto mb-4" />
            <h3 className="text-xl font-serif font-medium">No fragments found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search query.</p>
          </div>
        ) : (
          filteredSnippets.map((snippet) => {
            const locationSummary = getLocationSummary(snippet);
            return (
              <div key={snippet.id} className="relative group animate-in fade-in slide-in-from-top-2 duration-500">
                <div className="absolute -left-6 top-0 bottom-0 w-1.5 bg-primary/10 group-hover:bg-primary transition-colors rounded-full" />
                <div className="space-y-4">
                  <p className="text-2xl font-serif italic leading-relaxed text-foreground/90 group-hover:text-foreground transition-colors">
                    "{snippet.content}"
                  </p>
                  <div className="flex flex-wrap items-center gap-6 pt-2">
                    {snippet.source && (
                      <div className="flex items-center gap-2 text-sm text-primary/80 font-medium">
                        <BookOpen className="size-4" />
                        <span>{snippet.source.title}</span>
                      </div>
                    )}
                    {locationSummary && (
                      <div className="flex items-center gap-2 text-xs text-primary/60 font-medium">
                        <MapPin className="size-3" />
                        <span>{locationSummary}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest font-sans">
                      <Calendar className="size-3" />
                      <span>{new Date(snippet.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {snippet.tags.map((tag: any) => (
                        <Badge key={tag.id} variant="secondary" className="rounded-full bg-surface-soft text-[10px] uppercase font-bold tracking-tighter px-2 py-0">
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {snippet.locationNotes && (
                    <p className="text-xs text-muted-foreground italic pl-1">
                      📝 {snippet.locationNotes}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

