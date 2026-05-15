"use client";

import { useState, useMemo } from "react";
import { Plus, Quote, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { createSnippet } from "@/app/actions/dashboard";
import { cn } from "@/lib/utils";

interface AddSnippetDialogProps {
  tags: any[];
  sources: any[];
}

export function AddSnippetDialog({ tags, sources }: AddSnippetDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Common location fields
  const [pageNumber, setPageNumber] = useState("");
  const [chapter, setChapter] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [section, setSection] = useState("");
  const [verse, setVerse] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [locationNotes, setLocationNotes] = useState("");

  // Video snippet fields
  const [videoUrl, setVideoUrl] = useState("");
  const [duration, setDuration] = useState("");

  // Podcast snippet fields
  const [episodeUrl, setEpisodeUrl] = useState("");
  const [episodeNumber, setEpisodeNumber] = useState("");
  const [episodeTitle, setEpisodeTitle] = useState("");

  // Person snippet fields
  const [event, setEvent] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");

  // Sacred Scripture snippet fields
  const [scriptureBook, setScriptureBook] = useState("");
  const [canto, setCanto] = useState("");
  const [hymn, setHymn] = useState("");

  const selectedSource = useMemo(() => {
    if (!selectedSourceId || selectedSourceId === "none") return null;
    return sources.find(s => s.id === selectedSourceId) || null;
  }, [selectedSourceId, sources]);

  const resetForm = () => {
    setContent("");
    setSelectedSourceId(null);
    setSelectedTagIds([]);
    setPageNumber(""); setChapter(""); setParagraph("");
    setSection(""); setVerse(""); setTimestamp("");
    setLocationNotes("");
    setVideoUrl(""); setDuration("");
    setEpisodeUrl(""); setEpisodeNumber(""); setEpisodeTitle("");
    setEvent(""); setEventDate(""); setEventLocation("");
    setScriptureBook(""); setCanto(""); setHymn("");
  };

  const handleAddSnippet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("Please enter some content");
      return;
    }
    setIsLoading(true);

    const sourceId = selectedSourceId === "none" || !selectedSourceId ? undefined : selectedSourceId;
    const location = sourceId ? {
      pageNumber: pageNumber || undefined,
      chapter: chapter || undefined,
      paragraph: paragraph || undefined,
      section: section || undefined,
      verse: verse || undefined,
      timestamp: timestamp || undefined,
      locationNotes: locationNotes || undefined,
      videoUrl: videoUrl || undefined,
      duration: duration || undefined,
      episodeUrl: episodeUrl || undefined,
      episodeNumber: episodeNumber || undefined,
      episodeTitle: episodeTitle || undefined,
      event: event || undefined,
      eventDate: eventDate || undefined,
      eventLocation: eventLocation || undefined,
      scriptureBook: scriptureBook || undefined,
      canto: canto || undefined,
      hymn: hymn || undefined,
    } : undefined;

    const res = await createSnippet(content, sourceId, selectedTagIds, location);
    setIsLoading(false);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Snippet saved!");
      resetForm();
      setIsOpen(false);
    }
  };

  const toggleTag = (tagId: string) => {
    setSelectedTagIds(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  };

  const sourceType = selectedSource?.type || null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-md gap-2 h-9 px-4 py-2">
        <Plus className="size-4" />
        Add Snippet
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[85vh] overflow-hidden flex flex-col rounded-2xl p-0">
        <form onSubmit={handleAddSnippet} className="flex flex-col overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-4 shrink-0">
            <DialogTitle className="font-serif text-2xl tracking-tight">Capture Wisdom</DialogTitle>
            <DialogDescription>
              Save a thought, quote, or passage to your library.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <div className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="content" className="ml-1 text-sm font-medium">Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What did you learn today?"
                  className="min-h-[120px] rounded-xl bg-surface-soft/50 border-border/50 focus:ring-primary/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="source" className="ml-1 text-sm font-medium">Source (Optional)</Label>
                <Select value={selectedSourceId} onValueChange={setSelectedSourceId}>
                  <SelectTrigger className="rounded-xl bg-surface-soft/50 border-border/50">
                    <span className="flex items-center gap-1.5 truncate text-muted-foreground data-[has-value=true]:text-foreground" data-has-value={!!selectedSourceId}>
                      {selectedSourceId === "none" ? "None" : (selectedSourceId ? sources.find(s => s.id === selectedSourceId)?.title : "Select a source...")}
                    </span>
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="none">None</SelectItem>
                    {sources.map((source) => (
                      <SelectItem key={source.id} value={source.id}>
                        {source.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location fields — shown when a source is selected */}
              {selectedSource && (
                <div className="space-y-4 p-4 rounded-2xl bg-surface-soft/20 border border-border/30">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                    📍 Location in Source
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {/* BOOK */}
                    {sourceType === "BOOK" && (
                      <>
                        <LocationField label="Page Number" value={pageNumber} onChange={setPageNumber} placeholder="e.g. 42" />
                        <LocationField label="Chapter" value={chapter} onChange={setChapter} placeholder="e.g. Chapter 3" />
                        <LocationField label="Paragraph" value={paragraph} onChange={setParagraph} placeholder="e.g. 2nd paragraph" />
                      </>
                    )}

                    {/* WEB ARTICLE */}
                    {sourceType === "WEB_ARTICLE" && (
                      <div className="col-span-2">
                        <LocationField label="Section Heading" value={section} onChange={setSection} placeholder="e.g. Getting Started" />
                      </div>
                    )}

                    {/* VIDEO */}
                    {sourceType === "VIDEO" && (
                      <>
                        <div className="col-span-2">
                          <LocationField label="Video URL" value={videoUrl} onChange={setVideoUrl} placeholder="e.g. https://youtube.com/watch?v=..." />
                        </div>
                        <LocationField label="Timestamp" value={timestamp} onChange={setTimestamp} placeholder="e.g. 01:23:45" />
                        <LocationField label="Duration" value={duration} onChange={setDuration} placeholder="e.g. 15:30" />
                      </>
                    )}

                    {/* PODCAST */}
                    {sourceType === "PODCAST" && (
                      <>
                        <div className="col-span-2">
                          <LocationField label="Episode URL" value={episodeUrl} onChange={setEpisodeUrl} placeholder="e.g. https://podcasts.apple.com/..." />
                        </div>
                        <LocationField label="Episode Title" value={episodeTitle} onChange={setEpisodeTitle} placeholder="e.g. The Art of Asking" />
                        <LocationField label="Episode Number" value={episodeNumber} onChange={setEpisodeNumber} placeholder="e.g. #342" />
                        <div className="col-span-2">
                          <LocationField label="Timestamp" value={timestamp} onChange={setTimestamp} placeholder="e.g. 00:45:12" />
                        </div>
                      </>
                    )}

                    {/* SACRED SCRIPTURE */}
                    {sourceType === "SACRED_SCRIPTURE" && (
                      <>
                        <LocationField label="Book / Scripture Section" value={scriptureBook} onChange={setScriptureBook} placeholder="e.g. Genesis, Surah Al-Baqarah" />
                        <LocationField label="Chapter / Adhyaya" value={chapter} onChange={setChapter} placeholder="e.g. Chapter 2" />
                        <LocationField label="Verse / Ayah / Shloka" value={verse} onChange={setVerse} placeholder="e.g. Verse 47" />
                        <LocationField label="Canto / Mandala" value={canto} onChange={setCanto} placeholder="e.g. Canto 1" />
                        <LocationField label="Hymn / Sukta" value={hymn} onChange={setHymn} placeholder="e.g. Hymn 164" />
                        <LocationField label="Page Number" value={pageNumber} onChange={setPageNumber} placeholder="e.g. 42" />
                      </>
                    )}

                    {/* ACADEMIC PAPER */}
                    {sourceType === "ACADEMIC_PAPER" && (
                      <>
                        <LocationField label="Page Number" value={pageNumber} onChange={setPageNumber} placeholder="e.g. 12" />
                        <LocationField label="Section" value={section} onChange={setSection} placeholder="e.g. Methodology" />
                        <LocationField label="Paragraph" value={paragraph} onChange={setParagraph} placeholder="e.g. 3rd paragraph" />
                      </>
                    )}

                    {/* PERSON */}
                    {sourceType === "PERSON" && (
                      <>
                        <LocationField label="Event / Occasion" value={event} onChange={setEvent} placeholder="e.g. Graduation speech, Coffee chat" />
                        <LocationField label="Date" value={eventDate} onChange={setEventDate} placeholder="e.g. 2024-03-15" />
                        <div className="col-span-2">
                          <LocationField label="Location" value={eventLocation} onChange={setEventLocation} placeholder="e.g. Central Park, NYC" />
                        </div>
                      </>
                    )}

                    {/* OTHER */}
                    {sourceType === "OTHER" && (
                      <div className="col-span-2">
                        <LocationField label="Reference" value={section} onChange={setSection} placeholder="e.g. Section, page, or other identifier" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label className="ml-1 text-xs font-medium text-muted-foreground">Location Notes (Optional)</Label>
                    <Textarea
                      value={locationNotes}
                      onChange={(e) => setLocationNotes(e.target.value)}
                      placeholder="Any extra context about where this was found..."
                      className="min-h-[60px] rounded-lg bg-background/60 border-border/40 text-sm"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Label className="ml-1 text-sm font-medium">Tags</Label>
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
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 pb-6 pt-2 shrink-0">
            <Button type="submit" disabled={isLoading} className="w-full rounded-full h-11 shadow-lg shadow-primary/20">
              {isLoading ? "Saving..." : "Save to Library"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function LocationField({ label, value, onChange, placeholder }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="ml-1 text-xs font-medium text-muted-foreground">{label}</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-lg bg-background/60 border-border/40 h-9 text-sm"
      />
    </div>
  );
}
