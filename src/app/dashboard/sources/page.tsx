import { getSources } from "@/app/actions/dashboard";
import { SourceGrid } from "@/components/source-grid";
import { AddSourceDialog } from "@/components/add-source-dialog";
import { BookOpen } from "lucide-react";

export default async function SourcesPage() {
  const sources = await getSources();

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative h-48 w-full rounded-[2rem] overflow-hidden border border-border/40 group">
        <img 
          src="/resources/3.webp" 
          alt="Sources Hero" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent flex items-center justify-between px-10">
          <div>
            <h1 className="text-4xl font-serif font-medium text-foreground tracking-tight">Archives</h1>
            <p className="text-muted-foreground mt-2 font-sans max-w-sm">The primary documents and origins of your intellectual journey.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-md rounded-full border border-border/40 shadow-sm">
              <BookOpen className="size-4 text-primary" />
              <span className="text-sm font-medium text-primary">{sources.length} Total</span>
            </div>
            <AddSourceDialog />
          </div>
        </div>
      </div>

      <SourceGrid sources={sources} />
    </div>
  );
}
