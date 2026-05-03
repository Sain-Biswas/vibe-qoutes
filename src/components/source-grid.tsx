"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
} from "@/components/ui/dialog";
import { BookOpen, User, Calendar, Search, Quote, Hash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SourceGridProps {
  sources: any[];
}

export function SourceGrid({ sources }: SourceGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [snippetSearchQuery, setSnippetSearchQuery] = useState("");
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  const filteredSources = useMemo(() => {
    return sources.filter(source => 
      source.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (source.author && source.author.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [sources, searchQuery]);

  // Derived state for the dialog
  const uniqueTags = useMemo(() => {
    if (!selectedSource) return [];
    const tagsMap = new Map();
    selectedSource.snippets.forEach((snippet: any) => {
      snippet.tags.forEach((tag: any) => {
        tagsMap.set(tag.id, tag);
      });
    });
    return Array.from(tagsMap.values());
  }, [selectedSource]);

  const filteredSnippets = useMemo(() => {
    if (!selectedSource) return [];
    let filtered = selectedSource.snippets;

    if (snippetSearchQuery.trim()) {
      const lowerQuery = snippetSearchQuery.toLowerCase();
      filtered = filtered.filter((s: any) => 
        s.content.toLowerCase().includes(lowerQuery)
      );
    }

    if (selectedTagIds.length > 0) {
      filtered = filtered.filter((s: any) => 
        selectedTagIds.every(tagId => s.tags.some((t: any) => t.id === tagId))
      );
    }

    return filtered;
  }, [selectedSource, snippetSearchQuery, selectedTagIds]);

  const handleSourceClick = (source: any) => {
    setSelectedSource(source);
    setSnippetSearchQuery("");
    setSelectedTagIds([]);
    setIsDetailOpen(true);
  };

  const toggleTagFilter = (tagId: string) => {
    setSelectedTagIds(prev => 
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search archives by title or author..."
          className="pl-10 rounded-full bg-surface-soft/30 border-border/40 h-11 focus:ring-primary/20"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-max">
        {filteredSources.length === 0 ? (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-muted rounded-[2rem]">
            <BookOpen className="size-12 text-muted mx-auto mb-4" />
            <h3 className="text-xl font-serif font-medium">No results found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search query.</p>
          </div>
        ) : (
          filteredSources.map((source) => (
            <Card 
              key={source.id} 
              className="relative bloom-card group hover:-translate-y-1.5 transition-all duration-700 cursor-pointer overflow-hidden border border-border/40 bg-surface-soft/20 hover:bg-surface-soft/40 hover:shadow-2xl hover:shadow-primary/5 grain-overlay flex flex-col min-h-[260px] rounded-[2rem]"
              onClick={() => handleSourceClick(source)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img 
                src="/images/texture-dark.png" 
                className="absolute inset-0 w-full h-full object-cover opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700 mix-blend-overlay" 
                alt=""
              />
              <div className="absolute top-0 right-0 p-8 text-foreground/5 group-hover:text-primary/10 transition-all duration-700 translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:-rotate-6">
                <BookOpen className="size-32" />
              </div>

              <CardHeader className="relative z-10 flex-1 pb-4 pt-8 px-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-muted-foreground opacity-70">
                    <BookOpen className="size-3" />
                    Archive
                  </div>
                </div>
                <CardTitle className="text-3xl font-serif leading-tight tracking-tight group-hover:text-primary transition-colors break-words line-clamp-3">
                  {source.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="relative z-10 mt-auto pb-8 px-8 space-y-6">
                {source.author && (
                  <div className="flex items-center gap-3 text-foreground/80">
                    <div className="size-8 rounded-full bg-surface-soft flex items-center justify-center">
                      <User className="size-4 text-primary/60" />
                    </div>
                    <span className="text-sm font-serif font-medium italic">{source.author}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-6 border-t border-border/10">
                  <Badge variant="outline" className="rounded-full bg-background/50 backdrop-blur-md border-primary/20 text-primary font-bold px-4 py-1.5 shadow-sm group-hover:bg-primary/10 transition-colors">
                    {source._count?.snippets || 0} {(source._count?.snippets || 0) === 1 ? 'Snippet' : 'Snippets'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-4xl w-[95vw] max-h-[85vh] overflow-hidden flex flex-col rounded-[2.5rem] p-0 border border-border/40 shadow-2xl bloom-card">
          {selectedSource && (
            <>
              <DialogHeader className="relative p-10 pb-8 bg-surface-soft/40 border-b border-border/40 grain-overlay text-left shrink-0">
                <img 
                  src="/images/texture-dark.png" 
                  className="absolute inset-0 w-full h-full object-cover opacity-10" 
                  alt=""
                />
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-6">
                    <div className="flex items-start gap-5">
                      <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-sm shrink-0 mt-1">
                        <BookOpen className="size-8" />
                      </div>
                      <div className="flex flex-col">
                         <Badge variant="outline" className="w-fit rounded-full bg-background/50 backdrop-blur-md border-primary/20 text-primary text-[10px] uppercase font-bold tracking-widest mb-2 shadow-sm">
                           Primary Archive
                         </Badge>
                         <DialogTitle className="text-4xl font-serif tracking-tight leading-tight">{selectedSource.title}</DialogTitle>
                         {selectedSource.author && (
                           <div className="mt-3 flex items-center gap-2 text-muted-foreground">
                             <User className="size-4 shrink-0" />
                             <span className="font-serif italic">{selectedSource.author}</span>
                           </div>
                         )}
                      </div>
                    </div>
                    <Badge variant="outline" className="shrink-0 rounded-full bg-primary/5 border-primary/20 text-primary font-bold px-4 py-1.5 shadow-sm md:mt-2">
                      {selectedSource.snippets.length} Fragments
                    </Badge>
                  </div>
                  
                  <div className="flex flex-col gap-4 pt-6 border-t border-border/20">
                    <div className="relative w-full">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none z-10" />
                      <Input
                        placeholder="Search fragments by text..."
                        className="pl-12 rounded-full bg-background/60 backdrop-blur-md border-border/50 h-12 shadow-sm focus:ring-primary/20 w-full"
                        value={snippetSearchQuery}
                        onChange={(e) => setSnippetSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    {uniqueTags.length > 0 && (
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mr-2">Filter Tags:</span>
                        {uniqueTags.map((tag: any) => {
                          const isSelected = selectedTagIds.includes(tag.id);
                          return (
                            <Badge
                              key={tag.id}
                              variant={isSelected ? "default" : "outline"}
                              className={cn(
                                "cursor-pointer rounded-full px-3 py-1 transition-all text-xs shadow-sm",
                                isSelected ? "bg-primary text-primary-foreground" : "bg-background/60 backdrop-blur-md border-border/50 hover:bg-surface-soft"
                              )}
                              onClick={() => toggleTagFilter(tag.id)}
                            >
                              <Hash className="size-3 mr-1 opacity-70" />
                              {tag.name}
                            </Badge>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-background/50">
                {filteredSnippets.length === 0 ? (
                  <div className="py-20 text-center space-y-4">
                    <Quote className="size-16 text-muted-foreground/20 mx-auto" />
                    <p className="text-lg text-muted-foreground font-serif italic">No fragments found matching your filters.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {filteredSnippets.map((snippet: any) => (
                      <div key={snippet.id} className="relative group animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="absolute -left-6 top-0 bottom-0 w-1 bg-primary/10 group-hover:bg-primary transition-colors rounded-full" />
                        <div className="p-8 rounded-[2rem] bg-surface-soft/20 border border-border/40 hover:bg-surface-soft/40 transition-colors shadow-sm">
                          <p className="text-xl font-serif italic leading-relaxed text-foreground/90 mb-6">
                            "{snippet.content}"
                          </p>
                          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/20">
                            <div className="flex flex-wrap items-center gap-2">
                              {snippet.tags.map((tag: any) => (
                                <Badge key={tag.id} variant="secondary" className="rounded-full bg-primary/5 text-primary text-[10px] uppercase font-bold tracking-widest px-2 py-0 border border-primary/10">
                                  {tag.name}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase tracking-widest font-bold ml-auto">
                              <Calendar className="size-3" />
                              <span>{new Date(snippet.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6 bg-surface-soft/40 border-t border-border/40 flex justify-end px-10">
                <Button variant="outline" className="rounded-full font-sans shadow-sm hover:bg-surface-soft" onClick={() => setIsDetailOpen(false)}>
                  Close Archive
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
