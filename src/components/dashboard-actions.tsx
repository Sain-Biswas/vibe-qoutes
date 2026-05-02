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
import { createTag, createSource } from "@/app/actions/dashboard";

export function DashboardActions() {
  const [isTagOpen, setIsTagOpen] = useState(false);
  const [isSourceOpen, setIsSourceOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Tag State
  const [tagName, setTagName] = useState("");

  // Source State
  const [sourceTitle, setSourceTitle] = useState("");
  const [sourceAuthor, setSourceAuthor] = useState("");

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

      <Button className="rounded-full shadow-md gap-2 h-10 px-6">
        <Plus className="size-4" />
        New Snippet
      </Button>
    </div>
  );
}
