"use client";

import { useState } from "react";
import { Plus, BookOpen } from "lucide-react";
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
import { createSource } from "@/app/actions/dashboard";

export function AddSourceDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddSource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setIsLoading(true);
    const res = await createSource(title, author);
    setIsLoading(false);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Source added!");
      setTitle("");
      setAuthor("");
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-full shadow-sm gap-2 h-9 px-4 py-2">
        <Plus className="size-4" />
        Add Source
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <form onSubmit={handleAddSource}>
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl tracking-tight">New Source</DialogTitle>
            <DialogDescription>
              Add a book, article, or lecture to reference in your snippets.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-6">
            <div className="space-y-2">
              <Label htmlFor="sourceTitle" className="ml-1 text-sm font-medium">Title</Label>
              <Input
                id="sourceTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. The Metamorphosis"
                className="rounded-xl"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sourceAuthor" className="ml-1 text-sm font-medium">Author (Optional)</Label>
              <Input
                id="sourceAuthor"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Franz Kafka"
                className="rounded-xl"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading} className="w-full rounded-full h-11">
              {isLoading ? "Saving..." : "Save Source"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
