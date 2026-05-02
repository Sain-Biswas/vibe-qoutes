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
import { createTag } from "@/app/actions/dashboard";

interface AddTagDialogProps {
  trigger?: React.ReactNode;
}

export function AddTagDialog({ trigger }: AddTagDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tagName, setTagName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagName.trim()) return;
    setIsLoading(true);
    const res = await createTag(tagName);
    setIsLoading(false);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Tag created!");
      setTagName("");
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-full shadow-sm gap-2 h-9 px-4 py-2">
        <Plus className="size-4" />
        Add Tag
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <form onSubmit={handleAddTag}>
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl tracking-tight">New Tag</DialogTitle>
            <DialogDescription>
              Create a new taxonomy tag to organize your snippets.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-6">
            <div className="space-y-2">
              <Label htmlFor="tagName" className="ml-1 text-sm font-medium">Tag Name</Label>
              <Input
                id="tagName"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                placeholder="e.g. society, faith, love"
                className="rounded-xl"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading} className="w-full rounded-full h-11">
              {isLoading ? "Saving..." : "Save Tag"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
