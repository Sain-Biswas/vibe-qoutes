import { getSources } from "@/app/actions/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, User, Calendar } from "lucide-react";

export default async function SourcesPage() {
  const sources = await getSources();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-medium text-foreground tracking-tight">Sources</h1>
          <p className="text-muted-foreground mt-2 font-sans">The origins of your gathered wisdom.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10">
          <BookOpen className="size-4 text-primary" />
          <span className="text-sm font-medium text-primary">{sources.length} Sources Total</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sources.length === 0 ? (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-muted rounded-[2rem]">
            <BookOpen className="size-12 text-muted mx-auto mb-4" />
            <h3 className="text-xl font-serif font-medium">No sources recorded</h3>
            <p className="text-muted-foreground mt-2">Add your first book or article to begin referencing.</p>
          </div>
        ) : (
          sources.map((source) => (
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
