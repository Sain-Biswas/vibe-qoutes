"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, User, Calendar, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface SourceGridProps {
  sources: any[];
}

export function SourceGrid({ sources }: SourceGridProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSources = useMemo(() => {
    return sources.filter(source => 
      source.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (source.author && source.author.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [sources, searchQuery]);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSources.length === 0 ? (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-muted rounded-[2rem]">
            <BookOpen className="size-12 text-muted mx-auto mb-4" />
            <h3 className="text-xl font-serif font-medium">No results found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search query.</p>
          </div>
        ) : (
          filteredSources.map((source) => (
            <Card key={source.id} className="relative bloom-card group hover:scale-[1.02] transition-all duration-500 border-none bg-card/60 backdrop-blur-sm overflow-hidden grain-overlay">
              <img 
                src="/images/texture-dark.png" 
                className="absolute inset-0 w-full h-full object-cover opacity-5 group-hover:opacity-10 transition-opacity" 
                alt=""
              />
              <CardHeader className="relative z-10 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <BookOpen className="size-6" />
                  </div>
                  <Badge variant="outline" className="rounded-full bg-secondary text-[10px] uppercase tracking-widest font-bold">
                    Archive
                  </Badge>
                </div>
                <CardTitle className="text-3xl font-serif leading-tight tracking-tight group-hover:text-primary transition-colors">
                  {source.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 space-y-6">
                {source.author && (
                  <div className="flex items-center gap-3 text-foreground/80">
                    <div className="size-8 rounded-full bg-surface-soft flex items-center justify-center">
                      <User className="size-4 text-primary/60" />
                    </div>
                    <span className="text-sm font-serif font-medium italic">{source.author}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between gap-2 text-[10px] text-muted-foreground uppercase tracking-widest font-bold pt-4 border-t border-border/20">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="size-3" />
                    <span>{new Date(source.createdAt).toLocaleDateString()}</span>
                  </div>
                  <span className="text-primary/40">•</span>
                  <span>{source._count?.snippets || 0} Snippets</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
