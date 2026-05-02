import { getSources } from "@/app/actions/dashboard";
import { SourceGrid } from "@/components/source-grid";
import { AddSourceDialog } from "@/components/add-source-dialog";
import { BookOpen } from "lucide-react";

export default async function SourcesPage() {
  const sources = await getSources();

  return (
    <div className="space-y-12 animate-fade-in pb-20">
      <section className="relative min-h-[300px] w-full rounded-[2.5rem] overflow-hidden border border-border/40 shadow-2xl group grain-overlay">
        <img 
          src="/images/archives.png" 
          alt="Archives" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 scale-100 brightness-[0.9] dark:brightness-[0.6]"
        />
        <div className="bloom-gradient-bg opacity-30 mix-blend-overlay" />
        
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent flex flex-col justify-center p-12">
          <div className="max-w-2xl space-y-4 relative z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] uppercase font-bold tracking-widest backdrop-blur-md">
              <BookOpen className="size-3" />
              <span>{sources.length} primary archives</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-medium text-foreground tracking-tighter leading-none animate-fade-in-up">
              Archives
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-md font-sans leading-relaxed animate-fade-in-up animation-delay-100">
              The primary documents and origins of your intellectual journey.
            </p>
          </div>
          
          <div className="absolute bottom-10 right-10 z-30 animate-fade-in animation-delay-200">
            <AddSourceDialog />
          </div>
        </div>
      </section>

      <SourceGrid sources={sources} />
    </div>
  );
}
