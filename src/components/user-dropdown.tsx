"use client";

import * as React from "react";
import { LogOut, Settings, User, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface UserDropdownProps {
  mode?: "compact" | "full";
}

export function UserDropdown({ mode = "compact" }: UserDropdownProps) {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();
      if (error) {
        toast.error(error.message || "Failed to sign out");
      } else {
        toast.success("Signed out successfully");
        router.push("/");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    }
  };

  if (!mounted || !session?.user) {
    return (
      <div className={cn(
        "rounded-full bg-primary/10 animate-pulse",
        mode === "compact" ? "size-9" : "h-12 w-full rounded-xl"
      )} />
    );
  }

  const user = session.user;

  const initial = user.name ? user.name.charAt(0).toUpperCase() : (user.email?.charAt(0).toUpperCase() || "?");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(
        "flex items-center transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer group",
        mode === "compact"
          ? "size-9 justify-center rounded-full bg-primary/20 hover:bg-primary/30"
          : "w-full gap-3 px-3 py-2 rounded-xl hover:bg-surface-soft border border-transparent hover:border-border/40"
      )}>
        <div className={cn(
          "flex items-center justify-center rounded-full bg-primary/20 text-primary font-serif shrink-0",
          mode === "compact" ? "size-full" : "size-8"
        )}>
          {initial}
        </div>

        {mode === "full" && (
          <>
            <div className="flex-1 text-left overflow-hidden">
              <p className="text-sm font-serif font-medium truncate text-foreground">{user.name || "User"}</p>
              <p className="text-[10px] text-muted-foreground truncate leading-none mt-0.5">{user.email}</p>
            </div>
            <ChevronDown className="size-3.5 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform" />
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-sm border-border/50 bg-background/80 backdrop-blur-xl shadow-xl shadow-primary/10 mt-2 p-2" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal px-2 py-1.5">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none font-serif">{user.name || "User"}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-border/40 my-2" />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="rounded-xl px-2 py-2 cursor-pointer focus:bg-surface-soft"
            onClick={() => router.push("/dashboard")}
          >
            <User className="mr-2 size-4 text-muted-foreground" />
            <span>Library</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-xl px-2 py-2 cursor-pointer focus:bg-surface-soft">
            <Settings className="mr-2 size-4 text-muted-foreground" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-border/40 my-2" />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={handleSignOut}
            className="rounded-xl px-2 py-2 cursor-pointer text-red-500 focus:bg-red-500/10 focus:text-red-500"
          >
            <LogOut className="mr-2 size-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
