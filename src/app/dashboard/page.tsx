import { BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardActions } from "@/components/dashboard-actions";

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-serif text-foreground mb-2">Your Library</h1>
          <p className="text-muted-foreground text-lg">Manage your snippets, tags, and sources.</p>
        </div>
        <DashboardActions />
      </div>
      
      <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-border rounded-[2rem] bg-surface-soft/30">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
          <BookMarked className="size-8" />
        </div>
        <h3 className="text-2xl font-serif font-medium mb-2">No snippets yet</h3>
        <p className="text-muted-foreground max-w-sm mb-8">
          Start building your library of wisdom by saving your first passage.
        </p>
        <Button variant="outline" className="rounded-full h-12 px-8">
          Add Snippet
        </Button>
      </div>
    </div>
  );
}
