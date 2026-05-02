import { getTags } from "@/app/actions/dashboard";
import { TagGrid } from "@/components/tag-grid";
import { AddTagDialog } from "@/components/add-tag-dialog";
import { Layers } from "lucide-react";

export default async function TagsPage() {
  const tags = await getTags();

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative h-48 w-full rounded-[2rem] overflow-hidden border border-border/40 group">
        <img 
          src="/resources/4.webp" 
          alt="Taxonomy Hero" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent flex items-center justify-between px-10">
          <div>
            <h1 className="text-4xl font-serif font-medium text-foreground tracking-tight">Taxonomy</h1>
            <p className="text-muted-foreground mt-2 font-sans max-w-sm">Organize your thoughts into a structured web of meaning.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-md rounded-full border border-border/40 shadow-sm">
              <Layers className="size-4 text-primary" />
              <span className="text-sm font-medium text-primary">{tags.length} Tags Total</span>
            </div>
            <AddTagDialog />
          </div>
        </div>
      </div>

      <TagGrid tags={tags} />
    </div>
  );
}
