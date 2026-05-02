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

  const filteredTags = useMemo(() => {
    return tags.filter(tag => 
      tag.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tags, searchQuery]);

  const filteredSnippets = useMemo(() => {
    if (!selectedTag) return [];
    if (sourceFilter === "all") return selectedTag.snippets;
    if (sourceFilter === "none") return selectedTag.snippets.filter((s: any) => !s.source);
    return selectedTag.snippets.filter((s: any) => s.sourceId === sourceFilter);
  }, [selectedTag, sourceFilter]);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">


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
              className="bloom-card group hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 cursor-pointer overflow-hidden border-none bg-surface-soft/40"
              onClick={() => handleTagClick(tag)}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Hash className="size-12" />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="rounded-full bg-primary/10 border-primary/20 text-primary font-bold px-3">
                    {tag._count.snippets}
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-serif mt-4 group-hover:text-primary transition-colors">
                  {tag.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-sans mt-2">
                  <Calendar className="size-3" />
                  <span>Modified {new Date(tag.updatedAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col rounded-2xl p-0 border-none shadow-2xl">
          {selectedTag && (
            <>
              <DialogHeader className="p-8 pb-4 bg-surface-soft/50 border-b border-border/40">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <Hash className="size-5" />
                    </div>
                    <DialogTitle className="text-3xl font-serif">{selectedTag.name}</DialogTitle>
                  </div>
                  <Badge variant="secondary" className="rounded-full px-4 py-1">
                    {selectedTag.snippets.length} Snippets
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 mt-6">
                  <div className="relative flex-1">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Select value={sourceFilter} onValueChange={(val) => setSourceFilter(val || "all")}>
                      <SelectTrigger className="pl-10 rounded-full bg-background/50 border-border/50 h-10">
                        <SelectValue placeholder="Filter by source" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="all">All Sources</SelectItem>
                        <SelectItem value="none">No Source</SelectItem>
                        {uniqueSources.map((source: any) => (
                          <SelectItem key={source.id} value={source.id}>{source.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto p-8 pt-6 space-y-6 bg-background">
                {filteredSnippets.length === 0 ? (
                  <div className="py-20 text-center space-y-4">
                    <Quote className="size-12 text-muted-foreground/30 mx-auto" />
                    <p className="text-muted-foreground">No snippets found matching this filter.</p>
                  </div>
                ) : (
                  filteredSnippets.map((snippet: any) => (
                    <div key={snippet.id} className="relative group animate-in fade-in slide-in-from-top-2 duration-500">
                      <div className="absolute -left-4 top-0 bottom-0 w-1 bg-primary/10 group-hover:bg-primary transition-colors rounded-full" />
                      <div className="space-y-4">
                        <p className="text-xl font-serif italic leading-relaxed text-foreground/90">
                          "{snippet.content}"
                        </p>
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                          {snippet.source && (
                            <div className="flex items-center gap-1.5 text-sm text-primary/80 font-medium">
                              <BookOpen className="size-4" />
                              <span>{snippet.source.title}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar className="size-3" />
                            <span>{new Date(snippet.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-6 bg-surface-soft/30 border-t border-border/40 text-center">
                <Button variant="ghost" className="rounded-full font-serif italic" onClick={() => setIsDetailOpen(false)}>
                  Close Fragment
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
