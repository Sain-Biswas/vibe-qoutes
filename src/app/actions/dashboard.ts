"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

async function getSession() {
  try {
    const headersList = await headers();
    const sanitizedHeaders = new Headers(headersList);
    sanitizedHeaders.delete("authorization");

    return await auth.api.getSession({
      headers: sanitizedHeaders
    });
  } catch (err) {
    console.error("Session parsing failed:", err);
    return null;
  }
}

export async function createTag(name: string) {
  const session = await getSession();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  try {
    const tag = await prisma.tag.create({
      data: {
        name,
        userId: session.user.id,
      },
    });
    revalidatePath("/dashboard");
    return { success: true, tag };
  } catch (error) {
    console.error("Failed to create tag:", error);
    return { error: "Failed to create tag. It might already exist." };
  }
}

export async function createSource(data: {
  title: string;
  author?: string;
  type?: string;
  isbn?: string;
  publisher?: string;
  edition?: string;
  volume?: string;
  yearPublished?: string;
  url?: string;
  websiteName?: string;
  dateAccessed?: string;
  platform?: string;
  channel?: string;
  scriptureName?: string;
  tradition?: string;
  canon?: string;
  translation?: string;
  host?: string;
  doi?: string;
  journal?: string;
  institution?: string;
  notes?: string;
}) {
  const session = await getSession();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  try {
    const source = await prisma.source.create({
      data: {
        title: data.title,
        author: data.author || null,
        type: (data.type as any) || "OTHER",
        userId: session.user.id,
        isbn: data.isbn || null,
        publisher: data.publisher || null,
        edition: data.edition || null,
        volume: data.volume || null,
        yearPublished: data.yearPublished || null,
        url: data.url || null,
        websiteName: data.websiteName || null,
        dateAccessed: data.dateAccessed || null,
        platform: data.platform || null,
        channel: data.channel || null,
        scriptureName: data.scriptureName || null,
        tradition: data.tradition || null,
        canon: data.canon || null,
        translation: data.translation || null,
        host: data.host || null,
        doi: data.doi || null,
        journal: data.journal || null,
        institution: data.institution || null,
        notes: data.notes || null,
      },
    });
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/sources");
    return { success: true, source };
  } catch (error) {
    return { error: "Failed to create source." };
  }
}

export async function createSnippet(
  content: string,
  sourceId?: string,
  tagIds: string[] = [],
  location?: {
    pageNumber?: string;
    chapter?: string;
    paragraph?: string;
    section?: string;
    verse?: string;
    timestamp?: string;
    locationNotes?: string;
    videoUrl?: string;
    duration?: string;
    episodeUrl?: string;
    episodeNumber?: string;
    episodeTitle?: string;
    event?: string;
    eventDate?: string;
    eventLocation?: string;
    scriptureBook?: string;
    canto?: string;
    hymn?: string;
  }
) {
  const session = await getSession();
  if (!session?.user) return { error: "Unauthorized" };

  try {
    const snippet = await prisma.snippet.create({
      data: {
        content,
        userId: session.user.id,
        sourceId: sourceId || null,
        tags: {
          connect: tagIds.map((id) => ({ id })),
        },
        pageNumber: location?.pageNumber || null,
        chapter: location?.chapter || null,
        paragraph: location?.paragraph || null,
        section: location?.section || null,
        verse: location?.verse || null,
        timestamp: location?.timestamp || null,
        locationNotes: location?.locationNotes || null,
        videoUrl: location?.videoUrl || null,
        duration: location?.duration || null,
        episodeUrl: location?.episodeUrl || null,
        episodeNumber: location?.episodeNumber || null,
        episodeTitle: location?.episodeTitle || null,
        event: location?.event || null,
        eventDate: location?.eventDate || null,
        eventLocation: location?.eventLocation || null,
        scriptureBook: location?.scriptureBook || null,
        canto: location?.canto || null,
        hymn: location?.hymn || null,
      },
    });
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/snippets");
    revalidatePath("/dashboard/tags");
    revalidatePath("/dashboard/sources");
    return { success: true, snippet };
  } catch (error) {
    console.error("Failed to create snippet:", error);
    return { error: "Failed to create snippet." };
  }
}

export async function getSources() {
  const session = await getSession();
  if (!session?.user) return [];

  return await prisma.source.findMany({
    where: { userId: session.user.id },
    orderBy: { title: "asc" },
    include: {
      snippets: {
        include: {
          tags: true,
        },
      },
      _count: {
        select: { snippets: true },
      },
    },
  });
}

export async function getTags() {
  const session = await getSession();
  if (!session?.user) return [];

  return await prisma.tag.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      snippets: {
        include: {
          source: true,
          tags: true,
        },
      },
      _count: {
        select: { snippets: true },
      },
    },
  });
}

export async function getSnippets() {
  const session = await getSession();
  if (!session?.user) return [];

  return await prisma.snippet.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      source: true,
      tags: true,
    },
  });
}
