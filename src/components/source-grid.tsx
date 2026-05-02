"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, User, Calendar, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

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
            <Card key={source.id} className="bloom-card group hover:shadow-xl transition-all duration-500 border-none bg-surface-soft/40">
              <CardHeader className="pb-2">
                <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="size-5" />
                </div>
                <CardTitle className="text-2xl font-serif leading-tight">
                  {source.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {source.author && (
                  <div className="flex items-center gap-2 text-foreground/70">
                    <User className="size-4 text-primary/60" />
                    <span className="text-sm font-medium">{source.author}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border/40">
                  <Calendar className="size-3" />
                  <span>Added {new Date(source.createdAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
