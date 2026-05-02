import { getTags } from "@/app/actions/dashboard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hash, Layers } from "lucide-react";

export default async function TagsPage() {
  const tags = await getTags();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-medium text-foreground tracking-tight">Taxonomy</h1>
          <p className="text-muted-foreground mt-2 font-sans">Organize your thoughts with tags and themes.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10">
          <Layers className="size-4 text-primary" />
          <span className="text-sm font-medium text-primary">{tags.length} Tags Total</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tags.length === 0 ? (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-muted rounded-[2rem]">
            <Hash className="size-12 text-muted mx-auto mb-4" />
            <h3 className="text-xl font-serif font-medium">No tags yet</h3>
            <p className="text-muted-foreground mt-2">Start by adding a new tag from the dashboard.</p>
          </div>
        ) : (
          tags.map((tag) => (
            <Card key={tag.id} className="bloom-card group hover:scale-[1.02] transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-serif flex items-center justify-between">
                  <span className="truncate">{tag.name}</span>
                  <Badge variant="secondary" className="font-sans font-normal rounded-full">
                    {tag._count.snippets}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-xs text-muted-foreground font-sans">
                  <span>Created {new Date(tag.createdAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
