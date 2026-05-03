"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Hash, Plus, Quote, BookOpen, Calendar, Search, Filter } from "lucide-react";
import { createTag } from "@/app/actions/dashboard";
import { toast } from "sonner";

interface TagGridProps {
  tags: any[];
}

export function TagGrid({ tags }: TagGridProps) {
  const [selectedTag, setSelectedTag] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddTagOpen, setIsAddTagOpen] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [sourceFilter, setSourceFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [snippetSearchQuery, setSnippetSearchQuery] = useState("");

  const filteredTags = useMemo(() => {
    return tags.filter(tag => 
      tag.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tags, searchQuery]);

  const filteredSnippets = useMemo(() => {
    if (!selectedTag) return [];
    
    let filtered = selectedTag.snippets;
    
    if (sourceFilter === "none") {
      filtered = filtered.filter((s: any) => !s.source);
    } else if (sourceFilter !== "all") {
      filtered = filtered.filter((s: any) => s.sourceId === sourceFilter);
    }
    
    if (snippetSearchQuery.trim()) {
      const lowerQuery = snippetSearchQuery.toLowerCase();
      filtered = filtered.filter((s: any) => 
        s.content.toLowerCase().includes(lowerQuery)
      );
    }
    
    return filtered;
  }, [selectedTag, sourceFilter, snippetSearchQuery]);

  const uniqueSources = useMemo(() => {
    if (!selectedTag) return [];
    const sources = new Map();
    selectedTag.snippets.forEach((s: any) => {
      if (s.source) {
        sources.set(s.source.id, s.source);
      }
    });
    return Array.from(sources.values());
  }, [selectedTag]);

  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagName.trim()) return;
    setIsSaving(true);
    const res = await createTag(newTagName);
    setIsSaving(false);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Tag added!");
      setNewTagName("");
      setIsAddTagOpen(false);
    }
  };

  const handleTagClick = (tag: any) => {
    setSelectedTag(tag);
    setSourceFilter("all");
    setSnippetSearchQuery("");
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-8 px-2">
      <div className="relative max-w-md mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search taxonomy by tag name..."
          className="pl-10 rounded-full bg-surface-soft/30 border-border/40 h-11 focus:ring-primary/20"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-max">

        {filteredTags.length === 0 ? (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-muted rounded-[2rem]">
            <Hash className="size-12 text-muted mx-auto mb-4" />
            <h3 className="text-xl font-serif font-medium">No tags found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search query.</p>
          </div>
        ) : (
          filteredTags.map((tag) => (
            <Card 
              key={tag.id} 
              className="relative bloom-card group hover:-translate-y-1.5 transition-all duration-700 cursor-pointer overflow-hidden border border-border/40 bg-surface-soft/20 hover:bg-surface-soft/40 hover:shadow-2xl hover:shadow-primary/5 grain-overlay flex flex-col min-h-[260px] rounded-[2rem]"
              onClick={() => handleTagClick(tag)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img 
                src="/images/texture-light.png" 
                className="absolute inset-0 w-full h-full object-cover opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700 mix-blend-overlay" 
                alt=""
              />
              <div className="absolute top-0 right-0 p-8 text-foreground/5 group-hover:text-primary/10 transition-all duration-700 translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-12">
                <Hash className="size-32" />
              </div>
              
              <CardHeader className="relative z-10 flex-1 pb-4 pt-8 px-8">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-4 opacity-70">
                  <Hash className="size-3" />
                  Topic
                </div>
                <CardTitle className="text-3xl font-serif group-hover:text-primary transition-colors leading-tight break-words line-clamp-3">
                  {tag.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 mt-auto pb-8 px-8">
                <div className="flex items-center pt-6 border-t border-border/10">
                  <Badge variant="outline" className="rounded-full bg-background/50 backdrop-blur-md border-primary/20 text-primary font-bold px-4 py-1.5 shadow-sm group-hover:bg-primary/10 transition-colors">
                    {tag._count.snippets} {tag._count.snippets === 1 ? 'Fragment' : 'Fragments'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-4xl w-[95vw] max-h-[85vh] overflow-hidden flex flex-col rounded-[2.5rem] p-0 border border-border/40 shadow-2xl bloom-card">
          {selectedTag && (
            <>
              <DialogHeader className="relative p-10 pb-8 bg-surface-soft/40 border-b border-border/40 grain-overlay text-left shrink-0">
                <img 
                  src="/images/texture-light.png" 
                  className="absolute inset-0 w-full h-full object-cover opacity-10" 
                  alt=""
                />
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-6">
                    <div className="flex items-start gap-5">
                      <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-sm shrink-0 mt-1">
                        <Hash className="size-8" />
                      </div>
                      <div className="flex flex-col">
                         <Badge variant="outline" className="w-fit rounded-full bg-background/50 backdrop-blur-md border-primary/20 text-primary text-[10px] uppercase font-bold tracking-widest mb-2 shadow-sm">
                           Taxonomy
                         </Badge>
                         <DialogTitle className="text-4xl font-serif tracking-tight leading-tight">{selectedTag.name}</DialogTitle>
                      </div>
                    </div>
                    <Badge variant="outline" className="shrink-0 rounded-full bg-primary/5 border-primary/20 text-primary font-bold px-4 py-1.5 shadow-sm md:mt-2">
                      {selectedTag.snippets.length} Fragments
                    </Badge>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-border/20">
                    <div className="relative w-full max-w-sm">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none z-10" />
                      <Input
                        placeholder="Search fragments by text..."
                        className="pl-12 rounded-full bg-background/60 backdrop-blur-md border-border/50 h-12 shadow-sm focus:ring-primary/20 w-full"
                        value={snippetSearchQuery}
                        onChange={(e) => setSnippetSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="relative w-full max-w-sm">
                      <Filter className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none z-10" />
                      <Select value={sourceFilter} onValueChange={(val) => setSourceFilter(val || "all")}>
                        <SelectTrigger className="pl-12 rounded-full bg-background/60 backdrop-blur-md border-border/50 h-12 shadow-sm focus:ring-primary/20">
                          <span className="flex items-center gap-1.5 truncate">
                            {sourceFilter === "all" ? "All Archives" : sourceFilter === "none" ? "No Archive" : uniqueSources.find((s: any) => s.id === sourceFilter)?.title || "Filter by source archive"}
                          </span>
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl">
                          <SelectItem value="all" className="rounded-xl">All Archives</SelectItem>
                          <SelectItem value="none" className="rounded-xl">No Archive</SelectItem>
                          {uniqueSources.map((source: any) => (
                            <SelectItem key={source.id} value={source.id} className="rounded-xl">{source.title}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-background/50">
                {filteredSnippets.length === 0 ? (
                  <div className="py-20 text-center space-y-4">
                    <Quote className="size-16 text-muted-foreground/20 mx-auto" />
                    <p className="text-lg text-muted-foreground font-serif italic">No fragments found matching this filter.</p>
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
                            {snippet.source && (
                              <div className="flex items-center gap-2 text-sm text-primary/80 font-medium">
                                <BookOpen className="size-4" />
                                <span>{snippet.source.title}</span>
                              </div>
                            )}
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
                  Close Collection
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
