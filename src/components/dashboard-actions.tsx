"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { createTag, createSource, createSnippet } from "@/app/actions/dashboard";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardActionsProps {
  tags: any[];
  sources: any[];
}

export function DashboardActions({ tags, sources }: DashboardActionsProps) {
  const [isTagOpen, setIsTagOpen] = useState(false);
  const [isSourceOpen, setIsSourceOpen] = useState(false);
  const [isSnippetOpen, setIsSnippetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Tag State
  const [tagName, setTagName] = useState("");

  // Source State
  const [sourceTitle, setSourceTitle] = useState("");
  const [sourceAuthor, setSourceAuthor] = useState("");

  // Snippet State
  const [snippetContent, setSnippetContent] = useState("");
  const [selectedSourceId, setSelectedSourceId] = useState<string>("");
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await createTag(tagName);
    setIsLoading(false);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Tag created!");
      setTagName("");
      setIsTagOpen(false);
    }
  };

  const handleAddSource = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await createSource(sourceTitle, sourceAuthor);
    setIsLoading(false);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Source created!");
      setSourceTitle("");
      setSourceAuthor("");
      setIsSourceOpen(false);
    }
  };

  const handleAddSnippet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!snippetContent.trim()) {
      toast.error("Please enter some content");
      return;
    }
    setIsLoading(true);
    const res = await createSnippet(snippetContent, selectedSourceId === "none" ? undefined : selectedSourceId, selectedTagIds);
    setIsLoading(false);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Snippet saved!");
      setSnippetContent("");
      setSelectedSourceId("");
      setSelectedTagIds([]);
      setIsSnippetOpen(false);
    }
  };

  const toggleTag = (tagId: string) => {
    setSelectedTagIds(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  };

  return (
    <div className="flex items-center gap-3">
      {/* Tag Dialog */}
      <Dialog open={isTagOpen} onOpenChange={setIsTagOpen}>
        <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-full shadow-sm gap-2 h-9 px-4 py-2">
          <Plus className="size-4" />
          Add Tag
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] rounded-[2rem]">
          <form onSubmit={handleAddTag}>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">New Tag</DialogTitle>
              <DialogDescription>
                Create a new taxonomy tag to organize your snippets.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-6">
              <div className="space-y-2">
                <Label htmlFor="tagName" className="ml-1">Tag Name</Label>
                <Input
                  id="tagName"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  placeholder="e.g. society, faith, love"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading} className="rounded-full px-6">
                {isLoading ? "Saving..." : "Save Tag"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Source Dialog */}
      <Dialog open={isSourceOpen} onOpenChange={setIsSourceOpen}>
        <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-full shadow-sm gap-2 h-9 px-4 py-2">
          <Plus className="size-4" />
          Add Source
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] rounded-[2rem]">
          <form onSubmit={handleAddSource}>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">New Source</DialogTitle>
              <DialogDescription>
                Add a book, article, or lecture to reference in your snippets.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-6">
              <div className="space-y-2">
                <Label htmlFor="sourceTitle" className="ml-1">Title</Label>
                <Input
                  id="sourceTitle"
                  value={sourceTitle}
                  onChange={(e) => setSourceTitle(e.target.value)}
                  placeholder="e.g. The Metamorphosis"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sourceAuthor" className="ml-1">Author (Optional)</Label>
                <Input
                  id="sourceAuthor"
                  value={sourceAuthor}
                  onChange={(e) => setSourceAuthor(e.target.value)}
                  placeholder="e.g. Franz Kafka"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading} className="rounded-full px-6">
                {isLoading ? "Saving..." : "Save Source"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isSnippetOpen} onOpenChange={setIsSnippetOpen}>
        <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-md gap-2 h-10 px-6">
          <Plus className="size-4" />
          New Snippet
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] rounded-[2rem]">
          <form onSubmit={handleAddSnippet}>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">Capture Wisdom</DialogTitle>
              <DialogDescription>
                Save a thought, quote, or passage to your library.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-6">
              <div className="space-y-2">
                <Label htmlFor="content" className="ml-1">Content</Label>
                <Textarea
                  id="content"
                  value={snippetContent}
                  onChange={(e) => setSnippetContent(e.target.value)}
                  placeholder="What did you learn today?"
                  className="min-h-[120px] rounded-xl bg-surface-soft/50 border-border/50 focus:ring-primary/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="source" className="ml-1">Source (Optional)</Label>
                <Select value={selectedSourceId} onValueChange={(val) => setSelectedSourceId(val || "")}>
                  <SelectTrigger className="rounded-xl bg-surface-soft/50 border-border/50">
                    <SelectValue placeholder="Select a source..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="none">None</SelectItem>
                    {sources.map((source) => (
                      <SelectItem key={source.id} value={source.id}>
                        {source.title} {source.author && `(${source.author})`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="ml-1">Tags</Label>
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
                  {tags.length === 0 && (
                    <p className="text-xs text-muted-foreground italic">No tags created yet.</p>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading} className="w-full rounded-full h-12 text-lg shadow-lg shadow-primary/20">
                {isLoading ? "Saving..." : "Save to Library"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
