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
    console.error("Failed to create source:", error);
    return { error: "Failed to create source." };
  }
}
