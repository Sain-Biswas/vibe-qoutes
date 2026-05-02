"use client";

import { AddTagDialog } from "./add-tag-dialog";
import { AddSourceDialog } from "./add-source-dialog";
import { AddSnippetDialog } from "./add-snippet-dialog";

interface DashboardActionsProps {
  tags: any[];
  sources: any[];
}

export function DashboardActions({ tags, sources }: DashboardActionsProps) {
  return (
    <div className="flex items-center gap-3">
      <AddTagDialog />
      <AddSourceDialog />
      <AddSnippetDialog tags={tags} sources={sources} />
    </div>
  );
}
