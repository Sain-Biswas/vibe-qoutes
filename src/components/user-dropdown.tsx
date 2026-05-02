"use client";

import { LogOut, Settings, User } from "lucide-react";
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

export function UserDropdown() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

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

  if (!session) {
    return null;
  }

  const user = session.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex size-9 items-center justify-center rounded-full bg-primary/20 hover:bg-primary/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground font-medium font-serif">
        {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-2xl border-border/50 bg-background/80 backdrop-blur-xl shadow-xl shadow-primary/10 mt-2 p-2" align="end">
        <DropdownMenuLabel className="font-normal px-2 py-1.5">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none font-serif">{user.name || "User"}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
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
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="rounded-xl px-2 py-2 cursor-pointer text-red-500 focus:bg-red-500/10 focus:text-red-500"
        >
          <LogOut className="mr-2 size-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
