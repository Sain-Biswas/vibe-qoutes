"use client";

import { useState } from "react";
import { Plus, BookOpen, Globe, Video, ScrollText, Headphones, GraduationCap, FileText, UserRound } from "lucide-react";
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
import { createSource } from "@/app/actions/dashboard";
import { cn } from "@/lib/utils";

const SOURCE_TYPES = [
  { value: "BOOK", label: "Book", icon: BookOpen },
  { value: "WEB_ARTICLE", label: "Web Article", icon: Globe },
  { value: "VIDEO", label: "Video", icon: Video },
  { value: "SACRED_SCRIPTURE", label: "Sacred Scripture", icon: ScrollText },
  { value: "PODCAST", label: "Podcast", icon: Headphones },
  { value: "ACADEMIC_PAPER", label: "Academic Paper", icon: GraduationCap },
  { value: "PERSON", label: "Person", icon: UserRound },
  { value: "OTHER", label: "Other", icon: FileText },
] as const;

export function AddSourceDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sourceType, setSourceType] = useState("BOOK");

  // Common
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [notes, setNotes] = useState("");

  // Book
  const [isbn, setIsbn] = useState("");
  const [publisher, setPublisher] = useState("");
  const [edition, setEdition] = useState("");
  const [volume, setVolume] = useState("");
  const [yearPublished, setYearPublished] = useState("");

  // Web Article
  const [url, setUrl] = useState("");
  const [websiteName, setWebsiteName] = useState("");
  const [dateAccessed, setDateAccessed] = useState("");

  // Video (channel-level only)
  const [platform, setPlatform] = useState("");
  const [channel, setChannel] = useState("");

  // Sacred Scripture
  const [scriptureName, setScriptureName] = useState("");
  const [tradition, setTradition] = useState("");
  const [canon, setCanon] = useState("");
  const [translation, setTranslation] = useState("");

  // Podcast (show-level only)
  const [host, setHost] = useState("");

  // Academic Paper
  const [doi, setDoi] = useState("");
  const [journal, setJournal] = useState("");
  const [institution, setInstitution] = useState("");

  const resetForm = () => {
    setTitle(""); setAuthor(""); setNotes("");
    setIsbn(""); setPublisher(""); setEdition(""); setVolume(""); setYearPublished("");
    setUrl(""); setWebsiteName(""); setDateAccessed("");
    setPlatform(""); setChannel("");
    setScriptureName(""); setTradition(""); setCanon(""); setTranslation("");
    setHost("");
    setDoi(""); setJournal(""); setInstitution("");
    setSourceType("BOOK");
  };

  const handleAddSource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setIsLoading(true);
    const res = await createSource({
      title, author: author || undefined, type: sourceType, notes: notes || undefined,
      isbn: isbn || undefined, publisher: publisher || undefined, edition: edition || undefined,
      volume: volume || undefined, yearPublished: yearPublished || undefined,
      url: url || undefined, websiteName: websiteName || undefined, dateAccessed: dateAccessed || undefined,
      platform: platform || undefined, channel: channel || undefined,
      scriptureName: scriptureName || undefined,
      tradition: tradition || undefined, canon: canon || undefined, translation: translation || undefined,
      host: host || undefined,
      doi: doi || undefined, journal: journal || undefined, institution: institution || undefined,
    });
    setIsLoading(false);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Source added!");
      resetForm();
      setIsOpen(false);
    }
  };

  const currentType = SOURCE_TYPES.find(t => t.value === sourceType)!;
  const TypeIcon = currentType.icon;

  // Dynamic placeholders and labels
  const getTitlePlaceholder = () => {
    switch (sourceType) {
      case "BOOK": return "e.g. The Metamorphosis";
      case "WEB_ARTICLE": return "e.g. Understanding React Hooks";
      case "VIDEO": return "e.g. 3Blue1Brown (channel name)";
      case "SACRED_SCRIPTURE": return "e.g. The Holy Bible";
      case "PODCAST": return "e.g. The Tim Ferriss Show";
      case "ACADEMIC_PAPER": return "e.g. Attention Is All You Need";
      case "PERSON": return "e.g. Albert Einstein";
      default: return "e.g. My Source";
    }
  };

  const getAuthorLabel = () => {
    switch (sourceType) {
      case "SACRED_SCRIPTURE": return "Attributed Author";
      case "PERSON": return "Relationship / Role";
      default: return "Author";
    }
  };

  const getAuthorPlaceholder = () => {
    switch (sourceType) {
      case "BOOK": return "e.g. Franz Kafka";
      case "SACRED_SCRIPTURE": return "e.g. Vyasa, Moses";
      case "PERSON": return "e.g. Mentor, Professor, Friend";
      default: return "e.g. Author name";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) resetForm(); }}>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-full shadow-sm gap-2 h-9 px-4 py-2">
        <Plus className="size-4" />
        Add Source
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[85vh] overflow-hidden flex flex-col rounded-2xl p-0">
        <form onSubmit={handleAddSource} className="flex flex-col overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-4 shrink-0">
            <DialogTitle className="font-serif text-2xl tracking-tight flex items-center gap-3">
              <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <TypeIcon className="size-5" />
              </div>
              New Source
            </DialogTitle>
            <DialogDescription>
              Classify and catalog your source for precise referencing.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <div className="grid gap-6">
              {/* Source Type Selector */}
              <div className="space-y-3">
                <Label className="ml-1 text-sm font-medium">Source Type</Label>
                <div className="flex flex-wrap gap-2">
                  {SOURCE_TYPES.map((type) => {
                    const Icon = type.icon;
                    const isSelected = sourceType === type.value;
                    return (
                      <button
                        key={type.value}
                        type="button"
                        className={cn(
                          "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border",
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary shadow-md"
                            : "bg-surface-soft/30 border-border/40 text-muted-foreground hover:bg-surface-soft hover:text-foreground"
                        )}
                        onClick={() => setSourceType(type.value)}
                      >
                        <Icon className="size-3.5" />
                        {type.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Common Fields */}
              <div className="space-y-2">
                <Label htmlFor="sourceTitle" className="ml-1 text-sm font-medium">
                  {sourceType === "PERSON" ? "Person's Name" : sourceType === "VIDEO" ? "Channel / Creator Name" : sourceType === "PODCAST" ? "Show Name" : "Title"}
                </Label>
                <Input
                  id="sourceTitle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={getTitlePlaceholder()}
                  className="rounded-xl bg-surface-soft/50 border-border/50"
                  required
                />
              </div>

              {sourceType !== "PERSON" && sourceType !== "VIDEO" && sourceType !== "PODCAST" && (
                <div className="space-y-2">
                  <Label htmlFor="sourceAuthor" className="ml-1 text-sm font-medium">{getAuthorLabel()} (Optional)</Label>
                  <Input
                    id="sourceAuthor"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder={getAuthorPlaceholder()}
                    className="rounded-xl bg-surface-soft/50 border-border/50"
                  />
                </div>
              )}

              {sourceType === "PERSON" && (
                <div className="space-y-2">
                  <Label htmlFor="sourceAuthor" className="ml-1 text-sm font-medium">{getAuthorLabel()} (Optional)</Label>
                  <Input
                    id="sourceAuthor"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder={getAuthorPlaceholder()}
                    className="rounded-xl bg-surface-soft/50 border-border/50"
                  />
                </div>
              )}

              {/* Type-Specific Fields */}
              {sourceType === "BOOK" && (
                <div className="space-y-4 p-4 rounded-2xl bg-surface-soft/20 border border-border/30">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Book Details</p>
                  <div className="grid grid-cols-2 gap-4">
                    <FieldInput label="ISBN" value={isbn} onChange={setIsbn} placeholder="e.g. 978-0-14-028329-7" />
                    <FieldInput label="Publisher" value={publisher} onChange={setPublisher} placeholder="e.g. Penguin" />
                    <FieldInput label="Edition" value={edition} onChange={setEdition} placeholder="e.g. 3rd Edition" />
                    <FieldInput label="Volume" value={volume} onChange={setVolume} placeholder="e.g. Vol. 2" />
                    <FieldInput label="Year Published" value={yearPublished} onChange={setYearPublished} placeholder="e.g. 1915" />
                  </div>
                </div>
              )}

              {sourceType === "WEB_ARTICLE" && (
                <div className="space-y-4 p-4 rounded-2xl bg-surface-soft/20 border border-border/30">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Web Article Details</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <FieldInput label="URL" value={url} onChange={setUrl} placeholder="e.g. https://example.com/article" />
                    </div>
                    <FieldInput label="Website Name" value={websiteName} onChange={setWebsiteName} placeholder="e.g. Medium" />
                    <FieldInput label="Date Accessed" value={dateAccessed} onChange={setDateAccessed} placeholder="e.g. 2024-03-15" />
                  </div>
                </div>
              )}

              {sourceType === "VIDEO" && (
                <div className="space-y-4 p-4 rounded-2xl bg-surface-soft/20 border border-border/30">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Channel Details</p>
                  <p className="text-xs text-muted-foreground -mt-2">Video-specific details (URL, duration) are captured per snippet.</p>
                  <div className="grid grid-cols-2 gap-4">
                    <FieldInput label="Platform" value={platform} onChange={setPlatform} placeholder="e.g. YouTube, Vimeo" />
                    <FieldInput label="Creator / Channel" value={channel} onChange={setChannel} placeholder="e.g. 3Blue1Brown" />
                  </div>
                </div>
              )}

              {sourceType === "SACRED_SCRIPTURE" && (
                <div className="space-y-4 p-4 rounded-2xl bg-surface-soft/20 border border-border/30">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Scripture Details</p>
                  <p className="text-xs text-muted-foreground -mt-2">Book/chapter, verse, canto, and hymn are captured per snippet.</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <FieldInput label="Scripture Name" value={scriptureName} onChange={setScriptureName} placeholder="e.g. Bhagavad Gita, Quran, Torah" />
                    </div>
                    <FieldInput label="Tradition" value={tradition} onChange={setTradition} placeholder="e.g. Hinduism, Islam, Christianity" />
                    <FieldInput label="Canon" value={canon} onChange={setCanon} placeholder="e.g. Vedas, Old Testament" />
                    <div className="col-span-2">
                      <FieldInput label="Translation / Version" value={translation} onChange={setTranslation} placeholder="e.g. Swami Vivekananda translation, KJV" />
                    </div>
                  </div>
                </div>
              )}

              {sourceType === "PODCAST" && (
                <div className="space-y-4 p-4 rounded-2xl bg-surface-soft/20 border border-border/30">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Show Details</p>
                  <p className="text-xs text-muted-foreground -mt-2">Episode-specific details (URL, number, title) are captured per snippet.</p>
                  <div className="grid grid-cols-2 gap-4">
                    <FieldInput label="Host" value={host} onChange={setHost} placeholder="e.g. Tim Ferriss" />
                    <FieldInput label="Platform" value={platform} onChange={setPlatform} placeholder="e.g. Spotify, Apple Podcasts" />
                  </div>
                </div>
              )}

              {sourceType === "ACADEMIC_PAPER" && (
                <div className="space-y-4 p-4 rounded-2xl bg-surface-soft/20 border border-border/30">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Paper Details</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <FieldInput label="DOI" value={doi} onChange={setDoi} placeholder="e.g. 10.1038/s41586-021-03819-2" />
                    </div>
                    <FieldInput label="Journal" value={journal} onChange={setJournal} placeholder="e.g. Nature" />
                    <FieldInput label="Institution" value={institution} onChange={setInstitution} placeholder="e.g. MIT" />
                    <FieldInput label="Year Published" value={yearPublished} onChange={setYearPublished} placeholder="e.g. 2023" />
                  </div>
                </div>
              )}

              {sourceType === "PERSON" && (
                <div className="space-y-4 p-4 rounded-2xl bg-surface-soft/20 border border-border/30">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">About this Person</p>
                  <p className="text-xs text-muted-foreground -mt-2">Context like event, date, and location are captured per snippet.</p>
                </div>
              )}

              {/* Freeform Notes — Always visible */}
              <div className="space-y-2">
                <Label htmlFor="sourceNotes" className="ml-1 text-sm font-medium">Relevant Info (Optional)</Label>
                <Textarea
                  id="sourceNotes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional information not covered above — edition notes, context, personal annotations..."
                  className="min-h-[80px] rounded-xl bg-surface-soft/50 border-border/50"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 pb-6 pt-2 shrink-0">
            <Button type="submit" disabled={isLoading} className="w-full rounded-full h-11">
              {isLoading ? "Saving..." : "Save Source"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function FieldInput({ label, value, onChange, placeholder }: {
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
