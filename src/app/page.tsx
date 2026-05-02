"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  Bookmark,
  Tag,
  Search,
  Sparkles,
  Library,
  Quote,
  ArrowRight,
  BookMarked,
  Layers,
  Globe,
  Feather,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";

/* ── Static Data ─────────────────────────────────────── */

const SAMPLE_SNIPPETS = [
  {
    quote:
      "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.",
    source: "The Metamorphosis",
    author: "Franz Kafka",
    tags: ["identity", "alienation", "society"],
    chapter: "Chapter 1, Opening",
  },
  {
    quote:
      "Pain and suffering are always inevitable for a large intelligence and a deep heart.",
    source: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    tags: ["suffering", "wisdom", "consciousness"],
    chapter: "Part 1, Chapter 2",
  },
  {
    quote:
      "Whenever you are confronted with an opponent, conquer him with love.",
    source: "The Story of My Experiments with Truth",
    author: "Mahatma Gandhi",
    tags: ["love", "non-violence", "duties"],
    chapter: "Part V, Chapter 33",
  },
];

const FEATURES = [
  {
    icon: Bookmark,
    title: "Save Passages",
    description:
      "Capture meaningful quotes, verses, and passages from any book, scripture, or philosophical text with a single click.",
  },
  {
    icon: BookMarked,
    title: "Trace Sources",
    description:
      "Record exact references — book, chapter, verse, page number — so you can always return to the original context.",
  },
  {
    icon: Tag,
    title: "Tag & Classify",
    description:
      "Organize with rich tags like society, duties, love, suffering, and create your own taxonomy of understanding.",
  },
  {
    icon: Layers,
    title: "Cross-Reference",
    description:
      "Discover connections across traditions — see how Kafka echoes the Gita, or how Dostoevsky mirrors the Quran.",
  },
  {
    icon: Search,
    title: "Deep Search",
    description:
      "Find any snippet instantly by author, source, tag, or content. Your personal library of wisdom at your fingertips.",
  },
];

const SOURCES = [
  { name: "Literature", examples: "Kafka, Dostoevsky, Camus, Tolstoy", icon: Feather },
  { name: "Philosophy", examples: "Nietzsche, Seneca, Marcus Aurelius", icon: BookOpen },
  { name: "Sacred Texts", examples: "Quran, Bible, Gita, Torah, Upanishads", icon: Library },
  { name: "World Wisdom", examples: "Rumi, Lao Tzu, Confucius, Gibran", icon: Globe },
];

const TAG_CATEGORIES = [
  { name: "society", color: "bg-surface-soft text-foreground border-border" },
  { name: "suffering", color: "bg-surface-soft text-foreground border-border" },
  { name: "love", color: "bg-surface-soft text-foreground border-border" },
  { name: "duties", color: "bg-accent-yellow/20 text-accent-yellow-foreground border-accent-yellow/30" },
  { name: "faith", color: "bg-surface-soft text-foreground border-border" },
  { name: "identity", color: "bg-surface-soft text-foreground border-border" },
  { name: "wisdom", color: "bg-surface-soft text-foreground border-border" },
  { name: "karma", color: "bg-surface-soft text-foreground border-border" },
  { name: "purpose", color: "bg-surface-soft text-foreground border-border" },
  { name: "non-violence", color: "bg-surface-soft text-foreground border-border" },
  { name: "consciousness", color: "bg-surface-soft text-foreground border-border" },
  { name: "hope", color: "bg-surface-soft text-foreground border-border" },
];

const STATS = [
  { value: "4 983", label: "Snippets saved", sub: "across literature and faith" },
  { value: "97%", label: "Users say", sub: "it deepened their understanding" },
  { value: "189", label: "Sources", sub: "tracked across the platform" },
];

/* ── Page ─────────────────────────────────────────────── */

