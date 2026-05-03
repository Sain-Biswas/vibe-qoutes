"use client";

import { useState } from "react";
import { Plus, Quote, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { createSnippet } from "@/app/actions/dashboard";
import { cn } from "@/lib/utils";

interface AddSnippetDialogProps {
  tags: any[];
  sources: any[];
}

export function AddSnippetDialog({ tags, sources }: AddSnippetDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddSnippet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("Please enter some content");
      return;
    }
    setIsLoading(true);
    const res = await createSnippet(content, selectedSourceId === "none" || !selectedSourceId ? undefined : selectedSourceId, selectedTagIds);
    setIsLoading(false);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Snippet saved!");
      setContent("");
      setSelectedSourceId(null);
      setSelectedTagIds([]);
      setIsOpen(false);
    }
  };

  const toggleTag = (tagId: string) => {
    setSelectedTagIds(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-md gap-2 h-9 px-4 py-2">
        <Plus className="size-4" />
        Add Snippet
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-2xl">
        <form onSubmit={handleAddSnippet}>
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl tracking-tight">Capture Wisdom</DialogTitle>
            <DialogDescription>
              Save a thought, quote, or passage to your library.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-6">
            <div className="space-y-2">
              <Label htmlFor="content" className="ml-1 text-sm font-medium">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What did you learn today?"
                className="min-h-[120px] rounded-xl bg-surface-soft/50 border-border/50 focus:ring-primary/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="source" className="ml-1 text-sm font-medium">Source (Optional)</Label>
              <Select value={selectedSourceId} onValueChange={setSelectedSourceId}>
                <SelectTrigger className="rounded-xl bg-surface-soft/50 border-border/50">
                  <span className="flex items-center gap-1.5 truncate text-muted-foreground data-[has-value=true]:text-foreground" data-has-value={!!selectedSourceId}>
                    {selectedSourceId === "none" ? "None" : (selectedSourceId ? sources.find(s => s.id === selectedSourceId)?.title : "Select a source...")}
                  </span>
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="none">None</SelectItem>
                  {sources.map((source) => (
                    <SelectItem key={source.id} value={source.id}>
                      {source.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="ml-1 text-sm font-medium">Tags</Label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => {
                  const isSelected = selectedTagIds.includes(tag.id);
                  return (
                    <Badge
                      key={tag.id}
                      variant={isSelected ? "default" : "outline"}
                      className={cn(
                        "cursor-pointer rounded-full px-3 py-1 transition-all",
                        isSelected ? "bg-primary" : "hover:bg-primary/10"
                      )}
                      onClick={() => toggleTag(tag.id)}
                    >
                      {tag.name}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading} className="w-full rounded-full h-11 shadow-lg shadow-primary/20">
              {isLoading ? "Saving..." : "Save to Library"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
