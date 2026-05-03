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

export async function createSource(title: string, author?: string) {
  const session = await getSession();
  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  try {
    const source = await prisma.source.create({
      data: {
        title,
        author,
        userId: session.user.id,
      },
    });
    revalidatePath("/dashboard");
    return { success: true, source };
  } catch (error) {
    return { error: "Failed to create source." };
  }
}

export async function createSnippet(content: string, sourceId?: string, tagIds: string[] = []) {
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
      },
    });
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/snippets");
    revalidatePath("/dashboard/tags");
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