export default function Home() {
  const [activeTag, setActiveTag] = useState(TAG_CATEGORIES[0].name);

  useEffect(() => {
    // Select a random tag on initial load
    const randomTag = TAG_CATEGORIES[Math.floor(Math.random() * TAG_CATEGORIES.length)].name;
    setActiveTag(randomTag);
  }, []);

  const getInsightForTag = (tag: string) => {
    // Generate some mock insights based on the selected tag
    const insights: Record<string, { title: string, body: string, sources: number, readTime: number }> = {
      society: {
        title: "The individual versus the collective structure",
        body: "A recurring theme from Kafka's alienation to modern sociology. Society acts as both a nurturing structure and a rigid, oppressive force depending on the individual's compliance.",
        sources: 4, readTime: 3
      },
      suffering: {
        title: "The positive role of suffering in human development",
        body: "Both Dostoevsky and the Gita teach that suffering is not mere punishment — it is the forge of consciousness. By comparing notes across these texts, new insights emerge.",
        sources: 2, readTime: 5
      },
      love: {
        title: "Love as an active force, not just an emotion",
        body: "From Gandhi's ahimsa to Biblical agape, true love is portrayed as a demanding, active principle that requires sacrifice rather than passive feeling.",
        sources: 7, readTime: 8
      },
      duties: {
        title: "The burden and liberation of dharma",
        body: "The Bhagavad Gita extensively details how fulfilling one's innate duty (dharma), without attachment to the results, is the highest form of spiritual liberation.",
        sources: 3, readTime: 4
      },
      faith: {
        title: "Faith beyond dogmatic belief systems",
        body: "Many existentialist thinkers overlap with mystics in defining faith as a leap into the unknown, rather than intellectual assent to a set of propositions.",
        sources: 5, readTime: 6
      },
      identity: {
        title: "The fluid nature of the self",
        body: "Kafka's physical transformations physically manifest internal identity crises, echoing Buddhist concepts of non-self (anatta) and the illusion of a fixed ego.",
        sources: 6, readTime: 7
      },
    };

    // Default insight if one isn't explicitly defined
    return insights[tag] || {
      title: `Exploring the depths of ${tag} across cultures`,
      body: `This tag connects various passages that touch upon the fundamental human experience of ${tag}, showing how different wisdom traditions approach the same core concepts.`,
      sources: Math.floor(Math.random() * 5) + 1,
      readTime: Math.floor(Math.random() * 10) + 2
    };
  };

  const activeInsight = getInsightForTag(activeTag);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* ── Navigation ───────────────────────────── */}
      <nav
        id="main-nav"
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bloom-nav-pill w-[95%] max-w-6xl"
      >
        <div className="mx-auto flex h-16 items-center justify-between px-6">
          <a href="#" id="nav-logo" className="flex items-center gap-2.5 group">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-105">
              <BookOpen className="size-4" />
            </div>
            <span className="text-xl font-medium tracking-tight font-serif">
              Snippets
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-[15px] font-medium text-foreground/70 transition-colors hover:text-primary"
            >
              Features
            </a>
            <a
              href="#snippets"
              className="text-[15px] font-medium text-foreground/70 transition-colors hover:text-primary"
            >
              Examples
            </a>
            <a
              href="#sources"
              className="text-[15px] font-medium text-foreground/70 transition-colors hover:text-primary"
            >
              Sources
            </a>
            <a
              href="#tags"
              className="text-[15px] font-medium text-foreground/70 transition-colors hover:text-primary"
            >
              Taxonomy
            </a>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/sign-up">
              <Button id="nav-cta" size="default" className="hidden sm:flex text-[15px]">
                Start Collecting
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────── */}
      <section
        id="hero"
        className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-20"
      >
        {/* Soft background gradient */}
        <div className="bloom-gradient-bg" />
        <div className="grain-overlay" />

        <div className="relative z-10 w-full px-8 md:px-12 lg:px-24 py-24 lg:py-32 flex flex-col lg:flex-row items-center gap-12 max-w-[2000px] mx-auto">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="animate-fade-in-up text-5xl font-medium leading-[1.1] tracking-tighter sm:text-6xl md:text-7xl lg:text-[5.5rem] font-serif text-foreground">
              Grow through
              <br />
              what you go through
            </h1>

            <p className="mt-8 max-w-xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-200 text-[1.15rem] leading-relaxed text-muted-foreground">
              A modern intellectual hub that focuses on helping individuals collect,
              organize, and thrive on the wisdom found in great literature and ancient texts.
            </p>

            <div className="mt-12 flex animate-fade-in-up animation-delay-300 flex-col items-center lg:items-start justify-center lg:justify-start gap-4 sm:flex-row">
              <Link href="/sign-up">
                <Button id="hero-cta-primary" size="lg" className="gap-2 px-8 shadow-lg shadow-primary/20">
                  <Bookmark className="size-5" />
                  Start Collecting
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Imagery */}
          <div className="flex-1 relative w-full aspect-square lg:aspect-auto lg:h-[700px] flex justify-center lg:justify-end">
            <div className="relative w-full max-w-2xl h-full">
              <div className="absolute inset-0 bg-primary/5 rounded-[3rem] -rotate-6 scale-105 blur-3xl animate-pulse-glow" />
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden shadow-2xl animate-float">
                 <Image
                    src="/images/abstract_wisdom.png"
                    alt="Abstract representation of wisdom"
                    fill
                    className="object-cover"
                    priority
                  />
              </div>
              
              {/* Floating Element */}
              <div className="absolute -bottom-8 -left-8 bg-background/80 backdrop-blur-xl p-6 rounded-[2rem] shadow-xl border border-border/50 animate-float-delayed flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-accent-yellow/20 text-accent-yellow-foreground">
                  <Sparkles className="size-6" />
                </div>
                <div>
                  <p className="font-serif font-medium text-lg">10,000+ Snippets</p>
                  <p className="text-sm text-muted-foreground">Collected by our community</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Section (Adapted from Reference) ───────────────── */}
      <section className="relative py-20 bg-background border-t border-border/40">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-3">
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className="text-5xl font-serif font-medium text-foreground">{stat.value}</span>
                <div>
                  <p className="font-semibold text-[17px] text-foreground">{stat.label}</p>
                  <p className="text-[15px] text-muted-foreground mt-1 leading-tight">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────── */}
      <section id="features" className="relative py-24 bg-surface-soft/30">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-[800px] text-center mb-20">
            <h2 className="text-4xl font-serif font-medium tracking-tight sm:text-5xl text-foreground">
              Find the right kind of support for your intellect
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, i) => (
              <div
                key={feature.title}
                className="bloom-card bloom-card-hover p-8 group"
              >
                <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="size-6" />
                </div>
                <h3 className="text-xl font-medium font-serif mb-3 text-foreground">{feature.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Snippets Showcase ────────────────────── */}
      <section
        id="snippets"
        className="relative py-28"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-serif font-medium tracking-tight sm:text-5xl text-foreground">
              See how passages have helped people improve their understanding
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {SAMPLE_SNIPPETS.map((snippet, i) => (
              <div
                key={i}
                className="bloom-card p-8 flex flex-col h-full bg-background"
              >
                {/* Author info top */}
                <div className="mb-6 flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface-soft text-foreground font-serif text-lg">
                    {snippet.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{snippet.author}</h4>
                    <p className="text-sm text-muted-foreground">{snippet.source}</p>
                  </div>
                </div>

                {/* Quote */}
                <div className="flex-grow">
                  <p className="text-[16px] leading-relaxed text-foreground/90 font-serif italic">
                    "{snippet.quote}"
                  </p>
                </div>

                {/* Tags bottom */}
                <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-border/40">
                  {snippet.tags.map((tag) => {
                    const tagStyle = TAG_CATEGORIES.find((t) => t.name === tag);
                    return (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className={`font-normal text-xs px-3 py-1 ${tagStyle?.color}`}
                      >
                        {tag}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tags and Insights (Overlapping Style) ─────────────────────────────────── */}
      <section
        id="tags"
        className="relative py-32 bg-primary/5 border-y border-border/30 overflow-hidden"
      >
        <div className="mx-auto max-w-6xl px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif font-medium tracking-tight sm:text-5xl text-foreground mb-6">
                Helpful insights from your own taxonomy
              </h2>
              <p className="text-[1.15rem] leading-relaxed text-muted-foreground mb-10">
                Organize your reading with rich tags. Discover connections across traditions — see how Kafka echoes the Gita, or how Dostoevsky mirrors the Quran.
              </p>
              
              <div className="flex flex-wrap gap-3">
                {TAG_CATEGORIES.map((tag) => (
                  <button
                    key={tag.name}
                    onClick={() => setActiveTag(tag.name)}
                    className={`inline-flex items-center rounded-full border px-5 py-2.5 text-sm transition-all duration-300 cursor-pointer ${
                      activeTag === tag.name 
                        ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105' 
                        : `hover:scale-105 hover:shadow-sm ${tag.color}`
                    }`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Visual element representing a snippet/insight card */}
            <div className="relative">
              <div className="absolute inset-0 bg-accent-yellow/20 rounded-[3rem] -rotate-6 scale-105 blur-sm transition-all duration-500" />
              <div className="bloom-card p-10 relative z-10 bg-background/80 backdrop-blur-xl transition-all duration-500">
                <div className="flex gap-2 mb-6">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none font-normal">Cross-Reference</Badge>
                  <Badge className="bg-surface-soft text-foreground hover:bg-surface-soft border-none font-normal">{activeTag}</Badge>
                </div>
                <h3 className="text-2xl font-serif font-medium mb-4">{activeInsight.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {activeInsight.body}
                </p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                  <BookMarked className="size-4" />
                  <span>{activeInsight.sources} sources linked</span>
                  <span className="mx-2">•</span>
                  <span>{activeInsight.readTime} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section
        id="cta"
        className="relative py-32 overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/library_interior.png"
            alt="Modern library interior"
            fill
            className="object-cover opacity-20 dark:opacity-10"
          />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary animate-float">
             <BookOpen className="size-10" />
          </div>
          <h2 className="text-4xl font-serif font-medium tracking-tight sm:text-6xl text-foreground mb-8">
            Ready to build your library?
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-[1.15rem] text-muted-foreground">
            Join readers, scholars, and seekers who use Snippets to capture,
            organize, and deeply understand the world's most profound texts.
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="rounded-full px-10 h-14 text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
              Start Collecting Today
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────── */}
      <footer
        id="main-footer"
        className="border-t border-border/40 bg-background py-16"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <a href="#" className="flex items-center gap-2.5 group mb-6">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <BookOpen className="size-5" />
                </div>
                <span className="text-2xl font-medium tracking-tight font-serif">
                  Snippets
                </span>
              </a>
              <p className="text-muted-foreground max-w-sm mb-8">
                A modern intellectual hub that focuses on helping individuals collect, organize, and thrive emotionally and intellectually.
              </p>
              <div className="text-sm text-muted-foreground/60">
                &copy; {new Date().getFullYear()} Snippets. All rights reserved.
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-6">Platform</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Sources</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Taxonomy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
